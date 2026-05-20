"use client";
import { FcGoogle } from "react-icons/fc";
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
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

const SignUpPage = () => {
    const router = useRouter();

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());

        const { data, error } = await authClient.signUp.email({
            email: user.email,
            password: user.password,
            name: user.name,
            image: user.image,
        });

        if (error) {
            toast.error(error.message || "Signup failed. Please try again.");
            return;
        }

        if (data) {
            toast.success("Signup successful! Please log in.");
            await authClient.signOut();
            router.push("/login");
        }
    };

    const handleGoogleSignin = async () => {
        await authClient.signIn.social({
            provider: "google"
        })

    }

    return (
        <section className="min-h-screen bg-gradient-to-br from-[#fbfcff] via-[#eef6ff] to-white">
            <Navbar />
            <div className="mx-auto  py-16 mb-8 flex w-11/12 max-w-6xl flex-col gap-10 px-4 sm:px-6 lg:px-8">
                <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_.9fr]">
                    <div className="space-y-4">
                        <span className="inline-flex rounded-full bg-sky-100 px-4 py-2 text-sm font-semibold text-sky-700">
                            Medic Queue registration
                        </span>
                        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                            Create your account for faster doctor booking.
                        </h1>
                        <p className="max-w-xl text-base leading-7 text-slate-600">
                            Easily register to manage appointments, connect with trusted specialists, and receive care reminders.
                        </p>
                    </div>

                    <Card className="rounded-[2rem] border border-slate-200/80 bg-white/95 w-11/12 p-8 mx-auto shadow-xl shadow-slate-200/40 backdrop-blur-sm">
                        <Form varient="primary" onSubmit={onSubmit} className="flex w-full text-black flex-col gap-5">
                            <h2 className="text-center text-xl font-bold mb-3">Signup</h2>
                            <TextField isRequired name="name" type="text">
                                <Label>Name</Label>
                                <Input
                                    className="bg-slate-100 border-slate-200 w-full text-slate-900"
                                    placeholder="Enter your name" />
                                <FieldError />
                            </TextField>

                            <TextField name="image" type="url">
                                <Label>Image URL</Label>
                                <Input className="bg-slate-100 border-slate-200 w-full  text-slate-900" placeholder="Image url" />
                                <FieldError />
                            </TextField>

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
                                <Input className="bg-slate-100 border-slate-200 w-full  text-slate-900" placeholder="john@example.com" />
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
                                <Input className="bg-slate-100 border-slate-200 w-full  text-slate-900" placeholder="Enter your password" />
                                <Description>
                                    Must be at least 8 characters with 1 uppercase and 1 number
                                </Description>
                                <FieldError />
                            </TextField>
                            <div className="flex justify-center gap-2">
                                <Button className="w-full rounded-full bg-cyan-600 px-6 py-3 text-white hover:bg-cyan-700" type="submit">
                                    Create Account
                                </Button>
                            </div>
                        </Form>
                        <div>
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
                                className="flex w-full items-center justify-center gap-3 rounded-full border-slate-300 px-6 py-3 text-slate-700 hover:bg-slate-100"
                            >
                                <FcGoogle className="text-xl" />
                                Sign up with Google
                            </Button>
                        </div>
                        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
                    </Card>
                </div>
            </div>
            <Footer />
        </section>
    );
};

export default SignUpPage;