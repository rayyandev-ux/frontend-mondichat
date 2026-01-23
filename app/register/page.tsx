'use client'

import { useActionState, useEffect, useState } from 'react'
import { registerAction } from '@/actions/register'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { User, Lock, Mail, UserPlus, Loader2, CreditCard, Phone, Map, Key, ArrowLeft } from 'lucide-react'

export default function RegisterPage() {
  const [errorMessage, dispatch, isPending] = useActionState(registerAction, undefined)
  const [routes, setRoutes] = useState<string[]>([])

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001'}/routes`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setRoutes(data);
      })
      .catch(err => console.error("Error fetching routes:", err));
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row">
      {/* Left Section - Branding (Purple) */}
      <div className="flex w-full flex-col items-center justify-center bg-purple-700 px-8 py-12 text-center text-white lg:w-1/2 lg:px-16 relative overflow-hidden min-h-[300px] lg:min-h-screen">
        {/* Decorative background circle */}
        <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-purple-600 opacity-50 blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-purple-800 opacity-50 blur-3xl"></div>

        <Link href="/" className="relative mb-8 flex h-24 w-24 items-center justify-center overflow-hidden rounded-3xl bg-white p-2 shadow-2xl transition-transform hover:scale-105">
          <img src="/logo.jpeg" alt="MondiChat" className="h-full w-full object-cover rounded-2xl" />
        </Link>
        
        <h1 className="relative mb-4 text-3xl font-bold tracking-tight lg:text-5xl drop-shadow-sm">
          Únete a MondiChat
        </h1>
        
        <p className="relative max-w-md text-lg text-purple-100 lg:text-xl font-light">
          Crea tu cuenta y comienza a optimizar tu gestión de rutas y ventas.
        </p>
      </div>

      {/* Right Section - Register Form (White) */}
      <div className="relative flex w-full flex-col items-center justify-center bg-white px-8 py-12 lg:w-1/2 lg:px-16 dark:bg-gray-900">
        <Link href="/" className="absolute left-4 top-4 flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 lg:left-8 lg:top-8">
          <ArrowLeft className="h-5 w-5" />
          <span>Volver</span>
        </Link>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md space-y-8"
        >
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Crear Cuenta
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              ¿Ya tienes una cuenta?{' '}
              <Link href="/login" className="font-medium text-purple-600 hover:text-purple-500 dark:text-purple-400">
                Inicia sesión
              </Link>
            </p>
          </div>

          <form action={dispatch} className="mt-8 space-y-6">
            <div className="space-y-4 rounded-md shadow-sm">
              <div>
                <label htmlFor="dni" className="sr-only">DNI</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CreditCard className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="dni"
                    name="dni"
                    type="text"
                    required
                    disabled={isPending}
                    className="block w-full rounded-md border-0 py-3 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white dark:ring-gray-700 disabled:opacity-50"
                    placeholder="DNI"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="name" className="sr-only">Nombre Completo</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    disabled={isPending}
                    className="block w-full rounded-md border-0 py-3 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white dark:ring-gray-700 disabled:opacity-50"
                    placeholder="Nombre y Apellidos"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="sr-only">Celular (+51)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    defaultValue="+51"
                    required
                    disabled={isPending}
                    className="block w-full rounded-md border-0 py-3 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white dark:ring-gray-700 disabled:opacity-50"
                    placeholder="Celular (+51...)"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    disabled={isPending}
                    className="block w-full rounded-md border-0 py-3 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white dark:ring-gray-700 disabled:opacity-50"
                    placeholder="Email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="route" className="sr-only">Ruta</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Map className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    list="routes-list"
                    id="route"
                    name="route"
                    required
                    disabled={isPending}
                    className="block w-full rounded-md border-0 py-3 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white dark:ring-gray-700 disabled:opacity-50"
                    placeholder="Seleccionar Ruta"
                  />
                  <datalist id="routes-list">
                    {routes.map((route, index) => (
                      <option key={index} value={route} />
                    ))}
                  </datalist>
                </div>
              </div>

              <div>
                <label htmlFor="code" className="sr-only">Código de Registro</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Key className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="code"
                    name="code"
                    type="text"
                    required
                    disabled={isPending}
                    className="block w-full rounded-md border-0 py-3 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white dark:ring-gray-700 disabled:opacity-50"
                    placeholder="Código de Registro (Solicitar a RRHH)"
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
                    autoComplete="new-password"
                    required
                    disabled={isPending}
                    className="block w-full rounded-md border-0 py-3 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white dark:ring-gray-700 disabled:opacity-50"
                    placeholder="Contraseña"
                  />
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isPending}
                className="group relative flex w-full justify-center rounded-full bg-purple-600 px-4 py-3 text-sm font-semibold text-white shadow-lg hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 disabled:opacity-50 transition-all"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  {isPending ? (
                    <Loader2 className="h-5 w-5 animate-spin text-purple-300" />
                  ) : (
                    <UserPlus className="h-5 w-5 text-purple-300 group-hover:text-purple-200" aria-hidden="true" />
                  )}
                </span>
                {isPending ? 'Creando cuenta...' : 'Crear Cuenta'}
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
