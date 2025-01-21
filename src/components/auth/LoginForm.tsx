"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Button from "../ui/Button";
import { TextField } from "@mui/material";
import inputStyle from "@/styles/inputStyles";

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // State untuk menyimpan data form (email & password)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Fungsi yang dipanggil saat form dikirim
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Mencegah reload halaman default pada form submission
    setIsLoading(true); // Set state loading ke true selama proses login
    setError(""); // Reset error sebelum mencoba login

    try {
      await login(formData); // Mengirim data ke fungsi login dari context
      router.push("/todo"); // Arahkan ke halaman "/todo" setelah login berhasil
    } catch (error: any) {
      // Menangani error dari response API
      const errorMessage =
        Array.isArray(error.response?.data?.errors) &&
        error.response?.data?.errors.length === 0
          ? error.response?.data?.message || "Login failed"
          : error.response?.data?.errors || "Login failed";
      setError(errorMessage); // Set pesan error ke state
    } finally {
      setIsLoading(false); // Set loading kembali ke false setelah request selesai
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
          sx={inputStyle}
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
          sx={inputStyle}
        />
      </div>

      <div className="flex items-center justify-between mb-4">
        <label className="flex items-center text-gray-700">
          <input
            id="checkbox"
            className="appearance-none w-4 h-4 bg-gray-200 rounded-sm checked:bg-blue cursor-pointer relative checkbox-white"
            type="checkbox"
            style={
              {
                "--checkmark-size": "15px",
                "--stroke-color": "#ffffff",
              } as React.CSSProperties
            }
          />
          <span className="ml-2 text-[14px] text-[#696974]">Remember Me</span>
        </label>
        <a className="text-blue text-[14px]" href="#">
          Forgot Password?
        </a>
      </div>

      <Button
        className="w-full bg-blueButton text-fontButton py-2 rounded-[10px] h-[48px] hover:bg-blueCustom"
        type="submit"
        isLoading={isLoading}
      >
        Login
      </Button>
    </form>
  );
}
