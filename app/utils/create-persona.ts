export async function createPersona(persona: {
  albumId: number
  id: number
  title: string
  url: string
  thumbnailUrl: string
}) {
  const data = await fetch(`https://jsonplaceholder.typicode.com/photos/`, {
    method: 'POST',
    body: JSON.stringify(persona),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
  const result = await data.json()

  return result
}
