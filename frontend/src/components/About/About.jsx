// import React from "react";
import CarPng from "../../assets/car1.png";

const About = () => {
  return (
    <div className="dark:bg-dark bg-secondary-100 sm:min-h-[600px] sm:grid sm:place-items-center duration-300 mt-14 rounded-t-3xl">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center">
          <div data-aos="slide-right" data-aos-duration="1500">
            <img
              src={CarPng}
              alt=""
              className="sm:scale-125 sm:-translate-x-11 max-h-[300px] drop-shadow-[2px_10px_6px_rgba(0,0,0,0.50)]"
            />
          </div>
          <div>
            <div className="space-y-5 sm:p-16 pb-6">
              <h1
                data-aos="fade-up"
                className="text-3xl sm:text-4xl font-bold font-serif"
              >
                About us
              </h1>
              <p data-aos="fade-up" className="leading-8 tracking-wide">
              At ZoomViteRapide, we understand that every trip is unique, and that&apos;s why we offer a diverse fleet of vehicles to suit 
              your needs, whether it&apos;s a sleek sedan for a business trip, a spacious SUV for a family adventure, or a nimble compact car 
              for zipping around the city. Our wide range of vehicles is meticulously maintained, ensuring a safe and comfortable ride every time.
              </p>
              <p data-aos="fade-up" className="leading-8 tracking-wide">
              Whether you&apos;re traveling for business or pleasure, ZoomViteRapide is your trusted partner for all your car rental needs. Experience 
              the freedom of the open road with ZoomViteRapide – where every journey begins with a click!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
