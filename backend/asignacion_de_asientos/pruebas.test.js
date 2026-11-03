const Asiento = require('./Asiento');
const Aula = require('./Aula');
const Estudiante = require('./Estudiante');

test('HU-05: el aula debe crearse con 50 asientos (10 filas x 5 columnas)', () => {
    const aula = new Aula();
    expect(aula.asientos.length).toBe(50);
});

test('HU-05: no se debe poder asignar un asiento ya ocupado', () => {
    const asiento = new Asiento(1, 1, 1);
    asiento.asignarEstudiante("Ana Pérez");
    expect(() => {
        asiento.asignarEstudiante("Luis Gómez");
    }).toThrow("El asiento no está disponible.");
});

test('HU-05: al liberar un asiento, este vuelve a estar disponible', () => {
    const asiento = new Asiento(1, 1, 1);
    asiento.asignarEstudiante("Ana Pérez");
    asiento.liberarAsiento();
    expect(asiento.estado).toBe("Disponible");
});

test('HU-05: un estudiante debe empezar como ausente por defecto', () => {
    const alumno = new Estudiante("Carlos", "Ruiz", "2023001");
    expect(alumno.asistencia).toBe("Ausente");
});

test('HU-05: el docente debe poder cambiar la asistencia a presente', () => {
    const alumno = new Estudiante("Carlos", "Ruiz", "2023001");
    alumno.registrarAsistencia("Presente");
    expect(alumno.asistencia).toBe("Presente");
});
