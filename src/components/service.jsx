import React from 'react';
import {Rocket} from "@gravity-ui/icons";
import {Button, Modal} from "@heroui/react";

const services = [
    {
        title: 'Telemedicine Consultations',
        description: 'Get fast online doctor consultations from certified specialists without leaving home.',
        icon: '💬',
        read: 'Our Telemedicine Consultation platform completely removes the geographical boundaries between you and world-class healthcare providers. Through high-definition video calls and integrated real-time text chat, patients can consult with certified medical experts from the comfort and safety of their homes. This feature eliminates long travel times and crowded waiting rooms, making it ideal for follow-up visits, routine check-ups, and urgent non-emergency guidance. During the virtual session, you can share high-resolution images, describe symptoms, and discuss your concerns in a private, fully encrypted digital environment. Doctors can review your live history, make accurate remote diagnoses, and issue certified digital prescriptions immediately. Furthermore, the platform automatically links your consultation notes with your central profile, allowing you or any future treating physicians to review the case history seamlessly, ensuring ongoing continuity of care.'
    },
    {
        title: 'Specialist Appointments',
        description: 'Book expert doctors across all major specialties with transparent fees.',
        icon: '🩺',
        read: 'Finding and booking the right medical specialist can often feel overwhelming, but our Specialist Appointments system simplifies the entire process. We provide a curated, comprehensively verified directory of leading doctors spanning major medical fields including cardiology, neurology, pediatrics, and orthopedics. Users can comfortably browse through highly detailed physician profiles that highlight authentic board certifications, clinical specializations, career experience, and physical hospital affiliations. Our commitment to absolute transparency means you can view exact consultation fees, clinical schedules, and patient feedback ratings upfront before making any financial commitments. The interactive calendar system displays real-time slot availability, allowing you to secure a firm appointment with just a single click. Once booked, the system locks your slot in the clinic queue, minimizing long operational delays at the hospital and ensuring a smoother, highly predictable in-person check-in experience.'
    },
    {
        title: 'Medical Records',
        description: 'Store and share your medical history securely with doctors and clinics.',
        icon: '📁',
        read: 'Managing a scattered collection of paper prescriptions, diagnostic lab files, and historical imaging scans is now a thing of the past. Our centralized Digital Medical Records system offers a highly secure, unified vault designed to aggregate your entire health history into a single account. Patients can easily upload high-quality PDFs or images of previous doctor summaries, chronic condition track logs, and ongoing vaccination profiles. Built using advanced multi-layer encryption and strict privacy protocols, you retain absolute authority over who views your confidential clinical data. When visiting a new clinic or launching an online consultation, you can instantly grant temporary or permanent reading access to your practitioner with a few taps. This real-time sharing completely eliminates diagnostic guesswork, prevents dangerous drug-to-drug interactions, and stops redundant testing. It ensures your clinical care team has access to the comprehensive medical context they need to make precise decisions.'
    },
    {
        title: '24/7 Emergency Support',
        description: 'Access emergency guidance and triage support any time of day or night.',
        icon: '🚑',
        read: 'Medical crises never follow a schedule, which is why our 24/7 Emergency Support division stands ready to assist you every single second of the day. This critical system provides an immediate communication bridge to a dedicated team of on-duty trauma nurses and emergency response practitioners. When faced with a sudden health scare, unexpected severe pain, or an accidental physical injury, users can instantly trigger an emergency dispatch call. Our medical team uses advanced dynamic triage protocols to assess the severity of the patient’s condition over the phone or via quick video. They offer step-by-step first-aid coaching, critical stabilization guidance, and medication advice while determining if hospital transport is required. If the situation demands immediate physical intervention, our integrated tracking system maps out the closest available intensive care units and trauma centers. It pre-alerts their incoming emergency rooms with your health history, saving precious minutes before your physical arrival.'
    },
    {
        title: 'Lab Test Booking',
        description: 'Schedule lab tests and get reports delivered directly to your account.',
        icon: '🔬',
        read: 'Our streamlined Lab Test Booking engine bridges the gap between routine clinical check-ups and complex diagnostic testing services. Patients can easily explore an extensive catalog of diagnostic screenings, ranging from standard complete blood counts and metabolic panels to advanced genetic testing. The platform partners with verified, fully accredited diagnostic laboratories and pathology centers to ensure maximum accuracy and reliability. You have the flexibility to schedule sample collection at a partner facility near you, or opt for a convenient home sample collection service where a professional phlebotomist visits your residence. Once your physical samples are safely processed by the laboratory, certified digital pathology reports are uploaded directly into your secure personal dashboard. The platform automatically triggers a notification, analyzes the raw data against standard baseline ranges, and flags any abnormal deviations, allowing you to instantly share the final report with your doctor.'
    },
    {
        title: 'Care Reminders',
        description: 'Stay on track with appointment and medication reminders for your health plan.',
        icon: '⏰',
        read: 'Successfully managing a complex medical treatment plan or recovering from a chronic illness requires strict consistency, which our Care Reminders module handles effortlessly. This intelligent utility acts as your automated personal health manager, ensuring you never miss a critical step on your road to complete recovery. The system allows users or treating physicians to set up highly detailed, custom-tailored schedules for complex daily pill intakes, physical therapy sessions, and booster dosages. It delivers timely push notifications, SMS alerts, or automated email pings that outline exact pill names, measurement metrics, and crucial food constraints. Beyond managing your active drug prescriptions, the tool monitors your upcoming specialist check-ups and follow-up clinical tests, sending out advanced alerts to prevent accidental double-bookings. By keeping your entire family health plan highly organized, it drastically lowers the risk of missed therapeutic doses and improves long-term recovery results.'
    }
];

const Service = () => {
    return (
        <section className="bg-slate-50 py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#3b75c2]">Our Services</p>
                    <h2 className="mt-4 text-3xl font-semibold text-slate-900 sm:text-4xl">
                        Healthcare services designed around your comfort.
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600">
                        Medic Queue connects you with trusted doctors, fast appointments, and easy follow-up care—all in one place.
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {services.map((service) => (
                        <article
                            key={service.title}
                            className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                        >
                            <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-[#e5edff] text-2xl shadow-sm text-[#3b75c2]">
                                {service.icon}
                            </div>
                            <h3 className="mt-6 text-xl font-semibold text-slate-900">{service.title}</h3>
                            <p className="mt-4 text-sm leading-7 text-slate-600">{service.description}</p>
                            <Modal key="blur">
                                <Button variant="secondary" className="mt-2">Read More</Button>
                                <Modal.Backdrop variant="blur">
                                    <Modal.Container>
                                        <Modal.Dialog className="sm:max-w-8/12">
                                            <Modal.CloseTrigger />
                                            <Modal.Header>
                                                <Modal.Icon className="bg-default text-foreground">
                                                    <Rocket className="size-5" />
                                                </Modal.Icon>
                                                <Modal.Heading>
                                                    {service.title}
                                                </Modal.Heading>
                                            </Modal.Header>
                                            <Modal.Body >
                                                <p className='text-justify'>
                                                    {service.read}
                                                </p>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button className="w-full" slot="close">
                                                    Close
                                                </Button>
                                            </Modal.Footer>
                                        </Modal.Dialog>
                                    </Modal.Container>
                                </Modal.Backdrop>
                            </Modal>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Service;
