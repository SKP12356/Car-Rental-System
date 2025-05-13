import React, { useContext } from "react";
import { CarContext } from "../store/carStore";
import { Link } from "react-router-dom";
import { MdFavorite, MdClose } from "react-icons/md";
import toast from "react-hot-toast";

const FavCard = ({ vehicles }) => {
  const { deleteFavouriteCars, favourite, setFavourite } = useContext(CarContext);

  const handleRemove = (id) => {
    deleteFavouriteCars(id);
    setFavourite(false);
    toast.error("Removed from favourites")
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {vehicles.map((vehicle) => {
        let features = vehicle?.features;
        const featureArray = features?.split(",");
        
        return (
          <div
            key={vehicle?._id}
            className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-200 flex flex-col"
          >
            {/* Top Remove Button Bar */}
            <div className="bg-pink-50 py-1.5 px-4 flex items-center justify-between">
              <div className="flex items-center">
                <MdFavorite className="text-pink-600 mr-2" />
                <span className="text-sm font-medium text-pink-600">Favorite</span>
              </div>
              <button 
                onClick={() => handleRemove(vehicle?._id)}
                className="text-gray-500 hover:text-red-600 transition-colors cursor-pointer"
              >
                <MdClose className="text-lg" />
              </button>
            </div>
            
            {/* Vehicle Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={`http://localhost:3000/${vehicle?.image?.[0]}`}
                alt={`${vehicle?.make} ${vehicle?.model}`}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent py-3 px-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-white font-bold">
                    {vehicle?.make} {vehicle?.model}
                  </h3>
                  <span className="bg-blue-600 text-white text-sm font-medium px-2.5 py-1 rounded-full">
                    ${vehicle?.dailyRate}/day
                  </span>
                </div>
              </div>
            </div>

            {/* Vehicle Details */}
            <div className="p-4 flex-grow">
              <div className="flex justify-between items-center mb-3">
                <p className="text-gray-600 text-sm">
                  {vehicle?.year} • {vehicle?.vehicleType}
                </p>
                <span
                  className={`${
                    vehicle?.status === "unavailable"
                      ? "bg-red-100 text-red-800"
                      : "bg-green-100 text-green-800"
                  } text-xs px-2 py-1 rounded-full font-medium`}
                >
                  {vehicle?.status === "unavailable" ? "Unavailable" : "Available"}
                </span>
              </div>
              
              {/* Divider */}
              <div className="border-t border-gray-100 my-3"></div>

              {/* Specifications */}
              <div className="flex justify-between mb-4">
                <div className="flex flex-col items-center">
                  <span className="text-gray-400 text-lg mb-1">⛽</span>
                  <span className="text-sm font-medium">{vehicle?.fuelType}</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-gray-400 text-lg mb-1">🔄</span>
                  <span className="text-sm font-medium">{vehicle?.transmission}</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-gray-400 text-lg mb-1">👥</span>
                  <span className="text-sm font-medium">{vehicle?.seats}</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-gray-400 text-lg mb-1">📏</span>
                  <span className="text-sm font-medium">{vehicle?.mileage}</span>
                </div>
              </div>

              {/* Features */}
              <div className="mb-4">
                <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">Features</p>
                <div className="flex flex-wrap gap-1.5">
                  {featureArray?.slice(0, 3).map((feature, index) => (
                    <span
                      key={index}
                      className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md"
                    >
                      {feature?.trim()}
                    </span>
                  ))}
                  {featureArray && featureArray.length > 3 && (
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md">
                      +{featureArray.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="px-4 pb-4">
              <Link
                to={`/user/vehicles/${vehicle?._id}/details`}
                className="block w-full py-2.5 text-center bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                View Details
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FavCard;