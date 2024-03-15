// import React from "react";
import {
  FaLocationArrow,
  FaMobileAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-secondary-100 dark:bg-dark mt-14 rounded-t-3xl items-center">
      <section className="container">
        <div className=" grid md:grid-cols-3 py-5">
          <div className=" py-8 px-4 ">
            <h1 className="sm:text-3xl text-xl font-bold sm:text-left text-justify mb-3 flex items-center gap-3 font-serif">
              ZoomViteRapide
            </h1>
            <p className="text-sm text-left">
              Contact us for all your inquiries{" "}
            </p>
            <br />
            <div className="flex items-center gap-3">
              <FaLocationArrow />
              <p>Montreal, Quebec</p>
            </div>
            <div className="flex items-center gap-3 mt-3">
              <FaMobileAlt />
              <p>+1 (438)876-9054</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Footer;