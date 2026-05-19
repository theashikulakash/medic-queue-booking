"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const validatePassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(password);
};

export default function SignupPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setMessage("");

        if (!name.trim()) {
            setError("Name is required.");
            return;
        }

        if (!email.trim()) {
            setError("Email is required.");
            return;
        }

        if (!validatePassword(password)) {
            setError(
                "Password must be at least 6 characters and include one uppercase and one lowercase letter."
            );
            return;
        }

        setLoading(true);

        try {
            const callbackURL = `${window.location.origin}/dashboard`;
            const { data, error: signUpError } = await authClient.signUp.email({
                name,
                email,
                password,
                image: imageUrl,
                callbackURL,
            });

            if (signUpError) {
                setError(signUpError.message || "Unable to create account. Please try again.");
                return;
            }

            if (data) {
                setMessage(
                    "Your account was created successfully. Please check your email to confirm your address or continue to login."
                );
                setName("");
                setEmail("");
                setImageUrl("");
                setPassword("");
            }
        } catch (err) {
            setError("Unexpected error while creating account. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section >
            <Navbar />
            <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
                <section className="w-full max-w-xl rounded-3xl bg-white p-8 shadow-xl ring-1 ring-slate-200 sm:p-10">
                    <div className="mb-8 text-center">
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#3b75c2]">
                            Create your account
                        </p>
                        <h1 className="mt-4 text-3xl font-semibold text-slate-900">
                            Sign up for Medic Queue
                        </h1>
                        <p className="mt-3 text-sm leading-6 text-slate-600">
                            Fill in your details below to register. Password must include at least one uppercase letter and one lowercase letter.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error ? (
                            <div className="rounded-2xl bg-rose-50 p-4 text-sm text-rose-700 ring-1 ring-rose-200">
                                {error}
                            </div>
                        ) : null}

                        {message ? (
                            <div className="rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-700 ring-1 ring-emerald-200">
                                {message}
                            </div>
                        ) : null}

                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-slate-900">
                                Full Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[#3b75c2] focus:ring-2 focus:ring-[#3b75c2]/20"
                                placeholder="John Doe"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-900">
                                Email address
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[#3b75c2] focus:ring-2 focus:ring-[#3b75c2]/20"
                                placeholder="john.doe@example.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="imageUrl" className="block text-sm font-medium text-slate-900">
                                Profile Image URL
                            </label>
                            <input
                                id="imageUrl"
                                type="url"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[#3b75c2] focus:ring-2 focus:ring-[#3b75c2]/20"
                                placeholder="https://example.com/image.png"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-900">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[#3b75c2] focus:ring-2 focus:ring-[#3b75c2]/20"
                                placeholder="Enter a strong password"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="inline-flex w-full items-center justify-center rounded-2xl bg-[#3b75c2] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#345aa5] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? "Creating account..." : "Sign up"}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-slate-600">
                        Already have an account?{' '}
                        <Link href="/login" className="font-semibold text-[#3b75c2] hover:text-[#345aa5]">
                            Sign in
                        </Link>
                    </p>
                </section>
            </main>
            <Footer />
        </section>

    );
}
