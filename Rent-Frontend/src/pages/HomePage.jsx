import { useContext, useState, useEffect, useRef } from "react";
import { CarContext } from "../store/carStore";
import PopularCard from "../components/PopularCard";
import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
  const { cars, searchCars, popularCars } = useContext(CarContext);
  const [location, setLocation] = useState("");
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!window.google || !inputRef.current) return;

    autocompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      {
        types: ["geocode"],
        componentRestrictions: { country: "in" }, // restrict to India
      }
    );

    autocompleteRef.current.addListener("place_changed", () => {
      const place = autocompleteRef.current.getPlace();
      if (place && place.formatted_address) {
        setLocation(place.formatted_address);
        setLat(place.geometry?.location?.lat?.() || null);
        setLng(place.geometry?.location?.lng?.() || null);
      }
    });
  }, []);

  const handleSearch = () => {
    searchCars(location);
    navigate("/consumer/vehicles");
  };

  const handleNavigate = () => {
    navigate("/consumer/vehicles");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Modern & Bold */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-indigo-800 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="container mx-auto px-6 py-32 md:py-48 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6 drop-shadow-lg">
              Your Journey, <span className="text-yellow-400">Your Way</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-100 mb-12 font-light">
              Premium vehicles at competitive prices, ready to take you anywhere
            </p>
            
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl p-6 md:p-8">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Where are you headed?
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Enter pickup location"
                    className="w-full pl-10 px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 outline-none"
                  />
                </div>
              </div>
              <button
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition duration-300 transform hover:scale-[1.02] shadow-md cursor-pointer"
                onClick={handleSearch}
              >
                Find Available Vehicles
              </button>
            </div>
          </div>
        </div>
        
        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="fill-gray-50">
            <path d="M0,96L60,80C120,64,240,32,360,32C480,32,600,64,720,74.7C840,85,960,75,1080,64C1200,53,1320,43,1380,37.3L1440,32L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Popular Vehicles Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <span className="inline-block px-3 py-1 text-sm font-medium text-indigo-800 bg-indigo-100 rounded-full mb-3">TOP PICKS</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Popular Vehicles
          </h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our most sought-after vehicles, perfect for any journey
          </p>
        </div>
        
        {/* Using the existing PopularCard component */}
        <PopularCard vehicles={popularCars}></PopularCard>
      </section>

      {/* Call to Action - More modern and engaging */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-700"></div>
        <div className="absolute inset-0 opacity-20 bg-pattern"></div>
        <div className="container mx-auto px-6 py-20 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Experience the Open Road?
            </h2>
            <p className="text-lg text-indigo-100 mb-10 max-w-2xl mx-auto">
              Join thousands of satisfied customers who have made memories with DriveEase vehicles
            </p>
            <button
              onClick={handleNavigate}
              className="inline-flex items-center px-8 py-4 bg-white text-indigo-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-300 shadow-lg transform hover:scale-105 cursor-pointer"
            >
              Book Your Vehicle Now
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Features Section - New addition */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose DriveEase?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">We're committed to providing an exceptional rental experience</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Quick & Easy Booking</h3>
              <p className="text-gray-600 text-center">Reserve your vehicle in minutes with our streamlined booking process</p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Quality Guaranteed</h3>
              <p className="text-gray-600 text-center">All our vehicles undergo rigorous maintenance and cleaning procedures</p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Best Price Promise</h3>
              <p className="text-gray-600 text-center">Competitive rates with no hidden fees or charges</p>
            </div>
          </div>
        </div>
      </section>

      {/* Redesigned Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-6 pt-16 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                <span className="text-orange-500">Drive</span>Ease
              </h3>
              <p className="text-gray-400 mb-4">
                Making car rental simple, convenient, and affordable since 2015.
              </p>
              {/* <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </a>
              </div> */}
            </div>
            <div>
              <h4 className="font-semibold mb-5 text-lg">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/consumer/vehicles" className="text-gray-400 hover:text-white transition-colors">
                    Vehicles
                  </Link>
                </li>
                <li>
                  <Link to="/consumer/aboutUs" className="text-gray-400 hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-5 text-lg">Support</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/consumer/aboutUs" className="text-gray-400 hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/consumer/aboutUs" className="text-gray-400 hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/consumer/services" className="text-gray-400 hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-5 text-lg">Contact</h4>
              <address className="text-gray-400 not-italic space-y-3">
                <p className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>123 Rental Avenue<br />San Francisco, CA 94107</span>
                </p>
                <p className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>(555) 123-4567</span>
                </p>
                <p className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>info@driveease.com</span>
                </p>
              </address>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-400">
            <p>© 2023 DriveEase Rentals. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;