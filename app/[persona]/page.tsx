import Link from 'next/link'
import Image from 'next/image'
import { getPersona } from '../utils/get-persona'
import { getPersonas } from '../utils/get-personas'

// generateStaticParams will generate all the possible paths for this page
// and will be used by the static site generator to generate the static pages
// for this page.
export async function generateStaticParams() {
  const rows = await getPersonas()

  return rows.map(({ id }: { id: number }) => ({
    params: {
      persona: `${id}`,
    },
  }))
}

export async function generateMetadata({
  params,
}: {
  params: {
    persona: number
  }
}) {
  const { persona } = params

  const res = await getPersona(persona)
  const data = res[0]

  return {
    title: data.name,
    description: data.name,
  }
}

export default async function PersonasDetail({
  params,
}: {
  params: {
    persona: number
  }
}) {
  const { persona } = params

  const res = await getPersona(persona)
  const data = res[0]

  return (
    <>
      <Link className="text-blue-500" href="/">
        Back
      </Link>

      <div className="space-y-4 mt-6">
        <h1 className="text-2xl">{data.name}</h1>

        <Image
          className="rounded-md"
          src={data.image}
          alt={data.name}
          width={300}
          height={300}
        />
      </div>
    </>
  )
}
