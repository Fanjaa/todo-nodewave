"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import TodoList from "@/components/todo/TodoList";

export default function TodoPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);
  

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md mx-auto">
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

    // <div className="min-h-screen bg-gray-50 py-8">
    //   <div className="max-w-4xl mx-auto px-4">
    //     <div className="flex justify-between items-center mb-8">
    //       <h1 className="text-3xl font-bold">Todo List</h1>
    //       <Button variant="secondary" onClick={logout}>
    //         Logout
    //       </Button>
    //     </div>
    //     <TodoList />
    //   </div>
    // </div>
  );
}
