import Link from 'next/link'
import { getPersona } from '@/utils/queries/get-persona'
import { getPersonas } from '@/utils/queries/get-personas'
import DeletePersonButton from '@/components/DeletePersonButton'
import UpdatePersonaButton from '@/components/UpdatePersonaButton'
import PersonaForm from '@/personas/PersonaForm'

export async function generateStaticParams(): Promise<
  { params: { persona: string } }[]
> {
  const rows = await getPersonas()
  return (
    rows?.map(({ id }) => ({
      params: {
        persona: `${id}`,
      },
    })) || []
  )
}

export async function generateMetadata({
  params,
}: {
  params: {
    id: number
  }
}) {
  const { id } = params
  const data = await getPersona(id)

  return {
    title: data?.name,
    description: data?.name,
  }
}

export default async function PersonasDetail({
  params,
}: {
  params: {
    id: number
  }
}) {
  const { id } = params
  const data = await getPersona(id)

  return (
    <>
      <div className="flex justify-between items-center">
        <Link href="/" className="text-blue-500 hover:text-blue-600">
          ← Volver
        </Link>

        <DeletePersonButton id={id} />
      </div>

      <div className="space-y-4 mt-6 mb-6">
        <PersonaForm data={data} />
      </div>
      <UpdatePersonaButton id={id} />
    </>
  )
}
