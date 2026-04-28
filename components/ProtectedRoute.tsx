"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isLoggedIn } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/pages/landingPage');
        }
    }, [isLoggedIn, router]);

    // If not logged in, we could return null or a loading spinner
    // but the useEffect will handle the redirect.
    // For a better UX, we might want to return null while checking.
    if (!isLoggedIn) {
        return null; // or a loading component
    }

    return <>{children}</>;
}
