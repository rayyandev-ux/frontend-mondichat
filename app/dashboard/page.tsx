import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { DashboardClient } from "./client"
import { getUserByEmail } from "@/lib/users"

export default async function DashboardPage() {
    const session = await auth()
    
    if (!session) redirect('/login')

    const user = await getUserByEmail(session.user?.email || '')
    const isLinked = !!(user as any)?.whatsappId

    return <DashboardClient userName={session.user?.name || 'Usuario'} isLinked={isLinked} />
}
