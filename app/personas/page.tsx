'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import type { UserProps } from '@/types'

type PersonasProps = UserProps & {
  index: number
}

export default function Personas(props: PersonasProps) {
  const { id, index, name, image } = props

  const defaultImage = image === 'null' ? '/vercel.svg' : image

  return (
    <motion.div
      className="bg-blue-800 p-4 rounded hover:bg-blue-900 hover:ring-2 transition-all ring-blue-500"
      transition={{ duration: 0.1 * index }}
      initial={{ opacity: 0, y: 1 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 1 }}
    >
      <Link className="text-lg text-blue-500 flex " href={`/personas/${id}`}>
        <Image
          className="h-14 w-14 rounded-full"
          src={defaultImage}
          alt={name}
          width={150}
          height={150}
        />

        <h1 className="ml-4 self-center">{name}</h1>
      </Link>
    </motion.div>
  )
}
