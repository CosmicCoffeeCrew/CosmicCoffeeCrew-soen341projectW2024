
import { useNavigate, useLocation } from 'react-router-dom';
import './ThankYouPage.css';

const ThankYouPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const chauffeurName = location.state?.chauffeurName || "our services";  // Use optional chaining

    const handleBackToMenu = () => {
        navigate('/'); // Assuming '/' is your main menu path
    };

    return (
        <div className="thank-you-container">
            {/* Replace ' with &apos; */}
            <h1>Thank You for Choosing {chauffeurName}&apos;s!</h1>
            <p className="thank-you-message">
                We&apos;re delighted to have the opportunity to serve you.
            </p>
            <button onClick={handleBackToMenu} className="back-to-menu-button">
                Back to Menu
            </button>
        </div>
    );
};

export default ThankYouPage;
