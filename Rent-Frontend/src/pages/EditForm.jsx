import React, { useContext, useRef, useEffect, useState } from "react";
import { CarContext } from "../store/carStore";
import { getCarServices } from "../services/carServices";
// import Location from "../components/Location";
import { useParams } from "react-router-dom";

const EditForm = () => {
  const { myCars, updateCars, carDetails } = useContext(CarContext);

  const [editCars, setEditCars] = useState(null);
  const [location, setLocation] = useState("");
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);
  // if (editCars === null) {
  //   <p className="text-center mt-10 text-gray-500">Loading car details...</p>;
  // }
  const { id } = useParams();
  // useEffect(() => {
  //   if (myCars.length > 0) {
  //     const fetchedCars = myCars.find((car) => car.id === id);
  //     if (fetchedCars) {
  //       setEditCars(fetchedCars);
  //     } else {
  //       setEditCars(null);
  //     }
  //   }
  // }, [myCars, id]);

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

  const locationData = { location, lat, lng };

  useEffect(() => {
    const fetchDetails = async () => {
      const detailsCar = await carDetails(id);
      setEditCars(detailsCar);
    };
    fetchDetails();
  }, [id]);
  console.log(editCars);
  // if (editCars === null) {
  //   return <p className="text-center mt-10 text-gray-500">Loading car details...</p>;
  // }
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

  const onhandleAdd = (event) => {
    console.log("button clicked");
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
    const features = featuresRef.current.value;
    // const image = imageRef.current.files[0];
    const imagefile = imageRef.current.files;
    const image = Array.from(imagefile);
    const description = descriptionRef.current.value;
    // console.log(image);
    console.log(editCars?.location);
    console.log(locationData.location);
    if (locationData.location === "") {
      locationData.location = editCars?.location.location;
      locationData.lat = editCars?.location.lat;
      locationData.lng = editCars?.location.lng;
    }
    console.log(locationData);
    updateCars(
      editCars._id,
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
      features,
      image,
      description,
      editCars?.image
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-xl">
      <h2 className="text-3xl font-bold text-indigo-700 mb-8">Edit Vehicle</h2>

      <form onSubmit={(event) => onhandleAdd(event)} className="space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Basic Information */}
          <div className="space-y-5 bg-gray-50 p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-3">
              Basic Information
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Make
              </label>
              <input
                type="text"
                defaultValue={editCars?.make}
                ref={makeRef}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition duration-150"
                placeholder="Toyota"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Model
              </label>
              <input
                type="text"
                defaultValue={editCars?.model}
                ref={modelRef}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition duration-150"
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
                  defaultValue={editCars?.year}
                  ref={yearRef}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition duration-150"
                  placeholder="2022"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color
                </label>
                <input
                  type="text"
                  defaultValue={editCars?.color}
                  ref={colorRef}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition duration-150"
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
                defaultValue={editCars?.licensePlate}
                ref={licenseRef}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition duration-150"
                placeholder="ABC-1234"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                ref={inputRef}
                defaultValue={editCars?.location.location}
                type="text"
                placeholder="Enter pickup location"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
          </div>

          {/* Specifications */}
          <div className="space-y-5 bg-gray-50 p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-3">
              Specifications
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vehicle Type
              </label>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition duration-150"
                ref={vehicleRef}
                defaultValue={editCars?.vehicleType}
              >
                <option value="sedan">Sedan</option>
                <option value="suv">SUV</option>
                <option value="truck">Truck</option>
                <option value="van">Van</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fuel Type
                </label>
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition duration-150"
                  ref={fuelRef}
                  defaultValue={editCars?.fuelType}
                >
                  <option value="gasoline">Gasoline</option>
                  <option value="diesel">Diesel</option>
                  <option value="electric">Electric</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Transmission
                </label>
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition duration-150"
                  ref={transmissionRef}
                  defaultValue={editCars?.transmission}
                >
                  <option value="automatic">Automatic</option>
                  <option value="manual">Manual</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Seats
                </label>
                <input
                  type="text"
                  defaultValue={editCars?.seats}
                  ref={seatRef}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition duration-150"
                  placeholder="5"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Doors
                </label>
                <input
                  type="text"
                  defaultValue={editCars?.doors}
                  ref={doorRef}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition duration-150"
                  placeholder="4"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Daily Rate ($)
              </label>
              <input
                type="text"
                defaultValue={editCars?.dailyRate}
                ref={dailyRef}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition duration-150"
                placeholder="49.99"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mileage
              </label>
              <input
                type="text"
                defaultValue={editCars?.mileage}
                ref={milageRef}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition duration-150"
                placeholder="15000"
              />
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-3 mb-5">
            Features
          </h3>
          {/* <div className="flex flex-wrap gap-3 mb-5">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-800 text-sm font-medium">
              GPS
              <button className="ml-2 text-indigo-600 hover:text-indigo-800 transition duration-150">
                ×
              </button>
            </span>
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-800 text-sm font-medium">
              Bluetooth
              <button className="ml-2 text-indigo-600 hover:text-indigo-800 transition duration-150">
                ×
              </button>
            </span>
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-800 text-sm font-medium">
              Sunroof
              <button className="ml-2 text-indigo-600 hover:text-indigo-800 transition duration-150">
                ×
              </button>
            </span>
          </div> */}
          <div className="flex gap-3">
            <input
              type="text"
              defaultValue={editCars?.features}
              ref={featuresRef}
              placeholder="Add feature (e.g., GPS, Bluetooth)"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition duration-150"
            />
            {/* <button
              type="button"
              className="px-5 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-sm transition duration-150"
            >
              Add
            </button> */}
          </div>
        </div>

        {/* Images */}
        <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-3 mb-5">
            Images
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 mb-4">
            <div className="bg-white rounded-lg p-1 shadow-sm">
              <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-500 transition duration-150">
                {/* <div className="text-gray-400 mb-2 text-3xl">+</div> */}
                <span className="text-sm font-medium text-gray-600">
                  <img
                    src={`http://localhost:3000/${editCars?.image[0]}`}
                    alt=""
                  />
                </span>
                <input type="file" multiple ref={imageRef} accept="image/*" className="hidden" />
              </label>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-3 mb-5">
            Description
          </h3>
          <textarea
            rows="4"
            defaultValue={editCars?.description}
            ref={descriptionRef}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition duration-150"
            placeholder="Enter vehicle description..."
          ></textarea>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-4 pt-2">
          <button
            type="button"
            className="px-6 py-3 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 shadow-md transition duration-150"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-md transition duration-150"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditForm;
