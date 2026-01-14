import jwt from 'jsonwebtoken';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
const AUTH_SECRET = process.env.AUTH_SECRET;

export interface RegistrationCode {
  id: string;
  code: string;
  isUsed: boolean;
  usedByUserId?: string;
  usedByUserName?: string;
  createdAt: string;
}

export async function createCode(): Promise<RegistrationCode> {
    if (!AUTH_SECRET) throw new Error("AUTH_SECRET missing");

    const token = jwt.sign({
        role: 'admin',
        email: 'admin@system'
    }, AUTH_SECRET);

    try {
        const res = await fetch(`${BACKEND_URL}/admin/codes`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!res.ok) {
            throw new Error("Failed to create code");
        }

        const data = await res.json();
        return data.code;
    } catch (error) {
        console.error("Error creating code:", error);
        throw error;
    }
}

export async function getAllCodes(): Promise<RegistrationCode[]> {
    if (!AUTH_SECRET) return [];

    const token = jwt.sign({
        role: 'admin',
        email: 'admin@system'
    }, AUTH_SECRET);

    try {
        const res = await fetch(`${BACKEND_URL}/admin/codes`, {
            cache: 'no-store',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!res.ok) return [];
        return await res.json();
    } catch (e) {
        console.error("Error fetching codes:", e);
        return [];
    }
}
