"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import AppointmentsClient from "@/components/appointmentsClient";
import { Button, Form, Input, Label, TextField } from "@heroui/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DashboardClient = ({ appointments = [] }) => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    gender: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const encodedEmail = user?.email ? encodeURIComponent(user.email) : "";
  const apiUrl = baseUrl ? `${baseUrl}/user/${encodedEmail}` : `/user/${encodedEmail}`;

  useEffect(() => {
    if (!user?.email) {
      return;
    }

    const fetchProfile = async () => {
      setLoading(true);
      try {
        const { data: tokenData } = await authClient.token();
        const res = await fetch(apiUrl, {
          cache: "no-store",
          headers: {
            ...(tokenData?.token ? { Authorization: `Bearer ${tokenData.token}` } : {}),
          },
        });

        if (!res.ok) {
          throw new Error(`Failed to load profile: ${res.status}`);
        }

        const data = await res.json();
        setProfile({
          name: data.name || user.name || "",
          email: data.email || user.email || "",
          gender: data.gender || "",
          phone: data.phone || "",
        });
      } catch (err) {
        console.error(err);
        toast.error("Unable to load profile information.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user?.email, apiUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const { data: tokenData } = await authClient.token();
      const res = await fetch(apiUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(tokenData?.token ? { Authorization: `Bearer ${tokenData.token}` } : {}),
        },
        body: JSON.stringify({
          email: profile.email,
          name: profile.name,
          gender: profile.gender,
          phone: profile.phone,
        }),
      });

      if (!res.ok) {
        throw new Error(`Failed to update profile: ${res.status}`);
      }

      await res.json();
      toast.success("Profile updated successfully.");
    } catch (err) {
      console.error(err);
      toast.error("Unable to update profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (isPending) {
    return (
      <div className="py-24 text-center text-slate-600">Loading your dashboard session...</div>
    );
  }

  if (!user) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <p className="text-lg font-semibold text-slate-900">Please sign in to view your dashboard.</p>
        <p className="mt-3 text-slate-600">You need an account to access your profile and bookings.</p>
        <div className="mt-6 flex justify-center">
          <Link href="/login?from=/dashboard" className="rounded-full bg-cyan-600 px-6 py-3 text-white hover:bg-cyan-700">
            Sign in
          </Link>
        </div>
      </div>
    );
  }

  const userEmail = user.email?.toLowerCase();
  const userBookings = (appointments || []).filter(
    (appointment) => (appointment.userEmail || "").toLowerCase() === userEmail
  );

  return (
    <div className="space-y-10">
      <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#3b75c2]">User profile</p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-900">Welcome, {user.name || "User"}</h2>
              <p className="mt-2 text-slate-600">Your account details are loaded from the backend profile API.</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4 text-slate-700">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Bookings</p>
              <p className="mt-3 text-3xl font-semibold text-slate-900">{userBookings.length}</p>
            </div>
          </div>

          <Form onSubmit={handleSubmit} className="grid gap-5">
            <div className="grid gap-5 md:grid-cols-2">
              <TextField name="name" className="w-full">
                <Label>Name</Label>
                <Input
                  value={profile.name}
                  onChange={(event) => setProfile((prev) => ({ ...prev, name: event.target.value }))}
                  placeholder="Full name"
                  className="bg-slate-100 text-slate-900"
                />
              </TextField>

              <TextField name="email" className="w-full">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={profile.email}
                  onChange={(event) => setProfile((prev) => ({ ...prev, email: event.target.value }))}
                  placeholder="Email address"
                  className="bg-slate-100 text-slate-900"
                />
              </TextField>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <TextField name="phone" className="w-full">
                <Label>Phone</Label>
                <Input
                  type="tel"
                  value={profile.phone}
                  onChange={(event) => setProfile((prev) => ({ ...prev, phone: event.target.value }))}
                  placeholder="Phone number"
                  className="bg-slate-100 text-slate-900"
                />
              </TextField>

              <TextField name="gender" className="w-full">
                <Label>Gender</Label>
                <Input
                  value={profile.gender}
                  onChange={(event) => setProfile((prev) => ({ ...prev, gender: event.target.value }))}
                  placeholder="Gender"
                  className="bg-slate-100 text-slate-900"
                />
              </TextField>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-slate-900">Active profile</p>
                <p className="text-sm text-slate-500">Update the values above and save to persist the latest user record.</p>
              </div>
              <Button type="submit" className="rounded-full bg-cyan-600 px-7 py-3 text-white hover:bg-cyan-700" disabled={saving || loading}>
                {saving ? "Saving..." : "Update profile"}
              </Button>
            </div>
          </Form>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#3b75c2]">Account summary</p>
            <h3 className="mt-3 text-2xl font-semibold text-slate-900">Your login details</h3>
            <div className="mt-6 space-y-4 text-slate-700">
              <div className="rounded-3xl bg-white p-5 shadow-sm">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Signed in email</p>
                <p className="mt-2 text-base font-medium text-slate-900">{user.email}</p>
              </div>
              <div className="rounded-3xl bg-white p-5 shadow-sm">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Account name</p>
                <p className="mt-2 text-base font-medium text-slate-900">{user.name}</p>
              </div>
              <div className="rounded-3xl bg-white p-5 shadow-sm">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Loaded from backend</p>
                <p className="mt-2 text-base font-medium text-slate-900">{loading ? "Refreshing..." : "Available"}</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#3b75c2]">Your bookings</p>
            <h3 className="mt-3 text-2xl font-semibold text-slate-900">Available appointments</h3>
          </div>
          <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
            {userBookings.length} booking{userBookings.length === 1 ? "" : "s"}
          </div>
        </div>

        <AppointmentsClient appointments={appointments} />
      </section>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
};

export default DashboardClient;
