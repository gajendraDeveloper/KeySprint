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

        // Read existing users
        let users = [];
        if (fs.existsSync(USERS_FILE)) {
            const data = fs.readFileSync(USERS_FILE, 'utf8');
            users = JSON.parse(data || '[]');
        }

        // Check if user already exists
        if (users.find((u: any) => u.email === email)) {
            return NextResponse.json({ message: 'User already exists' }, { status: 400 });
        }

        // Add new user
        const newUser = { id: Date.now().toString(), username, email, password };
        users.push(newUser);

        // Write back to file
        fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));

        return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
