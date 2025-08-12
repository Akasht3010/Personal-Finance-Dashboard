import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8 text-black">Welcome to Our App</h1>
        <div className="space-x-4">
          <Link
            href="/login"
            className="bg-blue-600 text-black px-6 py-3 rounded-md hover:bg-blue-700"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="bg-green-600 text-black px-6 py-3 rounded-md hover:bg-green-700"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}