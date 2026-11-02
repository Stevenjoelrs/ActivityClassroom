import { validarFeedback } from '../revision.validaciones.js';

const feedbackValido = {
  correcto: 'Buen uso de funciones',
  incorrecto: 'Faltan comentarios',
  corregir: 'Agregar validaciones',
};

describe('US-02 · Revisión de tareas (validaciones del feedback)', () => {
  test('Feedback completo: dados los tres campos completos, entonces se aceptan y se devuelven', () => {
    expect(validarFeedback(feedbackValido)).toEqual(feedbackValido);
  });

  test('Campo vacío: dado que falta "lo que está bien", entonces se rechaza indicando cuál falta', () => {
    const datos = { ...feedbackValido, correcto: '' };
    expect(() => validarFeedback(datos)).toThrow('Falta indicar lo que está bien');
  });

  test('Campo vacío: dado que falta "lo que está mal", entonces se rechaza indicando cuál falta', () => {
    const datos = { ...feedbackValido, incorrecto: '' };
    expect(() => validarFeedback(datos)).toThrow('Falta indicar lo que está mal');
  });

  test('Campo vacío: dado que falta "lo que debe corregir", entonces se rechaza indicando cuál falta', () => {
    const datos = { ...feedbackValido, corregir: '' };
    expect(() => validarFeedback(datos)).toThrow('Falta indicar lo que debe corregir');
  });

  test('Campo vacío: dado un campo con solo espacios, entonces se rechaza', () => {
    const datos = { ...feedbackValido, correcto: '   ' };
    expect(() => validarFeedback(datos)).toThrow('Falta indicar lo que está bien');
  });

  test('Regla adicional: dado un feedback sin datos (undefined o null), entonces se rechaza', () => {
    expect(() => validarFeedback(undefined)).toThrow('Falta indicar');
    expect(() => validarFeedback(null)).toThrow('Falta indicar');
  });

  test('Regla adicional: dado un campo con espacios al inicio y al final, entonces se guarda sin ellos', () => {
    const datos = { ...feedbackValido, correcto: '  Muy bien  ' };
    expect(validarFeedback(datos).correcto).toBe('Muy bien');
  });

  test('Regla adicional: dado un campo de más de 10000 caracteres, entonces se rechaza', () => {
    const datos = { ...feedbackValido, corregir: 'a'.repeat(10001) };
    expect(() => validarFeedback(datos)).toThrow('no puede superar 10000 caracteres');
  });

  test('Regla adicional: dado un campo de exactamente 10000 caracteres, entonces se acepta', () => {
    const datos = { ...feedbackValido, corregir: 'a'.repeat(10000) };
    expect(() => validarFeedback(datos)).not.toThrow();
  });
});