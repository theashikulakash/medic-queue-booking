"use client";

import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

const BookingUpdateModal = ({ appointment, buttonLabel = 'Update', buttonClassName = '' }) => {
  const router = useRouter();



  const [loading, setLoading] = useState(false);
  const bookingId = appointment?._id || appointment?.id;
  const {
    userEmail = '',
    patientName = '',
    phone = '',
    gender = '',
    appointmentDate = '',
    appointmentTime = '',
  } = appointment || {};




  const onSubmit = async (e) => {
    e.preventDefault();
    if (!bookingId) {
      toast.error('Missing booking ID');
      return;
    }

    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const updatedData = Object.fromEntries(formData.entries());


    
    try {
      const { data: tokenData } = await authClient.token();
      const url = process.env.NEXT_PUBLIC_SERVER_URL
        ? `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/${bookingId}`
        : `/bookings/${bookingId}`;

      const res = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(tokenData?.token ? { authorization: `Bearer ${tokenData.token}` } : {}),
        },
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Update failed: ${res.status} ${errorText}`);
      }

      const data = await res.json();
      console.log('Booking update response', data);
      toast.success('Booking updated successfully');
      router.push('/bookings');
    } catch (error) {
      console.error('Booking update error', error);
      toast.error('Failed to update booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal>
        <Button variant="outline" className={buttonClassName} disabled={loading}>
          {buttonLabel}
        </Button>
        <Modal.Backdrop>
          <Modal.Container placement="auto">
            <Modal.Dialog className="sm:max-w-xl">
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Heading>Update Booking</Modal.Heading>
                <p className="mt-1.5 text-sm leading-5 text-muted">
                  Edit your appointment details and save the changes.
                </p>
              </Modal.Header>
              <Modal.Body className="p-6">
                <Surface variant="default">
                  <form onSubmit={onSubmit} className="p-6 space-y-6">
                    <TextField defaultValue={patientName} name="patientName" type="text" isRequired>
                      <Label>Patient Name</Label>
                      <Input placeholder="Patient name" className="input bg-neutral-content" />
                    </TextField>
                    <TextField defaultValue={userEmail} name="userEmail" type="email" isRequired>
                      <Label>Email</Label>
                      <Input placeholder="Email" className="input bg-neutral-content" />
                    </TextField>
                    <TextField defaultValue={phone} name="phone" type="tel" isRequired>
                      <Label>Phone</Label>
                      <Input placeholder="Phone number" className="input bg-neutral-content" />
                    </TextField>
                    <TextField defaultValue={gender} name="gender" type="text" isRequired>
                      <Label>Gender</Label>
                      <Input placeholder="Gender" className="input bg-neutral-content" />
                    </TextField>
                    <TextField defaultValue={appointmentDate} name="appointmentDate" type="date" isRequired>
                      <Label>Appointment Date</Label>
                      <Input type="date" className="input bg-neutral-content" />
                    </TextField>
                    <TextField defaultValue={appointmentTime} name="appointmentTime" type="time" isRequired>
                      <Label>Appointment Time</Label>
                      <Input type="time" className="input bg-neutral-content" />
                    </TextField>
                    <Modal.Footer>
                      <div className="flex justify-between gap-3">
                        <Button slot="close" variant="secondary">
                          Close
                        </Button>
                        <Button type="submit" disabled={loading} className="rounded-full bg-cyan-600 text-white hover:bg-cyan-700">
                          {loading ? 'Saving...' : 'Save Changes'}
                        </Button>
                      </div>
                    </Modal.Footer>
                  </form>
                </Surface>
              </Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
    </>
  );
};

export default BookingUpdateModal;
