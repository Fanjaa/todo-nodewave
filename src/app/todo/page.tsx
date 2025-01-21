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
        router.push("/login");
      } else if (role !== "USER") {
        // Atur role yang diizinkan untuk halaman ini
        router.push("/"); // Redirect ke halaman tidak diizinkan
      }
    }
  }, [isAuthenticated, loading, role, router]);

  if (loading || !isAuthenticated || role !== "USER") {
    return null; // Halaman ini hanya akan ditampilkan jika role adalah 'USER'
  }

  return (
    <div className="min-h-screen relative bg-backgroundSecondary overflow-x-hidden ">
      {/* <div className="relative top-0 left-0 w-full min-h-[50vh] z-0"> */}
      <svg
        className="absolute top-0 left-0 w-full min-h-[50vh] max-sm:min-h-[25vh]" // Pastikan lebar dan tinggi SVG menyesuaikan
        viewBox="0 0 1600 497"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 0H1600V446.777C1600 475.618 1575.67 498.479 1546.88 496.68L46.8811 402.93C20.5294 401.283 0 379.431 0 353.027V0Z"
          fill="white"
        />
      </svg>
      {/* </div> */}

      <nav className="relative z-10 border-b-2 border-gray-200 px-4 py-2 justify-center items-center pr-16 bg-white">
        <Navbar />
      </nav>

      <div className="flex flex-col relative w-full max-w-lg mx-auto pt-16 items-center justify-center min-h-screen z-10">
        <main className="p-6">
          <h1 className="text-center text-blue-600 mb-12 font-inter text-5xl font-bold text-[#174286]">
            To Do
          </h1>
          <TodoList />
        </main>
      </div>
    </div>
    // </div>
  );
}
