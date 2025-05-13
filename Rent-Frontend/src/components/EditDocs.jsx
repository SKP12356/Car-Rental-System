import React, { useContext, useEffect, useRef, useState } from "react";
import { CarContext } from "../store/carStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const EditDocs = () => {
  const { addDocument, documents, updateDocumnets } = useContext(CarContext);
  // const [activeTab, setActiveTab] = useState("upload");
  const frontRef = useRef();
  const backRef = useRef();
  const gRef = useRef();
  const navigate = useNavigate()
  // console.log(documents);
  // console.log(documents[0].frLicense);
  // console.log(documents[0]?.frLicense)

  // Add state to track selected file names
  const [frontFileName, setFrontFileName] = useState(null);
  const [backFileName, setBackFileName] = useState(null);
  const [gIdFileName, setGIdFileName] = useState(null);

  useEffect(() => {
    if (documents && documents.length > 0) {
      setFrontFileName(documents[0].frLicense);
      setBackFileName(documents[0].baLicense);
      setGIdFileName(documents[0].gId);
      // setActiveTab("documents");
    }
  }, [documents]);

  const handleDoc = async(event) => {
    event.preventDefault();
    const frLicense = frontRef.current.files[0];
    const baLicense = backRef.current.files[0];
    const gId = gRef.current.files[0];
    // console.log(frLicense)
    // console.log(baLicense)
    // console.log(gId)
    // console.log(documents[0]._id)
    // console.log(documents[0].frLicense)
    // console.log(documents[0].baLicense)
    // console.log(documents[0].gId)
    const data = await updateDocumnets(
      documents[0]._id,
      frLicense,
      baLicense,
      gId,
      documents[0].frLicense,
      documents[0].baLicense,
      documents[0].gId
    );
    if(data) {
      toast.success("Documents uploaded successfully")
    }
    navigate("/user/documents")
    // setFrontFileName("");
    // setBackFileName("");
    // setGIdFileName("");
  };

  // Add file change handlers
  const handleFrontFileChange = (e) => {
    if (e.target.files[0]) {
      setFrontFileName(e.target.files[0].name);
    }
    // else {
    //   setFrontFileName(documents[0]?.frLicense);
    // }
  };

  const handleBackFileChange = (e) => {
    if (e.target.files[0]) {
      setBackFileName(e.target.files[0].name);
    }
  };

  const handleGIdFileChange = (e) => {
    if (e.target.files[0]) {
      setGIdFileName(e.target.files[0].name);
    }
  };

  return (
    <div className="flex-1">
      <div className="bg-white rounded-2xl shadow-md overflow-hidden p-9">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Document Edit
          </h1>
          <p className="text-blue-100 mt-2">Edit your required documents</p>
        </div>

        <form className="p-6 md:p-8" onSubmit={(event) => handleDoc(event)}>
          {/* Document Upload Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Driving License Front */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                  />
                </svg>
                Driving License (Front)
                <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center justify-center w-full">
                <label
                  className={`flex flex-col w-full h-44 border-2 border-dashed ${
                    frontFileName
                      ? "border-green-300 bg-green-50"
                      : "border-blue-200 bg-blue-50"
                  } hover:border-blue-400 rounded-xl cursor-pointer hover:bg-blue-100 transition-all duration-200`}
                >
                  <div className="flex flex-col items-center justify-center h-full p-4">
                    {!frontFileName ? (
                      <>
                        <div className="bg-white p-3 rounded-full mb-3 shadow-md">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-7 h-7 text-blue-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                          </svg>
                        </div>
                        <p className="text-sm font-medium text-blue-700 text-center">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-blue-500 mt-1">
                          JPG, PNG or PDF (max. 5MB)
                        </p>
                      </>
                    ) : (
                      <>
                        <div className="bg-white p-3 rounded-full mb-3 shadow-md">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-7 h-7 text-green-600"
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
                        <p className="text-sm font-medium text-green-700 text-center">
                          File Selected
                        </p>
                        <p className="text-xs text-green-600 mt-1 break-all max-w-full px-2 text-center">
                          {frontFileName}
                        </p>
                        <p className="text-xs text-green-600 mt-2 underline">
                          Click to change file
                        </p>
                      </>
                    )}
                  </div>
                  <input
                    type="file"
                    ref={frontRef}
                    accept="application/pdf"
                    className="opacity-0 absolute"
                    onChange={handleFrontFileChange}
                  />
                </label>
              </div>
            </div>

            {/* Driving License Back */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                Driving License (Back)
                <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center justify-center w-full">
                <label
                  className={`flex flex-col w-full h-44 border-2 border-dashed ${
                    backFileName
                      ? "border-green-300 bg-green-50"
                      : "border-blue-200 bg-blue-50"
                  } hover:border-blue-400 rounded-xl cursor-pointer hover:bg-blue-100 transition-all duration-200`}
                >
                  <div className="flex flex-col items-center justify-center h-full p-4">
                    {!backFileName ? (
                      <>
                        <div className="bg-white p-3 rounded-full mb-3 shadow-md">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-7 h-7 text-blue-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                          </svg>
                        </div>
                        <p className="text-sm font-medium text-blue-700 text-center">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-blue-500 mt-1">
                          JPG, PNG or PDF (max. 5MB)
                        </p>
                      </>
                    ) : (
                      <>
                        <div className="bg-white p-3 rounded-full mb-3 shadow-md">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-7 h-7 text-green-600"
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
                        <p className="text-sm font-medium text-green-700 text-center">
                          File Selected
                        </p>
                        <p className="text-xs text-green-600 mt-1 break-all max-w-full px-2 text-center">
                          {backFileName}
                        </p>
                        <p className="text-xs text-green-600 mt-2 underline">
                          Click to change file
                        </p>
                      </>
                    )}
                  </div>
                  <input
                    type="file"
                    ref={backRef}
                    accept="application/pdf"
                    className="opacity-0 absolute"
                    onChange={handleBackFileChange}
                  />
                </label>
              </div>
            </div>

            {/* Government ID */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                  />
                </svg>
                Government ID
                <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center justify-center w-full">
                <label
                  className={`flex flex-col w-full h-44 border-2 border-dashed ${
                    gIdFileName
                      ? "border-green-300 bg-green-50"
                      : "border-blue-200 bg-blue-50"
                  } hover:border-blue-400 rounded-xl cursor-pointer hover:bg-blue-100 transition-all duration-200`}
                >
                  <div className="flex flex-col items-center justify-center h-full p-4">
                    {!gIdFileName ? (
                      <>
                        <div className="bg-white p-3 rounded-full mb-3 shadow-md">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-7 h-7 text-blue-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                          </svg>
                        </div>
                        <p className="text-sm font-medium text-blue-700 text-center">
                          Aadhaar, Passport, Voter ID
                        </p>
                        <p className="text-xs text-blue-500 mt-1">
                          JPG, PNG or PDF (max. 5MB)
                        </p>
                      </>
                    ) : (
                      <>
                        <div className="bg-white p-3 rounded-full mb-3 shadow-md">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-7 h-7 text-green-600"
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
                        <p className="text-sm font-medium text-green-700 text-center">
                          File Selected
                        </p>
                        <p className="text-xs text-green-600 mt-1 break-all max-w-full px-2 text-center">
                          {gIdFileName}
                        </p>
                        <p className="text-xs text-green-600 mt-2 underline">
                          Click to change file
                        </p>
                      </>
                    )}
                  </div>
                  <input
                    type="file"
                    ref={gRef}
                    accept="application/pdf"
                    className="opacity-0 absolute"
                    onChange={handleGIdFileChange}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Submission Section */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-amber-500 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-sm text-gray-600">
                All documents will be verified within 24-48 hours
              </p>
            </div>

            <div className="flex flex-col md:flex-row justify-end gap-3">
              {/* <button
                        type="button"
                        className="px-6 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button> */}
              <button
                type="submit"
                className={`px-6 py-3 ${
                  frontFileName && backFileName && gIdFileName
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-blue-400 cursor-not-allowed"
                } rounded-lg text-sm font-medium text-white shadow-md transition-colors flex items-center justify-center gap-2`}
                disabled={!(frontFileName && backFileName && gIdFileName)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Update Documents
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDocs;
