import React from 'react';

import AppointmentPageClient from '@/components/appointmentPageClient';
import Navbar from '@/components/navbar';
import { getDoctors } from '@/lib/doctors';
import Footer from '@/components/footer';
export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Browse Doctors - Medic Queue",
  description: "Discover and book appointments with certified doctors and specialists. Search by name, specialty, experience, and fees.",
  keywords: ["find doctor", "book appointment", "specialist", "medical consultation"],
  robots: "index, follow",
};

const DoctorsPage = async () => {
  const doctorsList = await getDoctors();


  return (
    <section>
         <Navbar />
    <main className="bg-slate-50 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#3b75c2]">
            Our Specialists
          </p>
          <h1 className="mt-4 text-3xl font-semibold text-slate-900 sm:text-4xl">
            Meet qualified doctors near you
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600">
            Browse available doctors by specialty, experience, and location. All data is loaded from the backend doctors API.
          </p>
        </div>

        <AppointmentPageClient doctorsList={doctorsList} />
      </div>
    </main>
    <Footer />
    </section>
   
  );
};

export default DoctorsPage;