import { useContext, useState } from "react";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import { MdCreateNewFolder } from "react-icons/md";
import { Link } from "react-router-dom";
import { CarContext } from "../store/carStore";

const Header = ({ showSidebar }) => {
  let home, nav, auth;
  const { userType, logout } = useContext(CarContext);
  const [sidebar, setSidebar] = useState(false);
  const handleLogout = () => {
    logout();
  };

  if (userType === "host") {
    home = <></>;
    nav = (
      <Link
        to="/host/vehicles"
        className="text-gray-100 font-medium hover:text-white transition-colors px-3 py-2 rounded-md hover:bg-indigo-600"
      >
        My Hosts
      </Link>
    );
    auth = (
      <Link
        className="hidden md:flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-2 rounded-md hover:from-amber-600 hover:to-amber-700 transition-all shadow-md"
        to="/user/login"
        onClick={handleLogout}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
        <span className="font-medium">Logout</span>
      </Link>
    );
  } else if (userType === "user") {
    home = (
      <Link
        to="/"
        className="text-gray-100 font-medium hover:text-white transition-colors px-3 py-2 rounded-md hover:bg-indigo-600"
      >
        Home
      </Link>
    );
    nav = (
      <Link
        to="/consumer/bookings"
        className="text-gray-100 font-medium hover:text-white transition-colors px-3 py-2 rounded-md hover:bg-indigo-600"
      >
        Bookings
      </Link>
    );
    auth = (
      <Link
        className="hidden md:flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-2 rounded-md hover:from-amber-600 hover:to-amber-700 transition-all shadow-md"
        to="/user/login"
        onClick={handleLogout}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
        <span className="font-medium">Logout</span>
      </Link>
    );
  } else {
    home = (
      <Link
        to="/"
        className="text-gray-100 font-medium hover:text-white transition-colors px-3 py-2 rounded-md hover:bg-indigo-600"
      >
        Home
      </Link>
    );
    auth = (
      <Link
        className="hidden md:flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-2 rounded-md hover:from-amber-600 hover:to-amber-700 transition-all shadow-md"
        to="/user/login"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
        <span className="font-medium">Login</span>
      </Link>
    );
  }

  const handleSidebar = () => {
    setSidebar(!sidebar);
    showSidebar(sidebar);
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Main Header */}
      <div className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-700 shadow-xl">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            {/* Sidebar Toggle */}
            <div className="text-3xl text-amber-400 hover:text-amber-300 transition-colors">
              <button
                onClick={handleSidebar}
                className="p-1 hover:bg-indigo-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300"
                aria-label={sidebar ? "Expand sidebar" : "Collapse sidebar"}
              >
                {sidebar === false ? (
                  <GoSidebarCollapse className="transform hover:scale-110 transition-transform" />
                ) : (
                  <GoSidebarExpand className="transform hover:scale-110 transition-transform" />
                )}
              </button>
            </div>

            {/* Logo */}
            <div className="flex items-center">
              <div className="bg-white/10 rounded-full p-2 backdrop-blur-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-green-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                  />
                </svg>
              </div>
              <span className="ml-3 text-2xl font-bold text-white tracking-tight">
                Drive<span className="text-green-400">Ease</span>
              </span>
            </div>

            {/* Primary Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {home}
              <Link
                to="/consumer/vehicles"
                className="text-gray-100 font-medium hover:text-white transition-colors px-3 py-2 rounded-md hover:bg-indigo-600"
              >
                Vehicles
              </Link>
              {nav}
              <Link
                to="/consumer/services"
                className="text-gray-100 font-medium hover:text-white transition-colors px-3 py-2 rounded-md hover:bg-indigo-600"
              >
                Services
              </Link>
              <Link
                to="/consumer/aboutUs"
                className="text-gray-100 font-medium hover:text-white transition-colors px-3 py-2 rounded-md hover:bg-indigo-600"
              >
                About
              </Link>
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <Link to={userType === "host" ? "/host/form" : "/host/signup"}>
                <button className="hidden md:flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-md hover:from-green-700 hover:to-green-800 transition-all shadow-md">
                  <MdCreateNewFolder />
                  <span className="font-medium">Create</span>
                </button>
              </Link>
              {auth}
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 text-white bg-indigo-700/50 rounded-lg hover:bg-indigo-600/50 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;