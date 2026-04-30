import { useState, useEffect } from 'react';
import { useSiteData } from '@/hooks/useSiteData';
import { mockReviews } from '@/mocks/reviews';

function GoogleGLogo({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

export default function ReviewsSection() {
  const { reviews: hookReviews } = useSiteData();
  const reviews = hookReviews.length > 0 ? hookReviews : mockReviews;
  const activeReviews = reviews.filter((r) => r.is_active !== false);
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 3;
  const totalPages = Math.max(1, Math.ceil(activeReviews.length / perPage));

  useEffect(() => {
    setCurrentPage(0);
  }, [reviews.length]);

  const currentReviews = activeReviews.slice(
    currentPage * perPage,
    currentPage * perPage + perPage,
  );

  const averageRating =
    activeReviews.length > 0
      ? (activeReviews.reduce((sum, r) => sum + r.rating, 0) / activeReviews.length).toFixed(1)
      : '4.9';

  const fullStars = Math.floor(parseFloat(averageRating));
  const hasHalf = parseFloat(averageRating) - fullStars >= 0.3;

  return (
    <section className="bg-[#0d0d0d] py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          {/* Google Reviews badge */}
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-2 mb-5">
            <GoogleGLogo className="w-5 h-5" />
            <span className="text-white/70 text-sm font-medium">Reviews by Google</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            What Our Customers Say
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto mb-6">
            Real reviews from real customers in Zebulon and surrounding areas. We are proud of our reputation.
          </p>

          {/* Rating badge */}
          <div className="inline-flex items-center gap-4 bg-[#111111] border border-white/10 rounded-2xl px-6 py-4">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <i
                  key={i}
                  className={`text-xl ${
                    i < fullStars
                      ? 'ri-star-fill text-yellow-400'
                      : i === fullStars && hasHalf
                        ? 'ri-star-half-fill text-yellow-400'
                        : 'ri-star-line text-gray-600'
                  }`}
                ></i>
              ))}
            </div>
            <div className="text-left">
              <p className="text-white font-extrabold text-2xl">{averageRating}</p>
              <p className="text-gray-500 text-xs">out of 5 stars</p>
            </div>
            <div className="w-px h-10 bg-white/10"></div>
            <div className="text-left">
              <p className="text-white font-bold text-lg">{activeReviews.length}</p>
              <p className="text-gray-500 text-xs">verified reviews</p>
            </div>
          </div>
        </div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {currentReviews.map((review) => (
            <div
              key={review.id}
              className="bg-[#111111] border border-white/10 rounded-xl p-6 flex flex-col"
            >
              {/* Stars + Google label */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <i
                      key={i}
                      className={`text-sm ${
                        i < review.rating ? 'ri-star-fill text-yellow-400' : 'ri-star-line text-gray-600'
                      }`}
                    ></i>
                  ))}
                </div>
                <div className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-full">
                  <GoogleGLogo className="w-3.5 h-3.5" />
                  <span className="text-gray-400 text-[10px] font-medium uppercase tracking-wide">Google</span>
                </div>
              </div>

              {/* Quote */}
              <p className="text-gray-300 text-sm leading-relaxed flex-1 mb-4">
                &ldquo;{review.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <div className="w-10 h-10 flex items-center justify-center bg-[#2db84b]/15 rounded-full shrink-0">
                  <span className="text-[#2db84b] text-sm font-bold">
                    {review.name.split(' ').map((n) => n[0]).join('').toUpperCase()}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-white text-sm font-semibold">{review.name}</p>
                  <p className="text-gray-500 text-xs">Verified Customer</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Write a Review CTA */}
        <div className="text-center mt-4 mb-10">
          <a
            href="https://www.google.com/search?kgmid=/g/11f7nwmr_p&hl=en-US&q=Angel%27s+Paint+%26+Autobody&shndl=30&source=sh/x/loc/osrp/m1/2&kgs=a6f3b41ffadc74cb&utm_source=sh/x/loc/osrp/m1/2#lrd=0x89ac472963a1e07b:0x3cfbd7ee8ca911f1,3,,,,"
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="inline-flex items-center gap-2.5 whitespace-nowrap bg-[#2db84b] hover:bg-[#25a040] text-white font-bold px-8 py-4 rounded-full text-base transition-all duration-200 cursor-pointer"
          >
            <GoogleGLogo className="w-5 h-5" />
            Leave Us a 5-Star Review on Google
          </a>
          <p className="text-gray-500 text-xs mt-3">Your feedback helps us grow and serve you better.</p>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
              disabled={currentPage === 0}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed text-white transition-colors cursor-pointer"
            >
              <i className="ri-arrow-left-s-line"></i>
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-semibold transition-colors cursor-pointer ${
                  i === currentPage
                    ? 'bg-[#2db84b] text-white'
                    : 'bg-white/5 hover:bg-white/10 text-gray-400'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={currentPage === totalPages - 1}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed text-white transition-colors cursor-pointer"
            >
              <i className="ri-arrow-right-s-line"></i>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}