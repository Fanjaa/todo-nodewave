"use client";

import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import Button from "../ui/Button";
import React from "react";
import { Todo, TodoResponse } from "../../types/todo";
import api from "../../lib/axios";

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTodos = async () => {
    try {
      const response = await api.get<TodoResponse>("/todos");
      setTodos(response.data.content.entries);
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to fetch todos");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTodo = async (item: string) => {
    try {
      const response = await api.post<{ content: Todo }>("/todos", { item });
      setTodos((prev) => [...prev, response.data.content]);
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to add todo");
    }
  };
  const handleToggleTodo = async (id: string) => {
    try {
      const body = { action: "DONE" }; // Body untuk mengubah status task
      const token = localStorage.getItem('token'); // Ambil token dari localStorage

      // Cek apakah token ada
      if (!token) {
        throw new Error("Authorization token is missing");

      }  
      // Mengirim request PUT dengan body JSON dan Authorization header
      await api.put(
        `/todos/${id}/mark`, 
        body, // Body dikirim dalam request
        {
          headers: {
            Authorization: `Bearer ${token}`, // Header Authorization
          },
        }
      );
  
      // Mengupdate status todo di state setelah berhasil
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
        )
      );
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to toggle todo");
    }
  };
  

  const handleDeleteTodo = async (id: string) => {
    try {
      await api.delete(`/todos/${id}`);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to delete todo");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="new-task">
          Add a new task
        </label>
        <div className="flex">
          <input
            className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2"
            id="new-task"
            placeholder="Enter task"
            type="text"
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-r-lg"
            onClick={(e) => {
              const input = (e.target as HTMLElement)
                .previousElementSibling as HTMLInputElement;
              const item = input?.value;
              if (item) {
                handleAddTodo(item);
                input.value = ""; // Clear input after adding
              }
            }}
          >
            Add Todo
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {error && (
          <div className="p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>
        )}
        <div className="space-y-2">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center justify-between mb-2"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={todo.isDone}
                  onChange={() => handleToggleTodo(todo.id)}
                  className="mr-2"
                />
                <span
                  className={
                    todo.isDone ? "line-through text-gray-500" : "text-gray-700"
                  }
                >
                  {todo.item}
                </span>
              </div>
              <div>
                <i
                  className="fas fa-check text-green-500 cursor-pointer"
                  onClick={() => handleToggleTodo(todo.id)}
                ></i>
                <i
                  className="fas fa-times text-red-500 ml-2 cursor-pointer"
                  onClick={() => handleDeleteTodo(todo.id)}
                ></i>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        className="bg-red-500 text-white px-4 py-2 rounded-lg mt-4"
        onClick={() => {
          const selectedTodos = todos.filter((todo) => todo.isDone);
          selectedTodos.forEach((todo) => handleDeleteTodo(todo.id));
        }}
      >
        Delete Selected
      </button>
    </div>

    // <div className="space-y-4">
    //   {error && (
    //     <div className="p-3 bg-red-100 text-red-700 rounded-lg">
    //       {error}
    //     </div>
    //   )}
    //   <TodoForm onSubmit={handleAddTodo} />
    //   <div className="space-y-2">
    //     {todos.map(todo => (
    //       <TodoItem
    //         key={todo.id}
    //         todo={todo}
    //         onToggle={handleToggleTodo}
    //         onDelete={handleDeleteTodo}
    //       />
    //     ))}
    //   </div>
    // </div>
  );
}
