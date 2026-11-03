const {
  ValidationError,
  parsePositiveInteger,
  parseSeatNumber,
  validateAttendance,
  validateDate,
  validateName,
  validateNote,
  validateStudent,
} = require('../src/validation');

describe('Validaciones de SistemaAula (apuntes/src/validation.js)', () => {
  describe('validateName', () => {
    test('limpia espacios y valida nombres de estudiante y materia', () => {
      expect(validateName({ nombre: '  Ana  ' }, 'estudiante')).toBe('Ana');
      expect(validateName({ nombre: '  Historia  ' }, 'materia')).toBe('Historia');
    });

    test('rechaza nombres vacíos, ausentes o que exceden 120 caracteres', () => {
      expect(() => validateName({}, 'estudiante')).toThrow(ValidationError);
      expect(() => validateName({ nombre: '   ' }, 'materia')).toThrow(ValidationError);
      expect(() => validateName({ nombre: 'a'.repeat(121) }, 'estudiante')).toThrow(ValidationError);
    });
  });

  describe('parsePositiveInteger', () => {
    test('acepta enteros positivos válidos', () => {
      expect(parsePositiveInteger('42', 'id')).toBe(42);
      expect(parsePositiveInteger('1', 'id')).toBe(1);
    });

    test('rechaza identificadores no positivos o inválidos', () => {
      for (const value of ['', '0', '-1', '1.2', '1e2', '9007199254740992']) {
        expect(() => parsePositiveInteger(value, 'id')).toThrow(ValidationError);
      }
    });
  });

  describe('parseSeatNumber', () => {
    test('acepta números de asiento entre 1 y 50', () => {
      expect(parseSeatNumber('1')).toBe(1);
      expect(parseSeatNumber('50')).toBe(50);
    });

    test('rechaza números fuera del rango 1 a 50', () => {
      expect(() => parseSeatNumber('51')).toThrow('El número de asiento debe estar entre 1 y 50');
      expect(() => parseSeatNumber('0')).toThrow(ValidationError);
    });
  });

  describe('validateStudent', () => {
    test('limpia nombre y matrícula opcional', () => {
      expect(validateStudent({ nombre: ' Ana ', matricula: '  A-123  ' })).toEqual({
        nombre: 'Ana',
        matricula: 'A-123',
      });
      expect(validateStudent({ nombre: 'Ana', matricula: ' ' })).toEqual({
        nombre: 'Ana',
        matricula: null,
      });
    });

    test('rechaza matrícula que supera 30 caracteres', () => {
      expect(() => validateStudent({ nombre: 'Ana', matricula: 'x'.repeat(31) })).toThrow(ValidationError);
    });
  });

  describe('validateDate', () => {
    test('acepta fechas válidas en formato AAAA-MM-DD', () => {
      expect(validateDate('2026-11-03')).toBe('2026-11-03');
    });

    test('rechaza fechas inexistentes o formato incorrecto', () => {
      expect(() => validateDate('2026-02-30')).toThrow('La fecha no es válida');
      expect(() => validateDate('03-11-2026')).toThrow('La fecha debe tener el formato AAAA-MM-DD');
    });
  });

  describe('validateAttendance', () => {
    test('acepta estados permitidos con fecha', () => {
      expect(validateAttendance({ estado: 'Atrasado', fecha: '2026-11-03' })).toEqual({
        estado: 'Atrasado',
        fecha: '2026-11-03',
      });
    });

    test('rechaza estados no admitidos o sin fecha', () => {
      expect(() => validateAttendance({ estado: 'Tarde', fecha: '2026-11-03' })).toThrow(ValidationError);
      expect(() => validateAttendance({ estado: 'Presente' })).toThrow(ValidationError);
    });
  });

  describe('validateNote', () => {
    test('normaliza título, contenido y materia', () => {
      expect(validateNote({
        titulo: '  Repaso  ',
        contenido: '  Tema de hoy  ',
        idMateria: '2',
      })).toEqual({
        titulo: 'Repaso',
        contenido: 'Tema de hoy',
        idMateria: 2,
      });
    });

    test('rechaza campos obligatorios ausentes o que exceden límite', () => {
      expect(() => validateNote({ titulo: ' ', contenido: 'texto', idMateria: '1' })).toThrow(ValidationError);
      expect(() => validateNote({ titulo: 'a'.repeat(151), contenido: 'texto', idMateria: '1' })).toThrow(ValidationError);
      expect(() => validateNote({ titulo: 'Título', contenido: ' ', idMateria: '1' })).toThrow(ValidationError);
      expect(() => validateNote({ titulo: 'Título', contenido: 'texto', idMateria: 'x' })).toThrow(ValidationError);
    });
  });
});
