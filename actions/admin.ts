'use server'

import { createCode } from "@/lib/codes"
import { deleteUser } from "@/lib/users"
import { revalidatePath } from "next/cache"
import jwt from 'jsonwebtoken';

const AUTH_SECRET = process.env.AUTH_SECRET;

export async function generateCodeAction() {
    try {
        await createCode()
        revalidatePath('/admin')
        return { success: true }
    } catch (e: any) {
        console.error("Generate Code Action Error:", e)
        return { success: false, error: e.message || "Error al generar código" }
    }
}

export async function deleteUserAction(userId: string) {
    try {
        if (!userId) throw new Error("ID de usuario requerido");
        
        await deleteUser(userId)
        
        // Wrap revalidatePath in try-catch just in case, though it shouldn't usually fail
        try {
            revalidatePath('/admin')
        } catch (revalError) {
            console.error("Revalidation Error:", revalError)
            // We still consider the action successful if the user was deleted, 
            // even if revalidation failed (client might need manual refresh)
        }
        
        return { success: true }
    } catch (e: any) {
        console.error("Delete User Action Error:", e)
        return { success: false, error: e.message || "Error al eliminar usuario" }
    }
}

export async function uploadCsvAction(formData: FormData) {
    try {
        const file = formData.get('file') as File
        if (!file) {
            return { success: false, error: "No se seleccionó ningún archivo" }
        }

        const buffer = Buffer.from(await file.arrayBuffer())
        const backendFormData = new FormData()
        // We need to cast to any or Blob because TypeScript in Node environment might be strict
        backendFormData.append('file', new Blob([buffer], { type: file.type }), file.name)

        if (!AUTH_SECRET) {
            return { success: false, error: "Error de configuración: AUTH_SECRET faltante" }
        }

        const token = jwt.sign({
            role: 'admin',
            email: 'admin@system'
        }, AUTH_SECRET);

        // Assuming Backend is running on port 3001
        const response = await fetch('http://localhost:3001/admin/upload-csv', {
            method: 'POST',
            body: backendFormData,
            headers: {
                'Authorization': `Bearer ${token}`
            }
            // fetch automatically sets the Content-Type header with boundary for FormData
        })

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}))
            throw new Error(errorData.error || `Error del servidor: ${response.status}`)
        }

        const result = await response.json()
        revalidatePath('/admin')
        return { success: true, count: result.count }

    } catch (e: any) {
        console.error("Upload CSV Action Error:", e)
        return { success: false, error: e.message || "Error al conectar con el servidor backend" }
    }
}
