import React, { useContext, useRef } from "react";
import { CarContext } from "../store/carStore";
import { useParams } from "react-router-dom";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const HostInvoice = () => {
  const { bookCars } = useContext(CarContext);
  const { id } = useParams();
  const selectedId = bookCars?.find((car) => car._id === id);
  selectedId;
  const date = selectedId?.bookedAt?.split("-");
  const strDate = date?.[2].split(" ");
  // const invoiceRef = useRef();
  const plainRef = useRef();

  const handleDownload = async () => {
    const element = plainRef.current;
    if (!element) return;

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");

    // DEBUG LOG: See if it starts with data:image/png;base64
    // console.log("imgData:", imgData.slice(0, 30));

    if (!imgData.startsWith("data:image/png")) {
      console.error("Image data is invalid or empty!");
      return;
    }

    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("invoice.pdf");
  };

  return (
    <>
      <div
        className="max-w-4xl mx-auto mt-12 p-8 bg-white rounded-xl shadow-lg"
        // ref={invoiceRef}
      >
        <div className="flex justify-between items-center mb-8 border-b pb-6">
          <h2 className="text-3xl font-bold text-gray-800">Invoice</h2>
          <div className="text-right">
            <p className="text-sm text-gray-500">Booking ID</p>
            <p className="text-lg font-semibold">{selectedId?.orderId}</p>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-700 flex items-center">
            <span className="w-1 h-6 bg-blue-500 rounded mr-3"></span>
            Booking Details
          </h3>

          <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded shadow-sm">
                <p className="text-gray-500 text-sm mb-1">Vehicle</p>
                <p className="font-semibold text-lg">
                  {selectedId?.bookId.make} {selectedId?.bookId.model}
                </p>
              </div>
              <div className="bg-white p-4 rounded shadow-sm">
                <p className="text-gray-500 text-sm mb-1">Amount Paid</p>
                <p className="font-semibold text-lg text-blue-600">
                  {selectedId?.amount}
                </p>
              </div>
              <div className="bg-white p-4 rounded shadow-sm">
                <p className="text-gray-500 text-sm mb-1">Pickup Date</p>
                <p className="font-semibold">{selectedId?.bookedAt}</p>
              </div>
              <div className="bg-white p-4 rounded shadow-sm">
                <p className="text-gray-500 text-sm mb-1">Return Date</p>
                <p className="font-semibold">{selectedId?.completedAt}</p>
              </div>
            </div>

            <div className="mt-6 bg-white p-4 rounded shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500 text-sm mb-1">Payment Status</p>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    <p className="font-semibold text-green-600">Paid</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-500 text-sm mb-1">Transaction Date</p>
                  <p className="font-semibold">
                    {strDate?.[0]}/{date?.[1]}/{date?.[0]}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-10">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 flex items-center mx-auto"
            onClick={handleDownload}
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
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Download Invoice
          </button>
        </div>
      </div>

      {/* 🧾 Hidden plain version for PDF */}
      <div
        ref={plainRef}
        style={{
          position: "absolute",
          left: "-9999px",
          top: "0",
          fontFamily: "Arial, sans-serif",
          padding: "30px",
          color: "#222",
          width: "750px",
          backgroundColor: "#fff",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          lineHeight: "1.6",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "2px solid #eaeaea",
            paddingBottom: "15px",
            marginBottom: "20px",
          }}
        >
          <h2
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              margin: "0",
              color: "#1a56db",
            }}
          >
            Invoice
          </h2>
          <div style={{ textAlign: "right" }}>
            <div
              style={{ fontSize: "12px", color: "#666", marginBottom: "4px" }}
            >
              Booking ID
            </div>
            <div style={{ fontSize: "16px", fontWeight: "bold" }}>
              {selectedId?.orderId}
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#f7f9fc",
            padding: "20px",
            borderRadius: "6px",
            marginBottom: "25px",
            border: "1px solid #e5e7eb",
          }}
        >
          <h3
            style={{
              marginTop: "0",
              marginBottom: "15px",
              fontSize: "20px",
              borderLeft: "4px solid #1a56db",
              paddingLeft: "10px",
              color: "#333",
            }}
          >
            Booking Details
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "15px",
            }}
          >
            <div
              style={{
                padding: "12px",
                backgroundColor: "white",
                borderRadius: "6px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
              }}
            >
              <div
                style={{ fontSize: "12px", color: "#666", marginBottom: "4px" }}
              >
                Vehicle
              </div>
              <div style={{ fontWeight: "600" }}>{selectedId?.car}</div>
            </div>

            <div
              style={{
                padding: "12px",
                backgroundColor: "white",
                borderRadius: "6px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
              }}
            >
              <div
                style={{ fontSize: "12px", color: "#666", marginBottom: "4px" }}
              >
                Amount Paid
              </div>
              <div style={{ fontWeight: "600", color: "#1a56db" }}>
                {selectedId?.amount}
              </div>
            </div>

            <div
              style={{
                padding: "12px",
                backgroundColor: "white",
                borderRadius: "6px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
              }}
            >
              <div
                style={{ fontSize: "12px", color: "#666", marginBottom: "4px" }}
              >
                Pickup Date
              </div>
              <div style={{ fontWeight: "600" }}>{selectedId?.bookedAt}</div>
            </div>

            <div
              style={{
                padding: "12px",
                backgroundColor: "white",
                borderRadius: "6px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
              }}
            >
              <div
                style={{ fontSize: "12px", color: "#666", marginBottom: "4px" }}
              >
                Return Date
              </div>
              <div style={{ fontWeight: "600" }}>{selectedId?.completedAt}</div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "15px",
              padding: "12px",
              backgroundColor: "white",
              borderRadius: "6px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            }}
          >
            <div>
              <div
                style={{ fontSize: "12px", color: "#666", marginBottom: "4px" }}
              >
                Payment Status
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "600",
                  color: "#10b981",
                }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    backgroundColor: "#10b981",
                    borderRadius: "50%",
                    display: "inline-block",
                    marginRight: "6px",
                  }}
                ></span>
                Paid
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div
                style={{ fontSize: "12px", color: "#666", marginBottom: "4px" }}
              >
                Transaction Date
              </div>
              <div style={{ fontWeight: "600" }}>
                {strDate?.[0]}/{date?.[1]}/{date?.[0]}
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            fontSize: "12px",
            color: "#666",
            textAlign: "center",
            marginTop: "30px",
            borderTop: "1px solid #eaeaea",
            paddingTop: "15px",
          }}
        >
          Thank you for choosing our services. This is a computer-generated
          invoice.
        </div>
      </div>
    </>
  );
};

export default HostInvoice;
