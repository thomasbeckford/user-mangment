import Personas from '@/personas/page'
import type { UserProps } from '@/types'
import { getPersonas } from '@/utils/queries/get-personas'
import Link from 'next/link'

export default async function Home() {
  const rows = await getPersonas()

  return (
    <main>
      <h1 className="py-4 text-5xl font-bold text-center w-full">
        Instituto Roman Rosell
      </h1>

      <Link
        href="/personas/create"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Agregar Persona
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 my-5">
        {rows?.map(({ id, name, image, email }: UserProps, index) => (
          <Personas
            key={id}
            index={index}
            id={id}
            name={name}
            image={image}
            email={email}
          />
        ))}
      </div>
    </main>
  )
}
