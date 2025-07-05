import { Link } from "react-router-dom";

export function BottomWarning({ label, buttonText, to }) {
  return (
    <div className="py-2 text-sm flex justify-center text-gray-600">
      <span>{label}</span>
      <Link
        to={to}
        className="pl-1 underline text-blue-600 hover:text-blue-800 transition-colors duration-200"
      >
        {buttonText}
      </Link>
    </div>
  );
}
