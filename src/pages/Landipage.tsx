import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if already logged in
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Logo/Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-6xl font-extrabold mb-4">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              MiniPaytm
            </span>
          </h1>
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <span className="text-3xl">💸</span>
            <p className="text-xl font-medium">Fast. Secure. Simple.</p>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white shadow-2xl rounded-3xl p-10 mb-8 animate-fade-in">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Your Digital Wallet
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Send money to friends and family instantly. Track your balance. 
            Manage your transactions with ease.
          </p>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 bg-blue-50 rounded-xl">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="font-bold text-gray-800 mb-2">Instant Transfers</h3>
              <p className="text-sm text-gray-600">Send money in seconds with real-time processing</p>
            </div>
            <div className="p-6 bg-purple-50 rounded-xl">
              <div className="text-4xl mb-3">🔒</div>
              <h3 className="font-bold text-gray-800 mb-2">Secure & Safe</h3>
              <p className="text-sm text-gray-600">Bank-level security for your peace of mind</p>
            </div>
            <div className="p-6 bg-pink-50 rounded-xl">
              <div className="text-4xl mb-3">📊</div>
              <h3 className="font-bold text-gray-800 mb-2">Track Balance</h3>
              <p className="text-sm text-gray-600">Monitor your account in real-time</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
            <Link
              to="/signup"
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Get Started
            </Link>
            <Link
              to="/signin"
              className="flex-1 bg-white border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Footer */}
        <p className="text-gray-500 text-sm animate-fade-in">
          Built with ❤️ using React, Node.js & MongoDB
        </p>
      </div>
    </div>
  );
};
