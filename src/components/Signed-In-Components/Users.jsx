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

    fetchUsers();
  }, [filter]);

  return (
    <>
      <div className="font-bold mt-6 text-lg">Users</div>

      {loading ? (
        <div className="text-gray-500 mt-2 animate-pulse">Loading...</div>
      ) : error ? (
        <div className="text-red-500 mt-2">{error}</div>
      ) : (
        <>
          <div className="my-3">
            <input
              onChange={(e) => setFilter(e.target.value)}
              type="text"
              placeholder="Search users..."
              className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
          <div className="space-y-2">
            {users.length === 0 ? (
              <div className="text-gray-400 text-sm">No users found.</div>
            ) : (
              users.map((user) => <User key={user._id} user={user} />)
            )}
          </div>
        </>
      )}
    </>
  );
};

function User({ user }) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center border-b py-3 px-1 animate-fade-in">
      <div className="flex items-center">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex items-center justify-center text-xl font-semibold text-gray-700 mr-3">
          {user.firstName[0]}
        </div>
        <div className="text-sm text-gray-800 font-medium">
          {user.firstName} {user.lastName}
        </div>
      </div>
      <Button
        label={"Send Money"}
        onClick={() =>
          navigate(`/send?id=${user._id}&name=${user.firstName}`)
        }
      />
    </div>
  );
}
