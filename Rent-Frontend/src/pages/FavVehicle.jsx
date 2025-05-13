import { useContext } from "react";
import FavCard from "../components/FavCard";
import { CarContext } from "../store/carStore";
import { Link } from "react-router-dom";

const FavVehicle = () => {
  const { favCars } = useContext(CarContext);
  // console.log(favCars);

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600 mb-3">
            Favorite Vehicles
          </h1>
          <p className="text-gray-600 text-lg max-w-md mx-auto">
            Your personal collection of dream rental cars
          </p>
          <div className="mt-6 relative max-w-lg mx-auto">
            <div className="h-1 bg-gradient-to-r from-orange-300 to-orange-600 rounded-full w-24 mx-auto"></div>
          </div>
        </div>

        {/* Empty state */}
        {favCars && favCars.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-md mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-orange-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No favorites yet
            </h3>
            <p className="text-gray-600 mb-6">
              Browse our collection and add vehicles to your favorites
            </p>
            {/* <Link
              to="consumer/vehicles"
              className="inline-flex items-center px-4 py-2 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                  clipRule="evenodd"
                />
              </svg>
              Explore Vehicles
            </Link> */}
          </div>
        ) : (
          // Favorites Grid
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <div className="flex flex-wrap items-center justify-between mb-6">
              <div className="flex items-center mb-4 md:mb-0">
                <span className="bg-orange-100 text-orange-800 text-xs font-medium me-2 px-3 py-1.5 rounded-full">
                  {favCars ? favCars.length : 0} Favorites
                </span>
                {/* <div className="hidden md:flex items-center text-sm text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                  Your Collection
                </div> */}
              </div>

              <div className="w-full md:w-auto">
                <div className="flex items-center">
                  <div className="relative w-full md:w-auto">
                    <input
                      type="text"
                      placeholder="Search favorites..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent w-full"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-2 hidden md:block">
                    {/* <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                      </svg>
                      Filter
                    </button> */}
                  </div>
                </div>
              </div>
            </div>

            {/* Render FavCard component with favorite vehicles */}
            <FavCard vehicles={favCars} />

            {/* Enhanced footer when favorites exist */}
            {favCars && favCars.length > 0 && (
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500 mb-4 sm:mb-0">
                  Showing {favCars.length}{" "}
                  {favCars.length === 1 ? "vehicle" : "vehicles"} in your
                  favorites
                </p>

                {/* <div className="flex space-x-2">
                  <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-orange-700 bg-orange-100 hover:bg-orange-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
                      <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z" />
                    </svg>
                    Export List
                  </button>
                  <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Compare
                  </button>
                </div> */}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavVehicle;
