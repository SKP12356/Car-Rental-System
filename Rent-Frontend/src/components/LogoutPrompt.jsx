import React, { useContext } from "react";
import { CarContext } from "../store/carStore";
import { useNavigate } from "react-router-dom";

const LogoutPrompt = () => {
  const { logout } = useContext(CarContext);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/consumer/vehicles");
  };
  const handleLogout = () => {
    logout();
    navigate("/user/login")
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
        <div className="mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mx-auto text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Please logout</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to end your current session?
        </p>
        <div className="flex justify-center space-x-4">
          <button
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200"
            onClick={handleClick}
          >
            Cancel
          </button>
          <button
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutPrompt;
