const fs = require('fs');
const path = require('path');
const Asiento = require('./Asiento');
const Aula = require('./Aula');
const Estudiante = require('./Estudiante');

describe('HU-05 - Asignación de asientos y asistencia', () => {
    const archivoDatos = path.join(__dirname, 'datos.json');

    afterEach(() => {
        if (fs.existsSync(archivoDatos)) {
            fs.unlinkSync(archivoDatos);
        }
    });

    test('HU-05 CA-01: el aula debe crearse con 50 asientos (10 filas x 5 columnas)', () => {
        const aula = new Aula();
        expect(aula.asientos.length).toBe(50);
        expect(aula.asientos[0].fila).toBe(1);
        expect(aula.asientos[0].columna).toBe(1);
        expect(aula.asientos[49].fila).toBe(10);
        expect(aula.asientos[49].columna).toBe(5);
    });

    test('HU-05 CA-02: no se debe poder asignar un asiento ya ocupado', () => {
        const asiento = new Asiento(1, 1, 1);
        asiento.asignarEstudiante("Ana Pérez");
        expect(() => {
            asiento.asignarEstudiante("Luis Gómez");
        }).toThrow("El asiento no está disponible.");
    });

    test('HU-05 CA-03: al liberar un asiento, este vuelve a estar disponible', () => {
        const asiento = new Asiento(1, 1, 1);
        asiento.asignarEstudiante("Ana Pérez");
        asiento.liberarAsiento();
        expect(asiento.estado).toBe("Disponible");
        expect(asiento.estudianteAsignado).toBeNull();
    });

    test('HU-05 CA-04: un estudiante debe empezar como ausente por defecto', () => {
        const alumno = new Estudiante("Carlos", "Ruiz", "2023001");
        expect(alumno.asistencia).toBe("Ausente");
    });

    test('HU-05 CA-05: el docente debe poder cambiar la asistencia a presente', () => {
        const alumno = new Estudiante("Carlos", "Ruiz", "2023001");
        alumno.registrarAsistencia("Presente");
        expect(alumno.asistencia).toBe("Presente");
    });

    test('HU-05 CA-06: el docente puede buscar estudiantes por coincidencia en el nombre', () => {
        const aula = new Aula();
        const lista = [
            { nombre: "Carlos Ruiz", matricula: "2023001" },
            { nombre: "Ana Pérez", matricula: "2023002" },
        ];
        const resultado = aula.buscarEstudiante(lista, "ana");
        expect(resultado).toBeDefined();
        expect(resultado.nombre).toBe("Ana Pérez");
    });

    test('HU-05 CA-06: el docente puede buscar estudiantes por número de matrícula', () => {
        const aula = new Aula();
        const lista = [
            { nombre: "Carlos Ruiz", matricula: "2023001" },
            { nombre: "Ana Pérez", matricula: "2023002" },
        ];
        const resultado = aula.buscarEstudiante(lista, "2023001");
        expect(resultado).toBeDefined();
        expect(resultado.nombre).toBe("Carlos Ruiz");
    });

    test('HU-05 CA-07: guarda y recupera el estado de asignación en datos.json', () => {
        const aulaOriginal = new Aula();
        aulaOriginal.asientos[0].asignarEstudiante("Ana Pérez");
        aulaOriginal.guardarDatos();

        expect(fs.existsSync(archivoDatos)).toBe(true);

        const aulaRecuperada = new Aula();
        aulaRecuperada.cargarDatos();

        expect(aulaRecuperada.asientos[0].estado).toBe("Ocupado");
        expect(aulaRecuperada.asientos[0].estudianteAsignado).toBe("Ana Pérez");
    });
});

