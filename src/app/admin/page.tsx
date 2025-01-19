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
  

  const fetchTodos = async () => {
    try {
      const response = await api.get<TodoResponse>("/todos", {
        params: { page },
      });
      setTodos(response.data.content.entries);
      setTotalPages(response.data.content.totalPage);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    }
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
  }, [isAuthenticated, loading, role, page, router]);

  // Menangani kondisi loading dan autentikasi
  if (loading || !isAuthenticated || role !== "ADMIN") {
    return null; // Tidak menampilkan apapun sampai autentikasi selesai atau role tidak sesuai
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-6">
        <Navbar />
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <div className="relative w-full max-w-xs mr-4">
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Search
            </button>
            <div className="relative ml-4">
              <button className="flex items-center px-4 py-2 border rounded-md">
                Filter by Status <i className="fas fa-chevron-down ml-2"></i>
              </button>
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

    // <div className="min-h-screen bg-gray-50 py-8">
    //   <div className="max-w-6xl mx-auto px-4">
    //     <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
    //     <div className="bg-white rounded-lg shadow overflow-hidden">
    //       <table className="min-w-full divide-y divide-gray-200">
    //         <thead className="bg-gray-50">
    //           <tr>
    //             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //               Name
    //             </th>
    //             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //               Todo
    //             </th>
    //             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //               Status
    //             </th>
    //             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //               Created At
    //             </th>
    //           </tr>
    //         </thead>
    //         <tbody className="bg-white divide-y divide-gray-200">
    //           {todos.map((todo) => (
    //             <tr key={todo.id}>
    //               <td className="px-6 py-4 whitespace-nowrap">
    //                 {todo.user.fullName}
    //               </td>
    //               <td className="px-6 py-4">{todo.item}</td>
    //               <td className="px-6 py-4 whitespace-nowrap">
    //                 <span
    //                   className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
    //                     todo.isDone
    //                       ? 'bg-green-100 text-green-800'
    //                       : 'bg-yellow-100 text-yellow-800'
    //                   }`}
    //                 >
    //                   {todo.isDone ? 'Done' : 'Pending'}
    //                 </span>
    //               </td>
    //               <td className="px-6 py-4 whitespace-nowrap">
    //                 {new Date(todo.createdAt).toLocaleDateString()}
    //               </td>
    //             </tr>
    //           ))}
    //         </tbody>
    //       </table>
    //     </div>
    //     <div className="mt-4 flex justify-center space-x-2">
    //       <Button
    //         onClick={() => setPage((p) => Math.max(1, p - 1))}
    //         disabled={page === 1}
    //       >
    //         Previous
    //       </Button>
    //       <Button
    //         onClick={() => setPage((p) => Math.min(totalPage, p + 1))}
    //         disabled={page === totalPage}
    //       >
    //         Next
    //       </Button>
    //     </div>
    //   </div>
    // </div>
  );
}
