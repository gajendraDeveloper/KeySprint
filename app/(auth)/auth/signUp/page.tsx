"use client";

import CommonButton from "@/components/commonUI/CommonButton"
import CommonInputField from "@/components/commonUI/CommonInputField"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { FiUserPlus, FiMail, FiLock, FiUser, FiArrowRight } from "react-icons/fi"
import { MdOutlineKeyboard } from "react-icons/md"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/app/context/AuthContext"
import { useEffect, useState } from "react"

const signUpSchema = yup.object().shape({
    username: yup.string().min(3, "Min 3 characters").required("Username is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().min(6, "Min 6 characters").required("Password is required"),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required("Confirm password is required")
})

const SignUpPage = () => {
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
        resolver: yupResolver(signUpSchema)
    })

    const onSubmit = async (data: any) => {
        setIsLoading(true);
        setAuthError(null);
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await res.json();

            if (res.ok) {
                login(data.username); // Automatically log in after registration
                router.push('/pages/dashboard');
            } else {
                setAuthError(result.message || 'Registration failed');
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
                <div className="hidden md:flex flex-col items-center justify-center p-12 bg-blue-700 text-white relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10">
                        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-white rounded-full blur-[100px]" />
                    </div>

                    <div className="relative z-10 text-center space-y-6">
                        <div className="w-20 h-20 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl flex items-center justify-center mx-auto mb-8">
                            <FiUserPlus size={40} />
                        </div>
                        <h2 className="text-4xl font-black">Join the Elite</h2>
                        <p className="text-blue-100 max-w-xs mx-auto">
                            Create your account to start tracking stats, unlocking badges, and master your favorite tools.
                        </p>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="p-10 md:p-16 flex flex-col justify-center space-y-10">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold text-zinc-900">Create Account</h1>
                        <p className="text-zinc-500">Sign up in seconds to start your training</p>
                    </div>

                    {authError && (
                        <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium">
                            {authError}
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <CommonInputField
                            label="Username"
                            name="username"
                            type="text"
                            placeholder="johndoe"
                            register={register}
                            errors={errors.username?.message}
                            icon={<FiUser size={18} />}
                            iconPosition="left"
                            styleWrapper="space-y-1"
                            styleLabel="text-sm font-medium text-zinc-500"
                            styleInputField="border border-zinc-200 rounded-xl px-4 py-2 focus-within:border-blue-500 transition-all"
                            styleIcon="text-zinc-400"
                        />
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
                            styleInputField="bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 focus-within:border-blue-500 transition-all"
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
                            styleInputField="bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 focus-within:border-blue-500 transition-all"
                            styleIcon="text-zinc-400"
                        />
                        <CommonInputField
                            label="Confirm Password"
                            name="confirmPassword"
                            type="password"
                            placeholder="••••••••"
                            register={register}
                            errors={errors.confirmPassword?.message}
                            icon={<FiLock size={18} />}
                            iconPosition="left"
                            styleWrapper="space-y-1"
                            styleLabel="text-sm font-medium text-zinc-500"
                            styleInputField="bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 focus-within:border-blue-500 transition-all"
                            styleIcon="text-zinc-400"
                        />

                        <CommonButton
                            label={isLoading ? "Creating Account..." : "Create Account"}
                            type="submit"
                            disabled={isLoading}
                            styleButton={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all group mt-6 cursor-pointer shadow-lg shadow-blue-500/20 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            icon={<FiArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                        />
                    </form>

                    <p className="text-center text-zinc-500 text-sm">
                        Already have an account?{" "}
                        <Link href="/auth/signIn" className="text-zinc-900 font-bold hover:underline cursor-pointer">Sign In</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage