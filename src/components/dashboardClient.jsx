'use client';

import React, { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { toast } from 'react-toastify';
import AppointmentCard from '@/components/appointmentcard';
import Link from 'next/link';

const DashboardClient = ({ appointments = [] }) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form state for updating user info
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    gender: user?.gender || '',
  });

  if (!user) {
    return (
      <div className="py-12 text-center">
        <p className="mb-4 text-lg text-slate-700">
          Please sign in to view your profile and bookings.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/login?from=/dashboard"
            className="rounded-full bg-[#3b75c2] px-5 py-2 text-white hover:bg-blue-700 transition"
          >
            Sign in
          </Link>
        </div>
      </div>
    );
  }

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle user info update
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data: tokenData } = await authClient.token();
      const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
      
      if (!baseUrl) {
        throw new Error('Server URL not configured');
      }

      const url = `${baseUrl}/user/${user.email}`;

      const res = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(tokenData?.token ? { authorization: `Bearer ${tokenData.token}` } : {}),
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          gender: formData.gender,
        }),
      });

      if (!res.ok) {
        throw new Error(`Update failed: ${res.status}`);
      }

      const data = await res.json();
      toast.success('Profile updated successfully!');
      setIsModalOpen(false);
      // Refresh the page to show updated user data
      setTimeout(() => window.location.reload(), 1000);
    } catch (err) {
      console.error('Update error:', err);
      toast.error(err.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  // Filter appointments for current user
  const userEmail = user.email?.toLowerCase();
  const userAppointments = (appointments || []).filter(
    (a) => (a.userEmail || '').toLowerCase() === userEmail
  );

  return (
    <div className="space-y-10">
      {/* User Profile Section */}
      <section className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        {/* Profile Header */}
        <div className="bg-[#3b75c2] px-6 py-8 text-white">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            {/* User Avatar and Basic Info */}
            <div className="flex items-center gap-6">
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-white"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center border-4 border-white">
                  <span className="text-2xl text-white font-bold">
                    {user.name?.[0]?.toUpperCase() || 'U'}
                  </span>
                </div>
              )}
              <div>
                <h2 className="text-2xl font-semibold">{user.name || 'User'}</h2>
                <p className="text-sm text-slate-200 mt-1">Account Holder</p>
              </div>
            </div>

            {/* Update Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-white text-[#3b75c2] px-6 py-2 rounded-full font-semibold hover:bg-slate-100 transition"
            >
              Update Profile
            </button>
          </div>
        </div>

        {/* Profile Details Grid */}
        <div className="p-6 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {/* Email */}
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500 font-semibold">
                Email
              </p>
              <p className="mt-2 text-sm text-slate-700 break-all">{user.email || 'N/A'}</p>
            </div>

            {/* Phone */}
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500 font-semibold">
                Phone
              </p>
              <p className="mt-2 text-sm text-slate-700">{user.phone || 'Not provided'}</p>
            </div>

            {/* Gender */}
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500 font-semibold">
                Gender
              </p>
              <p className="mt-2 text-sm text-slate-700">{user.gender || 'Not provided'}</p>
            </div>

            {/* Status */}
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500 font-semibold">
                Status
              </p>
              <p className="mt-2 text-sm text-green-600 font-semibold">Active</p>
            </div>
          </div>
        </div>
      </section>

      {/* Update Profile Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-lg p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-slate-900">Update Profile</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleUpdateUser} className="space-y-4 text-black">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b75c2]"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b75c2]"
                  placeholder="Enter your email"
                />
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b75c2]"
                  placeholder="Enter your phone number"
                />
              </div>

              {/* Gender Field */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b75c2]"
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-slate-300 rounded-lg text-slate-700 font-semibold hover:bg-slate-50 transition"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-[#3b75c2] text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                  disabled={isLoading}
                >
                  {isLoading ? 'Updating...' : 'Update'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bookings Section */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-4">
          <h3 className="text-2xl font-semibold text-slate-900">Your Appointments</h3>
          <p className="text-slate-600 mt-2">Manage your scheduled medical appointments</p>
        </div>

        {userAppointments.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-12 text-center">
            <p className="text-slate-600 mb-4">You have no appointments scheduled.</p>
            <Link
              href="/doctors"
              className="inline-block bg-[#3b75c2] text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition"
            >
              Book an Appointment
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {userAppointments.map((appointment) => (
              <AppointmentCard
                key={appointment._id || appointment.id}
                appointment={appointment}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default DashboardClient;
