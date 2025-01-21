'use client';

import Link from 'next/link';
import LoginForm from '@/components/auth/LoginForm';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { isAuthenticated, loading, role } = useAuth();
  const router = useRouter();

  // Redirect to /todo if the user is already authenticated
  useEffect(() => {
    if (isAuthenticated && role === 'USER') {
      router.push('/todo');  // Redirect to /todo or another page if the user is already logged in
    }else if (isAuthenticated && role === 'ADMIN') {
      router.push('/admin');  // Redirect to /admin or another page if the user is already
    }
  }, [isAuthenticated, router]);

  if (loading || isAuthenticated) return null;  // Jangan render dulu


  return (
<div className="bg-two-color flex items-center justify-center min-h-screen max-sm:px-4">
  <div className="text-center">
    <div className="flex flex-col gap-3.5">
    <h1 className="font-bold font-poppins text-[56px] text-[#44444F]">
      Sign In
    </h1>
    <p className="font-roboto text-[#92929D] text-[16px]" >
      Just sign in if you have an account in here. Enjoy our Website
    </p>
    </div>
    <div className="flex flex-col justify-center bg-white shadow-loginForm rounded-[20px] p-8 mt-6 w-[560px] h-[314px] max-w-lg mx-auto max-sm:w-auto ">
      <LoginForm />
    </div>
    <p className="mt-4 text-blueButton font-roboto font-medium text-[14px]">
      Already have a Square account? 
      <Link href="/register" className="text-blueCustom ml-1 hover:text-blueButton">
             Register
         </Link>
    </p>
  </div>
</div>

  );
}