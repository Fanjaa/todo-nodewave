// // app/login/page.tsx
// 'use client';

// import { useState } from "react";
// import { useRouter } from "next/router";
// import { loginUser } from "../../utils/api";

// const LoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter(); // Gunakan useRouter untuk redirect

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();

//     try {
//       const isLoginSuccessful = await loginUser(email, password);
//       if (isLoginSuccessful) {
//         // Jika login berhasil, redirect ke halaman /todo
//         router.push('/todo');
//       }
//     } catch (error) {
//       alert("Login failed. Please check your credentials.");
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Email</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default LoginPage;
