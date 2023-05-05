'use client'

import { motion } from 'framer-motion'
import FormAddPersona from './FormAddPersona'
import { ToastContainer } from 'react-toastify'

export default function AddPersona() {
  return (
    <motion.div
      className="container mx-auto bg-blue-800 p-5 rounded-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="text-xl">Agregar nueva persona</h2>
      <ToastContainer />
      <div className="mt-5">
        <FormAddPersona />
      </div>
    </motion.div>
  )
}
