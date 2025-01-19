import React from "react";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white shadow-md">
      <div className="p-4">
        <h1 className="text-xl font-semibold">Nodewave</h1>
      </div>
      <nav className="mt-4">
        <ul>
          <li className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md">
            <i className="fas fa-tasks mr-2"></i> To do
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
