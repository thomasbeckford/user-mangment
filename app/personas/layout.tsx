export default function PersonasLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container mx-auto border border-dashed border-red-400 rounded-md p-5 my-4">
      {children}
    </div>
  )
}
