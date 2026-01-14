'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { User as UserIcon, Trash2, Key, Plus, CheckCircle, XCircle, Search, Calendar, Map, Phone, CreditCard, Database, Upload } from 'lucide-react'
import type { User } from '@/lib/users'
import type { RegistrationCode } from '@/lib/codes'
import { generateCodeAction, deleteUserAction, uploadCsvAction } from '@/actions/admin'

interface AdminDashboardClientProps {
    initialUsers: User[];
    initialCodes: RegistrationCode[];
}

export function AdminDashboardClient({ initialUsers, initialCodes }: AdminDashboardClientProps) {
    const [users, setUsers] = useState(initialUsers)
    const [codes, setCodes] = useState(initialCodes)
    const [isGenerating, setIsGenerating] = useState(false)
    const [activeTab, setActiveTab] = useState<'users' | 'codes' | 'database'>('users')
    const [searchTerm, setSearchTerm] = useState('')
    const [uploading, setUploading] = useState(false)

    const handleUpload = async (formData: FormData) => {
        setUploading(true)
        const res = await uploadCsvAction(formData)
        if (res.success) {
            alert(`Base de datos actualizada correctamente. ${res.count} registros procesados.`)
        } else {
            alert("Error: " + res.error)
        }
        setUploading(false)
    }

    const handleGenerateCode = async () => {
        setIsGenerating(true)
        const res = await generateCodeAction()
        if (res.success) {
            // In a real app we'd re-fetch or use a server action that returns the new list
            // For now, let's just refresh the page logic or optimistcally update if we had the data
            // Since we used revalidatePath, a router refresh would work.
            window.location.reload() 
        } else {
            alert("Error al generar código")
        }
        setIsGenerating(false)
    }

    const handleDeleteUser = async (userId: string) => {
        if (!confirm("¿Estás seguro de eliminar este usuario?")) return;
        
        const res = await deleteUserAction(userId)
        if (res.success) {
            setUsers(users.filter(u => u.id !== userId))
        } else {
            alert("Error al eliminar usuario")
        }
    }

    const filteredUsers = users.filter(user => 
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.dni?.includes(searchTerm)
    )

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h2 className="text-3xl font-bold dark:text-white">Panel de Administración</h2>
                
                <div className="flex space-x-2 bg-white dark:bg-gray-800 p-1 rounded-lg shadow-sm">
                    <button
                        onClick={() => setActiveTab('users')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                            activeTab === 'users' 
                                ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300' 
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                        }`}
                    >
                        Usuarios
                    </button>
                    <button
                        onClick={() => setActiveTab('codes')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                            activeTab === 'codes' 
                                ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300' 
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                        }`}
                    >
                        Códigos de Registro
                    </button>
                    <button
                        onClick={() => setActiveTab('database')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                            activeTab === 'database' 
                                ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300' 
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                        }`}
                    >
                        Base de Datos
                    </button>
                </div>
            </div>

            {activeTab === 'users' && (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
                >
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <h3 className="text-lg font-semibold dark:text-white flex items-center gap-2">
                            <UserIcon className="h-5 w-5" />
                            Gestión de Usuarios ({filteredUsers.length})
                        </h3>
                        <div className="relative w-full sm:w-64">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-4 w-4 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Buscar por nombre, email o DNI..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2"
                            />
                        </div>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-900/50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Usuario</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Contacto</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Ruta</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Registro</th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {filteredUsers.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-10 text-center text-gray-500 dark:text-gray-400">
                                            No se encontraron usuarios
                                        </td>
                                    </tr>
                                ) : (
                                    filteredUsers.map((user) => (
                                        <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="h-10 w-10 flex-shrink-0 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                                                        <span className="text-indigo-600 dark:text-indigo-300 font-medium text-sm">
                                                            {user.name?.charAt(0).toUpperCase() || 'U'}
                                                        </span>
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</div>
                                                        <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                                            <CreditCard className="h-3 w-3" /> {user.dni || 'Sin DNI'}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900 dark:text-white">{user.email}</div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                                    <Phone className="h-3 w-3" /> {user.phone || 'Sin Celular'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                                    <Map className="h-3 w-3 mr-1" />
                                                    {user.route || 'Sin Ruta'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                <div className="flex flex-col">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="h-3 w-3" />
                                                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                                                    </span>
                                                    <span className="text-xs text-gray-400 mt-1">
                                                        Code: {user.registrationCode || 'N/A'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button 
                                                    onClick={() => handleDeleteUser(user.id)}
                                                    className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
                                                    title="Eliminar Usuario"
                                                >
                                                    <Trash2 className="h-5 w-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            )}

            {activeTab === 'codes' && (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
                >
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                        <h3 className="text-lg font-semibold dark:text-white flex items-center gap-2">
                            <Key className="h-5 w-5" />
                            Códigos de Registro
                        </h3>
                        <button
                            onClick={handleGenerateCode}
                            disabled={isGenerating}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            {isGenerating ? 'Generando...' : 'Generar Nuevo Código'}
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-900/50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Código</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Estado</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Usado Por</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Fecha Creación</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {codes.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-10 text-center text-gray-500 dark:text-gray-400">
                                            No hay códigos generados
                                        </td>
                                    </tr>
                                ) : (
                                    // Sort codes by created date desc
                                    [...codes].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((code) => (
                                        <tr key={code.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="font-mono text-lg font-bold text-gray-900 dark:text-white tracking-wider">
                                                    {code.code}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {code.isUsed ? (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                                                        <XCircle className="h-3 w-3 mr-1" />
                                                        Usado
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                                        <CheckCircle className="h-3 w-3 mr-1" />
                                                        Disponible
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                {code.usedByUserName || code.usedByUserId || '-'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                {new Date(code.createdAt).toLocaleDateString()} {new Date(code.createdAt).toLocaleTimeString()}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            )}

            {activeTab === 'database' && (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
                >
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-semibold dark:text-white flex items-center gap-2">
                            <Database className="h-5 w-5" />
                            Actualización de Base de Datos (CSV)
                        </h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Sube el archivo CSV más reciente para actualizar rutas, clientes e inventario.
                            Esto reemplazará los datos existentes.
                        </p>
                    </div>

                    <div className="p-6">
                        <form action={handleUpload} className="max-w-xl mx-auto space-y-4">
                            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-12 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors">
                                <Upload className="h-12 w-12 text-gray-400 mb-4" />
                                <label htmlFor="csv-upload" className="cursor-pointer text-center">
                                    <span className="mt-2 block text-sm font-medium text-gray-900 dark:text-white">
                                        Seleccionar archivo CSV
                                    </span>
                                    <input 
                                        id="csv-upload" 
                                        name="file" 
                                        type="file" 
                                        accept=".csv"
                                        required
                                        className="mt-2 block w-full text-sm text-gray-500
                                            file:mr-4 file:py-2 file:px-4
                                            file:rounded-full file:border-0
                                            file:text-sm file:font-semibold
                                            file:bg-indigo-50 file:text-indigo-700
                                            hover:file:bg-indigo-100
                                        " 
                                    />
                                </label>
                                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                    Formato esperado: CSV con doble cabecera (Categorías/Columnas)
                                </p>
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={uploading}
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                                >
                                    {uploading ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Procesando...
                                        </>
                                    ) : (
                                        <>
                                            <Upload className="h-4 w-4 mr-2" />
                                            Subir y Actualizar
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            )}
        </div>
    )
}
