'use client';

import { formatDistanceToNow } from 'date-fns';
import { ro } from 'date-fns/locale';
import { useState } from 'react';
import JudgemeReviewModal from './reviewForm';

export function ProductReviewsClient({ product, reviewsData }: { product: any; reviewsData: any }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!reviewsData || reviewsData.reviewCount === 0) {
    return (
      <>
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">Acest produs nu are încă recenzii.</p>
          <p className="text-gray-600 mb-6">Fii primul care lasă o recenzie!</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-block px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
          >
            Scrie o recenzie
          </button>
        </div>

        <JudgemeReviewModal
          product={{
            id: product.id,
            title: product.title,
            image: product.featuredImage?.url
          }}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </>
    );
  }

  const { rating, reviewCount, reviews } = reviewsData;

  // Calculate rating distribution
const distribution = reviews.reduce((acc: Record<number, number>, review: any) => {
  acc[review.rating] = (acc[review.rating] || 0) + 1;
  return acc;
}, {} as Record<number, number>);
  return (
    <>
    <div className="space-y-6">
      {/* Rating Summary */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-8 pb-6 border-b">
        <div className="text-center">
          <div className="text-5xl font-bold text-gray-900 mb-2">{rating.toFixed(1)}</div>
          <div className="flex items-center justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-5 h-5 ${i < Math.round(rating) ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>
          <p className="text-sm text-gray-600">{reviewCount} recenzii</p>
        </div>
        
        <div className="flex-1 w-full space-y-2">
          {[5, 4, 3, 2, 1].map((stars) => {
            const count = distribution[stars] || 0;
            const percentage = reviewCount > 0 ? (count / reviewCount) * 100 : 0;
            
            return (
              <div key={stars} className="flex items-center gap-3">
                <span className="text-sm text-gray-600 w-12">{stars} stele</span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-yellow-400 transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-12 text-right">
                  {percentage.toFixed(0)}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-6">
        {reviews.slice(0, 10).map((review: any) => (
          <div key={review.id} className="border-b pb-6 last:border-b-0">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-gray-900">{review.reviewer.name}</span>
                  {review.verified_buyer && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                      Cumpărător verificat
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
              </div>
              <span className="text-sm text-gray-500">
                {formatDistanceToNow(new Date(review.created_at), { 
                  addSuffix: true,
                  locale: ro 
                })}
              </span>
            </div>
            
            {review.title && (
              <h4 className="font-semibold text-gray-900 mb-2">{review.title}</h4>
            )}
            
            <p className="text-gray-700 leading-relaxed">{review.body}</p>
            
            {review.pictures && review.pictures.length > 0 && (
              <div className="flex gap-2 mt-4">
                {review.pictures.map((picture: any, idx: number) => (
                  <img
                    key={idx}
                    src={picture.urls.small}
                    alt="Review image"
                    className="w-20 h-20 object-cover rounded border"
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

       <div className="text-center pt-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-block px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
          >
            Scrie o recenzie
          </button>
        </div>
    </div>

      <JudgemeReviewModal
        product={{
          id: product.id,
          title: product.title,
          image: product.featuredImage?.url
        }}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}