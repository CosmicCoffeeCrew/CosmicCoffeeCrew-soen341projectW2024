import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ChauffeurPage.css';

const ChauffeurPage = () => {
    const [chauffeurs, setChauffeurs] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState('');
    const [pickupDetails, setPickupDetails] = useState({ location: '', time: '' });
    const navigate = useNavigate();

    useEffect(() => {
        if (selectedLocation) {
            const fetchAvailableChauffeurs = async () => {
                try {
                    const response = await fetch(`/api/chauffeurs/available?location=${selectedLocation}`);
                    const json = await response.json();
                    setChauffeurs(json);
                } catch (error) {
                    console.error('Error fetching chauffeurs:', error);
                }
            };
            fetchAvailableChauffeurs();
        }
    }, [selectedLocation]);

    const handleLocationChange = (e) => {
        setSelectedLocation(e.target.value);
    };

    const handlePickupDetailsChange = (e) => {
        const { name, value } = e.target;
        setPickupDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const bookChauffeur = async (chauffeurId) => {
        try {
            const response = await fetch('/api/bookings/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chauffeurId,
                    pickupDetails,
                }),
            });
            if (response.ok) {
                navigate('/booking/confirmation');
            } else {
                throw new Error('Booking failed');
            }
        } catch (error) {
            console.error('Error creating booking:', error);
        }
    };

    return (
        <div className="booking-container">
            <h1>Book Your Chauffeur</h1>
            <select value={selectedLocation} onChange={handleLocationChange} className="location-selector">
                <option value="">Select Location</option>
                <option value="Montreal">Montreal</option>
                <option value="Ottawa">Ottawa</option>
                <option value="Toronto">Toronto</option>
                <option value="Vancouver">Vancouver</option>
                <option value="Halifax">Halifax</option>
                <option value="Edmonton">Edmonton</option>
            </select>
            <div className="pickup-details-form">
                <input
                    type="text"
                    name="location"
                    value={pickupDetails.location}
                    onChange={handlePickupDetailsChange}
                    placeholder="Pickup Location"
                />
                <input
                    type="datetime-local"
                    name="time"
                    value={pickupDetails.time}
                    onChange={handlePickupDetailsChange}
                    placeholder="Pickup Time"
                />
            </div>
            <div className="chauffeur-selection">
                {chauffeurs.length > 0 ? chauffeurs.map((chauffeur) => (
                    <div key={chauffeur._id} className="chauffeur-card" onClick={() => bookChauffeur(chauffeur._id)}>
                        <p>Name: {chauffeur.firstName} {chauffeur.lastName}</p>
                        <p>Location: {chauffeur.location}</p>
                        <p>Price Per Day: ${chauffeur.pricePerDay}</p>
                        <p>Total Rating: {chauffeur.totalRating}</p>
                    </div>
                )) : <p>No chauffeurs available in selected location.</p>}
            </div>
        </div>
    );
};

export default ChauffeurPage;
