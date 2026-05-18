'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import doctorsData from '@/data/doctors.json';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Link from 'next/link';

const DoctorDetails = () => {
    const params = useParams();
    const doctorId = params.id;
    
    const doctor = doctorsData.find(doc => doc.id === doctorId);

    if (!doctor) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-xl text-red-600">Doctor not found</p>
            </div>
        );
    }

    return (
        <section>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-b  max-w-7xl  from-blue-50 to-white py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Doctor Card */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 md:p-8">
                        {/* Doctor Image */}
                        <div className="md:col-span-1 flex justify-center">
                            <div className="relative w-48 h-48 md:w-56 md:h-56">
                                <Image
                                    src={doctor.image}
                                    alt={doctor.name}
                                    fill
                                    className="rounded-lg object-cover shadow-md"
                                    priority
                                />
                            </div>
                        </div>

                        {/* Doctor Info */}
                        <div className="md:col-span-2 flex flex-col justify-between">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                                    {doctor.name}
                                </h1>
                                <p className="text-lg md:text-xl text-blue-600 font-semibold mb-4">
                                    {doctor.specialty}
                                </p>
                                
                                {/* Quick Info */}
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div className="bg-blue-50 p-3 rounded-lg">
                                        <p className="text-sm text-gray-600">Experience</p>
                                        <p className="text-lg font-semibold text-gray-800">{doctor.experience}</p>
                                    </div>
                                    <div className="bg-green-50 p-3 rounded-lg">
                                        <p className="text-sm text-gray-600">Consultation Fee</p>
                                        <p className="text-lg font-semibold text-gray-800">৳{doctor.fee}</p>
                                    </div>
                                </div>

                                {/* Hospital Info */}
                                <div className="border-l-4 border-blue-500 pl-4 mb-4">
                                    <p className="text-sm text-gray-600 mb-1">Hospital</p>
                                    <p className="font-semibold text-gray-800">{doctor.hospital}</p>
                                    <p className="text-sm text-gray-600 mt-1">📍 {doctor.location}</p>
                                </div>
                            </div>

                            {/* CTA Button */}
                            <Link href="/appointments" >
                            <button className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 mt-4">
                                Book Appointment
                            </button>
                            </Link>
                            
                        </div>
                    </div>
                </div>

                {/* About Section */}
                <div className="mt-8 bg-white rounded-lg shadow-lg p-6 md:p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">About</h2>
                    <p className="text-gray-700 leading-relaxed mb-6">{doctor.description}</p>
                </div>

                {/* Availability Section */}
                <div className="mt-8 bg-white rounded-lg shadow-lg p-6 md:p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Availability</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {doctor.availability.map((slot, index) => (
                            <div 
                                key={index}
                                className="flex items-center gap-3 bg-green-50 p-4 rounded-lg border border-green-200"
                            >
                                <span className="text-2xl">🕐</span>
                                <span className="text-gray-800 font-semibold">{slot}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        <Footer />
        </section>
        
    );
};

export default DoctorDetails;