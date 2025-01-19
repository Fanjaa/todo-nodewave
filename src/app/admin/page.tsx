'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { TodoResponse } from '../../types/todo';
import Button from '../../components/ui/Button';
import api from '../../lib/axios';
import { useAuth } from '../../contexts/AuthContext';

export default function AdminPage() {
  const router = useRouter();
  const { isAuthenticated, loading, role } = useAuth();  // Menggunakan loading untuk memeriksa status autentikasi
  const [todos, setTodos] = useState<TodoResponse['content']['entries']>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPages] = useState(1); 

  const fetchTodos = async () => {
    try {
      const response = await api.get<TodoResponse>('/todos', {
        params: { page }
      });
      setTodos(response.data.content.entries);
      setTotalPages(response.data.content.totalPage);
    } catch (error) {
      console.error('Failed to fetch todos:', error);
    }
  };
  useEffect(() => {
    // Pastikan hanya memanggil fetchTodos setelah login selesai dan role sesuai
    if (!loading) {  // Periksa apakah loading autentikasi selesai
      if (!isAuthenticated) {
        router.push('/login');  // Redirect ke halaman login jika belum login
      } else if (role !== 'ADMIN') {  // Periksa role, hanya izinkan ADMIN yang bisa akses
        router.push('/');  // Redirect ke halaman lain jika bukan Admin
      } else {
        fetchTodos();  // Hanya fetch data jika sudah login dan role-nya Admin
      }
    }
  }, [isAuthenticated, loading, role, page, router]);

  // Menangani kondisi loading dan autentikasi
  if (loading || !isAuthenticated || role !== 'ADMIN') {
    return null;  // Tidak menampilkan apapun sampai autentikasi selesai atau role tidak sesuai
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Todo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created At
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {todos.map((todo) => (
                <tr key={todo.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {/* {todo.user?.email} */}
                  </td>
                  <td className="px-6 py-4">{todo.item}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        todo.isDone
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {todo.isDone ? 'Done' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(todo.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-center space-x-2">
          <Button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </Button>
          <Button
            onClick={() => setPage((p) => Math.min(totalPage, p + 1))}
            disabled={page === totalPage}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
