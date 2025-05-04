import React, { useContext, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiShow, BiHide } from "react-icons/bi";
import { CarContext } from "../store/carStore";

const LoginForm = () => {
  const { userLogin } = useContext(CarContext);
  const [err, setErr] = useState(null);
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const passRef = useRef();
  const emailRef = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const password = passRef.current.value;
    const email = emailRef.current.value;
    console.log(email);
    console.log(password);
    const data = await userLogin(email, password);
    console.log(data);
    if (data.token) {
      navigate("/consumer/vehicles");
    } else {
      setErr(data.message);
    }
  };

  const handlePass = () => {
    setShowPass(!showPass);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-2xl">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-1">
            Welcome Back
          </h2>
          <p className="text-gray-500 text-sm">
            Your vehicles are waiting for you
          </p>
        </div>

        {err && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
            <p className="text-red-700 text-sm">{err}</p>
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                ref={emailRef}
                placeholder="you@example.com"
                className="w-full pl-4 pr-10 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-gray-50 transition-all duration-200"
              />
              <span className="absolute right-3 top-3 text-gray-400">✉</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <a
                href="#"
                className="text-xs text-blue-600 hover:text-blue-800 font-medium cursor-no-drop"
              >
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                ref={passRef}
                placeholder="••••••••"
                className="w-full pl-4 pr-10 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-gray-50 transition-all duration-200"
              />
              <button
                type="button"
                onClick={handlePass}
                className="absolute right-3 top-3 text-gray-500 text-xl hover:text-gray-700"
              >
                {showPass ? <BiShow /> : <BiHide />}
              </button>
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-600"
            >
              Keep me signed in
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium flex items-center justify-center"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white text-gray-400">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <button
              type="button"
              className="flex items-center justify-center py-2.5 px-4 border border-gray-200 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200 cursor-no-drop"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </button>
            <button
              type="button"
              className="flex items-center justify-center py-2.5 px-4 border border-gray-200 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200 cursor-no-drop"
            >
              <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </button>
          </div>
        </div>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link
            to="/user/signup"
            className="text-blue-600 font-medium hover:text-blue-800"
          >
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
