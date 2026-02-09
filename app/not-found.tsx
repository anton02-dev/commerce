import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-6">
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <p className="text-sm opacity-80">
        Sorry, we couldn’t find what you’re looking for.
      </p>
      <Link className="underline" href="/">
        Go home
      </Link>
    </div>
  );
}