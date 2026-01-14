import { getAllUsers, User } from "@/lib/users"
import { getAllCodes, RegistrationCode } from "@/lib/codes"
import { AdminDashboardClient } from "./client"

export default async function Dashboard() {
    // This is a server component now
    const users = await getAllUsers()
    const codes = await getAllCodes()

    // Filter out the env admin user if it's not in the list (it isn't in getAllUsers usually)
    const validUsers = users.filter(u => u.role !== 'admin')

    return (
        <AdminDashboardClient 
            initialUsers={validUsers} 
            initialCodes={codes} 
        />
    )
}
