import React from 'react';
import DoctorCard from './doctorCard';
import { getDoctors } from '@/lib/doctors';
export const dynamic = 'force-dynamic';

const TopDoctors = async () => {
  const doctorsList = await getDoctors();
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const reviewsUrl = baseUrl ? `${baseUrl}/reviews` : '/reviews';

  let reviews = [];
  try {
    const res = await fetch(reviewsUrl, { cache: 'no-store' });
    if (res.ok) {
      reviews = await res.json();
    }
  } catch (err) {
    console.error('Failed to load reviews for top doctors:', err);
  }

  const ratingMap = new Map();
  reviews.forEach((review) => {
    const doctorId = review.doctorId?.toString?.() || review.doctorId;
    if (!doctorId) return;

    const existing = ratingMap.get(doctorId) || { sum: 0, count: 0 };
    ratingMap.set(doctorId, {
      sum: existing.sum + (review.stars || 0),
      count: existing.count + 1,
    });
  });

  const doctorsWithRating = doctorsList.map((doctor) => {
    const doctorId = doctor._id?.toString?.() || doctor.id?.toString?.();
    const ratingData = ratingMap.get(doctorId);
    const averageRating = ratingData ? ratingData.sum / ratingData.count : 0;

    return {
      ...doctor,
      averageRating,
      reviewCount: ratingData?.count || 0,
    };
  });

  const selectedDoctors = doctorsWithRating
    .sort((a, b) => {
      if (b.averageRating !== a.averageRating) {
        return b.averageRating - a.averageRating;
      }
      if (b.reviewCount !== a.reviewCount) {
        return b.reviewCount - a.reviewCount;
      }
      return (a.name || '').localeCompare(b.name || '');
    })
    .slice(0, 3);

  return (
        <section className="space-y-6 px-4 py-8 md:px-6">
            <div className="text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Featured Practitioners</p>
                <h2 className="mt-3 text-3xl font-semibold text-slate-900">Top Doctors</h2>
                <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                    Discover three recommended doctors from our trusted specialists.
                </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3 w-10/12 mx-auto">
                {selectedDoctors.length > 0 ? (
                  selectedDoctors.map((doctor) => (
                    <DoctorCard key={doctor.id} doctor={doctor} />
                  ))
                ) : (
                  <div className="col-span-3 rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-600 shadow-sm">
                    <p className="text-lg font-medium">No doctors are available right now.</p>
                    <p className="mt-2 text-sm">Please check back later or contact support for assistance.</p>
                  </div>
                )}
            </div>
        </section>
    );
};

export default TopDoctors;