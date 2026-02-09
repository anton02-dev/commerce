export default function ProductPageSkeleton() {
  return (
    <div className="max-w-(--breakpoint-2xl) mx-auto px-4 py-8 lg:py-12 animate-pulse">
      {/* Product Title Skeleton */}
      <div className="mb-8">
        <div className="h-8 bg-gray-200 rounded w-2/3 max-w-md" />
      </div>

      {/* Main Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column - Gallery Skeleton */}
        <div className="lg:col-span-7">
          <div className="relative aspect-square w-full bg-gray-200 rounded-lg" />
          
          {/* Thumbnail Images */}
          <div className="flex gap-2 mt-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0" />
            ))}
          </div>
        </div>

        {/* Right Column - Product Info Skeleton */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-8 space-y-8">
            {/* Buying Box Skeleton */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 lg:p-8 space-y-4">
              {/* Price */}
              <div className="h-10 bg-gray-200 rounded w-32" />
              
              {/* Quantity Selector */}
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-20" />
                <div className="h-12 bg-gray-200 rounded w-full" />
              </div>
              
              {/* Add to Cart Button */}
              <div className="h-12 bg-gray-300 rounded w-full" />
              
              {/* Additional Info */}
              <div className="space-y-2 pt-4 border-t">
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-5/6" />
              </div>
            </div>

            {/* Variants Skeleton */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 lg:p-8 space-y-4">
              <div className="h-6 bg-gray-200 rounded w-40" />
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-24" />
                <div className="grid grid-cols-3 gap-2">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-10 bg-gray-200 rounded" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Description Skeleton */}
      <div className="mt-12 bg-white rounded-lg border border-gray-200 p-6 lg:p-8">
        <div className="h-7 bg-gray-200 rounded w-48 mb-6 pb-4" />
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-4/5" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-3/4" />
        </div>
      </div>

      {/* Reviews Section Skeleton */}
      <div className="mt-12 bg-white rounded-lg border border-gray-200 p-6 lg:p-8">
        <div className="h-7 bg-gray-200 rounded w-48 mb-6 pb-4" />
        
        <div className="flex items-center gap-8 pb-6 border-b">
          <div className="text-center space-y-3">
            <div className="h-12 w-20 bg-gray-200 rounded mx-auto" />
            <div className="flex items-center justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-5 h-5 bg-gray-200 rounded" />
              ))}
            </div>
            <div className="h-4 bg-gray-200 rounded w-24 mx-auto" />
          </div>
          
          <div className="flex-1 space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-4 bg-gray-200 rounded w-12" />
                <div className="flex-1 h-2 bg-gray-200 rounded-full" />
                <div className="h-4 bg-gray-200 rounded w-12" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Products Skeleton */}
      <div className="mt-12 py-10">
        <div className="flex items-center mb-4 gap-1">
          <div className="w-6 h-6 bg-gray-200 rounded flex-shrink-0" />
          <div className="h-7 bg-gray-200 rounded w-64" />
        </div>
        
        <div className="overflow-x-auto overflow-y-hidden w-full">
          <div className="flex gap-4 pb-1">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="aspect-square w-[200px] flex-shrink-0 sm:w-[180px] md:w-[200px] lg:w-[250px]"
              >
                <div className="w-full h-full bg-gray-200 rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}