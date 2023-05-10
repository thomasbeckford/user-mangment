'use client'

import { motion } from 'framer-motion'
import PersonaForm from '../PersonaForm'
import Link from 'next/link'

export default function CreatePersona() {
  return (
    <motion.div
      className="container mx-auto bg-blue-800 p-5 rounded-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div>
        <Link href="/" className="text-blue-500 hover:text-blue-600">
          ← Volver
        </Link>

        <h2 className="text-xl">Agregar nueva persona</h2>
      </div>

      <PersonaForm />
    </motion.div>
  )
}
