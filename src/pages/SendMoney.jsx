import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../config";
import { useState } from "react";
import { SuccessPopup } from "../components/SuccessPopup";
import { LoadingSpinner } from "../components/LoadingSpinner";

export const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const id = searchParams.get("id");
  const name = searchParams.get("name");

  const validateAmount = () => {
    const numAmount = Number(amount);
    
    if (!amount || amount.trim() === "") {
      setError("Please enter an amount");
      return false;
    }
    
    if (Number.isNaN(numAmount) || numAmount <= 0) {
      setError("Please enter a valid amount greater than 0");
      return false;
    }
    
    if (numAmount > 100000) {
      setError("Maximum transfer limit is ₹1,00,000");
      return false;
    }
    
    setError("");
    return true;
  };

  const handleTransfer = async () => {
    if (!validateAmount()) return;

    const numAmount = Number(amount);

    try {
      setLoading(true);
      setMessage("");
      setError("");

      const token = localStorage.getItem("token");
      await axios.post(
        BACKEND_URL + "account/transfer",
        { to: id, amount: Math.round(numAmount * 100) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAmount("");
      setShowPopup(true);
    } catch (err) {
      console.error(err);
      const errorMsg = err.response?.data?.message || "Transfer failed. Please try again.";
      setError(errorMsg);
      setMessage("");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !loading) {
      handleTransfer();
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-40 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 shadow-xl">
            <LoadingSpinner size="lg" />
            <p className="mt-3 text-gray-700 font-medium">Processing transfer...</p>
          </div>
        </div>
      )}

      {showPopup && (
        <SuccessPopup
          message="Transfer Successful!"
          onClose={() => setShowPopup(false)}
          onBack={() => navigate("/dashboard")}
        />
      )}

      <div className="flex justify-center items-center min-h-screen p-4">
        <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8 animate-fade-in relative">
          {/* Back Button */}
          <button
            onClick={() => navigate("/dashboard")}
            className="absolute top-4 left-4 text-gray-600 hover:text-gray-900 flex items-center gap-1 transition"
          >
            <span className="text-xl">←</span>
            <span className="text-sm font-medium">Back</span>
          </button>

          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Send Money</h2>

          {/* Recipient Info */}
          <div className="flex items-center gap-4 mb-8 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
              <span className="text-2xl text-white font-bold">
                {name?.[0]?.toUpperCase() || "U"}
              </span>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Sending to</p>
              <h3 className="text-xl font-bold text-gray-800">{name}</h3>
            </div>
          </div>

          {/* Amount Input */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2 text-gray-700" htmlFor="amount">
              Amount (₹)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">₹</span>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  setError("");
                }}
                onKeyDown={handleKeyDown}
                placeholder="0.00"
                className={`w-full border ${error ? 'border-red-500' : 'border-gray-300'} rounded-xl pl-10 pr-4 py-3 text-lg font-medium focus:outline-none focus:ring-2 ${error ? 'focus:ring-red-400' : 'focus:ring-purple-400'} transition`}
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm mt-2 animate-fade-in flex items-center gap-1">
                <span>⚠</span> {error}
              </p>
            )}
          </div>

          {/* Send Button */}
          <button
            onClick={handleTransfer}
            disabled={loading}
            className={`w-full h-12 rounded-xl text-base font-semibold text-white ${
              loading 
                ? "bg-green-400 cursor-not-allowed" 
                : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl"
            } transition-all duration-200 transform active:scale-95`}
          >
            {loading ? (
              <LoadingSpinner size="sm" className="mx-auto" />
            ) : (
              "Send Money"
            )}
          </button>

          {message && (
            <div className="text-sm text-center mt-4 p-3 bg-blue-50 text-blue-700 rounded-lg animate-fade-in">
              {message}
            </div>
          )}

          {/* Quick Amount Buttons */}
          <div className="mt-6">
            <p className="text-xs text-gray-500 mb-2">Quick Select</p>
            <div className="grid grid-cols-4 gap-2">
              {[100, 500, 1000, 5000].map((quickAmount) => (
                <button
                  key={quickAmount}
                  onClick={() => setAmount(quickAmount.toString())}
                  className="py-2 px-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 hover:border-gray-400 transition"
                >
                  ₹{quickAmount}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
