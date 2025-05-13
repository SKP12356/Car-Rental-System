import React, { useContext } from "react";
import { CarContext } from "../store/carStore";
import { useNavigate } from "react-router-dom";

const Uploadings = () => {
  const { documents } = useContext(CarContext);
  const navigate = useNavigate()
  // console.log(documents);

  const Documents = {
    frLicense: `http://localhost:3000/${documents[0]?.frLicense}`,
    baLicense: `http://localhost:3000/${documents[0]?.baLicense}`,
    gId: `http://localhost:3000/${documents[0]?.gId}`,
  };

  const documentTypes = [
    { label: "Front License", key: "frLicense", icon: "📄" },
    { label: "Back License", key: "baLicense", icon: "📄" },
    { label: "Government ID", key: "gId", icon: "🪪" },
  ];

  const handleupdate = () => {
    navigate("/editDocs")
  }

  return (
    <div className="flex-1">
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
          <span className="mr-2">📑</span>
          <span>Uploaded Documents</span>
        </h2>

        <div className="space-y-4">
          {documents.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-gray-500 italic">No documents found</p>
            </div>
          ) : (
            documentTypes.map(({ label, key, icon }) => (
              <div
                key={key}
                className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <a
                  href={Documents[key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                >
                  <span className="mr-2">{icon}</span>
                  {label}
                </a>
                {/* <div className="flex gap-2"> */}
                <button className="px-4 py-2 text-sm bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-md font-medium transition-colors" onClick={handleupdate}>
                  Update
                </button>
                {/* <button className="px-4 py-2 text-sm bg-red-50 text-red-600 hover:bg-red-100 rounded-md font-medium transition-colors">
                    Save
                  </button> */}
                {/* </div> */}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Uploadings;
