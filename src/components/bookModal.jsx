"use client";

import { PlusShapeFill } from "@gravity-ui/icons";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

const BookModal = ({ defaultDoctorId, defaultDoctorName }) => {

    const router = useRouter();
    const { data: session } = authClient.useSession();
    const user = session?.user;
    const defaultName = user?.name ?? '';
    const defaultEmail = user?.email ?? '';

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const appointment = Object.fromEntries(formData.entries());

        const bookingData = {
            userId: user?.id,
            userImage: user?.image,
            userName: user?.name,
            doctorId: appointment.doctorId || defaultDoctorId,
            doctorName: appointment.doctorName || defaultDoctorName,
            patientName: appointment.patientName,
            userEmail: appointment.userEmail || defaultEmail,
            phone: appointment.phone,
            gender: appointment.gender,
            appointmentDate: appointment.appointmentDate,
            appointmentTime: appointment.appointmentTime,
            createdAt: new Date().toISOString(),
        };

        try {
            const { data: tokenData } = await authClient.token();
            const url = process.env.NEXT_PUBLIC_SERVER_URL
                ? `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings`
                : '/bookings';

            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(tokenData?.token ? { authorization: `Bearer ${tokenData.token}` } : {}),
                },
                body: JSON.stringify(bookingData),
            });

            if (!res.ok) {
                throw new Error(`Booking failed: ${res.status}`);
            }

            const data = await res.json();
            console.log('Appointment saved', data);
            toast.success('You booked successfully!');
            router.push('/bookings');
        } catch (error) {
            console.error('Booking failed', error);
            toast.error('Booking failed. Please try again.');
        }
    };



    return (
        <Modal>
            <Button variant="danger-soft">Book Appointment</Button>
            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-md">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                                <PlusShapeFill className="size-5" />
                            </Modal.Icon>
                            <Modal.Heading>Fill this form to book appointment</Modal.Heading>
                            <p className="mt-1.5 text-sm leading-5 text-muted">
                                Fill out the form below and we&apos;ll get back to you. The modal adapts automatically
                                when the keyboard appears on mobile.
                            </p>
                        </Modal.Header>
                        <Modal.Body className="p-6">
                            <Surface variant="default">
                                <form onSubmit={onSubmit} className="flex flex-col gap-4">
                                    <input type="hidden" name="doctorName" value={defaultDoctorName} />
                                    <TextField className="w-full" name="patientName" type="text">
                                        <Label>Patients Name</Label>
                                        <input defaultValue={defaultName} name="patientName" type="text" className="input bg-neutral-content" placeholder="Enter your name" />
                                    </TextField>
                                    <TextField className="w-full" name="doctorId" type="text">
                                        <Label>Doctor</Label>
                                        <select defaultValue={defaultDoctorId} name="doctorId" className="select bg-neutral-content shadow-sm">
                                            <option value={defaultDoctorId}>{defaultDoctorName}</option>
                                        </select>
                                    </TextField>
                                    <TextField className="w-full" name="userEmail" type="email">
                                        <Label>Email</Label>
                                        <Input defaultValue={defaultEmail} name="userEmail" placeholder="Enter your email" className="input bg-neutral-content" />
                                    </TextField>
                                    <TextField className="w-full" name="phone" type="tel">
                                        <Label>Phone</Label>
                                        <Input name="phone" placeholder="Enter your phone number" className="input bg-neutral-content" />
                                    </TextField>
                                    <TextField className="w-full" name="gender" type="text">
                                        <Label>Gender</Label>
                                        <select defaultValue="" name="gender" className="select bg-neutral-content shadow-sm">
                                            <option value="" disabled className="items-center text-center">Choose Gender</option>
                                            <option>Male</option>
                                            <option>Female</option>
                                        </select>
                                    </TextField>
                                    <TextField className="w-full" name="appointmentDate">
                                        <Label>Appointment Date</Label>
                                        <input name="appointmentDate" type="date" className="input bg-neutral-content" />
                                    </TextField>
                                    <TextField className="w-full" name="appointmentTime">
                                        <Label>Appointment Time</Label>
                                        <input name="appointmentTime" type="time" className="input bg-neutral-content" />
                                    </TextField>
                                    <Modal.Footer>
                                        <div className="flex justify-between gap-3">
                                            <Button slot="close" variant="secondary">
                                                Close
                                            </Button>
                                            <Button type="submit" className="rounded-full bg-cyan-600 text-white hover:bg-cyan-700">
                                                Book Now
                                            </Button>
                                        </div>
                                    </Modal.Footer>
                                </form>
                            </Surface>
                        </Modal.Body>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </Modal>
    );
};

export default BookModal;



