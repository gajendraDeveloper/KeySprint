"use client"

import Link from "next/link"
import { FiUser, FiLayout, FiBarChart2, FiLogOut, FiMenu, FiX } from "react-icons/fi"
import { MdOutlineKeyboard } from "react-icons/md"
import { useAuth } from "@/app/context/AuthContext"
import { useRouter, usePathname } from "next/navigation"
import { useState } from "react"

const Navbar = () => {
    const { isLoggedIn, logout } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const handleLogout = () => {
        logout();
        router.push('/pages/landingPage');
    };

    const isActive = (path: string) => pathname === path;

    return (
        <nav className="sticky top-0 z-50 flex justify-between items-center px-8 py-4 bg-white/80 backdrop-blur-md border-b border-zinc-200 text-zinc-900">
            <Link href={isLoggedIn ? "/pages/dashboard" : "/pages/landingPage"} className="flex items-center gap-2 group cursor-pointer">
                <div className="p-2 bg-blue-600 rounded-lg group-hover:scale-110 transition-transform">
                    <MdOutlineKeyboard size={20} className="text-white" />
                </div>
                <h1 className="text-xl font-black tracking-tight">Key<span className="text-blue-600">Sprint</span></h1>
            </Link>

            <div className="hidden md:flex items-center gap-6">
                {isLoggedIn ? (
                    <>
                        <Link
                            href="/pages/dashboard"
                            className={`flex items-center gap-2 text-sm font-bold transition-all px-4 py-2 rounded-xl cursor-pointer ${isActive('/pages/dashboard')
                                ? 'text-blue-600 bg-blue-50 border border-blue-100 shadow-sm'
                                : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'
                                }`}
                        >
                            <FiLayout size={16} />
                            Dashboard
                        </Link>
                        <Link
                            href="/pages/progress"
                            className={`flex items-center gap-2 text-sm font-bold transition-all px-4 py-2 rounded-xl cursor-pointer ${isActive('/pages/progress')
                                ? 'text-blue-600 bg-blue-50 border border-blue-100 shadow-sm'
                                : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'
                                }`}
                        >
                            <FiBarChart2 size={16} />
                            Progress
                        </Link>
                    </>
                ) : (
                    <>
                        <Link href="/#projectFlow" className="text-sm font-medium text-zinc-500 hover:text-blue-600 transition-colors cursor-pointer">How it works</Link>
                        <Link href="/#supportedTools" className="text-sm font-medium text-zinc-500 hover:text-blue-600 transition-colors cursor-pointer">Supported tools</Link>
                    </>
                )}
            </div>

            <div className="hidden md:flex items-center">

                {isLoggedIn ? (
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-100 text-zinc-900 text-sm font-bold hover:bg-zinc-200 transition-all cursor-pointer border border-zinc-200"
                    >
                        <FiLogOut size={16} />
                        Logout
                    </button>
                ) : (
                    <Link href="/auth/signIn" className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-all cursor-pointer shadow-lg shadow-blue-500/20">
                        <FiUser size={16} />
                        Sign In
                    </Link>
                )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
                <button
                    onClick={toggleMenu}
                    className="p-2 text-zinc-600 hover:text-zinc-900 transition-colors"
                >
                    {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-white border-b border-zinc-200 p-6 flex flex-col gap-4 md:hidden animate-in slide-in-from-top-2 duration-200 z-50 shadow-xl">
                    {isLoggedIn ? (
                        <>
                            <Link
                                href="/pages/dashboard"
                                onClick={() => setIsMenuOpen(false)}
                                className={`flex items-center gap-3 p-4 rounded-xl font-bold transition-all ${isActive('/pages/dashboard')
                                    ? 'text-blue-600 bg-blue-50 border border-blue-100'
                                    : 'text-zinc-500 hover:bg-zinc-50'
                                    }`}
                            >
                                <FiLayout size={18} />
                                Dashboard
                            </Link>
                            <Link
                                href="/pages/progress"
                                onClick={() => setIsMenuOpen(false)}
                                className={`flex items-center gap-3 p-4 rounded-xl font-bold transition-all ${isActive('/pages/progress')
                                    ? 'text-blue-600 bg-blue-50 border border-blue-100'
                                    : 'text-zinc-500 hover:bg-zinc-50'
                                    }`}
                            >
                                <FiBarChart2 size={18} />
                                Progress
                            </Link>
                            <button
                                onClick={() => {
                                    handleLogout();
                                    setIsMenuOpen(false);
                                }}
                                className="flex items-center gap-3 p-4 rounded-xl text-red-600 bg-red-50 border border-red-100 font-bold mt-4"
                            >
                                <FiLogOut size={18} />
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/#projectFlow" onClick={() => setIsMenuOpen(false)} className="p-4 text-lg font-medium text-zinc-600 border-b border-zinc-50">How it works</Link>
                            <Link href="/#supportedTools" onClick={() => setIsMenuOpen(false)} className="p-4 text-lg font-medium text-zinc-600 border-b border-zinc-50">Supported tools</Link>
                            <Link
                                href="/auth/signIn"
                                onClick={() => setIsMenuOpen(false)}
                                className="flex items-center justify-center gap-2 p-4 mt-4 rounded-xl bg-blue-600 text-white font-bold shadow-lg"
                            >
                                <FiUser size={18} />
                                Sign In
                            </Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    )
}

export default Navbar
