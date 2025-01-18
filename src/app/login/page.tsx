'use client';

import Link from 'next/link';
import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (

    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
    <div className="text-center">
     <h1 className="text-4xl font-semibold text-gray-800">
      Sign In
     </h1>
     <p className="text-gray-500 mt-2">
      Just sign in if you have an account in here. Enjoy our Website
     </p>
     <div className="bg-white shadow-md rounded-lg p-8 mt-6 w-full max-w-md mx-auto">
        <LoginForm />
      
     </div>
     <p className="mt-4 text-blue-500">
      Already have an Square account?
      <a className="text-blue-700" href="#">
       Log in
      </a>
     </p>
    </div>
   </div>

    // <div className="min-h-screen flex items-center justify-center bg-gray-50">
    //   <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
    //     <div>
    //       <h2 className="text-center text-3xl font-bold">Login</h2>
    //     </div>
    //     <LoginForm />
    //     <p className="text-center">
    //       Don&apos;t have an account?{' '}
    //       <Link href="/register" className="text-blue-600 hover:text-blue-800">
    //         Register
    //       </Link>
    //     </p>
    //   </div>
    // </div>
  );
}