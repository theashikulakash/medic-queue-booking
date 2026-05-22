import React from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import DashboardClient from '@/components/dashboardClient';
import { getAppointment } from '@/lib/appointment';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "My Dashboard - Medic Queue",
  description: "Manage your profile, view appointments, and update your personal information.",
  robots: "noindex, nofollow",
};

const DashboardPage = async () => {
  const appointments = await getAppointment();

  return (
    <section>
      <Navbar />
      <main className="bg-slate-50 min-h-screen py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#3b75c2]">
              Welcome To
            </p>
            <h1 className="mt-4 text-4xl font-semibold text-slate-900">
              Dashboard Section
            </h1>
            <p className="mt-4 text-slate-600">
              Manage your profile information and view your scheduled appointments.
            </p>
          </div>
          <DashboardClient appointments={appointments} />
        </div>
      </main>
      <Footer />
    </section>
  );
};

export default DashboardPage;
