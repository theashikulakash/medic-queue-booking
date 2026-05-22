import Link from 'next/link';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Patient Testimonials - Medic Queue",
  description: "Read real reviews and ratings from patients about their experience with doctors on Medic Queue. Browse all patient testimonials.",
  keywords: ["doctor reviews", "patient testimonials", "ratings", "feedback"],
  robots: "index, follow",
};

const TestimonialsPage = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const reviewsUrl = baseUrl ? `${baseUrl}/reviews` : '/reviews';
  const doctorsUrl = baseUrl ? `${baseUrl}/appointment` : '/appointment';

  let reviews = [];
  let doctors = [];

  try {
    const [reviewsRes, doctorsRes] = await Promise.all([
      fetch(reviewsUrl, { cache: 'no-store' }),
      fetch(doctorsUrl, { cache: 'no-store' }),
    ]);

    if (reviewsRes.ok) {
      reviews = await reviewsRes.json();
    }

    if (doctorsRes.ok) {
      doctors = await doctorsRes.json();
    }
  } catch (err) {
    console.error('Failed to load testimonials or doctors:', err);
  }

  const doctorMap = new Map(
    (doctors || []).map((doctor) => [doctor._id?.toString() || doctor.id?.toString(), doctor.name])
  );

  return (
    <section>
      <Navbar />
      <main className="bg-slate-50 min-h-screen py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#3b75c2]">
              Doctor Reviews
            </p>
            <h1 className="mt-4 text-3xl font-semibold text-slate-900 sm:text-4xl">
              Patient Testimonials
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600">
              Read all submitted reviews for doctors from patients who have booked appointments.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <article key={review._id || review.id} className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-500">Doctor</p>
                      <p className="text-lg font-semibold text-slate-900">{doctorMap.get(review.doctorId) || review.doctorName || 'Unknown doctor'}</p>
                    </div>
                    <div className="flex gap-1 text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>{i < (review.stars || 0) ? '⭐' : '☆'}</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-700 mb-4">{review.reviewText}</p>
                  <div className="border-t border-slate-200 pt-4 text-sm text-slate-500">
                    <p>{review.userName || review.userEmail || 'Anonymous'}</p>
                    {review.createdAt && (
                      <p>{new Date(review.createdAt).toLocaleDateString()}</p>
                    )}
                  </div>
                </article>
              ))
            ) : (
              <div className="col-span-full rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                <p className="text-slate-600">No reviews are available yet.</p>
              </div>
            )}
          </div>

          <div className="mt-10 text-center">
            <Link href="/doctors" className="inline-flex items-center rounded-full bg-cyan-600 px-6 py-3 text-white hover:bg-cyan-700">
              Back to Doctors
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </section>
  );
};

export default TestimonialsPage;
