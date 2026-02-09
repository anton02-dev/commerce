export default function Loading() {
  return (
    <div className="max-w-(--breakpoint-2xl) mx-auto px-4 py-8 lg:py-12">
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-red-600"></div>
      </div>
    </div>
  );
}