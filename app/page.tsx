import PersonasList from './components/PersonasList'
import PersonaAdd from './components/PersonaAdd'
import { getPersonas } from './utils/get-personas'
import { sql } from '@vercel/postgres'

export default async function Home() {
  const personas = await getPersonas()
  console.log(personas)

  const { rows } = await sql`SELECT * from CARTS`

  console.log('Rows', rows)

  return (
    <main>
      <h1 className="py-4 text-5xl font-bold text-center w-full">
        Instituto Roman Rosell
      </h1>

      <PersonaAdd />
      {personas.map(
        ({
          id,
          title,
          thumbnailUrl,
        }: {
          id: number
          title: string
          thumbnailUrl: string
        }) => (
          <PersonasList
            key={id}
            id={id}
            title={title}
            thumbnailUrl={thumbnailUrl}
          />
        )
      )}
    </main>
  )
}
