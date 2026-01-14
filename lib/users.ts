import jwt from 'jsonwebtoken';

export interface User {
  id: string;
  name?: string;
  email: string;
  password?: string;
  role?: 'admin' | 'user';
  dni?: string;
  phone?: string;
  route?: string;
  registrationCode?: string;
  createdAt?: string;
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
const AUTH_SECRET = process.env.AUTH_SECRET;

export async function getAllUsers(): Promise<User[]> {
    if (!AUTH_SECRET) {
        console.warn("AUTH_SECRET missing, returning empty users list");
        return [];
    }

    const token = jwt.sign({
        role: 'admin',
        email: 'admin@system'
    }, AUTH_SECRET);

    try {
        const res = await fetch(`${BACKEND_URL}/admin/users`, { 
            cache: 'no-store', 
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!res.ok) return [];
        return await res.json();
    } catch (e) {
        console.error("Error fetching users:", e);
        return [];
    }
}

export async function getUserByEmail(email: string): Promise<User | null> {
    // Inefficient but compatible: fetch all and find
    const users = await getAllUsers();
    return users.find(u => u.email === email) || null;
}

export async function deleteUser(userId: string): Promise<void> {
    if (!AUTH_SECRET) throw new Error("AUTH_SECRET missing");
    
    // Create Admin Token for deletion
    const token = jwt.sign({
        role: 'admin',
        email: 'admin@system'
    }, AUTH_SECRET);

    const res = await fetch(`${BACKEND_URL}/admin/users/${userId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to delete user");
    }
}

export async function createUser(user: Omit<User, 'id'>): Promise<User> {
    const res = await fetch(`${BACKEND_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    });

    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to register");
    }

    const data = await res.json();
    return data.user;
}
