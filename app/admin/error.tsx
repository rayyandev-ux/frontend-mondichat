'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">¡Algo salió mal!</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Ha ocurrido un error inesperado al cargar el panel.
          </p>
          <div className="bg-gray-100 dark:bg-gray-900 p-3 rounded mb-6 text-left text-xs overflow-auto max-h-32 font-mono">
              {error.message}
          </div>
          <button
            onClick={() => reset()}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors"
          >
            Intentar de nuevo
          </button>
      </div>
    </div>
  )
}
