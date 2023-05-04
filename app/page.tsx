import PersonasList from './components/PersonasList'
import PersonaAdd from './components/PersonaAdd'
import type { UserProps } from './types'
import { getPersonas } from './utils/get-personas'

export default async function Home() {
  const rows = await getPersonas()
  return (
    <main>
      <h1 className="py-4 text-5xl font-bold text-center w-full">
        Instituto Roman Rosell
      </h1>

      <PersonaAdd />
      {rows?.map(({ id, name, image, email }: UserProps) => (
        <PersonasList
          key={id}
          id={id}
          name={name}
          image={image}
          email={email}
        />
      ))}
    </main>
  )
}
