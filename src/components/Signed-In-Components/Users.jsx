import { useState, useEffect } from "react";
import { Button } from "../Button";
import axios from "axios";
import { BACKEND_URL } from "../../../config";
import { useNavigate } from "react-router-dom";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BACKEND_URL}user/bulk?filter=${filter}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data.users);
        setError("");
      } catch (err) {
        setError("Failed to load users. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchUsers();
    }, 300); // Debounce search

    return () => clearTimeout(debounceTimer);
  }, [filter]);

  return (
    <div className="bg-white rounded-xl p-6 shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">Users</h2>
        <span className="text-sm text-gray-500">{users.length} found</span>
      </div>

      <div className="mb-4">
        <input
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
          type="text"
          placeholder="🔍 Search users by name..."
          className="w-full px-4 py-3 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
        />
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block h-8 w-8 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-gray-500 mt-2">Loading users...</p>
        </div>
      ) : error ? (
        <div className="text-center py-8">
          <p className="text-red-500">{error}</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {users.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <p className="text-lg">No users found</p>
              <p className="text-sm mt-1">Try adjusting your search</p>
            </div>
          ) : (
            users.map((user) => <User key={user._id} user={user} />)
          )}
        </div>
      )}
    </div>
  );
};

// eslint-disable-next-line react/prop-types
function User({ user }) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center border border-gray-100 rounded-lg py-3 px-4 hover:bg-gray-50 hover:shadow-md transition-all duration-200 animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="rounded-full h-12 w-12 bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-xl font-semibold text-white shadow-md">
          {user.firstName[0]}
        </div>
        <div>
          <div className="text-base text-gray-800 font-semibold">
            {user.firstName} {user.lastName}
          </div>
          <div className="text-xs text-gray-500">Click to send money</div>
        </div>
      </div>
      <Button
        label="Send Money"
        variant="success"
        onClick={() =>
          navigate(`/send?id=${user._id}&name=${user.firstName}`)
        }
      />
    </div>
  );
}
