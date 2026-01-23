import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { AdminSidebar } from "./sidebar"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const session = await auth()
    
    if (!session) redirect('/login')

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
            {/* Sidebar */}
            <AdminSidebar user={session.user} />
            
            {/* Main Content */}
            <main className="flex-1 overflow-auto p-8">
                {children}
            </main>
        </div>
    )
}
