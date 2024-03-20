import React, {useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import SearchBar from "../components/SearchBar/SearchBar";
import Hero from "../components/Hero/Hero";
import About from "../components/About/About";
import Services from "../components/Services/Services"; // import products from '../components/Catalogue/ProductDetails'; // Import products array


const Home = () => {
  // dark mode start
  const [theme] = useState(
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
      <SearchBar />
      <Hero theme={theme} />
      <About />
      <Services />
    </div>
  );
};

export default Home;