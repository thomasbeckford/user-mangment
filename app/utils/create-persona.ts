import type { UserProps } from '../types'

export async function createPersona(persona: UserProps) {
  console.log(persona)

  const response = await fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ persona }),
  })
  const data = await response.json()
  console.log(data)

  //   const data = await client.query(`
  //   INSERT INTO users (name, email)
  //   VALUES ('John Doe', 'johndoe@example.com')
  // `)

  // return data
  return data
}
