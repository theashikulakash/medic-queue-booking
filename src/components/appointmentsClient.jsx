"use client";

import React from "react";
import AppointmentCard from "@/components/appointmentcard";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

const AppointmentsClient = ({ appointments = [] }) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  if (!user) {
    return (
      <div className="py-12 text-center">
        <p className="mb-4 text-lg text-slate-700">Please sign in to view your appointments.</p>
        <div className="flex justify-center gap-4">
          <Link href="/login?from=/appointments" className="rounded-full bg-cyan-600 px-5 py-2 text-white">Sign in</Link>
        </div>
      </div>
    );
  }

  const userEmail = user.email?.toLowerCase();
  const matched = (appointments || []).filter((a) => (a.userEmail || "").toLowerCase() === userEmail);

  if (!matched.length) {
    return (
      <div className="py-12 text-center text-slate-600">You have no appointments.</div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {matched.map((appointment) => (
        <AppointmentCard
          key={appointment._id}
          appointment={appointment}
        />
      ))}
    </div>
  );
};

export default AppointmentsClient;
