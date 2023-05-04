export async function getPersonas() {
  const data = await fetch(
    `https://jsonplaceholder.typicode.com/photos?_limit=25`
  )
  const personas = await data.json()
  return personas
}
