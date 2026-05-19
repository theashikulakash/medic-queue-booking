"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    if (!password) {
      setError("Password is required.");
      return;
    }

    setLoading(true);

    try {
      const callbackURL = `${window.location.origin}/dashboard`;
      const { data, error: signInError } = await authClient.signIn.email({
        email,
        password,
        rememberMe,
        callbackURL,
      });

      if (signInError) {
        setError(signInError.message || "Unable to sign in. Please check your credentials.");
        return;
      }

      if (data) {
        setMessage("Sign in successful! Redirecting you to your dashboard...");
      }
    } catch (err) {
      setError("Unexpected error during sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
    <Navbar />
        <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
      <section className="w-full max-w-xl rounded-3xl bg-white p-8 shadow-xl ring-1 ring-slate-200 sm:p-10">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#3b75c2]">
            Sign in to NurtureSync
          </p>
          <h1 className="mt-4 text-3xl font-semibold text-slate-900">
            Welcome back
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Use your email and password to access your account.
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
            <label htmlFor="password" className="block text-sm font-medium text-slate-900">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[#3b75c2] focus:ring-2 focus:ring-[#3b75c2]/20"
              placeholder="password1234"
            />
          </div>

          <div className="flex items-center justify-between gap-4 text-sm text-slate-600">
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={rememberMe} 
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-[#3b75c2] focus:ring-[#3b75c2]"
              />
              Remember me
            </label>

            <Link href="/signup" className="font-semibold text-[#3b75c2] hover:text-[#345aa5]">
              Create an account
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center rounded-2xl bg-[#3b75c2] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#345aa5] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </section>
    </main>
    <Footer />
    </section>
    
  );
}
