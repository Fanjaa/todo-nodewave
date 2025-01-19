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

    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
    <div className="p-8">
        <h1 className="text-3xl font-bold text-center mb-4">Register</h1>
        <p className="text-center text-gray-500 mb-8">Let's Sign up first for enter into Square Website. Uh She Up!</p>
        <form className="space-y-4">
            <div className="flex space-x-4">
                <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                    <input type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" value="Soeraji" />
                </div>
                <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                </div>
            </div>
            <div className="flex space-x-4">
                <div className="w-1/3">
                    <label className="block text-sm font-medium text-gray-700">Phone Code</label>
                    <input type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" value="+62" />
                </div>
                <div className="w-2/3">
                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Your Country</label>
                <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                    <option>Select Country</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Mail Address</label>
                <div className="flex">
                    <input type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    <span className="mt-1 ml-2 text-gray-500">@squareteam.com</span>
                </div>
            </div>
            <div className="flex space-x-4">
                <div className="w-1/2 relative">
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input type="password" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    <i className="fas fa-eye absolute right-3 top-10 text-gray-400"></i>
                </div>
                <div className="w-1/2 relative">
                    <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                    <input type="password" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    <i className="fas fa-eye-slash absolute right-3 top-10 text-gray-400"></i>
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Tell us about yourself</label>
                <textarea className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" rows={3} placeholder="Hello my name..."></textarea>
            </div>
            <div className="flex space-x-4">
                <button type="button" className="w-1/2 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Login</button>
                <button type="submit" className="w-1/2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Register</button>
            </div>
        </form>
    </div>
</div>

    // <div className="min-h-screen flex items-center justify-center bg-gray-50">
    //   <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
    //     <div>
    //       <h2 className="text-center text-3xl font-bold">Register</h2>
    //     </div>
    //     <RegisterForm />
    //     <p className="text-center">
    //       Already have an account?{' '}
    //       <Link href="/login" className="text-blue-600 hover:text-blue-800">
    //         Login
    //       </Link>
    //     </p>
    //   </div>
    // </div>
  );
}