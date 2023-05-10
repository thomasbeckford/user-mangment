import type { MutateUserProps } from '@/types'

export async function createOrUpdatePersona(persona: MutateUserProps) {
  console.log('Is this the persona?', persona)

  if (!persona.id) {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ persona }),
      })
      const data = await response.json()
      return data
    } catch (error) {
      console.error(error)
    }
  } else
    try {
      const response = await fetch('/api/users', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ persona }),
      })
      const data = await response.json()
      return data
    } catch (error) {
      console.error(error)
    }
}
