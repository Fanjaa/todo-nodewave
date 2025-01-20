"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import { TodoResponse } from "../../types/todo";
import Button from "../../components/ui/Button";
import api from "../../lib/axios";
import { useAuth } from "../../contexts/AuthContext";
import Sidebar from "@/components/sidebar/Sidebar";
import Navbar from "@/components/navbar/Navbar";

export default function AdminPage() {
  const router = useRouter();
  const { isAuthenticated, loading, role } = useAuth(); // Menggunakan loading untuk memeriksa status autentikasi
  const [todos, setTodos] = useState<TodoResponse["content"]["entries"]>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [finalSearchQuery, setFinalSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>(""); // state untuk filter status
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const fetchTodos = async () => {
    try {
      const filterValue = filterStatus
        ? `{"isDone": ${filterStatus === "done" ? true : false}}`
        : "";
      const response = await api.get<TodoResponse>("/todos", {
        params: {
          page,
          searchFilters: JSON.stringify({ "user.fullName": finalSearchQuery }), // Mengirimkan filter berdasarkan nama
          filters: filterValue,
        },
      });
      setTodos(response.data.content.entries);
      setTotalPages(response.data.content.totalPage);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    }
  };

  const handleSearch = () => {
    setFinalSearchQuery(searchQuery); // Update finalSearchQuery saat tombol diklik
  };

  useEffect(() => {
    // Pastikan hanya memanggil fetchTodos setelah login selesai dan role sesuai
    if (!loading) {
      // Periksa apakah loading autentikasi selesai
      if (!isAuthenticated) {
        router.push("/login"); // Redirect ke halaman login jika belum login
      } else if (role !== "ADMIN") {
        // Periksa role, hanya izinkan ADMIN yang bisa akses
        router.push("/"); // Redirect ke halaman lain jika bukan Admin
      } else {
        fetchTodos(); // Hanya fetch data jika sudah login dan role-nya Admin
      }
    }
  }, [
    isAuthenticated,
    loading,
    role,
    page,
    router,
    searchQuery,
    finalSearchQuery,
    filterStatus,
  ]); // Menggunakan dependensi yang diperlukan

  // Menangani kondisi loading dan autentikasi
  if (loading || !isAuthenticated || role !== "ADMIN") {
    return null; // Tidak menampilkan apapun sampai autentikasi selesai atau role tidak sesuai
  }

  return (
    <div className="min-h-screen font-inter bg-[#F7F7F9]">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div
        className={`transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        <nav className="relative z-10 border-b-2 border-gray-200 px-4 py-2 justify-center items-center pr-16">
          <Navbar />
        </nav>
        <main className="flex-1 p-6">
          <h1 className="text-[#323232] text-[32px] font-semibold p-8 pt-2">
            Todo Do
          </h1>
          <div className="bg-white px-8 py-10 rounded-xl">
            <div className="flex items-center mb-8 ">
              <div className="relative max-w-xs mr-4">
                <input
                  type="text"
                  placeholder="Search by Name"
                  className="w-full pl-12 pr-4 py-2 border-b focus:outline-none focus:border-b focus:border-blueButton"
                  value={searchQuery || ""}
                  onChange={(e) => setSearchQuery(e.target.value)} // Update search query
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 19L14.657 14.657M14.657 14.657C15.3998 13.9141 15.9891 13.0322 16.3912 12.0616C16.7932 11.0909 17.0002 10.0506 17.0002 9.00002C17.0002 7.94942 16.7932 6.90911 16.3912 5.93848C15.9891 4.96785 15.3998 4.08591 14.657 3.34302C13.9141 2.60014 13.0321 2.01084 12.0615 1.6088C11.0909 1.20675 10.0506 0.999817 8.99996 0.999817C7.94936 0.999817 6.90905 1.20675 5.93842 1.6088C4.96779 2.01084 4.08585 2.60014 3.34296 3.34302C1.84263 4.84335 0.999756 6.87824 0.999756 9.00002C0.999756 11.1218 1.84263 13.1567 3.34296 14.657C4.84329 16.1574 6.87818 17.0002 8.99996 17.0002C11.1217 17.0002 13.1566 16.1574 14.657 14.657Z"
                      stroke="#696974"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <button
                className="bg-blueButton text-white px-6 py-2 rounded-lg font-medium hover:bg-blue"
                onClick={handleSearch} // Panggil fetchTodos ketika tombol search diklik
              >
                Search
              </button>
              <div className="relative ml-14">
                <select
                  className="px-2 py-2 border-b focus:border-blueButton cursor-pointer"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)} // Update status filter
                >
                  <option value="">Filter by Status</option>
                  <option value="done">Done</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>
            <table className="w-full text-left justify-between">
              <thead className="text-lg text-[#323232] bg-[#F9F9F9]">
                <tr>
                  <th className="py-3 pl-2">Name</th>
                  <th className="py-3 pl-2">To do</th>
                  <th className="py-3 pl-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {todos.map((todo) => (
                  <tr
                    className="border-b border-[#E8E8E8] text-lg"
                    key={todo.id}
                  >
                    <td className="py-4 pl-2">{todo.user.fullName}</td>
                    <td className="py-4 pl-2">{todo.item}</td>
                    <td className="py-4 pl-2">
                      <span
                        className={`px-4 py-2 rounded-full text-base ${
                          todo.isDone
                            ? "bg-greenButton text-white"
                            : "bg-redButton text-white"
                        }`}
                      >
                        {todo.isDone ? "Success" : "Pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end mt-6 space-x-2">
              {/* Tombol Previous (Kiri) */}
              <button
                className="px-3 py-1 rounded-lg text-gray-800 hover:bg-gray-200"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                &lt;
              </button>

              {/* Tombol Halaman */}
              {[page === 1 ? page : page - 1, page === 1 ? page + 1 : page].map(
                (pageNum) =>
                  pageNum >= 1 && pageNum <= totalPage ? (
                    <button
                      key={pageNum}
                      className={`px-3 py-1 rounded-lg ${
                        pageNum === page
                          ? "bg-blueButton text-white"
                          : "border text-gray-800 hover:bg-gray-200 "
                      }`}
                      onClick={() => setPage(pageNum)}
                    >
                      {pageNum}
                    </button>
                  ) : null
              )}

              {/* Tombol Next (Kanan) */}
              <button
                className="px-3 py-1 rounded-lg  text-gray-800 hover:bg-gray-200"
                onClick={() => setPage((p) => Math.min(totalPage, p + 1))}
                disabled={page === totalPage}
              >
                &gt;
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
