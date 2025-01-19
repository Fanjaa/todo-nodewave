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


  const fetchTodos = async () => {
    try {
      const filterValue = filterStatus ? `{"isDone": ${filterStatus === "done" ? true : false}}` : "";
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
  }, [isAuthenticated, loading, role, page, router, searchQuery, finalSearchQuery, filterStatus]); // Menggunakan dependensi yang diperlukan

  // Menangani kondisi loading dan autentikasi
  if (loading || !isAuthenticated || role !== "ADMIN") {
    return null; // Tidak menampilkan apapun sampai autentikasi selesai atau role tidak sesuai
  }



  return (

//     <div className="flex h-screen">
//     <aside className="w-64 bg-white shadow-md">
//         <div className="p-4">
//             <h1 className="text-xl font-semibold">Nodewave</h1>
//         </div>
//         <nav className="mt-4">
//             <a href="#" className="flex items-center p-4 text-gray-700 bg-gray-100">
//                 <i className="fas fa-home mr-2"></i>
//                 To do
//             </a>
//         </nav>
//     </aside>
//     <main className="flex-1 p-6">
//         <header className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-semibold">To Do</h2>
//             <div className="flex items-center">
//                 <span className="mr-2">Ahmad Akbar</span>
//                 <img src="https://placehold.co/40x40" alt="User avatar" className="rounded-full"/>
//             </div>
//         </header>
//         <section className="bg-white p-6 rounded-lg shadow-md">
//             <div className="flex items-center mb-4">
//                 <div className="relative flex-1">
//                     <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
//                     <input type="text" placeholder="Search" className="pl-10 pr-4 py-2 border rounded-lg w-full"/>
//                 </div>
//                 <button className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg">Search</button>
//                 <div className="ml-4 relative">
//                     <button className="px-4 py-2 border rounded-lg flex items-center">
//                         Filter by Status
//                         <i className="fas fa-chevron-down ml-2"></i>
//                     </button>
//                 </div>
//             </div>
//             <table className="w-full text-left">
//                 <thead>
//                     <tr>
//                         <th className="py-2">Name</th>
//                         <th className="py-2">To do</th>
//                         <th className="py-2">Statue</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <tr>
//                         <td className="py-2">Ahmad Akbar</td>
//                         <td className="py-2">This</td>
//                         <td className="py-2">
//                             <span className="px-2 py-1 bg-green-200 text-green-800 rounded-full">Success</span>
//                         </td>
//                     </tr>
//                     <tr>
//                         <td className="py-2">Ahmad Akbar</td>
//                         <td className="py-2">Hello</td>
//                         <td className="py-2">
//                             <span className="px-2 py-1 bg-red-200 text-red-800 rounded-full">Pending</span>
//                         </td>
//                     </tr>
//                     <tr>
//                         <td className="py-2">Ahmad Akbar</td>
//                         <td className="py-2">Good</td>
//                         <td className="py-2">
//                             <span className="px-2 py-1 bg-green-200 text-green-800 rounded-full">Success</span>
//                         </td>
//                     </tr>
//                 </tbody>
//             </table>
//             <div className="flex justify-end mt-4">
//                 <button className="px-3 py-1 border rounded-lg">
//                     <i className="fas fa-chevron-left"></i>
//                 </button>
//                 <button className="px-3 py-1 border rounded-lg mx-1">1</button>
//                 <button className="px-3 py-1 bg-blue-600 text-white rounded-lg">2</button>
//                 <button className="px-3 py-1 border rounded-lg ml-1">
//                     <i className="fas fa-chevron-right"></i>
//                 </button>
//             </div>
//         </section>
//     </main>
// </div>

    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-6">
        <Navbar />
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <div className="relative w-full max-w-xs mr-4">
            <input
                type="text"
                placeholder="Search by Name"
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery || ""}
                onChange={(e) => setSearchQuery(e.target.value)} // Update search query
              />
              <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={handleSearch} // Panggil fetchTodos ketika tombol search diklik
            >
              Search
            </button>
            <div className="relative ml-4">
            <select
                className="px-4 py-2 border rounded-md"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)} // Update status filter
              >
                <option value="">Filter by Status</option>
                <option value="done">Done</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="py-2">Name</th>
                <th className="py-2">To do</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
            {todos.map((todo) => (
              <tr className="border-t" key={todo.id}>
                <td className="py-2">{todo.user.fullName}</td>
                <td className="py-2">{todo.item}</td>
                <td className="py-2">
                  <span className={`px-2 py-1 rounded-full ${
                        todo.isDone
                          ? 'bg-green-200 text-green-800'
                          : 'bg-yellow-200 text-yellow-800'
                      }`}>
                       {todo.isDone ? 'Done' : 'Pending'}
                  </span>
                </td>
              </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end mt-4 space-x-2">
  {/* Tombol Previous (Kiri) */}
  <button
    className="px-3 py-1 border rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300"
    onClick={() => setPage((p) => Math.max(1, p - 1))}
    disabled={page === 1}
  >
    &lt;
  </button>

 {/* Tombol Halaman */}
 {[page === 1 ? page : page - 1, page === 1 ? page + 1 : page].map((pageNum) =>
    pageNum >= 1 && pageNum <= totalPage ? (
      <button
        key={pageNum}
        className={`px-3 py-1 border rounded-md ${pageNum === page ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
        onClick={() => setPage(pageNum)}
      >
        {pageNum}
      </button>
    ) : null
  )}

  {/* Tombol Next (Kanan) */}
  <button
    className="px-3 py-1 border rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300"
    onClick={() => setPage((p) => Math.min(totalPage, p + 1))}
    disabled={page === totalPage}
  >
    &gt;
  </button>
</div>

        </div>
      </main>
     </div>
  );
}
