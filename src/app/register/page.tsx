'use client';

import Link from 'next/link';
import RegisterForm from '@/components/auth/RegisterForm';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function RegisterPage() {

    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();
  
    // Redirect to /todo if the user is already authenticated
    useEffect(() => {
      if (isAuthenticated) {
        router.push('/');  // Redirect to /todo or another page if the user is already logged in
      }
    }, [isAuthenticated, router]);
  
    if (loading || isAuthenticated) return null;  // Jangan render dulu
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div>
          <h2 className="text-center text-3xl font-bold">Register</h2>
        </div>
        <RegisterForm />
        <p className="text-center">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 hover:text-blue-800">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}