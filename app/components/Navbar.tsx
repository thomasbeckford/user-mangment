// components/Navbar.tsx
import Link from 'next/link'
import Image from 'next/image'

const Navbar = () => {
  return (
    <nav className="bg-blue-950 rounded-md">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <Image
                  className="h-8 w-auto"
                  src="/vercel.svg"
                  alt="Logo"
                  width={20}
                  height={20}
                />
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <Link
              href="/"
              className="px-3 py-2 rounded-md text-sm font-medium text-white bg-gray-900"
            >
              Home
            </Link>
            <Link
              href="/actividades"
              className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700"
            >
              Actividades
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
