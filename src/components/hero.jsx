import { Button } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Hero = () => {
    return (
        <div className='flex w-10/12 mx-auto p-8 items-center justify-between flex-col md:flex-row '>
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
                <h1 className='font-bold text-[#3b75c2] text-2xl'>Medic Queue</h1>
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

                </div>
            </div>
            <div className='grid grid-cols-2 gap-3'>
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
                <div className=''>
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
    );
};

export default Hero;