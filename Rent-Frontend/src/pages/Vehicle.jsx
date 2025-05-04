import { useContext } from "react";
import Card from "../components/Card";
import { CarContext } from "../store/carStore";
import SearchBox from "../components/SearchBox";
// import "./Vehicle.css";

// const Vehicle = () => {
//   const { searchedCars, cars } = useContext(CarContext);
//   console.log(searchedCars)
//   // console.log(searchedCars)
//   return (
//     <>
//       {/* <SearchBox></SearchBox> */}
//       <div className="container mx-auto px-4 py-8">
//         {/* Header */}
//         <div className="mb-8 text-center">
//           <h1 className="text-3xl font-bold text-orange-500 mb-2">
//             Available Vehicles
//           </h1>
//           <p className="text-gray-600">
//             Browse our premium selection of rental cars
//           </p>
//         </div>

//         {/* Search and Filters */}
//         {/* <div className="bg-white p-4 rounded-lg shadow-md mb-8">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Type</label>
//             <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
//               <option value="">All Types</option>
//               <option value="sedan">Sedan</option>
//               <option value="suv">SUV</option>
//               <option value="truck">Truck</option>
//               <option value="luxury">Luxury</option>
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
//             <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
//               <option value="">Any Price</option>
//               <option value="0-50">$0 - $50</option>
//               <option value="50-100">$50 - $100</option>
//               <option value="100-150">$100 - $150</option>
//               <option value="150+">$150+</option>
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Transmission</label>
//             <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
//               <option value="">Any</option>
//               <option value="automatic">Automatic</option>
//               <option value="manual">Manual</option>
//             </select>
//           </div>
//           <div className="flex items-end">
//             <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
//               Search
//             </button>
//           </div>
//         </div>
//       </div> */}

//         <SearchBox></SearchBox>
//         <br />
//         <br />
//         {searchedCars.length > 0 ? (
//           // <div className="ml-5 mr-5">
//           <Card vehicles={searchedCars} />
//           // <Card vehicles={cars} />
//         ) : (
//           // </div>
//           <>
//             {/* <Card vehicles={cars} /> */}
//             <p className="text-center text-gray-500">No vehicles found.</p>
//           </>
//         )}
//         <br />
//         <br />
//         {/* Pagination */}
//         {/* <div className="flex justify-center mt-8">
//         <nav className="flex items-center gap-1">
//           <button className="px-3 py-1 rounded-md bg-gray-200 text-gray-700">
//             Previous
//           </button>
//           <button className="px-3 py-1 rounded-md bg-blue-600 text-white">
//             1
//           </button>
//           <button className="px-3 py-1 rounded-md hover:bg-gray-200">
//             2
//           </button>
//           <button className="px-3 py-1 rounded-md hover:bg-gray-200">
//             3
//           </button>
//           <button className="px-3 py-1 rounded-md hover:bg-gray-200">
//             Next
//           </button>
//         </nav>
//       </div> */}
//       </div>
//     </>
//   );
// };

const Vehicle = () => {
  const { searchedCars, cars } = useContext(CarContext);
  console.log(searchedCars);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section with Background */}
      {/* <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-12"> */}
      <div className="container mt-10 mx-auto px-4">
        {/* <div className="max-w-3xl mx-auto text-center"> */}
        <h1 className="text-4xl font-bold mb-4 tracking-tight">
          Find Your Perfect Ride
        </h1>
        {/* 
            <p className="text-lg opacity-90 mb-8">
              Browse our premium selection of rental vehicles and start your journey today
            </p> */}

        {/* Search component in hero section */}
        <div className="bg-blue-300 p-6 rounded-xl shadow-lg">
          <SearchBox />
        </div>
        {/* </div> */}
      </div>
      {/* </div> */}

      <div className="container mx-auto px-4 py-12">
        {/* Results Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Available Vehicles
            </h2>
            {searchedCars.length > 0 && (
              <p className="text-gray-600 font-medium">
                {searchedCars.length}{" "}
                {searchedCars.length === 1 ? "vehicle" : "vehicles"} found
              </p>
            )}
          </div>

          {/* Results display */}
          {searchedCars.length > 0 ? (
            <div className="transition-all duration-500 animate-fade-in">
              <Card vehicles={searchedCars} />
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <div className="inline-flex justify-center items-center w-16 h-16 bg-orange-100 rounded-full mb-4">
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
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                No Vehicles Found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search filters or browse all available
                vehicles.
              </p>
              <button
                className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
                onClick={() => window.location.reload()}
              >
                Reset Search
              </button>
            </div>
          )}
        </div>

        {/* Features Section */}
        {/* <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="inline-flex justify-center items-center w-12 h-12 bg-blue-100 rounded-full mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              24/7 Support
            </h3>
            <p className="text-gray-600">
              Our customer service team is available 24/7 to assist you with any
              needs.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="inline-flex justify-center items-center w-12 h-12 bg-green-100 rounded-full mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Flexible Booking
            </h3>
            <p className="text-gray-600">
              Easily modify or cancel your booking with our flexible rental
              policies.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="inline-flex justify-center items-center w-12 h-12 bg-purple-100 rounded-full mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-purple-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Fast Delivery
            </h3>
            <p className="text-gray-600">
              Get your rental vehicle delivered quickly to your preferred
              location.
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Vehicle;
