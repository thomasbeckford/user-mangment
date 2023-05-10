'use client'

import { toast } from 'react-toastify'

export const deletePersonaById = async (id: number) => {
  try {
    const res = await fetch(`/api/users/${id}`, {
      method: 'DELETE',
    })
    const json = await res.json()
    if (!res.ok) throw Error(json.message)

    toast.success('Persona eliminada')
  } catch (error) {
    console.error(error)
    toast.error('Error al eliminar la persona')
  }
}
