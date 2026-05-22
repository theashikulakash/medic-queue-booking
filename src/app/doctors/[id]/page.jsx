import DoctorDetailsClient from '@/components/doctorDetailsClient';
import { headers } from "next/headers";
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { id } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  
  try {
    const res = await fetch(`${baseUrl}/appointment/${id}`);
    const doctor = await res.json();
    
    if (doctor) {
      return {
        title: `${doctor.name} - ${doctor.specialty} | Medic Queue`,
        description: `Book an appointment with Dr. ${doctor.name}, ${doctor.specialty} at ${doctor.hospital}. Experience: ${doctor.experience}. Fee: ৳${doctor.fee}`,
        keywords: [doctor.specialty, doctor.name, "doctor", "appointment", "consultation"],
        robots: "index, follow",
        openGraph: {
          title: `Dr. ${doctor.name}`,
          description: `${doctor.specialty} | ${doctor.hospital}`,
          type: "profile",
        },
      };
    }
  } catch (err) {
    console.error('Failed to generate metadata:', err);
  }
  
  return {
    title: "Doctor Profile - Medic Queue",
    description: "View doctor details and book an appointment.",
  };
}

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