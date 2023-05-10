import PersonSkeleton from '@/components/PersonSkeleton'
import Link from 'next/link'

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <>
      <h1 className="py-4 text-5xl font-bold text-center w-full">
        Instituto Roman Rosell
      </h1>

      <Link
        href="/personas/create"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Agregar Persona
      </Link>
      <PersonSkeleton />
    </>
  )
}
