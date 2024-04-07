import React, {useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// Component import
import Home from "./pages/Home";
import Navbar from "./components/Navbar/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Reservations from "./pages/Reservations";
import Footer from "./components/Footer/Footer";
import AdminDashboard from "./pages/Admin";
import CSRPage from "./pages/CSR";

//Return Instructions
import ReturnInstructionsPage from './pages/ReturnInstructionsPage';

//Catalogue
import ProductCatalogue from "./components/Catalogue/ProductCatalogue";
import RentalFormPage from './components/Catalogue/View_details/RentalFormPage';

//Customer Review
import CustomerReview from "./components/CustormerReview/CustomerReview";

//Payement Page
import PaymentPage from "./components/Payement/PaymentPage";
import PaymentSuccessPage from "./components/Payement/PaymentSuccessPage";

//CheckIn Page
import CheckIn from './components/CheckIn/CheckInPage';
import ReservationsPage from './pages/Reservations';
//CheckOut page
import CheckOutPage from './components/CheckOut/CheckOutPage';

//Chauffeur page
import ChauffeurPage from "./components/Chauffeurs/ChauffeurPage";
import ThankYouPage from "./components/Chauffeurs/ThankYouPage";


const App = () => {
  // dark mode start
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );
  const element = document.documentElement;

  useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);
  // dark mode end

  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <div className="bg-secondary-300  dark:bg-black dark:text-white text-black overflow-x-hidden">
      <Router>
      <Navbar theme={theme} setTheme={setTheme} />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/Reservations" element={<Reservations />} />
        <Route path="/CustomerReview" element = {<CustomerReview/>}/>
        <Route path="/Catalog" element={<ProductCatalogue />} />
        <Route path="/vehicles/:vehicleId" element={<RentalFormPage />} />
        {/* CheckIn Page */}
        <Route path="/reservations" element={<ReservationsPage />} />
        {/* <Route path="/check-in/" element={<CheckIn/>} /> */}
        <Route path="/check-in/:reservationId" element={<CheckIn />} />
        {/* Payment Page */}
        <Route path="/PaymentPage" element={<PaymentPage/>} />
        <Route path="/payment-success" element={<PaymentSuccessPage/>} />
        {/* Check this page */}
        <Route path="/rental-form" element={<RentalFormPage/>} />
        {/* Check out page */}
        {/* <Route path="/checkout" element={<CheckOut/>} /> */}
        <Route path="/checkout/:reservationId" element={<CheckOutPage />} />
        {/* Return Instructions */}
        <Route path="/ReturnInstructionsPage" element={<ReturnInstructionsPage />} />
        {/* Admin pages */}
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/" element={<AdminDashboard />} />
        {/* CSR pages */}
        <Route path="/csr" element={<CSRPage />} />
        {/* Chauffeur Page */}
        <Route path="/chauffeur" element={<ChauffeurPage/>} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        
      </Routes>
      <Footer />
    </Router>
    </div>
  );
};

export default App;
