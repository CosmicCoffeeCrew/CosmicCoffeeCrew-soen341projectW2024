import PropTypes from 'prop-types'; 
import { useState } from "react";
import { BiSolidSun, BiSolidMoon } from "react-icons/bi";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";
import ResponsiveMenu from "./ResponsiveMenu";
import UserAuth from '../UserAuth/UserAuth'; 

export const Navlinks = [
  {
    id: 1,
    name: "HOME",
    link: "/"
  },
  {
    id: 2,
    name: "MY BOOKINGS",
    link: "/Reservations"
  },
  {
    id: 3,
    name: "ABOUT US",
    link: "/#about"
  }
];
const Navbar = ({ theme, setTheme }) => {
 
  const [showMenu, setShowMenu] = useState(false);
  const [userAuthVisibility, setUserAuthVisibility] = useState({show: false, mode: 'login'}); // New state for UserAuth visibility and mode

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

   // Handlers for showing the UserAuth component
   const handleShowLogin = () => {
    setUserAuthVisibility({show: true, mode: 'login'});
  };

  const handleShowSignup = () => {
    setUserAuthVisibility({show: true, mode: 'signup'});
  };

  // Handler for closing the UserAuth component
  const handleCloseUserAuth = () => {
    setUserAuthVisibility({show: false, mode: userAuthVisibility.mode});
  };

  return (
    <div
      className="relative z-20 shadow-xl w-full bg-secondary-100 dark:bg-black dark:text-white duration-300
    "
    >
      <div className="container py-2 md:py-0 ">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-3xl font-bold font-serif">ZoomViteRapide</span>
          </div>
          <nav className="hidden md:block">
            <ul className="flex items-center gap-8">
              {Navlinks.map(({ id, name, link }) => (
                <li key={id} className="py-4">
                  <a
                    href={link}
                    className=" text-lg font-medium  hover:text-primary py-2 hover:border-b-2 hover:border-primary transition-colors duration-500  "
                  >
                    {name}
                  </a>
                </li>
              ))}
              {/* Login and Signup buttons */}
              <li className="py-4"><button onClick={handleShowLogin}>Login</button></li>
              <li className="py-4"><button onClick={handleShowSignup}>Sign Up</button></li>
              {/* DarkMode feature implement */}
              {theme === "dark" ? (
                <BiSolidSun
                  onClick={() => setTheme("light")}
                  className="text-2xl"
                />
              ) : (
                <BiSolidMoon
                  onClick={() => setTheme("dark")}
                  className="text-2xl"
                />
              )}
            </ul>
          </nav>
          {/* Mobile view  */}
          <div className="flex items-center gap-4 md:hidden ">
            {/* dark  mode */}
            {theme === "dark" ? (
              <BiSolidSun
                onClick={() => setTheme("light")}
                className="text-2xl"
              />
            ) : (
              <BiSolidMoon
                onClick={() => setTheme("dark")}
                className="text-2xl"
              />
            )}
            {/* Mobile Hamburger icon */}
            {showMenu ? (
              <HiMenuAlt1
                onClick={toggleMenu}
                className=" cursor-pointer transition-all"
                size={30}
              />
            ) : (
              <HiMenuAlt3
                onClick={toggleMenu}
                className="cursor-pointer transition-all"
                size={30}
              />
            )}
          </div>
        </div>
      </div>
      <ResponsiveMenu showMenu={showMenu} />
      {/* Conditionally render UserAuth */}
      {userAuthVisibility.show && <UserAuth onClose={handleCloseUserAuth} initialMode={userAuthVisibility.mode} />}
    </div>
  );
};

Navbar.propTypes = {
  theme: PropTypes.string.isRequired,
  setTheme: PropTypes.func.isRequired,
};

export default Navbar;