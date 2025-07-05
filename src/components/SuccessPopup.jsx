export const SuccessPopup = ({ message, onClose, onBack }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white w-80 rounded-lg p-6 shadow-lg relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-black text-xl"
        >
          &times;
        </button>

        <h2 className="text-xl font-bold text-center text-green-600 mb-4">
          🎉 {message}
        </h2>

        <button
          onClick={onBack}
          className="mt-4 w-full bg-green-500 text-white rounded-md px-4 py-2 hover:bg-green-600 transition"
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
};
