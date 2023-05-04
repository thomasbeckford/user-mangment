'use client'

import { motion } from 'framer-motion'
import { createPersona } from '../utils/create-persona'

export default function PersonaAdd() {
  const create = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const persona = {
      albumId: 5011,
      id: 5011,
      title: 'que se yo',
      url: 'https://via.placeholder.com/600/92c952',
      thumbnailUrl: 'https://via.placeholder.com/150/92c952',
    }

    const data = await createPersona(persona)
  }

  return (
    <motion.div
      className="container mx-auto bg-blue-800 p-5 rounded-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="text-xl">Agregar nueva persona</h2>

      <div className="mt-5">
        <form className="flex flex-col" onSubmit={create}>
          <label className="text-white" htmlFor="name">
            Nombre
          </label>
          <input
            className="bg-blue-900 rounded-md p-2"
            type="text"
            name="name"
            id="name"
          />
          <button
            type="submit"
            className="bg-blue-700 rounded-md p-4 py-3 mt-5 hover:bg-blue-900"
          >
            Agregar
          </button>
        </form>
      </div>
    </motion.div>
  )
}
