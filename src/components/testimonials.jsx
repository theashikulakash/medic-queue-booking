"use client";

import { useState, useRef } from "react";
import { Star, ChevronLeft, ChevronRight } from "@gravity-ui/icons";
import { Button } from "@heroui/react";
import Link from "next/link";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);

 const testimonials = [
  {
    id: 1,
    name: "Rahat Chowdhury",
    role: "Patient",
    text: "Booking an appointment with Dr. Ayesha Rahman was incredibly seamless. The platform saved me hours of waiting in line at Labaid.",
    rating: 5,
    image: "RC",
    color: "bg-blue-100 text-blue-700",
  },
  {
    id: 2,
    name: "Dr. Ayesha Rahman",
    role: "Healthcare Provider",
    text: "This platform has transformed how I manage my cardiac patients at Labaid. The scheduling flow is smooth and intuitive.",
    rating: 5,
    image: "AR",
    color: "bg-purple-100 text-purple-700",
  },
  {
    id: 3,
    name: "Nusrat Jahan",
    role: "Patient",
    text: "I managed to secure a slot with Prof. Dr. M. A. Baqui for my chronic migraines within minutes. Highly efficient system!",
    rating: 5,
    image: "NJ",
    color: "bg-pink-100 text-pink-700",
  },
  {
    id: 4,
    name: "Prof. Dr. M. A. Baqui",
    role: "Healthcare Provider",
    text: "Managing complex neurology consultations at Square Hospital is much easier now. Patients appreciate the instant confirmation.",
    rating: 5,
    image: "MB",
    color: "bg-green-100 text-green-700",
  },
  {
    id: 5,
    name: "Farzana Akter",
    role: "Patient",
    text: "Finding Dr. Nusrat Zaman and booking a consultation at Apollo Imperial was effortless. Best medical booking experience in Chattogram.",
    rating: 5,
    image: "FA",
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    id: 6,
    name: "Dr. Nusrat Zaman",
    role: "Healthcare Provider",
    text: "The platform's interface reduces overhead communication for my gynecology unit, letting me focus purely on patient care.",
    rating: 5,
    image: "NZ",
    color: "bg-indigo-100 text-indigo-700",
  },
  {
    id: 7,
    name: "Asif Istiak",
    role: "Patient",
    text: "I was worried about securing a serial for Dr. Baqui at Square Hospital, but this application made the entire process instantaneous.",
    rating: 4,
    image: "AI",
    color: "bg-cyan-100 text-cyan-700",
  },
  {
    id: 8,
    name: "Sadia Afrin",
    role: "Patient",
    text: "Excellent service! Received automated reminders for my checkup with Dr. Ayesha Rahman, so I never missed my appointment slot.",
    rating: 5,
    image: "SA",
    color: "bg-teal-100 text-teal-700",
  },
  {
    id: 9,
    name: "Tamim Iqbal",
    role: "Patient",
    text: "The fee structure and availability for Dr. Nusrat Zaman were clearly listed. No hidden charges, completely transparent processing.",
    rating: 5,
    image: "TI",
    color: "bg-orange-100 text-orange-700",
  },
  {
    id: 10,
    name: "Imran Khan",
    role: "Patient",
    text: "Highly recommended application. Got my father's heart screening session booked with Dr. Ayesha without any payment hassles.",
    rating: 5,
    image: "IK",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    id: 11,
    name: "Mehedi Hasan",
    role: "Patient",
    text: "The UI is clean and fast. Searching for a specialist like Prof. Dr. M. A. Baqui by location made finding the right chamber easy.",
    rating: 4,
    image: "MH",
    color: "bg-rose-100 text-rose-700",
  },
  {
    id: 12,
    name: "Tasnim Rahman",
    role: "Patient",
    text: "Outstanding digital healthcare experience. Booking an emergency consultation at Apollo Imperial with Dr. Nusrat was painless.",
    rating: 5,
    image: "TR",
    color: "bg-violet-100 text-violet-700",
  },
];


  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  return (
    <section className="relative w-full bg-gradient-to-b from-slate-50 to-white py-16 px-4 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-slate-900 sm:text-5xl">
            What Our <span className="text-cyan-600">Users Say</span>
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Join thousands of satisfied patients and healthcare providers
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative flex items-center justify-center gap-6">
          {/* Left Button */}
          <button
            onClick={handlePrev}
            className="absolute left-0 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-cyan-600 text-white shadow-lg transition hover:bg-cyan-700 hover:shadow-xl"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Carousel */}
          <div className="relative w-full overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
              ref={containerRef}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="min-w-full flex items-center justify-center px-4 sm:px-8"
                >
                  <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 shadow-md transition-shadow hover:shadow-lg">
                    {/* Rating Stars */}
                    <div className="mb-4 flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>

                    {/* Testimonial Text */}
                    <p className="mb-6 text-base text-slate-700 leading-relaxed">
                      "{testimonial.text}"
                    </p>

                    {/* User Info */}
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-full font-bold text-sm ${testimonial.color}`}
                      >
                        {testimonial.image}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-slate-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Button */}
          <button
            onClick={handleNext}
            className="absolute right-0 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-cyan-600 text-white shadow-lg transition hover:bg-cyan-700 hover:shadow-xl"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Indicators */}
        <div className="mt-8 flex justify-center gap-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all ${idx === currentIndex
                  ? "w-8 bg-cyan-600"
                  : "w-2 bg-slate-300 hover:bg-slate-400"
                }`}
            />
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <Link href="/testimonials">
            <Button>
              All Testimonials
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;