'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div>
      <h1>Error en la pagina create persona</h1>
      <p>{error.message}</p>
      <button onClick={reset}>Reset</button>
    </div>
  )
}
