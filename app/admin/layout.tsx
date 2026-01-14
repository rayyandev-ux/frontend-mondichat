import { auth } from "@/auth"
import Link from "next/link"
import { redirect } from "next/navigation"
import { LayoutDashboard, Users, Settings, LogOut } from "lucide-react"
import { handleSignOut } from "@/actions/login"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const session = await auth()
    
    if (!session) redirect('/login')

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-gray-800 shadow-md hidden md:flex flex-col">
                <div className="p-6 border-b dark:border-gray-700">
                    <h1 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">Admin Panel</h1>
                    <p className="text-xs text-gray-500 truncate mt-1">{session.user?.email}</p>
                    <span className="text-xs inline-block mt-1 px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded-full capitalize">
                        {/* @ts-ignore */}
                        {session.user?.role || 'User'}
                    </span>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <Link href="/admin" className="flex items-center p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors">
                        <LayoutDashboard className="w-5 h-5 mr-3" />
                        Dashboard
                    </Link>
                    <Link href="/admin" className="flex items-center p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors">
                        <Users className="w-5 h-5 mr-3" />
                        Usuarios
                    </Link>
                    <Link href="/admin" className="flex items-center p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors">
                        <Settings className="w-5 h-5 mr-3" />
                        Configuración
                    </Link>
                </nav>
                <div className="p-4 border-t dark:border-gray-700">
                     <form action={handleSignOut}>
                        <button className="flex items-center w-full p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors">
                            <LogOut className="w-5 h-5 mr-3" />
                            Cerrar Sesión
                        </button>
                     </form>
                </div>
            </aside>
            
            {/* Main Content */}
            <main className="flex-1 overflow-auto p-8">
                {children}
            </main>
        </div>
    )
}
