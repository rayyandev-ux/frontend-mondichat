'use server'

import { auth } from "@/auth"
const jwt = require('jsonwebtoken')

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001'

export async function generateWhatsappCodeAction() {
    const session = await auth()
    if (!session || !session.user) {
        return { success: false, error: "No autorizado" }
    }

    try {
        // 1. Login to Backend to get JWT (Acting as the user)
        // Since we don't have the user's password here (it's hashed), 
        // we can't do a standard login flow unless we use a "service token" or share the JWT secret.
        // Option A: Share JWT Secret (Fastest for monolith-like split)
        // Option B: Service Account (Better security)
        
        // Let's go with Option A: We will generate a JWT here using the SAME secret as backend.
        // This requires `jsonwebtoken` package in frontend.
        
        // HOWEVER, the user asked to "unify authentication".
        // Ideally, NextAuth should talk to Backend to verify credentials, and Backend issues the token.
        // But NextAuth is already set up with Credentials provider.
        
        // For now, to make `generateWhatsappCodeAction` work:
        // We will call the backend endpoint passing the User's Email.
        // BUT this endpoint `/user/generate-code` requires a valid Bearer Token.
        
        // Workaround: Use a shared "Admin/Service" token to call backend on behalf of user?
        // Or simpler: Have an endpoint in backend that accepts a "Server-to-Server" secret?
        
        // Let's implement the "Shared Secret" approach for now to move fast, 
        // or actually implement the JWT generation here if we share the secret.
        
        // Real implementation:
        // We need to sign a token that the backend accepts.
        // Backend uses `fastify-jwt`. It expects standard JWT signed with `process.env.JWT_SECRET`.
        
        const secret = process.env.AUTH_SECRET // We should use the SAME secret for both
        
        if (!secret) throw new Error("AUTH_SECRET not configured")

        // Construct token payload matching Backend expectation
        const token = jwt.sign({
            email: session.user.email,
            role: (session.user as any).role || 'user'
        }, secret)

        const response = await fetch(`${BACKEND_URL}/user/generate-code`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({})
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.error || "Error en backend")
        }

        const data = await response.json()
        return { success: true, code: data.code }

    } catch (error: any) {
        console.error("Generate Code Error:", error)
        return { success: false, error: error.message || "Error al generar código" }
    }
}
