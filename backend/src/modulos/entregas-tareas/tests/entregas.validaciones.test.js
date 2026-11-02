import { validarArchivo, MAX_FILE_SIZE } from '../entregas.validaciones.js';

describe('Envío de tareas por correo (validaciones del archivo)', () => {
  test('Sin adjunto: dado que no adjunta archivo, entonces se rechaza con "Debe adjuntar un archivo"', () => {
    expect(() => validarArchivo(undefined)).toThrow('Debe adjuntar un archivo');
  });

  test('Formato inválido: dado un archivo .exe, entonces se rechaza indicando los formatos permitidos (.pdf, .docx, .zip)', () => {
    const archivo = { originalname: 'virus.exe', size: 1000 };
    expect(() => validarArchivo(archivo)).toThrow('Formatos permitidos: .pdf, .docx, .zip');
  });

  test('Tamaño excedido: dado un archivo mayor a 10 MB, entonces se rechaza', () => {
    const archivo = { originalname: 'tarea.pdf', size: MAX_FILE_SIZE + 1 };
    expect(() => validarArchivo(archivo)).toThrow('El archivo no puede superar los');
  });

  test('Tamaño límite: dado un archivo de exactamente 10 MB, entonces se acepta', () => {
    const archivo = { originalname: 'tarea.pdf', size: MAX_FILE_SIZE };
    expect(() => validarArchivo(archivo)).not.toThrow();
  });

  test('Regla adicional: dado un archivo vacío, entonces se rechaza con "El archivo está vacío"', () => {
    const archivo = { originalname: 'tarea.pdf', size: 0 };
    expect(() => validarArchivo(archivo)).toThrow('El archivo está vacío');
  });

  test('Formato válido: dado un archivo .docx, entonces se acepta', () => {
    const archivo = { originalname: 'tarea.docx', size: 5000 };
    expect(() => validarArchivo(archivo)).not.toThrow();
  });

  test('Regla adicional: dada la extensión en mayúsculas (.PDF), entonces se acepta', () => {
    const archivo = { originalname: 'TAREA.PDF', size: 5000 };
    expect(() => validarArchivo(archivo)).not.toThrow();
  });
});