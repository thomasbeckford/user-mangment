export async function getPersona(persona: number) {
  const data = await fetch(
    `https://jsonplaceholder.typicode.com/photos/${persona}`
  )
  const result = await data.json()

  return result
}
