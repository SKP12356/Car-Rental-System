import React, { useContext, useState, useEffect } from "react";
import { CarContext } from "../store/carStore";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { cars } = useContext(CarContext);
  const { id } = useParams();
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchedCars = cars.find((car) => car._id === id);
    setUser(fetchedCars?.host);
  }, [cars, id]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold text-gray-800 mb-8 border-b pb-4">
        Personal Information
      </h2>

      <div className="flex flex-col md:flex-row gap-8 mb-8">
        {/* Profile Picture Section */}
        <div className="flex flex-col items-center md:items-start space-y-4 md:w-1/3">
          <div className="relative">
            <img
              src={`http://localhost:3000/${user?.image}`}
              alt="Profile"
              className="h-40 w-40 rounded-full object-cover border-4 border-gray-100 shadow-sm"
            />
            {/* <button className="absolute bottom-3 right-3 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </button> */}
          </div>
          {/* <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
            Update Photo
          </button> */}
        </div>

        {/* Personal Info Section */}
        <div className="flex-1 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Full Name
              </label>
              <div className="w-full px-4 py-3 bg-gray-50 rounded-md border border-gray-200">
                {user?.fullName}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email Address
              </label>
              <div className="w-full px-4 py-3 bg-gray-50 rounded-md border border-gray-200">
                {user?.email}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-2">
          Contact Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Phone Number
            </label>
            <div className="w-full px-4 py-3 bg-gray-50 rounded-md border border-gray-200">
              {user?.phone}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Address
            </label>
            <div className="w-full px-4 py-3 bg-gray-50 rounded-md border border-gray-200">
              {`${user?.addressLine || ""}${user?.city ? ", " + user.city : ""}${
                user?.state ? ", " + user.state : ""
              }`}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      {/* <div className="flex justify-end space-x-4">
        <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
          Cancel
        </button>
        <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-sm">
          Save Changes
        </button>
      </div> */}
    </div>
  );
};

export default Profile;