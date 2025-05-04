import React, { useContext, useRef, useState } from "react";
import { CarContext } from "../store/carStore";
import { BiShow, BiHide } from "react-icons/bi";

const Settings = () => {
  const { user, userType, updateProfile, updatePassword } = useContext(CarContext);
  const [activeTab, setActiveTab] = useState("profile");
  const [err, setErr] = useState(null);
  const [showPass, setShowPass] = useState(false);
  const [shownewPass, setShownewPass] = useState(false);
  const imageRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();
  const numRef = useRef();
  const addressRef = useRef();
  const currentRef = useRef();
  const newRef = useRef();
  const confirmRef = useRef();

  const handleButtonClick = (event) => {
    event.preventDefault();
    imageRef.current.click();
  };
  
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, New York, NY",
    licenseNumber: "DL123456789",
    notifications: true,
    newsletter: true,
    darkMode: false,
    language: "en",
    paymentMethod: "card",
    cardLast4: "4242",
  });

  const handlePass = () => {
    setShowPass(!showPass);
  };
  
  const handlenewPass = () => {
    setShownewPass(!shownewPass);
  };

  const handleChanges = (event) => {
    event.preventDefault();
    const image = imageRef.current.files[0];
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const phone = numRef.current.value;
    const address = addressRef.current.value;
    updateProfile(user?._id, image, name, email, phone, address, user?.image);
  };

  const handlePassword = async (event) => {
    event.preventDefault();
    const password = currentRef.current.value;
    const newPassword = newRef.current.value;
    const confirmPassword = confirmRef.current.value;
    const data = await updatePassword(
      user?._id,
      password,
      newPassword,
      confirmPassword
    );
    console.log(data);
    if (data.password) {
      console.log("use hot toast to show the error");
      setErr(null);
    } else {
      setErr(data.message);
    }
    currentRef.current.value = "";
    newRef.current.value = "";
    confirmRef.current.value = "";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
          Account Settings
        </h1>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Navigation */}
          <div className="w-full md:w-64 bg-white rounded-lg shadow p-4">
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center ${
                  activeTab === "profile"
                    ? "bg-blue-100 text-blue-700 shadow-sm border-l-4 border-blue-600"
                    : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
                Profile
              </button>

              <button
                onClick={() => setActiveTab("security")}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center ${
                  activeTab === "security"
                    ? "bg-blue-100 text-blue-700 shadow-sm border-l-4 border-blue-600"
                    : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Security
              </button>
            </nav>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 bg-white rounded-lg shadow p-6">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div>
                <form onSubmit={(event) => handleChanges(event)}>
                  <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-100 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6a3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    Personal Information
                  </h2>

                  <div className="flex flex-col md:flex-row gap-8 mb-8">
                    <div className="flex flex-col items-center">
                      <div className="relative mb-4">
                        <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-gray-100 shadow-sm">
                          <img
                            src={`http://localhost:3000/${user.image}`}
                            alt="Profile"
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <input
                          type="file"
                          ref={imageRef}
                          style={{ display: "none" }}
                        />
                        <button
                          className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors shadow-md"
                          onClick={(event) => handleButtonClick(event)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                        </button>
                      </div>
                      <div>
                        <button
                          className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center"
                          onClick={(event) => handleButtonClick(event)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                          </svg>
                          Update Photo
                        </button>
                      </div>
                    </div>

                    <div className="flex-1 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          defaultValue={
                            userType === "user"
                              ? user.firstName + " " + user.secName
                              : user.fullName
                          }
                          ref={nameRef}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          defaultValue={user.email}
                          ref={emailRef}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-1 border-b border-gray-100 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    Contact Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        defaultValue={user.phone}
                        ref={numRef}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      />
                    </div>

                    {userType === "host" ? (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Address
                        </label>
                        <input
                          type="text"
                          defaultValue={
                            user?.addressLine +
                            ", " +
                            user?.city +
                            ", " +
                            user?.state +
                            ", " +
                            user?.pincode
                          }
                          ref={addressRef}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                      </div>
                    ) : (
                      <div>
                        <input
                          type="text"
                          defaultValue=" "
                          ref={addressRef}
                          style={{ display: "none" }}
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end">
                    <button
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm flex items-center font-medium"
                      type="submit"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-100 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-blue-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Security Settings
                </h2>

                <div className="space-y-6">
                  <form onSubmit={(event) => handlePassword(event)} className="bg-gray-50 rounded-lg p-6 border border-gray-100">
                    <div>
                      <h3 className="text-base font-medium text-gray-900 mb-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Change Password
                      </h3>
                      {err && (
                        <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-600 text-red-600 rounded">
                          <p className="text-sm font-medium flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {err}
                          </p>
                        </div>
                      )}
                      <div className="space-y-4">
                        <div className="relative">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Current Password
                          </label>
                          <div className="relative">
                            <input
                              type={showPass ? "text" : "password"}
                              ref={currentRef}
                              placeholder="Enter current password"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors pr-10"
                            />
                            <button
                              type="button"
                              onClick={handlePass}
                              className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                            >
                              {showPass ? <BiShow size={20} /> : <BiHide size={20} />}
                            </button>
                          </div>
                        </div>
                        <div className="relative">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            New Password
                          </label>
                          <div className="relative">
                            <input
                              type={shownewPass ? "text" : "password"}
                              ref={newRef}
                              placeholder="Enter new password"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors pr-10"
                            />
                            <button
                              type="button"
                              onClick={handlenewPass}
                              className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                            >
                              {shownewPass ? <BiShow size={20} /> : <BiHide size={20} />}
                            </button>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm New Password
                          </label>
                          <input
                            type="password"
                            ref={confirmRef}
                            placeholder="Confirm new password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          />
                        </div>
                      </div>
                      <div className="mt-6">
                        <button
                          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm flex items-center font-medium"
                          type="submit"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                          </svg>
                          Update Password
                        </button>
                      </div>
                      
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 bg-blue-100 rounded-full p-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v-1l1-1 1-1-1-1H3a1 1 0 110-2h2.586l1-1H6a1 1 0 110-2h2.586l.293-.293a1 1 0 011.414 0L10.586 8H12a1 1 0 110 2h-.586l1 1H15a1 1 0 110 2h-2.586l-1.707-1.707A1 1 0 0110 10.586L8.586 12H8a1 1 0 01-.707-.293L6.586 11H6a1 1 0 01-.707-.293L4.586 10H3a1 1 0 110-2h2.586l1-1H6a1 1 0 110-2h2.586l.293-.293a1 1 0 011.414 0L10.586 6H12a1 1 0 110 2h-.586l1 1H15a1 1 0 110 2h-2.586l-.293.293a1 1 0 01-1.414 0L10.414 9H8a1 1 0 110-2h2.586l.293-.293a1 1 0 011.414 0l.293.293H15a1 1 0 010 2h-2.586l-1.707-1.707A1 1 0 0010 7.586L8.586 9H8a1 1 0 01-.707-.293L6.586 8H6a1 1 0 01-.707-.293L4.586 7H3a1 1 0 110-2h2.586l1-1H6a1 1 0 110-2h2.586l.293-.293a1 1 0 011.414 0L10.586 4H12a1 1 0 110 2h-.586l1 1H15a1 1 0 010 2h-2.586l-.293.293a1 1 0 01-1.414 0L10.414 7H8a1 1 0 110-2h2.586l1 1H15a1 1 0 010 2h-2.586l-.293.293z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm text-gray-600">
                              For security reasons, use a strong password that you don't use elsewhere
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;