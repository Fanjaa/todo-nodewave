"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { TextField } from "@mui/material";

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await login(formData);
      router.push("/todo");
    } catch (error: any) {
      setError(error.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>
      )}

      <div className="mb-4">
        <TextField
          id="email"
          type="email"
          label="Input Your Email"
          value={formData.email}
          variant="outlined"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
          fullWidth
          required
          sx={{
            "& .MuiFormLabel-asterisk": {
              display: "none", // Menyembunyikan bintang
            },
            '& .MuiOutlinedInput-root': {
              borderRadius: "10px", // Set border radius
              color: '#50B5FF',
              '& fieldset': {
                borderColor: '#e0e0e0', // Warna border default
              },
              '&:hover fieldset': {
                borderColor: '#bdbdbd', // Warna border saat hover
              },
              '&.Mui-focused fieldset': {
                borderWidth: '1px', // Border saat focus juga tipis
                borderColor: '#50B5FF', // Ubah ke warna yang diinginkan saat focus (contoh: merah)
              },
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#50B5FF'
            },
          }}
        />
      </div>

      <div className="mb-4">
        <TextField
          id="password"
          label="Input Your Password"
          type="password"
          variant="outlined"
          fullWidth
          value={formData.password}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, password: e.target.value }))
          }
          required
          sx={{
            "& .MuiFormLabel-asterisk": {
              display: "none", // Menyembunyikan bintang
            },
            '& .MuiOutlinedInput-root': {
              borderRadius: "10px", // Set border radius
              '& fieldset': {
                borderColor: '#e0e0e0', // Warna border default
              },
              '&:hover fieldset': {
                borderColor: '#bdbdbd', // Warna border saat hover
              },
              '&.Mui-focused fieldset': {
                borderWidth: '1px', // Border saat focus juga tipis
                borderColor: '#50B5FF', // Ubah ke warna yang diinginkan saat focus (contoh: merah)
              },
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#50B5FF',
            },
          }}
        />
      </div>

      <div className="flex items-center justify-between mb-4">
        <label className="flex items-center text-gray-700">
          <input className="peer form-checkbox accent-blue" type="checkbox" />
          <span className="ml-2 text-[14px] text-[#696974]">Remember Me</span>
        </label>
        <a className="text-blue text-[14px]" href="#">
          Forgot Password?
        </a>
      </div>

      <Button
        className="w-full bg-blueButton text-fontButton py-2 rounded-[10px] h-[48px]"
        type="submit"
        isLoading={isLoading}
      >
        Login
      </Button>
    </form>

    // <form onSubmit={handleSubmit} className="space-y-4">
    //   {error && (
    //     <div className="p-3 bg-red-100 text-red-700 rounded-lg">
    //       {error}
    //     </div>
    //   )}
    //   <Input
    //     label="Email"
    //     type="email"
    //     value={formData.email}
    //     onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
    //     required
    //   />
    //   <Input
    //     label="Password"
    //     type="password"
    //     value={formData.password}
    //     onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
    //     required
    //   />
    //   <Button type="submit" isLoading={isLoading} className="w-full">
    //     Login
    //   </Button>
    // </form>
  );
}
