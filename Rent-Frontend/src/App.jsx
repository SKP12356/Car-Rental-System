import "./App.css";
import Vehicle from "./pages/Vehicle";
import HostVehicle from "./pages/HostVehicle";
import Form from "./pages/Form";
import Sidebar from "./components/Sidebar";
import About from "./pages/About";
import EditForm from "./pages/EditForm";
import FavVehicle from "./pages/FavVehicle";
import Bookings from "./pages/Bookings";
import Invoice from "./components/Invoice";
import CarDetails from "./pages/CarDetails";
import ChangePassword from "./pages/ChangePassword";
import HostInvoice from "./components/HostInvoice";
import Settings from "./pages/Settings";
// import { Outlet } from "react-router-dom";
import Uploadings from "./components/Uploadings";
import Earnings from "./pages/Earnings";
import OfferPage from "./components/OfferPage";
import PaymentsHistory from "./pages/PaymentsHistory";
import { Toaster } from "react-hot-toast";
import Profile from "./components/Profile";
import EditDocs from "./components/EditDocs";
import CarContextProvider from "./store/carStore";
import Documents from "./pages/Documents";
import Dashboard from "./pages/Dashboard";
import Payment from "./pages/Payment";
import OtpVerifyMail from "./pages/OtpVerifyMail";
import Service from "./pages/Service";
import LogoutPrompt from "./components/LogoutPrompt";
import HostHistory from "./pages/HostHistory";
import Loader from "./components/Loader";
import PhoneOtp from "./pages/PhoneOtp"
import HomePage from "./pages/HomePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginForm from "./pages/LoginForm";
import SignupForm from "./pages/SignupForm";
import HostRegister from "./pages/HostRegister";
import EmailOtp from "./pages/EmailOtp";
import VerifyEmail from "./pages/VerifyEmail";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Sidebar />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/consumer/vehicles", element: <Vehicle /> },
        { path: "/host/vehicles", element: <HostVehicle /> },
        { path: "/consumer/services", element: <Service /> },
        { path: "/consumer/aboutUs", element: <About /> },
        { path: "/host/form", element: <Form /> },
        { path: "/user/favourites", element: <FavVehicle /> },
        { path: "/consumer/bookings", element: <Bookings /> },
        { path: "/user/vehicles/:id/details", element: <CarDetails /> },
        { path: "/user/login", element: <LoginForm /> },
        { path: "/user/signup", element: <SignupForm /> },
        { path: "/host/signup", element: <HostRegister /> },
        { path: "/user/payment/:id", element: <Payment /> },
        { path: "/settings", element: <Settings /> },
        { path: "/consumer/dashboard", element: <Dashboard /> },
        { path: "/user/documents", element: <Documents /> },
        { path: "/consumer/payments", element: <PaymentsHistory /> },
        { path: "/profile/:id", element: <Profile /> },
        { path: "/consumer/offers", element: <OfferPage /> },
        { path: "/host/history", element: <HostHistory /> },
        { path: "/host/earnings", element: <Earnings /> },
      ],
    },
    {
      path: "/consumer/bookings",
      element: <Form />,
    },
    {
      path: "/host/edit/:id",
      element: <EditForm />,
    },
    {
      path: "/logout",
      element: <LogoutPrompt />,
    },
    {
      path: "/editDocs",
      element: <EditDocs />,
    },
    {
      path: "/invoice/:id",
      element: <Invoice />,
    },
    {
      path: "/hostinvoice/:id",
      element: <HostInvoice />,
    },
    {
      path: "/user/emailotp/:id",
      element: <EmailOtp />,
    },
    {
      path: "/user/phoneotp/:id",
      element: <PhoneOtp />,
    },
    {
      path: "/user/verifymail",
      element: <VerifyEmail />,
    },
    {
      path: "/user/emailotp-password/:id",
      element: <OtpVerifyMail />,
    },
    {
      path: "/user/changepassword/:id",
      element: <ChangePassword />,
    },
  ]);

  return (
    <CarContextProvider>
      {/* <Toaster position="top-right" reverseOrder={false}/> */}
      <Toaster
        toastOptions={{
          className: "rounded-md shadow-lg",
          style: {
            background: "#f8fafc",
            color: "#334155",
            padding: "1rem",
            border: "1px solid #e2e8f0",
            fontWeight: "500",
          },
          success: {
            className: "border-l-4 border-green-500",
            style: {
              background: "#f0fdf4",
              color: "#166534",
            },
            iconTheme: {
              primary: "#16a34a",
              secondary: "#ffffff",
            },
          },
          error: {
            className: "border-l-4 border-red-500",
            style: {
              background: "#fef2f2",
              color: "#b91c1c",
            },
            iconTheme: {
              primary: "#ef4444",
              secondary: "#ffffff",
            },
          },
        }}
        position="bottom-right"
        gutter={12}
      />

      <RouterProvider router={router} />
      {/* <Header></Header> */}
      {/* <HomePage></HomePage> */}
      {/* <Sidebar cars={cars}></Sidebar> */}
      {/* <Outlet></Outlet> */}
      {/* <Vehicle></Vehicle> */}
      {/* <Form></Form> */}
    </CarContextProvider>
  );
}

export default App;
// exports.router = router;
