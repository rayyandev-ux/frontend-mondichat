'use client'

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Users, Key, Database, LogOut } from "lucide-react"
import { handleSignOut } from "@/actions/login"

interface AdminSidebarProps {
    user: {
        email?: string | null;
        role?: string;
    }
}

export function AdminSidebar({ user }: AdminSidebarProps) {
    const searchParams = useSearchParams()
    const currentView = searchParams.get('view') || 'users'

    const menuItems = [
        { id: 'users', label: 'Usuarios', icon: Users },
        { id: 'codes', label: 'Códigos', icon: Key },
        { id: 'database', label: 'Base de Datos', icon: Database },
    ]

    return (
        <aside className="w-64 bg-white dark:bg-gray-800 shadow-md hidden md:flex flex-col border-r dark:border-gray-700">
             <div className="p-6 border-b dark:border-gray-700">
                <h1 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">Admin Panel</h1>
                <p className="text-xs text-gray-500 truncate mt-1">{user?.email}</p>
                <span className="text-xs inline-block mt-1 px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded-full capitalize">
                    {user?.role || 'User'}
                </span>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {menuItems.map((item) => {
                    const isActive = currentView === item.id
                    const Icon = item.icon
                    return (
                        <Link 
                            key={item.id}
                            href={`/admin?view=${item.id}`}
                            className={`flex items-center p-2 rounded-md transition-colors ${
                                isActive 
                                    ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300' 
                                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                        >
                            <Icon className="w-5 h-5 mr-3" />
                            {item.label}
                        </Link>
                    )
                })}
            </nav>

            <div className="p-4 border-t dark:border-gray-700">
                 <button 
                    onClick={() => handleSignOut()} 
                    className="flex items-center w-full p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                >
                    <LogOut className="w-5 h-5 mr-3" />
                    Cerrar Sesión
                </button>
            </div>
        </aside>
    )
}
