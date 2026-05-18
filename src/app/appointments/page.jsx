import React from 'react';

import AppointmentCard from '@/components/appointmentcard';
import appointments from '@/data/appointment.json';
import Navbar from '@/components/navbar';

const Appointments = () => {
  return (
    <section>
        <Navbar />
        <main className="bg-slate-50 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#3b75c2]">
            Upcoming Visits
          </p>
          <h1 className="mt-4 text-3xl font-semibold text-slate-900 sm:text-4xl">
            Patient Appointments
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600">
            Here are the booked appointments from the local JSON file.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {appointments.map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))}
        </div>
      </div>
    </main>
    </section>
    
  );
};

export default Appointments;