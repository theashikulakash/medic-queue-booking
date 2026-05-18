'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import BookModal from '@/components/bookModal';
import { Button } from '@heroui/react';

const DoctorCard = ({ doctor }) => {
    const { id, name, specialty, image, experience, availability, description, hospital, location, fee } = doctor;
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section>
            <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
                <div className="relative">
                    <img
                        src={image}
                        alt={name}
                        className="h-56 w-full object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-3 text-white">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-200">{specialty}</p>
                        <h2 className="mt-1 text-lg font-semibold">{name}</h2>
                    </div>
                </div>

                <div className="space-y-4 p-5">
                    <div className="flex flex-wrap gap-2 text-xs text-slate-500">
                        <span className="rounded-full bg-slate-100 px-3 py-1">{hospital}</span>
                        <span className="rounded-full bg-slate-100 px-3 py-1">{location}</span>
                    </div>

                    <p className="text-sm leading-6 text-slate-600">{description}</p>

                    <div className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-2xl bg-slate-50 p-3 text-sm">
                            <p className="font-semibold text-slate-700">Experience</p>
                            <p className="mt-1 text-slate-600">{experience}</p>
                        </div>
                        <div className="rounded-2xl bg-slate-50 p-3 text-sm">
                            <p className="font-semibold text-slate-700">Fee</p>
                            <p className="mt-1 text-slate-600">৳ {fee}</p>
                        </div>
                    </div>

                    <div className="text-sm">
                        <p className="font-semibold text-slate-700">Availability</p>
                        <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600">
                            {availability?.map((slot, index) => (
                                <li key={index}>{slot}</li>
                            ))}
                        </ul>
                    </div>

                    <div className='flex flex-row gap-2 mx-auto justify-center'>
                        <Link href={`/doctors/${id}`} className='cursor-pointer w-1/2' >
                            <Button
                                variant="danger"
                                className="w-full rounded-2xl px-4 py-3 text-sm font-semibold transition"
                            >
                                Doctor's Details
                            </Button>
                        </Link>

                        <BookModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                defaultDoctorId={id}
            />
                    </div>
                </div>
            </article>
        </section>

    );
};

export default DoctorCard;

