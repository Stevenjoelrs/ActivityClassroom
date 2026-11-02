export async function consultarApi() {
  const respuesta = await fetch('/api')

  if (!respuesta.ok) {
    throw new Error('No se pudo consultar la API')
  }

  return respuesta.json()
}