import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../config";
import { useState } from "react";
import { SuccessPopup } from "../components/SuccessPopup";


export const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();
  const id = searchParams.get("id");
  const name = searchParams.get("name");

  const handleTransfer = async () => {
    const numAmount = Number(amount);

    if (!numAmount || numAmount <= 0) {
      setMessage("Please enter a valid amount.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const token = localStorage.getItem("token");
      await axios.post(
        BACKEND_URL + "account/transfer",
        { to: id, amount: Math.round(numAmount * 100) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAmount("");
      setShowPopup(true); // ✅ show modal
    } catch (err) {
      console.error(err);
      setMessage("❌ Transfer failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      
      {loading && (
        <div className="absolute inset-0 bg-black opacity-30 z-40 pointer-events-none" />
      )}

      
      {showPopup && (
        <SuccessPopup
          message="Transfer Successful!"
          onClose={() => setShowPopup(false)}
          onBack={() => navigate("/dashboard")}
        />
      )}

      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg w-96 p-6 animate-fade-in relative z-10">
          {/* Manual Back Button */}
          <button
            onClick={() => navigate("/dashboard")}
            className="absolute top-3 left-3 text-sm text-gray-600 hover:text-black"
          >
            ← Back
          </button>

          <h2 className="text-3xl font-bold text-center mb-6">Send Money</h2>

          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
              <span className="text-2xl text-white font-semibold">
                {name?.[0]?.toUpperCase() || "U"}
              </span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
          </div>

          <label className="block text-sm font-medium mb-1" htmlFor="amount">
            Amount (in ₹)
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full border rounded-md px-3 py-2 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          />

          <button
            onClick={handleTransfer}
            disabled={loading}
            className={`w-full h-10 rounded-md text-sm font-medium text-white ${
              loading ? "bg-green-400" : "bg-green-500 hover:bg-green-600"
            } transition`}
          >
            {loading ? "Processing..." : "Send"}
          </button>

          {message && (
            <div className="text-sm text-center mt-3 text-blue-600 animate-fade-in">
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
