'use client'

import { useRouter } from 'next/navigation'

export default function UpdatePersonaButton({ id }: { id: number }) {
  const router = useRouter()
  const updatePersona = async () => {}

  return (
    <button
      className="text-blue-500 hover:text-blue-600"
      onClick={updatePersona}
    >
      Update Persona
    </button>
  )
}
