'use client'

import { useActionState, useEffect, useState } from 'react'
import { registerAction } from '@/actions/register'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { User, Lock, Mail, UserPlus, Loader2, CreditCard, Phone, Map, Key } from 'lucide-react'

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
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md space-y-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Crear Cuenta
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Regístrate para acceder al panel
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
                  className="block w-full rounded-md border-0 py-2 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-700 dark:text-white dark:ring-gray-600 disabled:opacity-50"
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
                  className="block w-full rounded-md border-0 py-2 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-700 dark:text-white dark:ring-gray-600 disabled:opacity-50"
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
                  className="block w-full rounded-md border-0 py-2 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-700 dark:text-white dark:ring-gray-600 disabled:opacity-50"
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
                  className="block w-full rounded-md border-0 py-2 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-700 dark:text-white dark:ring-gray-600 disabled:opacity-50"
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
                <select
                  id="route"
                  name="route"
                  required
                  disabled={isPending}
                  defaultValue=""
                  className="block w-full rounded-md border-0 py-2 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-700 dark:text-white dark:ring-gray-600 disabled:opacity-50"
                >
                    <option value="" disabled>Selecciona una Ruta</option>
                    {routes.map(route => (
                        <option key={route} value={route}>{route}</option>
                    ))}
                </select>
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
                  className="block w-full rounded-md border-0 py-2 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-700 dark:text-white dark:ring-gray-600 disabled:opacity-50"
                  placeholder="Código de Registro (Admin)"
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
                  className="block w-full rounded-md border-0 py-2 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-700 dark:text-white dark:ring-gray-600 disabled:opacity-50"
                  placeholder="Contraseña"
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isPending}
              className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 transition-all"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                 {isPending ? (
                     <Loader2 className="h-5 w-5 animate-spin text-indigo-300" />
                 ) : (
                     <UserPlus className="h-5 w-5 text-indigo-300 group-hover:text-indigo-200" aria-hidden="true" />
                 )}
              </span>
              {isPending ? 'Registrando cuenta...' : 'Registrarse'}
            </button>
          </div>
          
          {errorMessage && (
            <div className="text-red-500 text-sm text-center mt-2 bg-red-50 dark:bg-red-900/20 p-2 rounded">
              {errorMessage}
            </div>
          )}
        </form>
        
        <div className="text-center text-sm">
            <span className="text-gray-500 dark:text-gray-400">¿Ya tienes cuenta? </span>
            <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
                Inicia sesión
            </Link>
        </div>
      </motion.div>
    </div>
  )
}
