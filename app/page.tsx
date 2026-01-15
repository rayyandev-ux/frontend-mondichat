import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-50 dark:bg-gray-900">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white">
          Bienvenido a <span className="text-indigo-600">MondiChat Admin</span>
        </h1>

        <p className="mt-3 text-2xl text-gray-600 dark:text-gray-300">
          Plataforma de administración y registro MondiChat
        </p>

        <div className="flex mt-6 gap-4">
          <Link href="/login" className="px-8 py-3 rounded-full bg-indigo-600 text-white font-bold hover:bg-indigo-500 transition shadow-lg">
            Iniciar Sesión
          </Link>
          <Link href="/register" className="px-8 py-3 rounded-full bg-white text-indigo-600 border border-indigo-600 font-bold hover:bg-gray-50 transition shadow-lg">
            Registrarse
          </Link>
        </div>
      </main>
    </div>
  )
}
