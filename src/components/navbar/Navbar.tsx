import { useAuth } from "@/contexts/AuthContext";
import React, { useState } from "react";

const Navbar = () => {
  const { fullName, logout } = useAuth(); // Ambil fullName dan logout dari context
  const [showLogoutDropdown, setShowLogoutDropdown] = useState(false); // State untuk toggle dropdown logout

  // Fungsi untuk menangani klik gambar profil
  const handleAvatarClick = () => {
    setShowLogoutDropdown((prevState) => !prevState); // Toggle state untuk menampilkan/menyembunyikan dropdown
  };

  // Fungsi untuk menangani logout
  const handleLogout = () => {
    logout(); // Panggil fungsi logout dari context
    setShowLogoutDropdown(false); // Sembunyikan dropdown setelah logout
  };

  return (
    <header className="flex justify-between items-center font-inter">
      <div className="flex gap-2">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"
            fill="#4C4E64"
            fillOpacity="0.54"
          />
        </svg>
        <h2 className="text-[#4C4E6461]">Search (Ctrl+/)</h2>
      </div>
      <div className="flex items-center relative gap-2">
        <span className="mr-2">{fullName}</span>
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="User avatar"
          className="w-10 h-10 rounded-full cursor-pointer"
          onClick={handleAvatarClick} // Menampilkan dropdown saat gambar diklik
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
