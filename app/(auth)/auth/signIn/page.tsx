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
        resolver: yupResolver(signInSchema),
        defaultValues: {
            email: "",
            password: ""
        }
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
                login(result.user.username);
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
        <div className="min-h-screen bg-[url('/log-in.jpg')] bg-cover bg-center flex items-center justify-center p-2">
            <div className="w-full max-w-md bg-white/90 backdrop-blur-xl rounded-[2.5rem] overflow-hidden border border-white/20 shadow-2xl">
                <div className="p-8 md:p-8 flex flex-col justify-center space-y-2">
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