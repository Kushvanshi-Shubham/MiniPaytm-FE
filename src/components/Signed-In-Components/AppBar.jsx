import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../../config";
import { useNavigate } from "react-router-dom";

export const Appbar = () => {
  const [user, setUser] = useState({ firstName: "", initial: "U" });
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BACKEND_URL}user/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { firstName } = response.data;
        setUser({
          firstName,
          initial: firstName?.[0]?.toUpperCase() || "U",
        });
      } catch (err) {
        console.error("Failed to fetch user data:", err);
        // Token might be invalid, redirect to signin
        if (err.response?.status === 401 || err.response?.status === 403) {
          localStorage.removeItem("token");
          navigate("/signin");
        }
      }
    };

    fetchUser();
  }, [navigate]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <div className="shadow-md h-16 flex justify-between items-center px-6 bg-white sticky top-0 z-40">
      <div className="flex items-center gap-2">
        <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          PayTM
        </div>
        <div className="text-xs text-gray-500 hidden sm:block">Mini</div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="text-sm text-gray-700 hidden sm:block">
          Hello, <span className="font-semibold">{user.firstName || "User"}</span>
        </div>
        
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-lg font-medium transition duration-200 hover:scale-110 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {user.initial}
          </button>
          
          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 animate-fade-in z-50">
              <button
                onClick={() => {
                  setShowMenu(false);
                  navigate("/dashboard");
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                🏠 Dashboard
              </button>
              <hr className="my-1" />
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                🚪 Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
