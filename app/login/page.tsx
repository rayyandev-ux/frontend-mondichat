'use client'

import { useActionState } from 'react'
import { authenticate } from '@/actions/login'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { User, Lock, LogIn, ArrowLeft } from 'lucide-react'

export default function LoginPage() {
  const [errorMessage, dispatch, isPending] = useActionState(authenticate, undefined)

  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row">
      {/* Left Section - Branding (Purple) */}
      <div className="flex w-full flex-col items-center justify-center bg-purple-700 px-8 py-12 text-center text-white lg:w-1/2 lg:px-16 relative overflow-hidden">
        {/* Decorative background circle */}
        <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-purple-600 opacity-50 blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-purple-800 opacity-50 blur-3xl"></div>

        <Link href="/" className="relative mb-8 flex h-24 w-24 items-center justify-center overflow-hidden rounded-3xl bg-white p-2 shadow-2xl transition-transform hover:scale-105">
          <img src="/logo.jpeg" alt="MondiChat" className="h-full w-full object-cover rounded-2xl" />
        </Link>
        
        <h1 className="relative mb-4 text-3xl font-bold tracking-tight lg:text-5xl drop-shadow-sm">
          Bienvenido de nuevo
        </h1>
        
        <p className="relative max-w-md text-lg text-purple-100 lg:text-xl font-light">
          Ingresa tus credenciales para acceder al panel de administración.
        </p>
      </div>

      {/* Right Section - Login Form (White) */}
      <div className="relative flex w-full flex-col items-center justify-center bg-white px-8 py-12 lg:w-1/2 lg:px-16 dark:bg-gray-900">
        <Link href="/" className="absolute left-4 top-4 flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 lg:left-8 lg:top-8">
          <ArrowLeft className="h-5 w-5" />
          <span>Volver</span>
        </Link>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md space-y-8"
        >
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Iniciar Sesión
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              ¿No tienes una cuenta?{' '}
              <Link href="/register" className="font-medium text-purple-600 hover:text-purple-500 dark:text-purple-400">
                Regístrate aquí
              </Link>
            </p>
          </div>

          <form action={dispatch} className="mt-8 space-y-6">
            <div className="space-y-4 rounded-md shadow-sm">
              <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-3 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
                    placeholder="Email"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Contraseña</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-3 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white dark:ring-gray-700"
                    placeholder="Contraseña"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-600"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                  Recordarme
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-purple-600 hover:text-purple-500 dark:text-purple-400">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isPending}
                className="group relative flex w-full justify-center rounded-full bg-purple-600 px-4 py-3 text-sm font-semibold text-white shadow-lg hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 disabled:opacity-50 transition-all"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LogIn className="h-5 w-5 text-purple-300 group-hover:text-purple-200" aria-hidden="true" />
                </span>
                {isPending ? 'Iniciando sesión...' : 'Ingresar'}
              </button>
            </div>
            
            {errorMessage && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Error</h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>{errorMessage}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  )
}
