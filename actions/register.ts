'use server'

import { createUser } from "@/lib/users"
import { redirect } from "next/navigation"

export async function registerAction(prevState: string | undefined, formData: FormData) {
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const dni = formData.get('dni') as string
    const phone = formData.get('phone') as string
    const route = formData.get('route') as string
    const code = formData.get('code') as string
    
    if (!name || !email || !password || !dni || !phone || !route || !code) {
        return "Todos los campos son obligatorios"
    }

    if (!phone.startsWith('+51')) {
        return "El número debe comenzar con +51"
    }
    
    try {
        // Create User via Backend (which handles code validation and consumption transactionally)
        await createUser({
            name,
            email,
            password,
            role: 'user',
            dni,
            phone,
            route,
            registrationCode: code
        });

    } catch (e: any) {
        return e.message
    }
    
    redirect('/login')
}
