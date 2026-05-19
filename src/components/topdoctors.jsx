import React from 'react';
import DoctorCard from './doctorCard';
import { getDoctors } from '@/lib/doctors';

const TopDoctors = async () => {
  const doctorsList = await getDoctors();

    const selectedDoctors = [...doctorsList].sort(() => Math.random() - 0.5).slice(0, 3);

    return (
        <section className="space-y-6 px-4 py-8 md:px-6">
            <div className="text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Featured Practitioners</p>
                <h2 className="mt-3 text-3xl font-semibold text-slate-900">Top Doctors</h2>
                <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                    Discover three recommended doctors from our trusted specialists.
                </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3 w-10/12 mx-auto">
                {selectedDoctors.map((doctor) => (
                    <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
            </div>
        </section>
    );
};

export default TopDoctors;