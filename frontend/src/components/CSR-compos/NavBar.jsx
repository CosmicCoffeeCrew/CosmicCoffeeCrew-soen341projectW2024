import PropTypes from 'prop-types';

const NavBar = ({ onCheckInClick, onCheckOutClick }) => {
    return (
        <nav className="pt-10 pb-10 shadow-xl w-full bg-secondary-100"> 
          <ul className="flex justify-around list-none">
          <li className="rounded-md transition-colors duration-300" onClick={onCheckInClick}>
              <div className="text-3xl font-bold font-serif hover:text-white">Check-in</div>
           </li>
           <li className="rounded-md transition-colors duration-300" onClick={onCheckOutClick}>
               {/* Using customBrown color for hover state */}
              <div className="text-3xl font-bold font-serif hover:text-white">Check-out</div>
           </li>
         </ul>
       </nav>
     );
};

NavBar.propTypes = {
  onCheckInClick: PropTypes.func.isRequired,
  
};

export default NavBar;