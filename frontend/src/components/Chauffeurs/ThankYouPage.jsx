//import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ThankYouPage.css';
//import {chauffeurs} from '../Chauffeurs/ChauffeurPage'
//import { useAuthContext } from '../Chauffeurs/ChauffeurPage';
import chauffeurModel from '../../../../backend/models/chauffeurModel';

const ThankYouPage = () => {
    const navigate = useNavigate();

    const handleBackToMenu = () => {
        navigate('/'); // assuming '/' is the path to your main menu
    };

    return (
        <div className="thank-you-container">
            <h1>Thank You for Choosing {chauffeurModel}!</h1>
            <button onClick={handleBackToMenu} className="back-to-menu-button">
                Back to Menu
            </button>
        </div>
    );
};

export default ThankYouPage;
