import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const USERS_FILE = path.join(process.cwd(), 'app', 'data', 'users.json');

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
        }

        // Read existing users
        let users = [];
        if (fs.existsSync(USERS_FILE)) {
            const data = fs.readFileSync(USERS_FILE, 'utf8');
            users = JSON.parse(data || '[]');
        }

        // Find user
        const user = users.find((u: any) => u.email === email && u.password === password);

        if (!user) {
            return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
        }

        // Generate a simple token (for demo purposes)
        const token = Buffer.from(`${user.id}-${Date.now()}`).toString('base64');

        const response = NextResponse.json({ message: 'Login successful', user: { id: user.id, username: user.username, email: user.email } }, { status: 200 });

        // Set token in httpOnly cookie
        response.cookies.set('auth-token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/',
        });

        return response;
    } catch (error) {
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
