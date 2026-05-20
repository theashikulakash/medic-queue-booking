import { Button } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Hero = () => {
    return (

        <section className=' w-10/12 mx-auto p-8'>
            <div className='flex mx-auto items-center justify-between flex-col md:flex-row '>
                {/* <div className='absolute inset-0 -z-10 w-full h-full'>
                <Image
                    src="/hero-bg.jpg"
                    fill
                    alt="Doctor's Photo"
                    priority
                    className="object-cover"
                />
            </div> */}
                <div className='flex flex-col p-5'>

                    <div className="inline-flex w-fit mb-2 rounded-full bg-[#e7f0ff] px-4 py-2 text-sm font-semibold text-[#3b75c2]">
                        Compassionate care made effortless
                    </div>
                    <div className="max-w-2xl space-y-5">
                        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                            Book appointments with trusted doctors in a few simple steps.
                        </h1>
                        <p className="text-lg leading-8 text-slate-600">
                            Medic Queue connects you with certified specialists, quick scheduling, and seamless follow-up care in a calm and modern experience.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4 mt-6">
                        <Link href="/doctors">
                            <Button variant="primary" className="rounded-full px-6 py-3">
                                Browse Doctors
                            </Button>
                        </Link>
                        <Link href="/appointments">
                            <Button variant="danger-soft" className="rounded-full px-6 py-3">
                                Appointments
                            </Button>
                        </Link>
                    </div>








                    {/* <h1 className='font-bold text-[#3b75c2] text-2xl'>Medic Queue</h1>
                <p className='mt-2 text-[#cb6ce6]'>Browse certified specialists and book medical consultations instantly.</p>
                <div className='mt-6 flex flex-wrap flex-row gap-3'>
                    <Link href="/" >
                        <Button variant='primary'>
                            Book Appointment
                        </Button>
                    </Link>
                    <Link href="/" >
                        <Button variant='danger-soft'>
                            Browse Doctors
                        </Button>
                    </Link>

                </div> */}
                </div>


                {/* image grid */}
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
                    <div className=''>
                        <Image
                            src="/con-1.png"
                            height={300}
                            width={300}
                            alt="Doctor's Photo"
                            priority
                            className="object-cover rounded-xl"
                        />
                    </div>
                    <div className=''>
                        <Image
                            src="/con-2.png"
                            height={300}
                            width={300}
                            alt="Doctor's Photo"
                            priority
                            className="object-cover rounded-xl"
                        />
                    </div>
                    <div className=''>
                        <Image
                            src="/con-3.png"
                            height={300}
                            width={300}
                            alt="Doctor's Photo"
                            priority
                            className="object-cover rounded-xl"
                        />
                    </div>
                    <div className='flex md:hidden lg:block'>
                        <Image
                            src="/con-4.png"
                            height={300}
                            width={300}
                            alt="Doctor's Photo"
                            priority
                            className="object-cover rounded-xl"
                        />
                    </div>

                </div>
            </div>


            <div className="grid gap-4 mt-4 grid-cols-1 md:grid-cols-3">
                <div className="rounded-3xl bg-[#eef4ff] p-4 text-sm text-slate-700">
                    <p className="font-semibold text-slate-900">Verified specialists</p>
                    <p className="mt-2">Every doctor is vetted for your peace of mind.</p>
                </div>
                <div className="rounded-3xl bg-[#eef4ff] p-4 text-sm text-slate-700">
                    <p className="font-semibold text-slate-900">Fast booking</p>
                    <p className="mt-2">Reserve consultations quickly and easily.</p>
                </div>
                <div className="rounded-3xl bg-[#eef4ff] p-4 text-sm text-slate-700">
                    <p className="font-semibold text-slate-900">Care reminders</p>
                    <p className="mt-2">Stay on schedule with gentle follow-up support.</p>
                </div>
            </div>
        </section>

    );
};

export default Hero;