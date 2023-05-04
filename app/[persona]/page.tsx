import Link from 'next/link'
import Image from 'next/image'
import { getPersona } from '../utils/get-persona'

// generateStaticParams will generate all the possible paths for this page
// and will be used by the static site generator to generate the static pages
// for this page.
export async function generateStaticParams() {
  const data = await fetch(`https://jsonplaceholder.typicode.com/posts`)
  const res = await data.json()

  return res.map(({ id }: { id: number }) => ({
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
  const data = await getPersona(persona)

  return {
    title: data.title,
    description: data.title,
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
  const data = await getPersona(persona)

  return (
    <>
      <Link className="text-blue-500" href="/">
        Back
      </Link>

      <div className="space-y-4 mt-6">
        <h1 className="text-2xl">{data.title}</h1>

        <Image
          className="rounded-md"
          src={data.url}
          alt={data.title}
          width={300}
          height={300}
        />
      </div>
    </>
  )
}
