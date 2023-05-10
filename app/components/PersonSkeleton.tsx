export default function PersonSkeleton() {
  const className = 'w-full border border-blue-600 rounded  bg-blue-950 p-4'

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 my-5 ">
        {
          // repeat
          Array.from(Array(8).keys()).map((_, i) => (
            <div key={i} className={className}>
              <div className="animate-pulse flex space-x-4 ">
                <div className="flex-1 space-y-4">
                  <div className="h-2 bg-blue-400 rounded w-3/4"></div>
                  <div className="space-y-2">
                    <div className="h-2 bg-blue-400 rounded"></div>
                    <div className="h-2 bg-blue-400 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </>
  )
}
