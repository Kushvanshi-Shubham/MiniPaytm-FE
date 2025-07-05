import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../../config";

export const Appbar = () => {
  const [user, setUser] = useState({ firstName: "", initial: "U" });

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
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="shadow h-14 flex justify-between items-center px-4 bg-white">
      <div className="text-lg font-semibold text-gray-800">PayTM App</div>
      <div className="flex items-center space-x-3">
        <div className="text-sm text-gray-700">Hello, {user.firstName}</div>
        <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center text-gray-800 text-lg font-medium transition duration-200 hover:scale-105">
          {user.initial}
        </div>
      </div>
    </div>
  );
};
