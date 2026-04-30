import { useState, useEffect } from 'react';
import { useSiteData } from '@/hooks/useSiteData';
import { mockReviews } from '@/mocks/reviews';

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
          <span className="inline-flex items-center gap-2 bg-[#2db84b]/15 border border-[#2db84b]/40 text-[#2db84b] text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            <i className="ri-star-fill"></i> Verified Reviews
          </span>
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
              {/* Stars + service tag */}
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
                {review.service && (
                  <span className="text-[#2db84b] text-xs font-semibold bg-[#2db84b]/10 px-2 py-0.5 rounded-full whitespace-nowrap">
                    {review.service}
                  </span>
                )}
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
            className="inline-flex items-center gap-2 whitespace-nowrap bg-[#2db84b] hover:bg-[#25a040] text-white font-bold px-8 py-4 rounded-full text-base transition-all duration-200 cursor-pointer"
          >
            <i className="ri-google-fill text-lg"></i>
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
