import React, { useContext } from "react";
import { CarContext } from "../store/carStore";
import { Link } from "react-router-dom";
import Loader from "./Loader";

const HostCard = ({ vehicles }) => {
  if(!vehicles){
    return <Loader />
  }
  const { deleteCars } = useContext(CarContext);

  const handleDelete = (id) => {
    deleteCars(id);
    console.log("clicked delete");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {vehicles?.map((vehicle) => {
        let features = vehicle?.features;
        const featureArray = features?.split(",");
        
        return (
          <div
            key={vehicle?._id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200 flex flex-col"
          >
            <div className="relative h-52 overflow-hidden">
              <img
                src={`http://localhost:3000/${vehicle?.image[0]}`}
                alt={`${vehicle?.make} ${vehicle?.model}`}
                className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute top-3 right-3">
                <span className="bg-blue-700 text-white font-semibold px-4 py-1.5 rounded-full shadow-md text-sm">
                  ${vehicle?.dailyRate}/day
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                <h3 className="text-white text-xl font-bold">
                  {vehicle?.make} {vehicle?.model}
                </h3>
                <p className="text-gray-200 text-sm">
                  {vehicle?.year} • {vehicle?.vehicleType}
                </p>
              </div>
            </div>

            {/* Vehicle Details */}
            <div className="p-4 flex-grow flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span
                    className={`${
                      vehicle?.status === "unavailable"
                        ? "bg-red-100"
                        : "bg-green-100"
                    } ${
                      vehicle?.status === "unavailable"
                        ? "text-red-800"
                        : "text-green-800"
                    } text-xs px-3 py-1 rounded-full font-medium`}
                  >
                    {vehicle?.status === "unavailable"
                      ? "Unavailable"
                      : "Available"}
                  </span>
                </div>

                {/* Specifications */}
                <div className="grid grid-cols-2 gap-3 my-3 text-sm bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-gray-600 mr-2 text-lg">⛽</span>
                    <span className="font-medium text-gray-800">{vehicle?.fuelType}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-600 mr-2 text-lg">🔄</span>
                    <span className="font-medium text-gray-800">{vehicle?.transmission}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-600 mr-2 text-lg">👥</span>
                    <span className="font-medium text-gray-800">{vehicle?.seats} seats</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-600 mr-2 text-lg">📏</span>
                    <span className="font-medium text-gray-800">{vehicle?.mileage} mi</span>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-1 font-medium">FEATURES</p>
                  <div className="flex flex-wrap gap-1.5">
                    {featureArray?.slice(0, 4).map((feature, index) => (
                      <span
                        key={index}
                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md font-medium"
                      >
                        {feature.trim()}
                      </span>
                    ))}
                    {featureArray?.length > 4 && (
                      <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-md font-medium">
                        +{featureArray.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-2">
                <Link
                  to={`/host/edit/${vehicle?._id}`}
                  className="flex-1 py-2 px-4 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors text-center"
                >
                  Edit
                </Link>
                <button
                  className="flex-1 py-2 px-4 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                  onClick={() => handleDelete(vehicle?._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HostCard;