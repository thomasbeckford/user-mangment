'use client'

import { deletePersonaById } from '@/utils/mutations/delete-persona'
import { useRouter } from 'next/navigation'

export default function DeletePersonButton({ id }: { id: number }) {
  const router = useRouter()
  const deletePersona = async () => {
    const question = confirm('Are you sure you want to delete this persona?')

    if (!question) return
    await deletePersonaById(id)
    router.back()
    router.refresh()
  }

  return (
    <button className="text-red-500 hover:text-red-600" onClick={deletePersona}>
      Delete Persona
    </button>
  )
}
