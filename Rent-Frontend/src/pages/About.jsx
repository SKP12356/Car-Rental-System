import { Link, useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate()
  const bookVehicle = () => {
    navigate("consumer/vehicles")
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">About DriveEase</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Your trusted partner for premium car rental experiences since 2015
        </p>
      </div>

      {/* Our Story */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
          <p className="text-gray-600 mb-4">
            Founded in 2015, DriveEase began with a simple mission: to make car rental effortless and enjoyable. 
            What started as a small fleet of 10 vehicles in San Francisco has now grown to over 500 cars across 
            major cities nationwide.
          </p>
          <p className="text-gray-600 mb-4">
            We recognized that traditional car rental services were often complicated and frustrating. 
            DriveEase was born to change that, offering transparent pricing, modern vehicles, and 
            customer-first service.
          </p>
          <p className="text-gray-600">
            Today, we're proud to serve thousands of satisfied customers, from business travelers to 
            vacationing families, all while maintaining our commitment to quality and convenience.
          </p>
        </div>
        <div className="bg-gray-200 rounded-xl h-96 flex items-center justify-center">
          <img src="https://media.istockphoto.com/id/157583605/photo/side-view-of-a-luxus-car.jpg?s=612x612&w=0&k=20&c=KQUf-T40tdncSSIcTD9y0lFnjrxm7m-cw6UYXi-E4-k=" alt="no image" />
        </div>
      </div>

      {/* Our Values */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Transparency</h3>
            <p className="text-gray-600">
              No hidden fees, no surprises. We believe in clear pricing and honest communication.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Quality</h3>
            <p className="text-gray-600">
              We maintain our fleet to the highest standards so you get reliable, clean, and modern vehicles.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Community</h3>
            <p className="text-gray-600">
              We're committed to supporting the communities we serve through local partnerships and initiatives.
            </p>
          </div>
        </div>
      </div>

      {/* Our Team */}
      {/* <div className="mb-20">
        <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white rounded-lg shadow-md overflow-hidden text-center">
            <div className="bg-gray-200 h-64 flex items-center justify-center">
              <span className="text-gray-500">Team member photo</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-1">Sarah Johnson</h3>
              <p className="text-indigo-600 mb-3">CEO & Founder</p>
              <p className="text-gray-600 text-sm">
                With 15+ years in the automotive industry, Sarah founded DriveEase to revolutionize car rentals.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden text-center">
            <div className="bg-gray-200 h-64 flex items-center justify-center">
              <span className="text-gray-500">Team member photo</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-1">Michael Chen</h3>
              <p className="text-indigo-600 mb-3">Operations Director</p>
              <p className="text-gray-600 text-sm">
                Michael ensures our fleet is always in perfect condition and our operations run smoothly.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden text-center">
            <div className="bg-gray-200 h-64 flex items-center justify-center">
              <span className="text-gray-500">Team member photo</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-1">David Martinez</h3>
              <p className="text-indigo-600 mb-3">Customer Experience</p>
              <p className="text-gray-600 text-sm">
                David leads our customer support team to deliver exceptional service at every touchpoint.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden text-center">
            <div className="bg-gray-200 h-64 flex items-center justify-center">
              <span className="text-gray-500">Team member photo</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-1">Emily Wilson</h3>
              <p className="text-indigo-600 mb-3">Marketing Director</p>
              <p className="text-gray-600 text-sm">
                Emily spreads the word about DriveEase and develops partnerships with local businesses.
              </p>
            </div>
          </div>
        </div>
      </div> */}

      {/* Call to Action */}
      <div className="bg-indigo-700 text-white rounded-xl p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Experience DriveEase?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join thousands of satisfied customers who have discovered the easiest way to rent a car
        </p>
        {/* <Link>Book Your Vehicle Now</Link> */}
        {/* <Link className="bg-white text-indigo-700 font-semibold py-3 px-8 rounded-md hover:bg-gray-100 transition-colors">
          Book Your Vehicle Now
        </Link> */}
      </div>
    </div>
  );
};

export default About;