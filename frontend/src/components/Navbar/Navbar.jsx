import PropTypes from 'prop-types'; 
import { useState, useEffect } from "react";
import { BiSolidSun, BiSolidMoon } from "react-icons/bi";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";
import ResponsiveMenu from "./ResponsiveMenu";
import UserAuth from '../UserAuth/UserAuth'; 
import { useLogout } from '../../hooks/useLogout';
import { useAuthContext } from '../../hooks/useAuthContext';

export const Navlinks = [
  {
    id: 1,
    name: "HOME",
    link: "/",
    permission: "Customer"
  },
  {
    id: 2,
    name: "CATALOG",
    link: "/Catalog",
    permission: "Customer"
  },
  {
    id: 3,
    name: "MY BOOKINGS",
    link: "/Reservations",
    permission: "Customer"
  },
  {
    id: 4,
    name: "CHAUFFEUR",
    link: "/chauffeur",
    permission: "Customer"
  },
  {
    id: 5,
    name: "ABOUT US",
    link: "/#about",
    permission: "Customer"
  },
  {
    id: 6,
    name:"OUR REVIEWS",
    link:"/CustomerReview",
    permission: "Customer"
  },
  {
    id: 7,
    name: "ADMIN",
    link: "/AdminDashboard",
    permission: "Admin"
  },
  {
    id: 8, 
    name: "CSR",
    link: "/CSR",
    permission: "CSR"
  }
  // {
  //   id: 5,
  //   name: "INVENTORY",
  //   link: "/InventoryPage"
  // }
];
const Navbar = ({ theme, setTheme }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [userAuthVisibility, setUserAuthVisibility] = useState({show: false, mode: 'login'}); // New state for UserAuth visibility and mode
  const { logout } = useLogout()
  const { user } = useAuthContext()
  const [filteredNavlinks, setFilteredNavlinks] = useState([]);

  const fetchUserPermission = async () => {
    let access;
    try {
      // while (user.tempId != null) {console.log('waiting')}

      if (user && user.tempId) { // Check if user is not null or undefined
        const response = await fetch('/api/users/' + user.tempId);
        if (response.ok) {
            const json = await response.json();
            access = await json.permission;
            console.log(access);  
        } else {
            throw new Error('Failed to fetch users');
        }
        return access;
      } else {
        throw new Error('User is null or undefined');
      }
    } catch (error) {
        console.error('Error fetching users:', error);
    }
  }; 
  
  useEffect(() => {
  const getUserPermission = async () => {
    const userPermission = await fetchUserPermission();
    // console.log(userPermission);
    // console.log(userPermission.toString() === 'Admin')
    // let userPermission = "Admin";

    const filteredLinks = Navlinks.filter(link => {
      if (userPermission === "Admin") {
        return link.permission === "Admin" || link.permission === "Customer";
      } else if (userPermission === "CSR") {
        return link.permission === "CSR" || link.permission === "Customer";
      } else {
        return link.permission === "Customer";
      }
    });
    setFilteredNavlinks(filteredLinks);
  };

  getUserPermission();
}, [user]);


  const handleLogOut = () => {
    logout()
  }

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
              {filteredNavlinks.map(({ id, name, link }) => (
                <li key={id} className="py-4">
                  <a
                    href={link}
                    className=" text-lg font-medium  hover:text-primary py-2 hover:border-b-2 hover:border-primary transition-colors duration-500  "
                  >
                    {name}
                  </a>
                </li>
              ))}
              {/* Logout button and user email (displayed if person logged in)*/}
              {user && (
                <div>
                  <li><span className="py-4">{user.email}</span></li>
                  <li className="py-4"><button onClick={handleLogOut}>Logout</button></li>
                </div>
              )}
              {/* Login and Signup buttons (displayed if person logged out) */}
              {!user && (
                <div>
                  <li className="py-4"><button onClick={handleShowLogin}>Login</button></li>
                  <li className="py-4"><button onClick={handleShowSignup}>Sign Up</button></li>
                </div>
              )}
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