"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type User = {
    username: string;
    email: string;
    id: number;
};

type AuthContextType = {
    isLoggedIn: boolean;
    user: User | null;
    login: (username: string) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch('/api/auth/status');
                const data = await response.json();
                setIsLoggedIn(data.isLoggedIn);
                setUser(data.user);
            } catch (error) {
                console.error('Failed to check auth status:', error);
            }
        };

        checkAuth();
    }, []);

    const login = (username: string) => {
        const checkAuth = async () => {
            try {
                const response = await fetch('/api/auth/status');
                const data = await response.json();
                setIsLoggedIn(data.isLoggedIn);
                setUser(data.user);
            } catch (error) {
                console.error('Failed to check auth status:', error);
            }
        };
        checkAuth();
    };

    const logout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            setIsLoggedIn(false);
            setUser(null);
        } catch (error) {
            console.error('Failed to logout:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
