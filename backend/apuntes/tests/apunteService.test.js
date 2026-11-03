const { ApunteService, ErrorNegocio } = require('../src/services/apunteService');

describe('HU-06 - Gestión de apuntes de clase (ApunteService)', () => {
  let servicio;
  let mockRepo;

  beforeEach(() => {
    mockRepo = {
      listarMaterias: jest.fn(),
      listarEstudiantes: jest.fn(),
      listarPorEstudiante: jest.fn(),
      obtenerPorId: jest.fn(),
      crear: jest.fn(),
      actualizar: jest.fn(),
      eliminar: jest.fn(),
    };
    servicio = new ApunteService(mockRepo);
  });

  describe('CA-01: Listar materias académicas', () => {
    test('retorna el listado de materias del repositorio', async () => {
      const materias = [
        { id: 1, nombre: 'Sistemas de Información 2' },
        { id: 2, nombre: 'Base de Datos' },
      ];
      mockRepo.listarMaterias.mockResolvedValue(materias);

      const resultado = await servicio.listarMaterias();
      expect(resultado).toEqual(materias);
      expect(mockRepo.listarMaterias).toHaveBeenCalledTimes(1);
    });
  });

  describe('CA-02: Listar apuntes por estudiante', () => {
    test('retorna los apuntes cronológicos del estudiante autenticado', async () => {
      const apuntes = [
        { id: 2, titulo: 'Diagramas de Secuencia', fecha_creacion: '2026-11-02' },
        { id: 1, titulo: 'Historias de Usuario', fecha_creacion: '2026-11-01' },
      ];
      mockRepo.listarPorEstudiante.mockResolvedValue(apuntes);

      const resultado = await servicio.listar(10);
      expect(resultado).toEqual(apuntes);
      expect(mockRepo.listarPorEstudiante).toHaveBeenCalledWith(10);
    });
  });

  describe('CA-03: Visualizar detalle de un apunte', () => {
    test('permite consultar un apunte propio con todos sus datos', async () => {
      const apunte = {
        id: 5,
        id_estudiante: 10,
        titulo: 'Patrón Repositorio',
        contenido: 'Desacopla la lógica de negocio del almacenamiento.',
        id_materia: 1,
      };
      mockRepo.obtenerPorId.mockResolvedValue(apunte);

      const resultado = await servicio.obtener(5, 10);
      expect(resultado).toEqual(apunte);
      expect(mockRepo.obtenerPorId).toHaveBeenCalledWith(5);
    });

    test('rechaza identificador de apunte inválido o no positivo', async () => {
      await expect(servicio.obtener(0, 10)).rejects.toThrow('Identificador de apunte inválido');
      await expect(servicio.obtener(-3, 10)).rejects.toThrow('Identificador de apunte inválido');
      await expect(servicio.obtener('cinco', 10)).rejects.toThrow('Identificador de apunte inválido');
    });

    test('retorna 404 si el apunte solicitado no existe', async () => {
      mockRepo.obtenerPorId.mockResolvedValue(null);

      await expect(servicio.obtener(99, 10)).rejects.toMatchObject({
        message: 'El apunte no existe',
        estado: 404,
      });
    });

    test('retorna 403 si el apunte pertenece a otro estudiante', async () => {
      mockRepo.obtenerPorId.mockResolvedValue({
        id: 5,
        id_estudiante: 99,
        titulo: 'Nota Privada',
      });

      await expect(servicio.obtener(5, 10)).rejects.toMatchObject({
        message: 'No puedes acceder a apuntes de otro estudiante',
        estado: 403,
      });
    });
  });

  describe('CA-04: Crear un nuevo apunte', () => {
    test('crea exitosamente un apunte con datos válidos', async () => {
      const nuevo = {
        titulo: '  Clean Architecture  ',
        contenido: '  Reglas de dependencias unidireccionales.  ',
        idMateria: '1',
      };
      mockRepo.crear.mockResolvedValue(42);
      mockRepo.obtenerPorId.mockResolvedValue({
        id: 42,
        id_estudiante: 10,
        titulo: 'Clean Architecture',
        contenido: 'Reglas de dependencias unidireccionales.',
        id_materia: 1,
      });

      const resultado = await servicio.crear(10, nuevo);

      expect(mockRepo.crear).toHaveBeenCalledWith({
        titulo: 'Clean Architecture',
        contenido: 'Reglas de dependencias unidireccionales.',
        idEstudiante: 10,
        idMateria: 1,
      });
      expect(resultado.id).toBe(42);
    });

    test('rechaza creación con título vacío o solo espacios', async () => {
      await expect(servicio.crear(10, { titulo: '   ', contenido: 'Ok', idMateria: 1 }))
        .rejects.toThrow('El título es obligatorio');
    });

    test('rechaza creación con contenido vacío o no textual', async () => {
      await expect(servicio.crear(10, { titulo: 'Título', contenido: '   ', idMateria: 1 }))
        .rejects.toThrow('El contenido es obligatorio');
    });

    test('rechaza creación con materia inválida o no numérica', async () => {
      await expect(servicio.crear(10, { titulo: 'Título', contenido: 'Contenido', idMateria: 0 }))
        .rejects.toThrow('La materia es obligatoria');
      await expect(servicio.crear(10, { titulo: 'Título', contenido: 'Contenido', idMateria: 'invalida' }))
        .rejects.toThrow('La materia es obligatoria');
    });
  });

  describe('CA-05: Modificar apunte existente', () => {
    test('actualiza título, contenido y materia conservando el autor', async () => {
      mockRepo.obtenerPorId
        .mockResolvedValueOnce({ id: 8, id_estudiante: 10, titulo: 'Viejo', contenido: 'Viejo', id_materia: 1 })
        .mockResolvedValueOnce({ id: 8, id_estudiante: 10, titulo: 'Nuevo', contenido: 'Nuevo', id_materia: 2 });

      const resultado = await servicio.editar(8, 10, {
        titulo: 'Nuevo',
        contenido: 'Nuevo',
        idMateria: 2,
      });

      expect(mockRepo.actualizar).toHaveBeenCalledWith(8, {
        titulo: 'Nuevo',
        contenido: 'Nuevo',
        idMateria: 2,
      });
      expect(resultado.titulo).toBe('Nuevo');
    });

    test('impide editar un apunte que pertenece a otro estudiante', async () => {
      mockRepo.obtenerPorId.mockResolvedValue({ id: 8, id_estudiante: 99 });

      await expect(servicio.editar(8, 10, { titulo: 'Intento', contenido: 'Hack', idMateria: 1 }))
        .rejects.toMatchObject({
          message: 'No puedes acceder a apuntes de otro estudiante',
          estado: 403,
        });
      expect(mockRepo.actualizar).not.toHaveBeenCalled();
    });
  });

  describe('CA-06: Eliminar apunte con confirmación explícita', () => {
    test('elimina el apunte cuando confirmar es true', async () => {
      mockRepo.obtenerPorId.mockResolvedValue({ id: 3, id_estudiante: 10 });
      mockRepo.eliminar.mockResolvedValue();

      await servicio.eliminar(3, 10, true);
      expect(mockRepo.eliminar).toHaveBeenCalledWith(3);
    });

    test('rechaza eliminar si no se envía confirmación explícita', async () => {
      mockRepo.obtenerPorId.mockResolvedValue({ id: 3, id_estudiante: 10 });

      await expect(servicio.eliminar(3, 10, false))
        .rejects.toThrow('Debes confirmar la eliminación');
      await expect(servicio.eliminar(3, 10, undefined))
        .rejects.toThrow('Debes confirmar la eliminación');
      expect(mockRepo.eliminar).not.toHaveBeenCalled();
    });

    test('rechaza eliminar un apunte de otro estudiante aunque confirme', async () => {
      mockRepo.obtenerPorId.mockResolvedValue({ id: 3, id_estudiante: 99 });

      await expect(servicio.eliminar(3, 10, true))
        .rejects.toMatchObject({
          message: 'No puedes acceder a apuntes de otro estudiante',
          estado: 403,
        });
      expect(mockRepo.eliminar).not.toHaveBeenCalled();
    });
  });

  describe('Listar estudiantes', () => {
    test('devuelve la lista de estudiantes disponibles', async () => {
      const estudiantes = [{ id: 1, nombre: 'Ana' }, { id: 2, nombre: 'Luis' }];
      mockRepo.listarEstudiantes.mockResolvedValue(estudiantes);

      const resultado = await servicio.listarEstudiantes();
      expect(resultado).toEqual(estudiantes);
    });
  });
});
