"use client";

import CommonButton from "@/components/commonUI/CommonButton"
import CommonInputField from "@/components/commonUI/CommonInputField"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { FiMail, FiLock, FiArrowRight } from "react-icons/fi"
import { MdOutlineKeyboard } from "react-icons/md"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/app/context/AuthContext"
import { useEffect, useState } from "react"

const signInSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().min(4, "Min 4 characters").required("Password is required")
})

const SignInPage = () => {
    const router = useRouter();
    const { isLoggedIn, login } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [authError, setAuthError] = useState<string | null>(null);

    useEffect(() => {
        if (isLoggedIn) {
            router.push('/pages/dashboard');
        }
    }, [isLoggedIn, router]);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(signInSchema)
    })

    const onSubmit = async (data: any) => {
        setIsLoading(true);
        setAuthError(null);
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await res.json();

            if (res.ok) {
                login(result.user.username); // Update global context
                router.push('/pages/dashboard');
            } else {
                setAuthError(result.message || 'Invalid credentials');
            }
        } catch (err) {
            setAuthError('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex-1 bg-zinc-50 flex items-center justify-center p-6 min-h-[80vh]">
            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-white rounded-[2.5rem] overflow-hidden border border-zinc-200 shadow-2xl">
                {/* Left Side: Visual */}
                <div className="hidden md:flex flex-col items-center justify-center p-12 bg-blue-600 text-white relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10">
                        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-white rounded-full blur-[100px]" />
                    </div>

                    <div className="relative z-10 text-center space-y-6">
                        <div className="w-20 h-20 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl flex items-center justify-center mx-auto mb-8">
                            <MdOutlineKeyboard size={40} />
                        </div>
                        <h2 className="text-4xl font-black">Welcome Back!</h2>
                        <p className="text-blue-100 max-w-xs mx-auto">
                            Sign in to continue your shortcut mastery journey and track your progress.
                        </p>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="p-10 md:p-16 flex flex-col justify-center space-y-10">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold text-zinc-900">Sign In</h1>
                        <p className="text-zinc-500">Enter your credentials to access your account</p>
                    </div>

                    {authError && (
                        <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium">
                            {authError}
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <CommonInputField
                            label="Email Address"
                            name="email"
                            type="email"
                            placeholder="name@example.com"
                            register={register}
                            errors={errors.email?.message}
                            icon={<FiMail size={18} />}
                            iconPosition="left"
                            styleWrapper="space-y-1"
                            styleLabel="text-sm font-medium text-zinc-500"
                            styleInputField="bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 focus-within:border-blue-500 transition-all"
                            styleIcon="text-zinc-400"
                        />
                        <CommonInputField
                            label="Password"
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            register={register}
                            errors={errors.password?.message}
                            icon={<FiLock size={18} />}
                            iconPosition="left"
                            styleWrapper="space-y-1"
                            styleLabel="text-sm font-medium text-zinc-500"
                            styleInputField="bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 focus-within:border-blue-500 transition-all"
                            styleIcon="text-zinc-400"
                        />

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 text-zinc-500 cursor-pointer">
                                <input type="checkbox" className="rounded border-zinc-200 bg-zinc-50" />
                                Remember me
                            </label>
                            <Link href="#" className="text-blue-600 hover:underline cursor-pointer">Forgot password?</Link>
                        </div>

                        <CommonButton
                            label={isLoading ? "Signing In..." : "Sign In"}
                            type="submit"
                            disabled={isLoading}
                            styleButton={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all group cursor-pointer shadow-lg shadow-blue-500/20 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            icon={<FiArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                        />
                    </form>

                    <p className="text-center text-zinc-500 text-sm">
                        Don't have an account?{" "}
                        <Link href="/auth/signUp" className="text-zinc-900 font-bold hover:underline cursor-pointer">Create an account</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignInPage