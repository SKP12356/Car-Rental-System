import { useContext } from "react";
import BookCard from "../components/BookCard";
import { CarContext } from "../store/carStore";

const Bookings = () => {
  const { bookCars } = useContext(CarContext);
  console.log(bookCars);
  // console.log(bookCars.bookingCars)

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        {/* Header with decorative elements */}
        <div className="relative mb-12 text-center">
          <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-orange-300 via-orange-500 to-orange-300 -bottom-2"></div>
          <h1 className="text-5xl font-bold text-gray-800 mb-3">
            Your <span className="text-orange-500">Bookings</span>
          </h1>
          <p className="text-gray-600 text-lg font-light italic">
            Manage your confirmed vehicle rentals
          </p>
        </div>

        {/* Bookings content with card container */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          {bookCars.length > 0 ? (
            <div>
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-700 font-medium">
                  Showing{" "}
                  <span className="font-bold text-orange-500">
                    {bookCars.length}
                  </span>{" "}
                  booked vehicles
                </p>
                {/* <div className="text-sm text-gray-500">
                  Last updated: {new Date().toLocaleDateString()}
                </div> */}
              </div>
              <BookCard vehicles={bookCars} />
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="mb-4 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-600 mb-2">
                No vehicles booked yet
              </h3>
              <p className="text-gray-500 mb-8">
                Your booked vehicles will appear here once you make a
                reservation
              </p>
              <a
                href="/"
                className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Browse Available Vehicles
              </a>
            </div>
          )}
        </div>

        {/* Footer section with help text */}
        <div className="mt-10 text-center text-gray-500 text-sm">
          Need help with your booking? Contact our customer support at{" "}
          <a
            href="https://www.nationalcar.com/en/support/car-rental-faqs/rental-requirements.html"
            className="text-orange-500 font-medium"
            target="blank"
          >
            nationalcar.com
          </a>
        </div>

        {/* Future: Filters and Pagination */}
        {/* Uncomment below when ready to use filter & pagination */}

        {/* <div className="bg-white p-6 rounded-lg shadow-md mb-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Filter label="Vehicle Type" options={["All Types", "Sedan", "SUV", "Truck", "Luxury"]} />
            <Filter label="Price Range" options={["Any Price", "$0 - $50", "$50 - $100", "$100 - $150", "$150+"]} />
            <Filter label="Transmission" options={["Any", "Automatic", "Manual"]} />
            <div className="flex items-end">
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                Search
              </button>
            </div>
          </div>
        </div> */}

        {/* <div className="flex justify-center mt-8">
          <nav className="flex items-center gap-2">
            <PageButton label="Previous" />
            {[1, 2, 3].map((page) => (
              <PageButton key={page} label={page} active={page === 1} />
            ))}
            <PageButton label="Next" />
          </nav>
        </div> */}
      </div>
    </div>
  );
};

// Optionally reusable UI components

// const Filter = ({ label, options }) => (
//   <div>
//     <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
//     <select className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200">
//       {options.map((opt, i) => (
//         <option key={i} value={opt.toLowerCase()}>{opt}</option>
//       ))}
//     </select>
//   </div>
// );

// const PageButton = ({ label, active }) => (
//   <button
//     className={`px-3 py-1 rounded-md ${
//       active
//         ? "bg-blue-600 text-white"
//         : "bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
//     }`}
//   >
//     {label}
//   </button>
// );

export default Bookings;
