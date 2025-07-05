import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../../config";

export const Balance = () => {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BACKEND_URL}account/balance`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const paise = response.data.balance;
        const rupees = (paise / 100).toFixed(2);
        setBalance(rupees);
      } catch (err) {
        console.error(err);
        setError("Unable to fetch balance.");
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, []);

  return (
    <div className="flex items-center gap-4 p-2 text-gray-800 animate-fade-in">
      <span className="font-bold text-lg">Your balance:</span>
      {loading ? (
        <span className="text-gray-500 text-sm animate-pulse">Loading...</span>
      ) : error ? (
        <span className="text-red-500 text-sm">{error}</span>
      ) : (
        <span className="font-semibold text-lg">₹{balance}</span>
      )}
    </div>
  );
};
