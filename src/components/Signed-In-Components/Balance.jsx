import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../../config";

export const Balance = () => {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBalance = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BACKEND_URL}account/balance`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const paise = response.data.balance;
      const rupees = (paise / 100).toFixed(2);
      setBalance(rupees);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Unable to fetch balance.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 shadow-md mb-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-gray-600 text-sm font-medium block mb-1">Available Balance</span>
          {loading ? (
            <span className="text-2xl font-bold text-gray-400 animate-pulse">Loading...</span>
          ) : error ? (
            <div>
              <span className="text-red-500 text-sm">{error}</span>
              <button 
                onClick={fetchBalance}
                className="ml-2 text-blue-600 text-sm underline"
              >
                Retry
              </button>
            </div>
          ) : (
            <span className="text-3xl font-bold text-gray-800">₹ {balance}</span>
          )}
        </div>
        <div className="h-16 w-16 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
          <span className="text-3xl">💰</span>
        </div>
      </div>
    </div>
  );
};
