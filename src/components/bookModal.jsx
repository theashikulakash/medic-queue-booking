'use client';

import { PlusShapeFill } from "@gravity-ui/icons";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import React from 'react';

const BookModal = ({ defaultDoctorId, defaultDoctorName }) => {

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
                                Fill out the form below and we'll get back to you. The modal adapts automatically
                                when the keyboard appears on mobile.
                            </p>
                        </Modal.Header>
                        <Modal.Body className="p-6">
                            <Surface variant="default">
                                <form className="flex flex-col gap-4">
                                    <TextField className="w-full" name="name" type="text">
                                        <Label>Patients Name</Label>
                                        <input type="text" className="input bg-neutral-content" placeholder="Enter your name" />
                                    </TextField>
                                    <TextField className="w-full" name="doctor" type="text">




                                        <Label>Doctor</Label>
                                        <select defaultValue={defaultDoctorId} name="doctor" className="select bg-neutral-content shadow-sm">
                                            <option value={defaultDoctorId}>{defaultDoctorName}</option>
                                        </select>
                                    </TextField>
                                    <TextField className="w-full" name="email" type="email">
                                        <Label>Email</Label>
                                        <Input placeholder="Enter your email" className="input bg-neutral-content" />
                                    </TextField>
                                    <TextField className="w-full" name="phone" type="tel">
                                        <Label>Phone</Label>
                                        <Input placeholder="Enter your phone number" className="input bg-neutral-content" />
                                    </TextField>
                                    <TextField className="w-full" name="phone" type="tel">
                                        <Label>Doctor</Label>

                                        <select defaultValue="" name="gender" className="select bg-neutral-content shadow-sm">
                                            <option value="" disabled className="items-center text-center">Choose Gender</option>
                                                <option>Male</option>
                                            <option>Female</option>
                                            </select>
                                    </TextField>
                                    <TextField className="w-full" name="company">
                                        <Label>Appointment Date</Label>
                                        <input type="date" className="input bg-neutral-content" />
                                    </TextField>
                                    <TextField className="w-full" name="message">
                                        <Label>Appointment Time</Label>
                                        <input type="time"  className="input bg-neutral-content"/>
                                    </TextField>
                                </form>
                            </Surface>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button slot="close" variant="secondary">
                                Close
                            </Button>
                            <Button slot="close">Book Now</Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
};

export default BookModal;



