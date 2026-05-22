"use client";

import React, { useState, useMemo } from "react";
import AppointmentCard from "@/components/appointmentcard";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { IoSearch } from "react-icons/io5";

const BookingsClient = ({ appointments = [] }) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date-asc");

  if (!user) {
    return (
      <div className="py-12 text-center">
        <p className="mb-4 text-lg text-slate-700">Please sign in to view your appointments.</p>
        <div className="flex justify-center gap-4">
          <Link href="/login?from=/bookings" className="rounded-full bg-cyan-600 px-5 py-2 text-white">Sign in</Link>
        </div>
      </div>
    );
  }

  const userEmail = user.email?.toLowerCase();
  const userAppointments = (appointments || []).filter((a) => (a.userEmail || "").toLowerCase() === userEmail);

  const filteredAndSortedAppointments = useMemo(() => {
    let filtered = userAppointments.filter((appointment) =>
      appointment.doctorName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    switch (sortBy) {
      case "date-asc":
        return filtered.sort((a, b) => {
          const dateA = new Date(`${a.appointmentDate} ${a.appointmentTime}`);
          const dateB = new Date(`${b.appointmentDate} ${b.appointmentTime}`);
          return dateA - dateB;
        });
      case "date-desc":
        return filtered.sort((a, b) => {
          const dateA = new Date(`${a.appointmentDate} ${a.appointmentTime}`);
          const dateB = new Date(`${b.appointmentDate} ${b.appointmentTime}`);
          return dateB - dateA;
        });
      default:
        return filtered;
    }
  }, [userAppointments, searchTerm, sortBy]);

  if (!userAppointments.length) {
    return (
      <div className="py-12 text-center text-slate-600">You have no appointments.</div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="relative">
          <div className="relative flex items-center">
            <IoSearch className="absolute left-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search appointments by doctor name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-100 py-2 pl-10 pr-4 text-slate-900 placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full rounded-lg border border-slate-200 bg-slate-100 px-4 py-2 text-slate-900"
        >
          <option value="date-asc">Date & Time (Earliest First)</option>
          <option value="date-desc">Date & Time (Latest First)</option>
        </select>
      </div>

      <div className="text-sm text-slate-600">
        Showing {filteredAndSortedAppointments.length} of {userAppointments.length} appointment{userAppointments.length === 1 ? "" : "s"}
      </div>

      {filteredAndSortedAppointments.length === 0 ? (
        <div className="py-12 text-center text-slate-600">
          {searchTerm ? "No appointments found matching your search." : "No appointments scheduled."}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredAndSortedAppointments.map((appointment) => (
            <AppointmentCard
              key={appointment._id}
              appointment={appointment}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingsClient;
