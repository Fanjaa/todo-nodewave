import React from "react";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-white border-r transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Logo atau Brand */}
      <div className={`p-4 flex min-h-16 ${isOpen ? 'justify-between' : 'justify-center'}`}>
        {isOpen && (
          <h1 className="text-xl font-bold text-[#4C4E64DE]">Nodewave</h1>
        )}
        <button onClick={toggleSidebar}>
          {isOpen ? (
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.48542 0.888444C7.00818 0.411209 6.23443 0.411209 5.75719 0.888444L0.510324 6.13531C0.0330169 6.61262 0.0330169 7.38649 0.510324 7.8638L5.75719 13.1107C6.23443 13.5879 7.00818 13.5879 7.48542 13.1107C7.96265 12.6334 7.96265 11.8597 7.48542 11.3824L3.96677 7.8638C3.48946 7.38649 3.48946 6.61262 3.96677 6.13531L7.48542 2.61667C7.96265 2.13943 7.96265 1.36568 7.48542 0.888444Z"
                fill="#4C4E64"
                fillOpacity="0.68"
              />
              <path
                d="M11.8683 0.888444L6.62141 6.13531C6.1441 6.61262 6.1441 7.38649 6.62141 7.8638L11.8683 13.1107C12.3455 13.5879 13.1193 13.5879 13.5965 13.1107C14.0737 12.6334 14.0737 11.8597 13.5965 11.3824L10.0779 7.8638C9.60055 7.38649 9.60055 6.61262 10.0779 6.13531L13.5965 2.61667C14.0737 2.13943 14.0737 1.36568 13.5965 0.888444C13.1193 0.411209 12.3455 0.411209 11.8683 0.888444Z"
                fill="#4C4E64"
                fillOpacity="0.38"
              />
            </svg>
          ) : (
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              transform="rotate(180)"
            >
              <path
                d="M7.48542 0.888444C7.00818 0.411209 6.23443 0.411209 5.75719 0.888444L0.510324 6.13531C0.0330169 6.61262 0.0330169 7.38649 0.510324 7.8638L5.75719 13.1107C6.23443 13.5879 7.00818 13.5879 7.48542 13.1107C7.96265 12.6334 7.96265 11.8597 7.48542 11.3824L3.96677 7.8638C3.48946 7.38649 3.48946 6.61262 3.96677 6.13531L7.48542 2.61667C7.96265 2.13943 7.96265 1.36568 7.48542 0.888444Z"
                fill="#4C4E64"
                fillOpacity="0.68"
              />
              <path
                d="M11.8683 0.888444L6.62141 6.13531C6.1441 6.61262 6.1441 7.38649 6.62141 7.8638L11.8683 13.1107C12.3455 13.5879 13.1193 13.5879 13.5965 13.1107C14.0737 12.6334 14.0737 11.8597 13.5965 11.3824L10.0779 7.8638C9.60055 7.38649 9.60055 6.61262 10.0779 6.13531L13.5965 2.61667C14.0737 2.13943 14.0737 1.36568 13.5965 0.888444C13.1193 0.411209 12.3455 0.411209 11.8683 0.888444Z"
                fill="#4C4E64"
                fillOpacity="0.38"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Menu Items */}
      <div className="p-2">
        <div
          className={`flex items-center space-x-4 mb-4 py-2 px-4 rounded-lg bg-[#4C4E6414] cursor-pointer ${
            !isOpen && "justify-center"
          }`}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          {isOpen && <span>Todo</span>}
        </div>
        {/* Tambahkan menu item lainnya sesuai kebutuhan */}
      </div>
    </aside>
  );
};

export default Sidebar;
