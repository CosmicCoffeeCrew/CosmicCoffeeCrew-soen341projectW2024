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

//Inventory Cars:
//Testing with invetory page:

//import InventoryPage from "./components/InventoryPage/InventoryPage";
//<Route path="/InventoryPage" element={<InventoryPage/>} />

//import VehicleDetailPage from './components/InventoryPage/VehicleDetailPage';
//------
import ProductCatalogue from "./components/Catalogue/ProductCatalogue";
import VehicleDetailPage from './components/Catalogue/View_details/VehicleDetailPage';
import RentalFormPage from './components/Catalogue/View_details/RentalFormPage';
// import RentalForm from './components/Catalogue/RentalFormPage'; // Make sure this component exists
// <Route path="/rental-form" element={<RentalForm />} />

//Catalogue->ProductCatalogue
//Catalogue->Forms->RentalFormPage.jsx

// import products from './components/Catalogue/ProductDetails'; // Import products array
//Customer Review
import CustomerReview from "./components/CustormerReview/CustomerReview";
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
        <Route path="/inventory/:vehicleId" element={<VehicleDetailPage />} />
        <Route path="/rental-form" element={<RentalFormPage/>} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/csr" element={<CSRPage />} />
        
      </Routes>
      <Footer />
    </Router>
    </div>
  );
};

export default App;
