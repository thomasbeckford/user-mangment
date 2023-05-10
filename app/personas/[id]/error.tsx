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
      <h1>Hubo un error en los usuarios</h1>
      <p>{error.message}</p>
      <button onClick={reset}>Reset</button>
    </div>
  )
}
