// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import axios from "axios";

// export default function RegisterPage() {
//   const [email, setEmail] = useState<string>("");
//   const [fullName, setFullName] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_BASE_URL}/register`,
//         {
//           email,
//           fullName,
//           password,
//         }
//       );

//       // After successful registration, redirect to the login page
//       router.push("/login");
//     } catch (error: any) {
//       setError("Registration failed. Please try again.");
//       console.error("Registration error:", error.response?.data || error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen">
//       <form onSubmit={handleSubmit} className="w-full max-w-md p-8 border rounded-lg">
//         <h1 className="text-2xl font-semibold mb-4">Register</h1>
        
//         {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

//         <div className="mb-4">
//           <label className="block text-sm font-medium" htmlFor="email">Email</label>
//           <input
//             type="email"
//             id="email"
//             className="w-full p-2 mt-1 border rounded"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-medium" htmlFor="fullName">Full Name</label>
//           <input
//             type="text"
//             id="fullName"
//             className="w-full p-2 mt-1 border rounded"
//             value={fullName}
//             onChange={(e) => setFullName(e.target.value)}
//             required
//           />
//         </div>

//         <div className="mb-6">
//           <label className="block text-sm font-medium" htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             className="w-full p-2 mt-1 border rounded"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>

//         <button 
//           type="submit" 
//           className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//           disabled={loading}
//         >
//           {loading ? "Registering..." : "Register"}
//         </button>
//       </form>
//     </div>
//   );
// }
