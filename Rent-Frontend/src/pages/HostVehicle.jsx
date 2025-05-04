import { useContext } from "react";
import HostCard from "../components/HostCard";
import { CarContext } from "../store/carStore";
import { Link } from "react-router-dom";

const HostVehicle = () => {
  const { myCars } = useContext(CarContext);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        {/* Header with enhanced styling */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-orange-500 mb-3">
            Host Vehicles
          </h1>
          <p className="text-gray-600 text-lg max-w-lg mx-auto">
            Manage and add your rental vehicles to our marketplace
          </p>
        </div>

        {/* Add vehicle button */}
        <div className="flex justify-end mb-6">
          <Link to="/host/form" className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-lg flex items-center transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Add New Vehicle
          </Link>
        </div>

        {/* Vehicle count summary */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-8 border border-gray-100">
          <p className="text-gray-700">
            <span className="font-semibold">{myCars.length}</span>{" "}
            {myCars.length === 1 ? "vehicle" : "vehicles"} in your fleet
          </p>
        </div>

        {/* Vehicle cards */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <HostCard vehicles={myCars} />

          {/* Empty state - shows only when no cars are present */}
          {myCars.length === 0 && (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-16 w-16 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                No vehicles yet
              </h3>
              <p className="mt-1 text-gray-500">
                Get started by adding your first vehicle.
              </p>
            </div>
          )}
        </div>

        {/* Help section */}
        <div className="mt-10 bg-orange-50 rounded-lg p-6 border border-orange-100">
          <h2 className="text-xl font-semibold text-orange-700 mb-3">
            Hosting Tips
          </h2>
          <ul className="text-gray-700 space-y-2">
            <li className="flex items-start">
              <svg
                className="h-5 w-5 text-orange-500 mr-2 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Add high-quality photos to attract more renters
            </li>
            <li className="flex items-start">
              <svg
                className="h-5 w-5 text-orange-500 mr-2 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Set competitive pricing based on your vehicle's features
            </li>
            <li className="flex items-start">
              <svg
                className="h-5 w-5 text-orange-500 mr-2 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Keep your calendar updated to maximize bookings
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HostVehicle;
