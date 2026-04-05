import { useState, useContext } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FiUser, FiSettings, FiLogOut } from "react-icons/fi";
import { MdOutlineDashboard } from "react-icons/md"; // Added dashboard icon
import { FaPowerOff } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { AuthContext } from "../context/AuthContext";

const ProfileDropdown = ({ fullMode = false }) => {
  const { authDetails } = useContext(AuthContext);
  const user = authDetails?.user;
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();

  if (!user) return null; // Don't render if no user data is available

  return (
    <div className="relative text-gray-700">
      {/* Profile Trigger */}
      <div
        className="flex items-center gap-2 ml-2 font-medium cursor-pointer select-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="text-sm">
          Hello,{" "}
          {(user?.full_name?.length > 7
            ? `${user?.full_name?.slice(0, 7)}...`
            : user?.full_name) || "User"}
        </p>
        <div className="flex items-center rounded-full bg-gray-200/50 w-max p-1">
          {user?.profile?.profileImage ? (
            <img
              src={`${import.meta.env.VITE_BASE_URL}${user?.profile?.profileImage}`}
              alt="User Avatar"
              className="w-6 h-6 md:w-8 md:h-8 rounded-full object-cover"
            />
          ) : (
            <span className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gray-300 flex items-center justify-center">
              <FaPowerOff size={16} className="text-red-500" />
            </span>
          )}

          <span className="w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center">
            <IoIosArrowDown
              size={18}
              className={`transition-transform duration-200 ${isOpen ? "-rotate-180" : ""}`}
            />
          </span>
        </div>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Overlay to close dropdown when clicking outside */}
          <div className="fixed inset-0 z-[999]" onClick={() => setIsOpen(false)} />

          <div className="absolute z-[1000] right-0 mt-2 w-48 bg-white font-medium border border-gray-100 rounded-xl shadow-xl overflow-hidden">
            <ul className="py-2 text-sm text-gray-700">
              {/* Dashboard Link - Based on Role */}
              <Link
                to={user?.role === "vendor" ? "/vendor" : "/buyer"}
                className="px-4 py-2.5 flex items-center gap-2 hover:bg-gray-50 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <MdOutlineDashboard size={18} className="text-gray-400" />
                Dashboard
              </Link>

              {fullMode && (
                <>
                  <Link
                    to={
                      user?.role === "vendor"
                        ? "/vendor/profile"
                        : "/buyer/profile"
                    }
                    className="px-4 py-2.5 flex items-center gap-2 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <FiUser size={18} className="text-gray-400" /> Profile
                  </Link>

                  {user?.role === "vendor" && (
                    <Link
                      to="/vendor/settings"
                      className="px-4 py-2.5 flex items-center gap-2 hover:bg-gray-50 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <FiSettings size={18} className="text-gray-400" /> Settings
                    </Link>
                  )}
                </>
              )}

              <hr className="my-1 border-gray-100" />

              <li
                className="px-4 py-2.5 flex items-center gap-2 text-red-500 hover:bg-red-50 cursor-pointer transition-colors"
                onClick={() => {
                  setIsOpen(false);
                  logout.mutate();
                }}
              >
                <FiLogOut size={18} /> Logout
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileDropdown;