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

import ProductCatalog from "./components/Catalogue/ProductCatalogue";
import products from './components/Catalogue/ProductDetails'; // Import products array

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
      <SearchBar />
      <Hero theme={theme} />
      <About />
      <Services />
      <ProductCatalog products={products} />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/Reservations" element={<Reservations />} />
      </Routes>
      <Footer />
    </Router>
    </div>
  );
};

export default App;
