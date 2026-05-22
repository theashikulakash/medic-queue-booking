"use client";

import { Card, Separator } from "@heroui/react";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Link from "next/link";

const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Safely extract and decode the redirect path from the query parameter
  const requestedRoute = searchParams.get("from");
  const decodedRoute = requestedRoute ? decodeURIComponent(requestedRoute) : null;
  const redirectTo = decodedRoute && decodedRoute !== "/login" ? decodedRoute : "/";

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
    });

    if (error) {
      toast.error(error.message || "Login failed. Please try again.");
      return;
    }

    if (data) {
      toast.success("Login successful!");
      router.push(redirectTo);
    }
  };

  const handleGoogleSignin = async () => {
    // Generate the full absolute URL necessary for social provider redirect callbacks
    const origin = typeof window !== "undefined" ? window.location.origin : "https://medic-queue.vercel.app";
    const callbackUrl = `${origin}${redirectTo}`;

    await authClient.signIn.social({
      provider: "google",
      callbackURL: callbackUrl,
    });
  };

  return (
    <section className="bg-gradient-to-br from-[#eef4ff] via-white to-[#f7fbff]">
      <Navbar />
      <div className="min-h-screen mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid mx-auto items-center gap-10 lg:grid-cols-[1.1fr_.9fr]">
          <div className="space-y-4">
            <span className="inline-flex rounded-full bg-sky-100 px-4 py-2 text-sm font-semibold text-sky-700">
              Medic Queue access
            </span>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Sign in to manage your appointments and care.
            </h1>
            <p className="max-w-xl text-base leading-7 text-slate-600">
              Access your doctor list, appointments, and reminders with a secure account built for modern care.
            </p>
          </div>

          <Card className="rounded-[2rem] border border-slate-200/80 bg-white/95 p-8 shadow-xl shadow-slate-200/40 backdrop-blur-sm">
            <Form onSubmit={onSubmit} className="flex w-full text-black flex-col gap-5">
              <h2 className="text-center text-xl font-bold mb-3">Login</h2>
              <TextField
                isRequired
                name="email"
                type="email"
                validate={(value) => {
                  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                    return "Please enter a valid email address";
                  }
                  return null;
                }}
              >
                <Label>Email</Label>
                <Input className="bg-slate-100 w-full border-slate-200 text-slate-900" placeholder="john@example.com" />
                <FieldError />
              </TextField>
              <TextField
                isRequired
                minLength={8}
                name="password"
                type="password"
                validate={(value) => {
                  if (value.length < 8) {
                    return "Password must be at least 8 characters";
                  }
                  if (!/[A-Z]/.test(value)) {
                    return "Password must contain at least one uppercase letter";
                  }
                  if (!/[0-9]/.test(value)) {
                    return "Password must contain at least one number";
                  }
                  return null;
                }}
              >
                <Label>Password</Label>
                <Input className="bg-slate-100 w-full border-slate-200 text-slate-900" placeholder="Enter your password" />
                <Description>
                  Must be at least 8 characters with 1 uppercase and 1 number
                </Description>
                <FieldError />
              </TextField>
              <div className="flex justify-center gap-2">
                <Button className="w-fit rounded-full bg-cyan-600 px-10 py-3 text-white hover:bg-cyan-700" type="submit">
                  Login
                </Button>
              </div>
              <Link href="/login" className="text-center">
              <Button variant="danger-soft">
                Forget password
              </Button>
              </Link>
              <Link href="/signup" className="text-center">
              <Button variant="ghost">
                Dont have an account? Register.
              </Button>
              </Link>
            </Form>

            <div className="flex flex-row items-center py-4">
              <div className="w-4/12 text-slate-500">
                <Separator />
              </div>
              <div className="whitespace-nowrap text-sm px-4 text-slate-500">Or continue with</div>
              <div className="w-4/12 text-slate-500">
                <Separator />
              </div>
            </div>

            <Button
              onClick={handleGoogleSignin}
              variant="outline"
              className="flex w-fit mx-auto items-center justify-center gap-3 rounded-full border-slate-300 px-6 py-3 text-slate-700 hover:bg-slate-100"
            >
              <FcGoogle className="text-xl" />
              Continue with Google
            </Button>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
          </Card>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default LoginPage;