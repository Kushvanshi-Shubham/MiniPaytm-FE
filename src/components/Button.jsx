export function Button({ label, onClick, type = "button", disabled = false, variant = "primary" }) {
  const variants = {
    primary: "bg-gray-800 hover:bg-gray-900 text-white",
    success: "bg-green-500 hover:bg-green-600 text-white",
    danger: "bg-red-500 hover:bg-red-600 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800"
  };

  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`w-full ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 transition duration-200 transform active:scale-95`}
    >
      {label}
    </button>
  );
}
