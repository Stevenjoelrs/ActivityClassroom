const Asiento = require('./Asiento');
const fs = require('fs');

class Aula {
    constructor() {
        this.asientos = [];
        let numero = 1;
        // Matriz de 10 filas x 5 columnas = 50 asientos
        for (let fila = 1; fila <= 10; fila++) {
            for (let columna = 1; columna <= 5; columna++) {
                this.asientos.push(new Asiento(numero, fila, columna));
                numero++;
            }
        }
    }

    // Función para buscar estudiantes (Criterio 1)
    buscarEstudiante(listaEstudiantes, textoBusqueda) {
        return listaEstudiantes.find(estudiante => 
            estudiante.nombre.toLowerCase().includes(textoBusqueda.toLowerCase()) || 
            estudiante.matricula === textoBusqueda
        );
    }

    // Persistencia
    guardarDatos() {
        const datos = this.asientos.map(asiento => ({
            numero: asiento.numero,
            estado: asiento.estado,
            estudianteAsignado: asiento.estudianteAsignado
        }));
        fs.writeFileSync('./backend/asinacion_de_asientos/datos.json', JSON.stringify({ asientos: datos }, null, 2));
    }

    cargarDatos() {
        if (fs.existsSync('./backend/asinacion_de_asientos/datos.json')) {
            const contenido = fs.readFileSync('./backend/asinacion_de_asientos/datos.json', 'utf8');
            const datos = JSON.parse(contenido);
            datos.asientos.forEach(dato => {
                const asiento = this.asientos.find(a => a.numero === dato.numero);
                if (asiento) {
                    asiento.estado = dato.estado;
                    asiento.estudianteAsignado = dato.estudianteAsignado;
                }
            });
        }
    }
}
module.exports = Aula;