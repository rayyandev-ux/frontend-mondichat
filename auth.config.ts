import type { NextAuthConfig } from "next-auth"
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const userRole = (auth?.user as any)?.role
      
      const isOnAdmin = nextUrl.pathname.startsWith('/admin')
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard')
      const isAuthPage = nextUrl.pathname.startsWith('/login') || nextUrl.pathname.startsWith('/register')

      // Redirect logged-in users away from auth pages
      if (isAuthPage && isLoggedIn) {
        if (userRole === 'admin') {
            return Response.redirect(new URL('/admin', nextUrl))
        }
        return Response.redirect(new URL('/dashboard', nextUrl))
      }

      // Protect Admin Routes
      if (isOnAdmin) {
        if (!isLoggedIn) return false
        if (userRole !== 'admin') {
            return Response.redirect(new URL('/dashboard', nextUrl))
        }
        return true
      }

      // Protect User Dashboard (and redirect Admins to Admin Panel)
      if (isOnDashboard) {
        if (!isLoggedIn) return false
        if (userRole === 'admin') {
            return Response.redirect(new URL('/admin', nextUrl))
        }
        return true
      }
      
      return true
    },
    jwt({ token, user }) {
        if (user) {
            token.role = (user as any).role
        }
        return token
    },
    session({ session, token }) {
        if (session.user) {
            (session.user as any).role = token.role as string
        }
        return session
    }
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig
