import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  addCarService,
  addFavCar,
  deleteCarServer,
  editCarServer,
  getCarServices,
  getMyCarServices,
  getFavouriteCar,
  deleteFavCar,
  getDetails,
  getBookingCar,
  addBookingCar,
  deleteBookingCar,
  searchCarServices,
  addUser,
  addHost,
  loginUser,
  handleRazorpayPayment,
  uploadDocumentsService,
  getDocuments,
  getHistory,
  getPopularCars,
  updateDocumentsService,
  modifyUserProfile,
  updateUserPassword,
  searchHistoryServices,
  emailOtpService,
  resendOtp,
  phoneOtpService,
  addphoneOtpService,
  resendPhoneOtp,
  sendEmailforVerify,
  rewritePassword
} from "../services/carServices";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export const CarContext = createContext({
  cars: [],
  MyCars: [],
  favCars: [],
  popularCars: [],
  bookCars: [],
  searchedCars: [],
  documents: [],
  history: [],
  // amount: [],
  userType: String,
  searchedHistories: [],
  user: {},
  favourite: String,
  setFavourite: () => {},
  // editCars: {},
  // detailsCar: {},
  addCars: () => {},
  updateCars: () => {},
  deleteCars: () => {},
  carDetails: () => {},
  findUsingId: () => {},
  addFavouriteCar: () => {},
  deleteFavouriteCars: () => {},
  addBookedCars: () => {},
  deleteBookedCars: () => {},
  getDetailsCar: () => {},
  searchHistory: () => {},
  searchCars: () => {},
  registerUser: () => {},
  registerHost: () => {},
  userLogin: () => {},
  login: () => {},
  logout: () => {},
  providePayment: () => {},
  addDocument: () => {},
  updateDocumnets: () => {},
  updateProfile: () => {},
  updatePassword: () => {},
  provideOtp: () => {},
  otpResend: () => {},
  providePhoneOtp: () => {},
  addPhoneOtp: () => {},
  phoneotpResend: () => {},
  sendmail: () => {},
  sendPassword: () => {}
});

function CarContextProvider({ children }) {
  // const navigate = useNavigate()
  const [cars, setCars] = useState([]);
  const [popularCars, setPopularCars] = useState([]);
  const [myCars, setMyCars] = useState([]);
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userType, setUserType] = useState(localStorage.getItem("type"));
  const [favourite, setFavourite] = useState(false);
  // const [editCars, setEditCars] = useState();
  // const [detailsCar, setDetailsCar] = useState();
  const [favCars, setFavCars] = useState([]);
  const [bookCars, setBookCars] = useState([]);
  // const [amount, setAmount] = useState([])
  const [searchText, setSearchText] = useState("");
  const [searchedCars, setSearchedCars] = useState([]);
  const [documents, setDocuments] = useState(null);
  const [history, setHistory] = useState(null);

  const [searchModel, setSearchModel] = useState("");
  const [searchedHistories, setSearchedHistories] = useState([]);

  // const { bookingCars, history } = getBookingCar(token);
  // console.log(bookingCars)

  // const {id} = useParams()
  // console.log(cars);
  // console.log(bookCars);
  // console.log(myCars);
  // console.log(history);
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");
    if (savedUser !== "undefined" && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }
  }, []);

  useEffect(() => {
    getCarServices().then((initialCars) => {
      setCars(initialCars);
    });
  }, []); //[cars]

  useEffect(() => {
    getPopularCars().then((initialCars) => {
      setPopularCars(initialCars);
    });
  }, []);

  useEffect(() => {
    getDocuments(token).then((docs) => {
      setDocuments(docs);
    });
  }, [token]);

  useEffect(() => {
    getHistory(token).then((his) => {
      setHistory(his);
    });
  }, [token]);

  useEffect(() => {
    getMyCarServices(token).then((initialCars) => {
      setMyCars(initialCars);
    });
  }, [token]); //[cars]

  useEffect(() => {
    const fetchFavCars = async () => {
      if (token && user) {
        try {
          const initialCars = await getFavouriteCar(token);
          setFavCars(initialCars);
        } catch (err) {
          console.error("Error fetching favorite cars", err);
        }
      }
    };
    fetchFavCars();
  }, [user, token]);

  // console.log(searchedHistories)

  useEffect(() => {
    getBookingCar(token).then((initialCars) => {
      setBookCars(initialCars);
    });
  }, [token]);

  useEffect(() => {
    const fetchCars = async () => {
      const data = await searchCarServices(searchText);
      setSearchedCars(data);
    };
    fetchCars();
  }, [cars, searchText]);

  useEffect(() => {
    const fetchCars = async () => {
      const data = await searchHistoryServices(searchModel);
      setSearchedHistories(data);
    };
    fetchCars();
  }, [cars, searchModel]);

  const searchCars = async (text) => {
    setSearchText(text);
  };

  const searchHistory = async (text) => {
    setSearchModel(text);
  };

  const login = (userData, token, type) => {
    // console.log(userData)
    setUser(userData);
    setToken(token);
    setUserType(type);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    localStorage.setItem("type", type);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setUserType(null);
    setFavCars([]);
    setBookCars([]);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("type");
  };

  const userLogin = async (email, password) => {
    try {
      const data = await loginUser(email, password);
      // console.log(data.type)
      login(data.user, data.token, data.type);
      return data;
    } catch (err) {
      const errMsg = err.response?.data?.message;
      // console.log(errMsg);
      return errMsg;
    }
  };

  const addCars = async (
    make,
    model,
    year,
    color,
    licensePlate,
    location,
    vehicleType,
    fuelType,
    transmission,
    seats,
    doors,
    dailyRate,
    mileage,
    features,
    image,
    description
  ) => {
    // console.log(location);
    const carItem = await addCarService(
      make,
      model,
      year,
      color,
      licensePlate,
      location,
      vehicleType,
      fuelType,
      transmission,
      seats,
      doors,
      dailyRate,
      mileage,
      features,
      image,
      description
    );
    const newCars = [...cars, carItem];
    setCars(newCars);

    // as my cars is not fetching when a car is added
    if (token) {
      const hostCars = await getMyCarServices(token);
      setMyCars(hostCars);
    }
    return carItem;
  };

  const registerUser = async (
    image,
    firstName,
    secName,
    userName,
    email,
    phone,
    password,
    confirmPassword
  ) => {
    // console.log(image)
    // const availableUser =
    try {
      const data = await addUser(
        image,
        firstName,
        secName,
        userName,
        email,
        phone,
        password,
        confirmPassword
      );
      return data;
    } catch (err) {
      const errMsg = err.response?.data?.message;
      // console.log(errMsg);
      return errMsg;
    }

    // console.log(data)
    // return data
  };

  const registerHost = async (
    image,
    fullName,
    email,
    phone,
    password,
    confirmPassword,
    addressLine,
    city,
    state,
    pincode,
    idType,
    idNumber
  ) => {
    // const availableUser =
    try {
      const data = await addHost(
        image,
        fullName,
        email,
        phone,
        password,
        confirmPassword,
        addressLine,
        city,
        state,
        pincode,
        idType,
        idNumber
      );
      return data;
    } catch (err) {
      const errMsg = err.response?.data?.message;
      // console.log(errMsg);
      return errMsg;
    }
  };

  const carDetails = async (id) => {
    // console.log(id);
    const data = await getDetails(id);
    // console.log(data);
    // this line
    return data;
  };

  const deleteCars = async (id) => {
    const deletedId = await deleteCarServer(id);
    const newCars = cars.filter((car) => car._id !== deletedId);
    setCars(newCars);
    if (token) {
      const hostCars = await getMyCarServices(token);
      setMyCars(hostCars);
    }
    getPopularCars().then((initialCars) => {
      setPopularCars(initialCars);
    });
  };

  const updateCars = async (
    id,
    make,
    model,
    year,
    color,
    licensePlate,
    location,
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
    existingImage
  ) => {
    // console.log(location);
    // console.log(existingImage)
    await editCarServer(
      id,
      make,
      model,
      year,
      color,
      licensePlate,
      location,
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
      existingImage
    );

    const updatedCar = cars.map((car) => {
      if (car._id === id) {
        return {
          id,
          make,
          model,
          year,
          color,
          licensePlate,
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
        };
      }
      return car;
    });
    setCars(updatedCar);
    // await getCarServices()
    if (token) {
      const hostCars = await getMyCarServices(token);
      setMyCars(hostCars);
    }
  };

  // const findUsingId = (id) => {
  //   const editCar = cars.find((car) => car.id === id);
  //   setEditCars(editCar);
  //   // console.log(editCars)
  // };

  // useEffect(() => {
  //   findUsingId(id);
  // }, [id])

  const addFavouriteCar = async (id) => {
    // console.log(id);
    const favCarItem = await addFavCar(id);
    // console.log(favCarItem);
    // console.log(favCarItem.id)
    // const newFavCar = [...favCars, favCarItem];
    // setFavCars(newFavCar);
    setFavCars((prev) => [...prev, favCarItem]);
    getPopularCars().then((initialCars) => {
      setPopularCars(initialCars);
    });
    // console.log(favCarItem)
    return favCarItem;
  };

  const deleteFavouriteCars = async (id) => {
    const deletedId = await deleteFavCar(id);
    const newFavCars = favCars.filter((car) => car._id !== deletedId);
    setFavCars(newFavCars);
  };

  const addBookedCars = async (value, id, pays, unavailableTime) => {
    const bookCarItem = await addBookingCar(value, id, pays, unavailableTime);
    const newBookCar = [...bookCars, bookCarItem];
    setBookCars(newBookCar);
    getBookingCar(token).then((initialCars) => {
      setBookCars(initialCars);
    });
    getCarServices().then((initialCars) => {
      setCars(initialCars);
    });
    getFavouriteCar(token).then((initialCars) => {
      setBookCars(initialCars);
    });
    getHistory(token).then((his) => {
      setHistory(his);
    });
  };

  const deleteBookedCars = async (id) => {
    const deletedId = await deleteBookingCar(id);
    const newBookedCars = bookCars.filter((car) => car._id !== deletedId);
    setBookCars(newBookedCars);
  };

  const providePayment = async (value, id, time) => {
    const data = await handleRazorpayPayment(value, id, time);
    await addBookedCars(value, id, data.razorpayResponse, time);
    // console.log(data.order.amount);
    // setAmount(data.order.amount)
    // console.log(amount)
    // console.log(data);
    return data;
  };

  const addDocument = async (frLicense, baLicense, gId) => {
    // console.log(frLicense, baLicense, gId)
    await uploadDocumentsService(frLicense, baLicense, gId);
    await getDocuments(token).then((docs) => {
      setDocuments(docs);
    });
  };

  const updateDocumnets = async (
    id,
    frLicense,
    baLicense,
    gId,
    existingFrontdl,
    existingBackdl,
    existingGid
  ) => {
    // console.log(frLicense);
    // console.log(baLicense);
    // console.log(gId);
    // console.log(id);
    // console.log(existingFrontdl);
    // console.log(existingBackdl);
    // console.log(existingGid);
    // console.log(location);
    // console.log(existingImage)
    const data = await updateDocumentsService(
      id,
      frLicense,
      baLicense,
      gId,
      existingFrontdl,
      existingBackdl,
      existingGid
    );
    getDocuments(token).then((docs) => {
      setDocuments(docs);
    });
    return data;
  };

  const updateProfile = async (
    id,
    image,
    name,
    email,
    phone,
    address,
    previousImage
  ) => {
    const updatedUser = await modifyUserProfile(
      id,
      image,
      name,
      email,
      phone,
      address,
      previousImage
    );
    // console.log(updatedUser);
    login(updatedUser, token, userType);
  };

  const updatePassword = async (id, password, newPassword, confirmPassword) => {
    try {
      const data = updateUserPassword(
        id,
        password,
        newPassword,
        confirmPassword
      );
      // login(data.user, data.token, data.type);
      return data;
    } catch (err) {
      const errMsg = err.response?.data?.message;
      // console.log(errMsg);
      return errMsg;
    }
  };

  const provideOtp = async (id, otp) => {
    // console.log(otp)
    try {
      const data = await emailOtpService(id, otp);
      return data;
    } catch (err) {
      const errMsg = err.response?.data?.message;
      // console.log(errMsg);
      return errMsg;
    }
  };

  const otpResend = async (id) => {
    const data = await resendOtp(id);
    return data;
  };

  const providePhoneOtp = async (id) => {
    try {
      const data = await phoneOtpService(id);
      return data;
    } catch (err) {
      const errMsg = err.response?.data?.message;
      // console.log(errMsg);
      return errMsg;
    } 
  }

  const addPhoneOtp = async(id,otp) => {
    try {
      const data = await addphoneOtpService(id, otp);
      return data;
    } catch (err) {
      const errMsg = err.response?.data?.message;
      // console.log(errMsg);
      return errMsg;
    } 
  }

  const phoneotpResend = async (id) => {
    const data = await resendPhoneOtp(id);
    return data;
  };

  const sendmail = (email) => {
    const data = sendEmailforVerify(email)
    return data;
  }

  const sendPassword = (id, password, confirmPassword) => {
    const data = rewritePassword(id, password, confirmPassword)
    return data;
  }

  return (
    <CarContext.Provider
      value={{
        cars,
        myCars,
        favCars,
        popularCars,
        bookCars,
        // amount,
        searchedCars,
        documents,
        history,
        searchedHistories,
        userType,
        user,
        favourite,
        setFavourite,
        token,
        // editCars,
        // detailsCar,
        addCars,
        updateCars,
        deleteCars,
        carDetails,
        // setEditCars,
        addFavouriteCar,
        searchHistory,
        deleteFavouriteCars,
        addBookedCars,
        deleteBookedCars,
        // getDetailsCar,
        searchCars,
        registerUser,
        registerHost,
        userLogin,
        login,
        logout,
        providePayment,
        addDocument,
        updateDocumnets,
        updateProfile,
        updatePassword,
        provideOtp,
        otpResend,
        providePhoneOtp,
        addPhoneOtp,
        phoneotpResend,
        setToken,
        sendmail,
        sendPassword
      }}
    >
      {children}
    </CarContext.Provider>
  );
}

export default CarContextProvider;
