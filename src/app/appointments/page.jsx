import React from 'react';

import Navbar from '@/components/navbar';
import { getAppointment } from '@/lib/appointment';
import AppointmentsClient from '@/components/appointmentsClient';
import Footer from '@/components/footer';

const Appointments = async () => {
  const appointments = await getAppointment();

  return (
    <section>
      <Navbar />
      <main className="bg-slate-50 min-h-[80vh] py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#3b75c2]">
              Upcoming Visits
            </p>
            <h1 className="mt-4 text-3xl font-semibold text-slate-900 sm:text-4xl">
              Patient Appointments
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600">
              Your booked appointments appear below when you are signed in.
            </p>
          </div>

          <AppointmentsClient appointments={appointments} />
        </div>
      </main>
      <Footer />
    </section>
  );
};

export default Appointments;