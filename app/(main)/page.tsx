"use client";

import LandingPage from "./pages/landingPage/page";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
    const { isLoggedIn } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const storedLogin = localStorage.getItem('isLoggedIn');
        if (isLoggedIn || storedLogin === 'true') {
            router.push('/pages/dashboard');
        }
    }, [isLoggedIn, router]);

    return <LandingPage />;
}
