import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const USERS_FILE = path.join(process.cwd(), 'app', 'data', 'users.json');

export async function POST(request: Request) {
    try {
        const { username, email, password } = await request.json();

        if (!username || !email || !password) {
            return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
        }

        let users = [];
        if (fs.existsSync(USERS_FILE)) {
            const data = fs.readFileSync(USERS_FILE, 'utf8');
            users = JSON.parse(data || '[]');
        }

        if (users.find((u: any) => u.email === email)) {
            return NextResponse.json({ message: 'User already exists' }, { status: 400 });
        }

        const newUser = { id: Date.now().toString(), username, email, password };
        users.push(newUser);

        fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));

        const token = Buffer.from(`${newUser.id}-${Date.now()}`).toString('base64');

        const response = NextResponse.json({ message: 'User registered successfully', user: { id: newUser.id, username: newUser.username, email: newUser.email } }, { status: 201 });

        response.cookies.set('auth-token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7,
            path: '/',
        });

        return response;
    } catch (error) {
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
