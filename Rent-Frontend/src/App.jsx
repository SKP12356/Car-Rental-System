import "./App.css";
import Vehicle from "./pages/Vehicle";
import HostVehicle from "./pages/HostVehicle";
import Form from "./pages/Form";
import Sidebar from "./components/Sidebar";
import About from "./pages/About";
import EditForm from "./pages/EditForm";
import FavVehicle from "./pages/FavVehicle";
import Bookings from "./pages/Bookings";
import Invoice from "./components/Invoice"
import CarDetails from "./pages/CarDetails";
import HostInvoice from "./components/HostInvoice";
import Settings from "./pages/Settings"
// import { Outlet } from "react-router-dom";
import Uploadings from "./components/Uploadings";
import Earnings from "./pages/Earnings";
import OfferPage from "./components/OfferPage";
import PaymentsHistory from "./pages/PaymentsHistory";
import Profile from "./components/Profile";
import EditDocs from "./components/EditDocs";
import CarContextProvider from "./store/carStore";
import Documents from "./pages/Documents";
import Dashboard from "./pages/Dashboard";
import Payment from "./pages/Payment"
import Service from "./pages/Service";
import LogoutPrompt from "./components/LogoutPrompt";
import HostHistory from "./pages/HostHistory";
import HomePage from "./pages/HomePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginForm from "./pages/LoginForm";
import SignupForm from "./pages/SignupForm";
import HostRegister from "./pages/HostRegister";

function App() {
  const router = createBrowserRouter(
    [
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
      element: <Form />
    },
    {
      path: "/host/edit/:id",
      element: <EditForm />
    },
    {
      path: "/logout",
      element: <LogoutPrompt />
    },
    {
      path: "/editDocs",
      element: <EditDocs />
    },
    {
      path: "/invoice/:id",
      element: <Invoice />
    },
    {
      path: "/hostinvoice/:id",
      element: <HostInvoice />
    },
  ]);

  return (
    <CarContextProvider>
      <RouterProvider router={router}/>
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