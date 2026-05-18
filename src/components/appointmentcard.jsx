'use client';

import { Button } from '@heroui/react';
import Link from 'next/link';
import React from 'react';
import doctorsData from '@/data/doctors.json';

const AppointmentCard = ({ appointment }) => {
  const {
    userEmail,
    doctorName,
    doctorId,
    patientName,
    gender,
    phone,
    appointmentDate,
    appointmentTime,
  } = appointment;

  const matchedDoctor =
    doctorsData.find((doc) => doc.id === doctorId);

  const doctorLink = matchedDoctor ? `/doctors/${matchedDoctor.id}` : '#';

  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div className="bg-[#3b75c2] px-6 py-4 text-white">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-semibold">{patientName}</h2>
          <span className="rounded-full bg-white/15 px-3 py-1 text-xs uppercase tracking-[0.18em] text-white">
            {gender}
          </span>
          
        </div>
        <p className="mt-1 text-sm text-slate-200">{doctorName}</p>
      </div>

      <div className="space-y-4 p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Email</p>
            <p className="mt-2 text-sm text-slate-700">{userEmail}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Phone</p>
            <p className="mt-2 text-sm text-slate-700">{phone}</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Date</p>
            <p className="mt-2 text-sm text-slate-700">{appointmentDate}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Time</p>
            <p className="mt-2 text-sm text-slate-700">{appointmentTime}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
          <p className="font-semibold text-slate-800">Appointment details</p>
          <p className="mt-2 text-slate-600">This appointment is scheduled with {doctorName} for {patientName}.</p>
        </div>
        <div className='mx-auto justify-center flex'>
          <Link href={doctorLink}>
            <Button disabled={!matchedDoctor}>
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default AppointmentCard;