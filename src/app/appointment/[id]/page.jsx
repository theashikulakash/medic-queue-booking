import DoctorDetailsClient from '@/components/doctorDetailsClient';
import { headers } from "next/headers";

const DoctorDetails = async ({ params }) => {
    const { id } = await params;

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/appointment/${id}`)
    const doctor = await res.json();

    console.log(doctor)

    if (!doctor) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-xl text-red-600">Doctor not found</p>
            </div>
        );
    }

    return <DoctorDetailsClient doctor={doctor} />;
};

export default DoctorDetails;