import { validarArchivo, MAX_FILE_SIZE } from '../entregas.validaciones.js';

describe('validarArchivo', () => {
  test('lanza error si no se adjunta ningún archivo', () => {
    expect(() => validarArchivo(undefined)).toThrow('Debe adjuntar un archivo');
  });

  test('lanza error si la extensión no es permitida', () => {
    const archivo = { originalname: 'virus.exe', size: 1000 };
    expect(() => validarArchivo(archivo)).toThrow('Formatos permitidos: .pdf, .docx, .zip');
  });

  test('lanza error si el archivo supera los 10 MB', () => {
    const archivo = { originalname: 'tarea.pdf', size: MAX_FILE_SIZE + 1 };
    expect(() => validarArchivo(archivo)).toThrow('El archivo no puede superar los');
  });

  test('lanza error si el archivo está vacío', () => {
    const archivo = { originalname: 'tarea.pdf', size: 0 };
    expect(() => validarArchivo(archivo)).toThrow('El archivo está vacío');
  });

  test('acepta un archivo de exactamente 10 MB', () => {
    const archivo = { originalname: 'tarea.pdf', size: MAX_FILE_SIZE };
    expect(() => validarArchivo(archivo)).not.toThrow();
  });

  test('acepta un archivo válido .docx', () => {
    const archivo = { originalname: 'tarea.docx', size: 5000 };
    expect(() => validarArchivo(archivo)).not.toThrow();
  });

  test('acepta la extensión en mayúsculas (.PDF)', () => {
    const archivo = { originalname: 'TAREA.PDF', size: 5000 };
    expect(() => validarArchivo(archivo)).not.toThrow();
  });
});