"use client";

import React, { useState, useMemo } from "react";
import DoctorCard from "@/components/doctorCard";
import { IoSearch } from "react-icons/io5";

const AppointmentPageClient = ({ doctorsList = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name-asc");

  const filteredAndSortedDoctors = useMemo(() => {
    let filtered = doctorsList.filter((doctor) =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    switch (sortBy) {
      case "name-asc":
        return filtered.sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return filtered.sort((a, b) => b.name.localeCompare(a.name));
      case "experience-high":
        return filtered.sort((a, b) => {
          const expA = parseInt(a.experience) || 0;
          const expB = parseInt(b.experience) || 0;
          return expB - expA;
        });
      case "experience-low":
        return filtered.sort((a, b) => {
          const expA = parseInt(a.experience) || 0;
          const expB = parseInt(b.experience) || 0;
          return expA - expB;
        });
      case "fee-low":
        return filtered.sort((a, b) => (a.fee || 0) - (b.fee || 0));
      case "fee-high":
        return filtered.sort((a, b) => (b.fee || 0) - (a.fee || 0));
      case "specialty":
        return filtered.sort((a, b) =>
          a.specialty.localeCompare(b.specialty)
        );
      default:
        return filtered;
    }
  }, [doctorsList, searchTerm, sortBy]);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="relative">
          <div className="relative flex items-center">
            <IoSearch className="absolute left-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search doctors by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-100 py-2 pl-10 pr-4 text-slate-900 placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full rounded-lg border border-slate-200 bg-slate-100 px-4 py-2 text-slate-900"
        >
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
          <option value="experience-high">Experience (High to Low)</option>
          <option value="experience-low">Experience (Low to High)</option>
          <option value="fee-low">Fee (Low to High)</option>
          <option value="fee-high">Fee (High to Low)</option>
          <option value="specialty">Specialty (A-Z)</option>
        </select>
      </div>

      <div className="text-sm text-slate-600">
        Showing {filteredAndSortedDoctors.length} of {doctorsList.length} doctors
      </div>

      {filteredAndSortedDoctors.length === 0 ? (
        <div className="py-12 text-center text-slate-600">
          No doctors found matching your search.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filteredAndSortedDoctors.map((doctor) => (
            <DoctorCard key={doctor.id || doctor._id} doctor={doctor} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AppointmentPageClient;
