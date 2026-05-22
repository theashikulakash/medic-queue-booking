'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import BookModal from '@/components/bookModal';
import { authClient } from '@/lib/auth-client';
import { toast } from 'react-toastify';
export const dynamic = 'force-dynamic';


const DoctorDetailsClient = ({ doctor }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [hoveredStar, setHoveredStar] = useState(0);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [submittingReview, setSubmittingReview] = useState(false);
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const {
    _id,
    id,
    name,
    specialty,
    image,
    experience,
    availability,
    description,
    hospital,
    location,
    fee,
  } = doctor;

  const doctorId = _id || id;

  useEffect(() => {
    fetchReviews();
  }, [doctorId]);

  const fetchReviews = async () => {
    try {
      setLoadingReviews(true);
      const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
      const url = baseUrl ? `${baseUrl}/reviews/${doctorId}` : `/reviews/${doctorId}`;
      
      const res = await fetch(url, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setReviews(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error('Failed to fetch reviews:', err);
    } finally {
      setLoadingReviews(false);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please sign in to leave a review');
      return;
    }

    if (!reviewText.trim()) {
      toast.error('Please write a review');
      return;
    }

    setSubmittingReview(true);
    try {
      const { data: tokenData } = await authClient.token();
      const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
      const url = baseUrl ? `${baseUrl}/reviews` : '/reviews';

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(tokenData?.token ? { Authorization: `Bearer ${tokenData.token}` } : {}),
        },
        body: JSON.stringify({
          doctorId,
          reviewText,
          stars: rating,
        }),
      });

      if (res.ok) {
        toast.success('Review submitted successfully');
        setReviewText('');
        setRating(5);
        fetchReviews();
      } else {
        toast.error('Failed to submit review');
      }
    } catch (err) {
      console.error('Error submitting review:', err);
      toast.error('Error submitting review');
    } finally {
      setSubmittingReview(false);
    }
  };

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, r) => sum + (r.stars || 0), 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <section>
      <Navbar />
      <div className="min-h-screen bg-white max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 md:p-8">
              <div className="md:col-span-1 flex justify-center">
                <div className="relative w-48 h-48 md:w-56 md:h-56">
                  <Image
                    src={image}
                    alt={name}
                    fill
                    className="rounded-lg object-cover shadow-md"
                    priority
                  />
                </div>
              </div>

              <div className="md:col-span-2 flex flex-col justify-between">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{name}</h1>
                  <p className="text-lg md:text-xl text-blue-600 font-semibold mb-4">{specialty}</p>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-600">Experience</p>
                      <p className="text-lg font-semibold text-gray-800">{experience}</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-600">Consultation Fee</p>
                      <p className="text-lg font-semibold text-gray-800">৳{fee}</p>
                    </div>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4 mb-4">
                    <p className="text-sm text-gray-600 mb-1">Hospital</p>
                    <p className="font-semibold text-gray-800">{hospital}</p>
                    <p className="text-sm text-gray-600 mt-1">📍 {location}</p>
                  </div>
                </div>

                <BookModal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  defaultDoctorId={_id}
                  defaultDoctorName={name}
                />
              </div>
            </div>
          </div>

          <div className="mt-8 bg-white rounded-lg shadow-lg p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">About</h2>
            <p className="text-gray-700 leading-relaxed mb-6">{description}</p>
          </div>

          <div className="mt-8 bg-white rounded-lg shadow-lg p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Availability</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availability.map((slot, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-green-50 p-4 rounded-lg border border-green-200"
                >
                  <span className="text-2xl">🕐</span>
                  <span className="text-gray-800 font-semibold">{slot}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 bg-white rounded-lg shadow-lg p-6 md:p-8 text-black">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Reviews & Ratings</h2>

            {/* Average Rating */}
            {reviews.length > 0 && (
              <div className="mb-8 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-2xl">
                        {i < Math.floor(averageRating) ? '⭐' : '☆'}
                      </span>
                    ))}
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-800">{averageRating}</p>
                    <p className="text-sm text-gray-600">Based on {reviews.length} review{reviews.length !== 1 ? 's' : ''}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Review Form */}
            {user ? (
              <form onSubmit={handleSubmitReview} className="mb-8 p-6 bg-slate-50 rounded-lg border border-slate-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Share Your Review</h3>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoveredStar(star)}
                        onMouseLeave={() => setHoveredStar(0)}
                        className="text-4xl transition transform hover:scale-110 focus:outline-none"
                      >
                        {star <= (hoveredStar || rating) ? '⭐' : '☆'}
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Rating: {rating} out of 5</p>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Share your experience with this doctor..."
                    rows="4"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submittingReview}
                  className="rounded-lg bg-blue-600 px-6 py-2 text-white font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  {submittingReview ? 'Submitting...' : 'Submit Review'}
                </button>
              </form>
            ) : (
              <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-gray-700">
                  Please <Link href="/login" className="text-blue-600 font-semibold hover:underline">sign in</Link> to leave a review
                </p>
              </div>
            )}

            {/* Reviews List */}
            <div className="space-y-4">
              {loadingReviews ? (
                <p className="text-gray-600">Loading reviews...</p>
              ) : reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <div key={index} className="p-4 border border-slate-200 rounded-lg bg-gray-50">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-gray-800">{review.userName}</p>
                        <p className="text-sm text-gray-600">{review.userEmail}</p>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-lg">
                            {i < review.stars ? '⭐' : '☆'}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700">{review.reviewText}</p>
                    {review.createdAt && (
                      <p className="text-xs text-gray-500 mt-2">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-600 text-center py-4">No reviews yet. Be the first to review!</p>
              )}
            </div>
          </div>
          <div className="mt-8 bg-white rounded-lg shadow-lg p-6 md:p-8">
            <Link href={`/doctors`}>
              <button className="rounded-2xl bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700">
                Back to All Doctors
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default DoctorDetailsClient;
