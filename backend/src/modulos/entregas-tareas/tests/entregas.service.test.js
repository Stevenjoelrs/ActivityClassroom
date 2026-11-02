import { jest } from '@jest/globals';
import { crearServicioEntregas } from '../entregas.service.js';
import { MAX_FILE_SIZE } from '../entregas.validaciones.js';

function crearServicio({ confirmado = true } = {}) {
  const correo = {
    enviar: jest.fn().mockResolvedValue({
      confirmado,
      enviado: '2026-11-02T10:00:00Z',
      recibido: '2026-11-02T10:00:01Z',
    }),
  };
  const repositorio = {
    guardar: jest.fn(async (entrega) => entrega),
  };
  const servicio = crearServicioEntregas({
    repositorio,
    correo,
    dominio: 'est.umss.edu.bo',
    generarId: () => 'id-123',
  });
  return { servicio, correo, repositorio };
}

const datosValidos = {
  remitente: 'estudiante@est.umss.edu.bo',
  destinatario: 'docente@fcyt.umss.edu',
  tarea: 'TAREA-01',
};

const archivoValido = {
  originalname: 'tarea.pdf',
  mimetype: 'application/pdf',
  size: 1000,
  buffer: Buffer.from('contenido'),
};

describe('servicio de entregas', () => {
  test('con datos y archivo válidos llama al correo y guarda la entrega', async () => {
    const { servicio, correo, repositorio } = crearServicio();
    const resultado = await servicio.enviar(datosValidos, archivoValido);

    expect(correo.enviar).toHaveBeenCalledTimes(1);
    expect(repositorio.guardar).toHaveBeenCalledTimes(1);
    expect(repositorio.guardar.mock.calls[0][0].estado).toBe('POR REVISAR');
    expect(resultado.id).toBe('id-123');
  });

  test('rechaza si no hay archivo y no envía ni guarda nada', async () => {
    const { servicio, correo, repositorio } = crearServicio();
    await expect(servicio.enviar(datosValidos, undefined)).rejects.toThrow('Debe adjuntar un archivo');
    expect(correo.enviar).not.toHaveBeenCalled();
    expect(repositorio.guardar).not.toHaveBeenCalled();
  });

  test('rechaza una extensión inválida', async () => {
    const { servicio } = crearServicio();
    const archivo = { ...archivoValido, originalname: 'virus.exe' };
    await expect(servicio.enviar(datosValidos, archivo)).rejects.toThrow('.pdf, .docx, .zip');
  });

  test('rechaza un archivo mayor a 10 MB', async () => {
    const { servicio } = crearServicio();
    const archivo = { ...archivoValido, size: MAX_FILE_SIZE + 1 };
    await expect(servicio.enviar(datosValidos, archivo)).rejects.toThrow('El archivo no puede superar los');
  });

  test('acepta un archivo de exactamente 10 MB', async () => {
    const { servicio, repositorio } = crearServicio();
    const archivo = { ...archivoValido, size: MAX_FILE_SIZE };
    await servicio.enviar(datosValidos, archivo);
    expect(repositorio.guardar).toHaveBeenCalledTimes(1);
  });

  test('rechaza un remitente no institucional', async () => {
    const { servicio, correo } = crearServicio();
    const datos = { ...datosValidos, remitente: 'estudiante@gmail.com' };
   await expect(servicio.enviar(datos, archivoValido)).rejects.toThrow('El remitente debe usar el dominio @est.umss.edu.bo');
    expect(correo.enviar).not.toHaveBeenCalled();
  });

  test('rechaza un correo de docente inválido', async () => {
    const { servicio, correo } = crearServicio();
    const datos = { ...datosValidos, destinatario: 'no-es-un-correo' };
    await expect(servicio.enviar(datos, archivoValido)).rejects.toThrow('Correo del docente inválido');
    expect(correo.enviar).not.toHaveBeenCalled();
  });

  test('si el correo falla, informa el error y no guarda la entrega', async () => {
    const { servicio, repositorio } = crearServicio({ confirmado: false });
    await expect(servicio.enviar(datosValidos, archivoValido)).rejects.toThrow('no confirmó el envío');
    expect(repositorio.guardar).not.toHaveBeenCalled();
  });
});