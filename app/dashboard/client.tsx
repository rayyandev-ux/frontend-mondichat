'use client'

import { useState } from 'react'
import { MessageCircle, Copy, Check } from 'lucide-react'
import { generateWhatsappCodeAction } from '@/actions/user'
import { handleSignOut } from '@/actions/login'

export function DashboardClient({ userName }: { userName: string }) {
    const [code, setCode] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [copied, setCopied] = useState(false)

    const handleGenerate = async () => {
        setLoading(true)
        const res = await generateWhatsappCodeAction()
        if (res.success && res.code) {
            setCode(res.code)
        } else {
            alert("Error al generar código")
        }
        setLoading(false)
    }

    const copyToClipboard = () => {
        if (code) {
            navigator.clipboard.writeText(code)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md w-full text-center space-y-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Bienvenido, {userName}
                </h1>
                
                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-md">
                    <p className="text-lg font-medium text-indigo-700 dark:text-indigo-300">
                        Login completo
                    </p>
                    <p className="text-sm text-indigo-600 dark:text-indigo-400 mt-1">
                        (Funciones próximamente)
                    </p>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-2">
                        <MessageCircle className="w-5 h-5 text-green-500" />
                        Vincular WhatsApp
                    </h2>
                    
                    {!code ? (
                        <div className="space-y-4">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Para acceder al Agente IA, necesitas vincular tu número de WhatsApp.
                            </p>
                            <button
                                onClick={handleGenerate}
                                disabled={loading}
                                className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors font-medium"
                            >
                                {loading ? 'Generando...' : 'Generar Código de Vinculación'}
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Envía este código a nuestro bot de WhatsApp para verificar tu cuenta:
                            </p>
                            <div className="relative group">
                                <div className="p-3 bg-gray-100 dark:bg-gray-900 rounded-md font-mono text-xl tracking-wider text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 break-all">
                                    {code}
                                </div>
                                <button
                                    onClick={copyToClipboard}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-indigo-500 bg-white dark:bg-gray-800 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
                                    title="Copiar"
                                >
                                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                </button>
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-500 bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded text-left">
                                1. Copia el código.<br/>
                                2. Abre WhatsApp y busca al contacto del Bot.<br/>
                                3. Pega y envía el código.
                            </div>
                        </div>
                    )}
                </div>

                <form action={handleSignOut}>
                    <button className="w-full px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors text-sm font-medium">
                        Cerrar Sesión
                    </button>
                </form>
            </div>
        </div>
    )
}
