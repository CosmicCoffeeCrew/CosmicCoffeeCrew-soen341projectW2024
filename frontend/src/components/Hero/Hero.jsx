import { useEffect } from "react"; // Import useEffect from React
import PropTypes from "prop-types"; // Import PropTypes for prop-type validation
import carPng from "../../assets/car.png";
import bannerCar from "../../assets/banner-car.png";
import AOS from "aos";

const Hero = ({ theme }) => {
  useEffect(() => {
    AOS.refresh();
  }, []); // Add an empty dependency array to useEffect to ensure it runs only once

  return (
    <div className="dark:bg-black dark:text-white duration-300 mt-40 ">
      <div className="container min-h-[620px] flex">
        <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center">
          <div
            data-aos="zoom-in"
            data-aos-duration="1500"
            data-aos-once="false"
            className="order-1 sm:order-2"
          >
            <img
              src={theme === "dark" ? carPng : bannerCar}
              alt=""
              className="sm:scale-125 relative -z-10 max-h-[600px] drop-shadow-[2px_20px_6px_rgba(0,0,0,0.50)]"
            />
          </div>
          <div className="space-y-5 order-2 sm:order-1 sm:pr-32 ">
            <p data-aos="fade-up" className="text-primary text-2xl font-serif">
              Quick and Easy
            </p>
            <h1
              data-aos="fade-up"
              data-aos-delay="600"
              className="text-5xl lg:text-7xl font-semibold font-serif"
            >
              ZoomViteRapide
            </h1>
            <p data-aos="fade-up" data-aos-delay="1000">
            Welcome to ZoomViteRapide - your ultimate destination for hassle-free car rentals! We pride ourselves on offering a 
            seamless and convenient car rental experience that puts you in the driver&apos;s seat of your journey.{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add prop-type validation for the 'theme' prop
Hero.propTypes = {
  theme: PropTypes.string.isRequired,
};

export default Hero;
