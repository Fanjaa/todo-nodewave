'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Input from '../ui/Input';
import Button from '../ui/Button';


export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await login(formData);
      router.push('/todo');
    } catch (error: any) {
      setError(error.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (

    <form onSubmit={handleSubmit} className="space-y-4">
  {error && (
    <div className="p-3 bg-red-100 text-red-700 rounded-lg">
      {error}
    </div>
  )}
  <div className="mb-4">
    <label className="block text-left text-gray-700" htmlFor="email">
      Your Email / Username
    </label>
    <Input
      className="w-full px-3 py-2 border border-gray-300 rounded mt-1"
      id="email"
      type="email"
      placeholder="Input Your Email"
      value={formData.email}
      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
      required
    />
  </div>

  <div className="mb-4">
    <label className="block text-left text-gray-700" htmlFor="password">
      Enter Password
    </label>
    <Input
      className="w-full px-3 py-2 border border-gray-300 rounded mt-1"
      id="password"
      type="password"
      placeholder="Input Your Password"
      value={formData.password}
      onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
      required
    />
  </div>

  <div className="flex items-center justify-between mb-4">
    <label className="flex items-center text-gray-700">
        <input
            className="form-checkbox"
            type="checkbox"
          />      
          <span className="ml-2">Remember Me</span>
    </label>
    <a className="text-blue-500" href="#">
      Forgot Password?
    </a>
  </div>

  <Button className="w-full bg-blue-500 text-white py-2 rounded" type="submit" isLoading={isLoading}>
    Login
  </Button>
</form>


    // <form onSubmit={handleSubmit} className="space-y-4">
    //   {error && (
    //     <div className="p-3 bg-red-100 text-red-700 rounded-lg">
    //       {error}
    //     </div>
    //   )}
    //   <Input
    //     label="Email"
    //     type="email"
    //     value={formData.email}
    //     onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
    //     required
    //   />
    //   <Input
    //     label="Password"
    //     type="password"
    //     value={formData.password}
    //     onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
    //     required
    //   />
    //   <Button type="submit" isLoading={isLoading} className="w-full">
    //     Login
    //   </Button>
    // </form>
  );
}