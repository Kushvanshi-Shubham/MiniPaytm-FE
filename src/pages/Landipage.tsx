import { Link } from "react-router-dom";

export const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 text-center max-w-xl animate-fade-in">
        <h1 className="text-4xl font-extrabold text-indigo-700 mb-3">
          Welcome to MiniPaytm 💸
        </h1>
        <p className="text-gray-700 mb-6">
          Your simple, secure and fast money transfer app.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/signin"
            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="bg-gray-200 px-6 py-2 rounded hover:bg-gray-300 transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};
