"use client";

import { useState, useRef } from "react";
import { Star, ChevronLeft, ChevronRight } from "@gravity-ui/icons";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Patient",
      text: "Excellent service! The doctor appointment booking was so easy and convenient. Got my appointment within minutes.",
      rating: 5,
      image: "SJ",
      color: "bg-blue-100 text-blue-700",
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      role: "Healthcare Provider",
      text: "This platform has transformed how I manage appointments. My patients love the simplicity and I save hours on scheduling.",
      rating: 5,
      image: "MC",
      color: "bg-purple-100 text-purple-700",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Patient",
      text: "I was impressed by the quick response time and professional handling of my appointment. Highly recommended!",
      rating: 5,
      image: "ER",
      color: "bg-pink-100 text-pink-700",
    },
    {
      id: 4,
      name: "James Wilson",
      role: "Patient",
      text: "Finally, an appointment system that actually works! No more waiting on hold. Booking is instantaneous.",
      rating: 4,
      image: "JW",
      color: "bg-green-100 text-green-700",
    },
    {
      id: 5,
      name: "Dr. Priya Patel",
      role: "Healthcare Provider",
      text: "Reliable, efficient, and user-friendly. Our clinic's productivity has increased significantly since we started using this.",
      rating: 5,
      image: "PP",
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      id: 6,
      name: "David Thompson",
      role: "Patient",
      text: "The interface is intuitive and I appreciate the reminder notifications. Never missed an appointment again.",
      rating: 5,
      image: "DT",
      color: "bg-indigo-100 text-indigo-700",
    },
    {
      id: 7,
      name: "Lisa Anderson",
      role: "Patient",
      text: "Outstanding experience from start to finish. The support team is responsive and helpful. Worth every feature!",
      rating: 5,
      image: "LA",
      color: "bg-cyan-100 text-cyan-700",
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
              className={`h-2 rounded-full transition-all ${
                idx === currentIndex
                  ? "w-8 bg-cyan-600"
                  : "w-2 bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;