"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import AppointmentCard from "@/components/appointmentcard";
import { Button } from "@heroui/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
export const dynamic = 'force-dynamic';

const DashboardPage = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [savedProfile, setSavedProfile] = useState(null);
  const [editedProfile, setEditedProfile] = useState({
    name: "",
    gender: "",
    phone: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const defaultProfile = useMemo(
    () => ({
      name: user?.name || "Guest",
      email: user?.email || "Not signed in",
      gender: user?.gender || "Not provided",
      phone: user?.phone || "Not provided",
    }),
    [user]
  );

  const profileDisplay = savedProfile || defaultProfile;

  const handleProfileChange = (field) => (event) => {
    setEditedProfile((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleSaveProfile = async (event) => {
    event.preventDefault();
    if (!user?.email) {
      toast.error("Unable to update profile without an email.");
      return;
    }

    setSaving(true);
    try {
      const { data: tokenData } = await authClient.token();
      const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
      const url = baseUrl
        ? `${baseUrl}/user/${encodeURIComponent(user.email)}`
        : `/user/${encodeURIComponent(user.email)}`;

      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(tokenData?.token ? { authorization: `Bearer ${tokenData.token}` } : {}),
        },
        body: JSON.stringify({
          name: editedProfile.name,
          gender: editedProfile.gender,
          phone: editedProfile.phone,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save profile");
      }

      setSavedProfile({
        name: editedProfile.name || "Guest",
        email: user.email,
        gender: editedProfile.gender || "Not provided",
        phone: editedProfile.phone || "Not provided",
      });
      setIsEditing(false);
      toast.success("Profile updated successfully.");
    } catch (error) {
      console.error("Profile update failed", error);
      toast.error("Could not save your profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    if (!user) {
      return;
    }

    const loadAppointments = async () => {
      setLoading(true);
      try {
        const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
        const url = baseUrl ? `${baseUrl}/bookings` : "/bookings";
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) {
          throw new Error(`Failed to load appointments: ${res.status}`);
        }

        const data = await res.json();
        const matched = Array.isArray(data)
          ? data.filter(
              (item) =>
                (item.userEmail || "").toLowerCase() === user.email?.toLowerCase()
            )
          : [];

        setAppointments(matched);
      } catch (error) {
        console.error("Dashboard appointment load error", error);
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    };

    loadAppointments();
  }, [user]);

  const profileData = useMemo(
    () => [
      { label: "Name", value: profileDisplay.name },
      { label: "Email", value: profileDisplay.email },
      { label: "Gender", value: profileDisplay.gender },
      { label: "Phone", value: profileDisplay.phone },
    ],
    [profileDisplay]
  );

  return (
    <section>
        <Navbar />
        <main className="min-h-[calc(100vh-160px)] bg-slate-50 px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-slate-900">Your Dashboard</h1>
              <p className="mt-2 text-slate-600">Profile details and appointments linked to your email.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/bookings">
                <Button variant="secondary" className="rounded-full px-6 py-3">
                  Browse Bookings
                </Button>
              </Link>
              <Link href="/appointment">
                <Button variant="secondary" className="rounded-full px-6 py-3">
                  Browse Doctors
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[420px_1fr]">
          <article className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-100 text-3xl font-semibold text-slate-700">
                  {profileDisplay.name?.charAt(0).toUpperCase() || "G"}
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Profile</p>
                  <h2 className="mt-2 text-2xl font-semibold text-slate-900">{profileDisplay.name || "Guest"}</h2>
                  <p className="mt-1 text-sm text-slate-600">{profileDisplay.email || "Not signed in"}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center justify-center rounded-full bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-700"
              >
                Edit profile
              </button>
            </div>

            {isEditing ? (
              <form onSubmit={handleSaveProfile} className="mt-8 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-2 text-sm text-slate-700">
                    Name
                    <input
                      value={editedProfile.name}
                      onChange={handleProfileChange("name")}
                      className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900"
                      placeholder="Enter your name"
                    />
                  </label>
                  <label className="grid gap-2 text-sm text-slate-700">
                    Gender
                    <input
                      value={editedProfile.gender}
                      onChange={handleProfileChange("gender")}
                      className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900"
                      placeholder="Enter your gender"
                    />
                  </label>
                  <label className="grid gap-2 text-sm text-slate-700 sm:col-span-2">
                    Phone
                    <input
                      value={editedProfile.phone}
                      onChange={handleProfileChange("phone")}
                      className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900"
                      placeholder="Enter your phone number"
                    />
                  </label>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center justify-center rounded-full bg-cyan-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                  >
                    {saving ? "Saving..." : "Save profile"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setEditedProfile({
                        name: profileDisplay.name === "Guest" ? "" : profileDisplay.name,
                        gender: profileDisplay.gender === "Not provided" ? "" : profileDisplay.gender,
                        phone: profileDisplay.phone === "Not provided" ? "" : profileDisplay.phone,
                      });
                    }}
                    className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="mt-8 space-y-4">
                {profileData.map((item) => (
                  <div key={item.label} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{item.label}</p>
                    <p className="mt-2 text-sm text-slate-700">{item.value}</p>
                  </div>
                ))}
              </div>
            )}
          </article>

          <article className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-slate-500">Appointments</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">Assigned to your email</h2>
              </div>
              <div className="rounded-3xl bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700">
                {appointments.length} appointment{appointments.length === 1 ? "" : "s"}
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {isPending ? (
                <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-500">
                  <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-slate-300 border-t-cyan-600" />
                  <p className="text-base font-semibold text-slate-700">Loading your session...</p>
                  <p className="mt-2 text-sm text-slate-500">Please wait while we verify your authentication.</p>
                </div>
              ) : loading ? (
                <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-500">
                  <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-slate-300 border-t-cyan-600" />
                  <p className="text-base font-semibold text-slate-700">Loading appointments...</p>
                  <p className="mt-2 text-sm text-slate-500">Please wait while we sync your data from the server.</p>
                </div>
              ) : user ? (
                appointments.length ? (
                  <div className="grid gap-6">
                    {appointments.map((appointment) => (
                      <AppointmentCard key={appointment._id || appointment.id || appointment.appointmentDate} appointment={appointment} />
                    ))}
                  </div>
                ) : (
                  <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500">
                    <p className="text-lg font-semibold text-slate-800">No appointments assigned to your email.</p>
                    <p className="mt-2">Once you book an appointment, it will appear here automatically.</p>
                  </div>
                )
              ) : (
                <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500">
                  <p className="text-lg font-semibold text-slate-800">You are not signed in.</p>
                  <p className="mt-2">Sign in to see appointments assigned to your email.</p>
                  <div className="mt-4 flex justify-center">
                    <Link href="/login?from=/dashboard">
                      <Button variant="primary" className="rounded-full px-6 py-3">
                        Sign In
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </article>
        </section>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </main>
    <Footer />
    </section>
    
  );
};

export default DashboardPage;
