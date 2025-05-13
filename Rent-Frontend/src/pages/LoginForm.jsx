import React, { useContext, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BiShow, BiHide } from "react-icons/bi";
import { CarContext } from "../store/carStore";

const LoginForm = () => {
  const { userLogin, setToken } = useContext(CarContext);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const [err, setErr] = useState(null);
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const passRef = useRef();
  const emailRef = useRef();

  if (query.size > 0) {
    // const token = query.get("token");
    // setToken(token);
    const email = query.get("email");
    const password = email?.slice(0, 5);
    const data = userLogin(email, password);

    console.log(data);
    navigate("/consumer/vehicles");
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const password = passRef.current.value;
    const email = emailRef.current.value;
    // console.log(email);
    // console.log(password);
    const data = await userLogin(email, password);
    console.log(data);
    if (data?.token) {
      if (data?.user.isVerified !== true) {
        navigate(`/user/emailotp/${data?.user._id}`);
      } else {
        if (data?.user.isPhoneVerified !== true) {
          navigate(`/user/phoneotp/${data?.user._id}`);
        } else {
          navigate("/consumer/vehicles");
        }
      }
    } else {
      setErr(data.message);
    }
  };

  const handlePass = () => {
    setShowPass(!showPass);
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3000/auth/google";
  };

  const handleHostGoogleLogin = () => {
    window.location.href = "http://localhost:3000/auth/hostgoogle";
  };

  // const handleGitHubLogin = () => {
  //   window.location.href = "http://localhost:3000/auth/github";
  // };

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
              <Link
                to="/user/verifymail"
                className="text-xs text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
              >
                Forgot password?
              </Link>
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
