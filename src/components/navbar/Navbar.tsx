import React from "react";

const Navbar = () => {
  return (
    <header className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-semibold">To Do</h2>
      <div className="flex items-center">
        <span className="mr-2">Ahmad Akbar</span>
        <img
          src="https://placehold.co/40x40"
          alt="User avatar"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </header>
  );
};

export default Navbar;
