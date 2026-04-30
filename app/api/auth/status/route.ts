import { NextResponse, NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
    const token = request.cookies.get('auth-token')?.value;

    if (!token) {
        return NextResponse.json({ isLoggedIn: false, user: null }, { status: 200 });
    }

    try {
        const decoded = Buffer.from(token, 'base64').toString('utf-8');
        const [userId] = decoded.split('-');

        const USERS_FILE = path.join(process.cwd(), 'app', 'data', 'users.json');
        let users = [];
        if (fs.existsSync(USERS_FILE)) {
            const data = fs.readFileSync(USERS_FILE, 'utf8');
            users = JSON.parse(data || '[]');
        }
        const user = users.find((u: any) => u.id === userId);

        if (!user) {
            return NextResponse.json({ isLoggedIn: false, user: null }, { status: 200 });
        }

        return NextResponse.json({ isLoggedIn: true, user: { id: user.id, username: user.username, email: user.email } }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ isLoggedIn: false, user: null }, { status: 200 });
    }
}