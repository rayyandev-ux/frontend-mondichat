import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row">
      {/* Left Section - Branding (Purple) */}
      <div className="flex w-full flex-col items-center justify-center bg-purple-700 px-8 py-12 text-center text-white lg:w-1/2 lg:px-16 relative overflow-hidden">
        {/* Decorative background circle */}
        <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-purple-600 opacity-50 blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-purple-800 opacity-50 blur-3xl"></div>

        <div className="relative mb-8 flex h-32 w-32 items-center justify-center overflow-hidden rounded-3xl bg-white p-2 shadow-2xl transition-transform hover:scale-105">
          <img src="/logo.jpeg" alt="MondiChat" className="h-full w-full object-cover rounded-2xl" />
        </div>
        
        <h1 className="relative mb-4 text-4xl font-bold tracking-tight lg:text-6xl drop-shadow-sm">
          MondiChat
        </h1>
        
        <div className="relative mb-8 inline-flex items-center gap-2 rounded-full bg-purple-600/50 px-4 py-1 text-sm font-medium uppercase tracking-widest text-purple-100 backdrop-blur-sm border border-purple-400/30">
          Beta
        </div>

        <p className="relative max-w-md text-lg text-purple-100 lg:text-xl font-light">
          Asistente inteligente para vendedores y gestión de rutas.
        </p>
      </div>

      {/* Right Section - Actions (White) */}
      <div className="flex w-full flex-col items-center justify-center bg-white px-8 py-12 text-center lg:w-1/2 lg:px-16 dark:bg-gray-900">
        <h2 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
          ¡Hola de nuevo!
        </h2>
        <p className="mb-10 text-gray-500 dark:text-gray-400">
          Selecciona una opción para continuar
        </p>

        <div className="flex w-full max-w-sm flex-col gap-4">
          <Link href="/login" className="group relative flex w-full items-center justify-center overflow-hidden rounded-full bg-purple-600 px-8 py-4 text-lg font-bold text-white shadow-xl transition-all duration-300 hover:bg-purple-700 hover:scale-[1.02] hover:shadow-purple-500/25">
            <span className="relative z-10">Iniciar Sesión</span>
          </Link>
          
          <Link href="/register" className="group relative flex w-full items-center justify-center overflow-hidden rounded-full border-2 border-purple-600 bg-transparent px-8 py-4 text-lg font-bold text-purple-600 transition-all duration-300 hover:bg-purple-50 hover:scale-[1.02]">
            <span className="relative z-10">Registrarse</span>
          </Link>
        </div>

        <p className="mt-12 text-xs font-medium uppercase tracking-[0.2em] text-gray-400">
          MondiChat Beta
        </p>
      </div>
    </div>
  )
}
