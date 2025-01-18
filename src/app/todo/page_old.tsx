// "use client";
// import { useState, useEffect } from "react";
// import axios from "axios";

// const apiUrl = process.env.NEXT_PUBLIC_API_URL ;

// // Komponen untuk menampilkan daftar todo
// const TodoList = ({ todos, onToggle, onDelete }: any) => {
//   return (
//     <ul>
//       {todos.map((todo: any) => (
//         <li key={todo.id} className="flex justify-between items-center mb-2">
//           <span className={`${todo.isDone ? "line-through text-gray-500" : ""}`}>
//             {todo.title}
//           </span>
//           <div>
//             <button
//               onClick={() => onToggle(todo.id, todo.isDone)}
//               className="bg-green-500 text-white p-1 mr-2"
//             >
//               {todo.isDone ? "Undo" : "Done"}
//             </button>
//             <button
//               onClick={() => onDelete(todo.id)}
//               className="bg-red-500 text-white p-1"
//             >
//               Delete
//             </button>
//           </div>
//         </li>
//       ))}
//     </ul>
//   );
// };

// // Komponen untuk form input todo baru
// const TodoInput = ({ onAdd }: any) => {
//   const [newTodo, setNewTodo] = useState<string>("");

//   const handleAddTodo = () => {
//     if (newTodo.trim()) {
//       onAdd(newTodo);
//       setNewTodo("");
//     }
//   };

//   return (
//     <div className="mb-4">
//       <input
//         type="text"
//         className="border p-2 mr-2"
//         placeholder="New Todo"
//         value={newTodo}
//         onChange={(e) => setNewTodo(e.target.value)}
//       />
//       <button
//         className="bg-blue-500 text-white p-2"
//         onClick={handleAddTodo}
//       >
//         Add Todo
//       </button>
//     </div>
//   );
// };

// // Halaman Todo
// const TodoPage = () => {
//   const [todos, setTodos] = useState<any[]>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(false);

//   const fetchTodos = async () => {
//     try {
//       const response = await axios.get(`${apiUrl}/todos`);
//       setTodos(response.data.content);
//     } catch (error) {
//       console.error("Failed to fetch todos", error);
//     }
//   };

//   const addTodo = async (title: string) => {
//     setIsLoading(true);
//     try {
//       await axios.post(
//         `${apiUrl}/todos`,
//         { title },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       fetchTodos();
//     } catch (error) {
//       console.error("Failed to add todo", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const toggleTodoStatus = async (id: string, isDone: boolean) => {
//     try {
//       await axios.put(
//         `${apiUrl}/todos/${id}`,
//         { isDone: !isDone },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       fetchTodos();
//     } catch (error) {
//       console.error("Failed to update todo status", error);
//     }
//   };

//   const deleteTodo = async (id: string) => {
//     try {
//       await axios.delete(`${apiUrl}/todos/${id}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       fetchTodos();
//     } catch (error) {
//       console.error("Failed to delete todo", error);
//     }
//   };

//   useEffect(() => {
//     fetchTodos();
//   }, []);

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Todo List</h1>
//       <TodoInput onAdd={addTodo} />
//       {isLoading ? (
//         <p>Loading...</p>
//       ) : (
//         <TodoList todos={todos} onToggle={toggleTodoStatus} onDelete={deleteTodo} />
//       )}
//     </div>
//   );
// };

// export default TodoPage;
