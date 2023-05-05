import './globals.css'
import { Poppins } from 'next/font/google'
import Navbar from './components/Navbar'
import 'react-toastify/dist/ReactToastify.css'

const poppins = Poppins({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
})

export const metadata = {
  title: 'Roman Rosell',
  description: 'Bienvenido a roman rosell',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <div className="container mx-auto">
          <div className="border border-dashed border-blue-500 rounded-md p-5">
            <Navbar />
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
