import { FaDollarSign } from "react-icons/fa";
import { IoMdFlash } from "react-icons/io";
import { SlNote } from "react-icons/sl";

const skillsData = [
  {
    name: "Best Price",
    icon: (
      <FaDollarSign className="text-5xl text-primary group-hover:text-black duration-300" />
    ),
    description: "Unlock unbeatable savings on your next adventure with our car rental service, offering the best prices guaranteed",
    aosDelay: "0",
  },
  {
    name: "Fast Service",
    icon: (
      <IoMdFlash className="text-5xl text-primary group-hover:text-black duration-300" />
    ),
    description: "Get ready to experience lightning-fast service with our company, where speed and efficiency are our top priorities, ensuring you hit the road in record time.",
    aosDelay: "500",
  },
  {
    name: "Safe Experience",
    icon: (
      <SlNote className="text-5xl text-primary group-hover:text-black duration-500" />
    ),
    description: "Count on our company to deliver the safest experience possible, with rigorous safety protocols, expertly maintained vehicles.",
    aosDelay: "1000",
  },
];
const Services = () => {
  return (
    <>
      <span id="about"></span>
      <div className="dark:bg-black dark:text-white py-14 sm:min-h-[600px] sm:grid sm:place-items-center">
        <div className="container">
          <div className="pb-12">
            <h1
              data-aos="fade-up"
              className="text-3xl font-semibold text-center sm:text-4xl font-serif"
            >
              Why Choose Us
            </h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {skillsData.map((skill) => (
              <div
                key={skill.name}
                data-aos="fade-up"
                data-aos-delay={skill.aosDelay}
                className="card text-center group space-y-3 sm:space-y-6 p-4 sm:py-16 bg-dark  hover:bg-primary duration-300 text-white hover:text-black rounded-lg"
              >
                <div className="grid place-items-center">{skill.icon}</div>
                <h1 className="text-2xl font-bold">{skill.name}</h1>
                <p>{skill.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
