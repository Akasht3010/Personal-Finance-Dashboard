import Link from 'next/link';
import RegisterForm from '@/components/RegisterForm';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <div>
          <h2 className="text-3xl text-black font-bold text-center">Create Account</h2>
          <p className="mt-2 text-center text-gray-600">
            Or{' '}
            <Link href="/login" className="text-blue-600 hover:text-blue-500">
              sign in to your account
            </Link>
          </p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}