"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../contexts/AuthContext";
import TodoList from "@/components/todo/TodoList";
import Navbar from "@/components/navbar/Navbar";

export default function TodoPage() {
  const router = useRouter();
  const { isAuthenticated, loading, role } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push('/login');
      } else if (role !== 'USER') { // Atur role yang diizinkan untuk halaman ini
        router.push('/'); // Redirect ke halaman tidak diizinkan
      }
    }
  }, [isAuthenticated, loading, role, router]);

  if (loading || !isAuthenticated || role !== 'USER') {
    return null;  // Halaman ini hanya akan ditampilkan jika role adalah 'USER'
  }

  return (
    
    <div className="bg-gray-100 flex h-screen">
      <Navbar />
      <div className="w-full max-w-md mx-auto pt-16 items-center justify-center min-h-screen">
        <header className="flex justify-between items-center py-4 px-6 bg-white shadow-md rounded-t-lg">
          <div className="text-gray-500">
            <i className="fas fa-star"></i>
            Search (Ctrl+/)
          </div>
          <div className="text-gray-700">
            Arnaud Akbar
            <img
              alt="User avatar"
              className="inline-block rounded-full ml-2"
              height="30"
              src="https://storage.googleapis.com/a1aa/image/F8PRZpjuqOqxP6VRrmuxThnK4hnJiZDutIl_Haiw9qk.jpg"
              width="30"
            />
          </div>
        </header>
        <main className="bg-white shadow-md rounded-b-lg p-6">
          <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">
            To Do
          </h1>
          <TodoList />
        </main>
      </div>
    </div>
  );
};