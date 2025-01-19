import { useAuth } from "@/contexts/AuthContext";
import React, { useState } from "react";

const Navbar = () => {
  const { fullName, logout } = useAuth();  // Ambil fullName dan logout dari context
  const [showLogoutDropdown, setShowLogoutDropdown] = useState(false);  // State untuk toggle dropdown logout

  // Fungsi untuk menangani klik gambar profil
  const handleAvatarClick = () => {
    setShowLogoutDropdown((prevState) => !prevState);  // Toggle state untuk menampilkan/menyembunyikan dropdown
  };

  // Fungsi untuk menangani logout
  const handleLogout = () => {
    logout();  // Panggil fungsi logout dari context
    setShowLogoutDropdown(false);  // Sembunyikan dropdown setelah logout
  };

  return (
    <header className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-semibold">To Do</h2>
      <div className="flex items-center relative">
        <span className="mr-2">{fullName}</span>
        <img
          src="https://placehold.co/40x40"
          alt="User avatar"
          className="w-10 h-10 rounded-full cursor-pointer"
          onClick={handleAvatarClick}  // Menampilkan dropdown saat gambar diklik
        />

        {/* Dropdown Logout */}
        {showLogoutDropdown && (
          <div className="absolute top-10 right-0 mt-2 bg-white shadow-lg rounded-md w-32 p-2 z-10">
            <button
              onClick={handleLogout}
              className="w-full text-red-600 hover:bg-gray-100 px-4 py-2 rounded-md text-left"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
