import React, { useContext, useRef, useState, useEffect } from "react";
import { CarContext } from "../store/carStore";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Form = () => {
  const { addCars } = useContext(CarContext);
  const [imageShow, setImageShow] = useState(null);

  const [location, setLocation] = useState("");
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  // const [features, setFeatures] = useState(["GPS", "Bluetooth", "Sunroof"]);
  // const [featureInput, setFeatureInput] = useState("");

  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);

  const makeRef = useRef();
  const modelRef = useRef();
  const yearRef = useRef();
  const colorRef = useRef();
  const licenseRef = useRef();
  const vehicleRef = useRef();
  const fuelRef = useRef();
  const transmissionRef = useRef();
  const seatRef = useRef();
  const doorRef = useRef();
  const dailyRef = useRef();
  const milageRef = useRef();
  const featuresRef = useRef();
  const imageRef = useRef();
  const descriptionRef = useRef();

  useEffect(() => {
    if (!window.google || !inputRef.current) return;

    autocompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      {
        types: ["geocode"],
        componentRestrictions: { country: "in" },
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

  const locationData = { location, lat, lng };

  const onhandleAdd = async (event) => {
    event.preventDefault();
    const make = makeRef.current.value;
    const model = modelRef.current.value;
    const year = yearRef.current.value;
    const color = colorRef.current.value;
    const licensePlate = licenseRef.current.value;
    const vehicleType = vehicleRef.current.value;
    const fuelType = fuelRef.current.value;
    const transmission = transmissionRef.current.value;
    const seats = seatRef.current.value;
    const doors = doorRef.current.value;
    const dailyRate = dailyRef.current.value;
    const mileage = milageRef.current.value;
    const featuresStr = featuresRef.current.value;

    // files[0] converted to array of images
    const imagefile = imageRef.current.files;
    const image = Array.from(imagefile);

    const description = descriptionRef.current.value;

    const data = await addCars(
      make,
      model,
      year,
      color,
      licensePlate,
      locationData,
      vehicleType,
      fuelType,
      transmission,
      seats,
      doors,
      dailyRate,
      mileage,
      featuresStr,
      image,
      description
    );

    if(data) {
      toast.success("Home added successfully");
    } else {
      toast.error("Error adding the vehicle")
    }
    

    // Reset form
    makeRef.current.value = "";
    modelRef.current.value = "";
    yearRef.current.value = "";
    colorRef.current.value = "";
    licenseRef.current.value = "";
    vehicleRef.current.value = "";
    fuelRef.current.value = "";
    transmissionRef.current.value = "";
    seatRef.current.value = "";
    doorRef.current.value = "";
    dailyRef.current.value = "";
    milageRef.current.value = "";
    setFeatures([]);
    setImageShow(null);
    descriptionRef.current.value = "";
  };

  const handleImage = (event) => {
    // const file = event.target.files[0];
    // if (file) {
    //   const imageUrl = URL.createObjectURL(file);
    //   setImageShow(imageUrl);
    // }
    const files = Array.from(event.target.files);
    if (files) {
      const imageUrl = files.map((file) => URL.createObjectURL(file));
      setImageShow(imageUrl);
    }
  };

  // const addFeature = () => {
  //   if (featureInput.trim() !== "" && !features.includes(featureInput)) {
  //     setFeatures([...features, featureInput]);
  //     setFeatureInput("");
  //   }
  // };

  // const removeFeature = (featureToRemove) => {
  //   setFeatures(features.filter(feature => feature !== featureToRemove));
  // };

  // const handleFeatureKeyDown = (e) => {
  //   if (e.key === 'Enter') {
  //     e.preventDefault();
  //     addFeature();
  //   }
  // };

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-10 bg-gradient-to-b from-white to-gray-50 rounded-3xl shadow-2xl my-8">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 flex items-center">
        <span className="bg-indigo-600 text-white p-2 rounded-lg mr-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
            />
          </svg>
        </span>
        Add New Vehicle
      </h2>

      <form
        encType="multipart/form-data"
        onSubmit={(event) => onhandleAdd(event)}
        className="space-y-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Basic Information */}
          <div className="space-y-6 bg-white p-7 rounded-2xl shadow-md border border-gray-100 transition-all hover:shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-3 flex items-center">
              <span className="text-indigo-600 mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>
              Basic Information
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Make
              </label>
              <input
                type="text"
                ref={makeRef}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm"
                placeholder="Toyota"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Model
              </label>
              <input
                type="text"
                ref={modelRef}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm"
                placeholder="Camry"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Year
                </label>
                <input
                  type="text"
                  ref={yearRef}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm"
                  placeholder="2022"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color
                </label>
                <input
                  type="text"
                  ref={colorRef}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm"
                  placeholder="Silver"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                License Plate
              </label>
              <input
                type="text"
                ref={licenseRef}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm"
                placeholder="ABC-1234"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Enter pickup location"
                  className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Specifications */}
          <div className="space-y-6 bg-white p-7 rounded-2xl shadow-md border border-gray-100 transition-all hover:shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-3 flex items-center">
              <span className="text-indigo-600 mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                  />
                </svg>
              </span>
              Specifications
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vehicle Type
              </label>
              <div className="relative">
                <select
                  className="w-full appearance-none px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm bg-white"
                  ref={vehicleRef}
                >
                  <option value="sedan">Sedan</option>
                  <option value="suv">SUV</option>
                  <option value="truck">Truck</option>
                  <option value="van">Van</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fuel Type
                </label>
                <div className="relative">
                  <select
                    className="w-full appearance-none px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm bg-white"
                    ref={fuelRef}
                  >
                    <option value="gasoline">Gasoline</option>
                    <option value="diesel">Diesel</option>
                    <option value="electric">Electric</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Transmission
                </label>
                <div className="relative">
                  <select
                    className="w-full appearance-none px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm bg-white"
                    ref={transmissionRef}
                  >
                    <option value="automatic">Automatic</option>
                    <option value="manual">Manual</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Seats
                </label>
                <input
                  type="text"
                  ref={seatRef}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm"
                  placeholder="5"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Doors
                </label>
                <input
                  type="text"
                  ref={doorRef}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm"
                  placeholder="4"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Daily Rate ($)
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="text"
                  ref={dailyRef}
                  className="w-full pl-8 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm"
                  placeholder="49.99"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mileage
              </label>
              <input
                type="text"
                ref={milageRef}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm"
                placeholder="15000"
              />
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white p-7 rounded-2xl shadow-md border border-gray-100 transition-all hover:shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-3 mb-5 flex items-center">
            <span className="text-indigo-600 mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
            </span>
            Features
          </h3>

          <div className="flex gap-3">
            <input
              type="text"
              // value={featureInput}
              // onChange={(e) => setFeatureInput(e.target.value)}
              // onKeyDown={handleFeatureKeyDown}
              placeholder="Add feature (e.g., GPS, Bluetooth)"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm"
              ref={featuresRef}
            />
            {/* <button
              type="button"
              onClick={addFeature}
              className="px-5 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 font-medium shadow-sm flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add
            </button> */}
          </div>
        </div>

        {/* Images */}
        <div className="bg-white p-7 rounded-2xl shadow-md border border-gray-100 transition-all hover:shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-3 mb-5 flex items-center">
            <span className="text-indigo-600 mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </span>
            Images
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-indigo-500 transition-colors duration-200 bg-white overflow-hidden">
                {imageShow ? (
                  imageShow.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt="Vehicle preview"
                      className="w-full h-full object-cover"
                    />
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center h-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-gray-400 mb-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    <span className="text-sm text-gray-600 font-medium">
                      Upload vehicle image
                    </span>
                    <span className="text-xs text-gray-500 mt-1">
                      Click to browse
                    </span>
                  </div>
                )}
                <input
                  type="file"
                  multiple
                  onChange={(event) => handleImage(event)}
                  ref={imageRef}
                  accept="image/*"
                  className="hidden"
                />
              </label>
            </div>

            <div className="flex flex-col justify-center">
              {imageShow ? (
                <div className="space-y-4">
                  <p className="text-green-600 font-medium flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Image uploaded successfully
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setImageShow(null);
                      imageRef.current.value = "";
                    }}
                    className="text-red-600 hover:text-red-800 font-medium flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    Remove image
                  </button>
                </div>
              ) : (
                <div className="text-gray-500 space-y-2">
                  <p className="text-sm">
                    Upload a high-quality image of the vehicle.
                  </p>
                  <p className="text-sm">
                    Recommended: Front or 3/4 view, good lighting.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white p-7 rounded-2xl shadow-md border border-gray-100 transition-all hover:shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-3 mb-5 flex items-center">
            <span className="text-indigo-600 mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </span>
            Description
          </h3>

          <textarea
            rows="5"
            ref={descriptionRef}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm"
            placeholder="Write a detailed description of your vehicle, including condition, special features, and anything else potential renters should know..."
          ></textarea>
          <p className="text-xs text-gray-500 mt-2 italic">
            A good description increases booking chances.
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-4 pt-6">
          <Link
            type="button"
            to="/consumer/vehicles"
            className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 font-medium shadow-sm flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Cancel
          </Link>
          <button
            type="submit"
            className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 font-medium shadow-sm flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Add Vehicle
          </button>
        </div>

        {/* Progress bar */}
        <div className="pt-6 pb-2">
          <div className="bg-gray-200 h-1 rounded-full w-full">
            <div className="bg-indigo-600 h-1 rounded-full w-full"></div>
          </div>
          <p className="text-xs text-center text-gray-500 mt-2">
            All fields complete! Your vehicle is ready to be added.
          </p>
        </div>
      </form>
    </div>
  );
};

export default Form;
