import NextAuth from "next-auth"
import { authConfig } from "./auth.config"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  trustHost: true,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Env Admin Fallback
        const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@mondichat.com';
        const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
        
        if (credentials.email === ADMIN_EMAIL && credentials.password === ADMIN_PASSWORD) {
            return {
                id: 'admin-env',
                name: 'Super Admin',
                email: ADMIN_EMAIL,
                role: 'admin'
            };
        }
        
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001'}/auth/login`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                  email: credentials.email,
                  password: credentials.password
              })
          });

          if (!response.ok) return null;

          const data = await response.json();
          if (data.user) {
              return { 
                  id: data.user.id, 
                  email: data.user.email, 
                  name: data.user.name, 
                  role: data.user.role 
              };
          }
          return null;

        } catch (e) {
          console.error("Login Error:", e);
          return null;
        }
      },
    }),
  ],
})
