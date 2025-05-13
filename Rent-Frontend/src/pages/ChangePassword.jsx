import React, { useContext, useRef } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CarContext } from "../store/carStore";
import toast from "react-hot-toast";

const ChangePassword = () => {
  const { sendPassword } = useContext(CarContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const { id } = useParams();
  const passRef = useRef();
  const cnfPassRef = useRef();

  const providePassword = async () => {
    const password = passRef.current.value;
    const cnfPassword = cnfPassRef.current.value;
    const data = await sendPassword(id, password, cnfPassword);
    if (data?.user) {
      toast.success("Password Successfully updated");
      navigate("/user/login");
    } else {
      toast.error(data.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-200">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-blue-100 p-3 rounded-full mb-4">
            <Lock className="text-blue-600" size={24} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Change Password</h2>
          <p className="text-gray-500 text-center mt-2">
            Please enter your new password below
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              New Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={18} className="text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                ref={passRef}
                placeholder="Enter new password"
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff size={18} className="text-gray-400" />
                ) : (
                  <Eye size={18} className="text-gray-400" />
                )}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Password must be at least 8 characters long
            </p>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={18} className="text-gray-400" />
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                ref={cnfPassRef}
                placeholder="Re-enter new password"
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff size={18} className="text-gray-400" />
                ) : (
                  <Eye size={18} className="text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={providePassword}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-200 font-medium shadow-sm mt-6"
          >
            Update Password
          </button>

          <div className="text-center mt-4">
            <Link
              to="/user/login"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
