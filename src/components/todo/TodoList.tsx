import React, { useEffect, useState } from "react";
import { Todo, TodoResponse } from "../../types/todo";
import api from "../../lib/axios";

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);  // State untuk menyimpan daftar todo
  const [isLoading, setIsLoading] = useState(true);  // State untuk menangani status loading
  const [error, setError] = useState("");  // State untuk menangani pesan error

  // Fungsi untuk mengambil data todo dari API
  const fetchTodos = async () => {
    try {
      const response = await api.get<TodoResponse>("/todos");
      setTodos(response.data.content.entries); // Menyimpan todos dari response API
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to fetch todos"); // Menangani error jika gagal mengambil data
    } finally {
      setIsLoading(false);
    }
  };

  // Fungsi untuk menambahkan todo baru
  const handleAddTodo = async (item: string) => {
    try {
      const response = await api.post<{ content: Todo }>("/todos", { item });
      setTodos((prev) => [...prev, response.data.content]);  // Menambahkan todo baru ke daftar
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to add todo"); // Menangani error jika gagal menambah todo
    }
  };

  // Fungsi untuk toggle status todo
  const handleToggleTodo = async (id: string) => {
    try {
      const currentTodo = todos.find((todo) => todo.id === id);
      const body = { action: currentTodo?.isDone ? "UNDONE" : "DONE" };  // Menentukan aksi berdasarkan status saat ini
      const token = localStorage.getItem("token"); // Ambil token dari localStorage

      if (!token) {
        throw new Error("Authorization token is missing"); // Jika token tidak ada, lempar error
      }

      await api.put(`/todos/${id}/mark`, body, {
        headers: { Authorization: `Bearer ${token}` }, // Kirim token di headers
      });

      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, isDone: !todo.isDone } : todo // Update status todo yang diuba
        )
      );
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to toggle todo"); // Menangani error jika gagal toggle
    }
  };

  // Fungsi untuk menghapus todo
  const handleDeleteTodo = async (id: string) => {
    try {
      await api.delete(`/todos/${id}`); // Hapus todo dari API
      setTodos((prev) => prev.filter((todo) => todo.id !== id)); // Hapus todo dari state
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to delete todo"); // Menangani error jika gagal menghapus
    }
  };

  // Ambil data todos saat komponen pertama kali dimuat
  useEffect(() => {
    fetchTodos();
  }, []);

  // Sorting todos berdasarkan isDone: true di atas, false di bawah
  const sortedTodos = todos.sort((a, b) => {
    if (a.isDone === b.isDone) return 0;
    return a.isDone ? -1 : 1; // Urutkan yang isDone: true di atas
  });

  return (
    <div className="flex flex-col bg-white border-[1px] border-[#B5B5BE] p-12 gap-6 w-full min-w-[958px] rounded-3xl shadow-todoForm max-lg:min-w-0">
      <div className="mb-4">
        <label
          className="block mb-2 font-rubik text-[20px] text-[#7D7D7D]"
          htmlFor="new-task"
        >
          Add a new task
        </label>
        <div className="flex gap-8 max-sm:flex-col max-sm:gap-2">
          <input
            className="flex-1 border-b border-gray-300  bg-backgroundPrimary rounded-lg px-4 py-2 font-rubik font-medium text-3xl focus:border-b-2 focus:!border-[#174286] focus:outline-none focus:bg-backgroundPrimary border max-sm:w-full"
            id="new-task"
            placeholder="Enter task"
            type="text"
          />
          <button
            className="bg-blueButton text-white font-rubik text-2xl px-6 py-2 rounded-lg max-sm:w-full hover:bg-blueCustom"
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
          {isLoading ? (
             <div className="text-center font-rubik text-xl font-medium text-gray-500">
             Loading Todos...
           </div>
          ) : (
            sortedTodos.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center justify-between mb-2 border-b border-[#979797] py-3"
              >
                <div className="flex items-center text-[32px] font-rubik text-[#323232]">
                  <input
                    type="checkbox"
                    id="checkbox"
                    checked={todo.isDone}
                    onChange={() => handleToggleTodo(todo.id)}
                    className="appearance-none w-10 h-10  bg-gray-200 rounded-sm checked:bg-[#6DD230] checked:bg-opacity-15 cursor-pointer relative mr-8 checkbox-green"
                    style={{'--checkmark-size': '32px'}as React.CSSProperties}
                  />
                  <span className="text-gray-700 font-rubik">{todo.item}</span>
                </div>
                <div>
                  {todo.isDone ? (
                    <svg
                      width="36"
                      height="36"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="cursor-pointer"
                      onClick={() => handleDeleteTodo(todo.id)}
                    >
                      <path
                        d="M5.85991 34.14C3.94971 32.295 2.42607 30.0881 1.37789 27.6481C0.329706 25.208 -0.222018 22.5836 -0.245094 19.928C-0.268171 17.2724 0.237863 14.6388 1.24348 12.1809C2.2491 9.72297 3.73416 7.48993 5.61201 5.61208C7.48987 3.73422 9.72291 2.24916 12.1808 1.24354C14.6388 0.237924 17.2724 -0.26811 19.9279 -0.245033C22.5835 -0.221957 25.2079 0.329767 27.648 1.37795C30.0881 2.42613 32.295 3.94977 34.1399 5.85998C37.7831 9.63202 39.799 14.6841 39.7534 19.928C39.7078 25.1719 37.6044 30.1882 33.8963 33.8963C30.1881 37.6045 25.1719 39.7079 19.9279 39.7535C14.684 39.799 9.63196 37.7831 5.85991 34.14ZM8.67991 31.32C11.6822 34.3222 15.7541 36.0089 19.9999 36.0089C24.2457 36.0089 28.3177 34.3222 31.3199 31.32C34.3222 28.3177 36.0088 24.2458 36.0088 20C36.0088 15.7542 34.3222 11.6822 31.3199 8.67998C28.3177 5.67772 24.2457 3.99108 19.9999 3.99108C15.7541 3.99108 11.6822 5.67772 8.67991 8.67998C5.67766 11.6822 3.99102 15.7542 3.99102 20C3.99102 24.2458 5.67766 28.3177 8.67991 31.32ZM28.4799 14.34L22.8199 20L28.4799 25.66L25.6599 28.48L19.9999 22.82L14.3399 28.48L11.5199 25.66L17.1799 20L11.5199 14.34L14.3399 11.52L19.9999 17.18L25.6599 11.52L28.4799 14.34Z"
                        fill="#F01414"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="36"
                      height="36"
                      viewBox="0 0 38 38"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="cursor-pointer"
                      onClick={() => handleToggleTodo(todo.id)}
                    >
                      <path
                        d="M16.0717 26.1901L9 19.1167L11.3567 16.7601L16.0717 21.4734L25.4983 12.0451L27.8567 14.4034L16.0717 26.1867V26.1901Z"
                        fill="#6DD230"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0.666748 19.0001C0.666748 8.87508 8.87508 0.666748 19.0001 0.666748C29.1251 0.666748 37.3334 8.87508 37.3334 19.0001C37.3334 29.1251 29.1251 37.3334 19.0001 37.3334C8.87508 37.3334 0.666748 29.1251 0.666748 19.0001ZM19.0001 34.0001C17.0303 34.0001 15.0797 33.6121 13.2598 32.8583C11.4399 32.1045 9.78636 30.9996 8.39348 29.6067C7.0006 28.2138 5.89571 26.5602 5.14189 24.7403C4.38807 22.9205 4.00008 20.9699 4.00008 19.0001C4.00008 17.0303 4.38807 15.0797 5.14189 13.2598C5.89571 11.4399 7.0006 9.78636 8.39348 8.39348C9.78636 7.0006 11.4399 5.89571 13.2598 5.14189C15.0797 4.38807 17.0303 4.00008 19.0001 4.00008C22.9783 4.00008 26.7936 5.58043 29.6067 8.39348C32.4197 11.2065 34.0001 15.0218 34.0001 19.0001C34.0001 22.9783 32.4197 26.7936 29.6067 29.6067C26.7936 32.4197 22.9783 34.0001 19.0001 34.0001Z"
                        fill="#6DD230"
                      />
                    </svg>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <button
        className="bg-redButton rounded-lg text-white px-6 py-2 w-[246px] min-h-[52px] mt-4 font-rubik text-2xl max-sm:w-full hover:bg-red-500"
        onClick={() => {
          const selectedTodos = todos.filter((todo) => todo.isDone);
          selectedTodos.forEach((todo) => handleDeleteTodo(todo.id));
        }}
      >
        Delete Selected
      </button>
    </div>
  );
}
