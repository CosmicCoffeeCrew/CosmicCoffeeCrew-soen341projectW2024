import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import './ChauffeurPage.css';

const ChauffeurPage = () => {
    const [chauffeurs, setChauffeurs] = useState([]);
    const [selectedChauffeur, setSelectedChauffeur] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState('');
    const navigate = useNavigate();
    const [bookingDetails, setBookingDetails] = useState({
        date: '',
        time: '',
        duration: ''
    });
    const locations = ['Montreal', 'Ottawa', 'Toronto', 'Vancouver', 'Halifax', 'Edmonton'];

    const { user } = useAuthContext(); // Assuming this hook provides the logged-in user's data

    const fetchUserID = async () => {
        let access;
        try {
          if (user && user.tempId) { // Check if user is not null or undefined
            const response = await fetch('/api/users/' + user.tempId);
            if (response.ok) {
                const json = await response.json();
                access = await json._id;
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

    // Fetching chauffeurs on component mount
    useEffect(() => {
        async function fetchChauffeurs() {
            let response;
            try {
                response = await fetch(`/api/chauffeurs?location=${selectedLocation}`);
                if (response.ok) {
                    const json = await response.json();
                    setChauffeurs(json);
                } else {
                    throw new Error('Failed to fetch chauffeurs');
                }
            } catch (error) {
                console.error('Error fetching chauffeurs:', error);
            }
        }
        if (selectedLocation) {
            fetchChauffeurs();
        } 

    }, [selectedLocation]);

    const handleSelectChauffeur = (chauffeurId) => {
        const chauffeur = chauffeurs.find(c => c._id === chauffeurId);
        setSelectedChauffeur(chauffeur);
    };

    const handleBookingChange = (e) => {
        const { name, value } = e.target;
        setBookingDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const handleLocationChange = (e) => {
        setSelectedLocation(e.target.value);
        setSelectedChauffeur(null); // Deselect chauffeur when changing location
        setChauffeurs([]);
    };

    const handleSubmitBooking = async () => {
        const userID = await fetchUserID();
        // console.log(userID);
        try {
            const response = await fetch('/api/bookings/book', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...bookingDetails,
                    chauffeurID: selectedChauffeur._id,
                    userID
                }),
            });

            if (response.ok) {
                // Handle booking confirmation
                //const bookedChauffeur = await response.json();
                //{ state: { chauffeurName: bookedChauffeur.name } }
                navigate('/thank-you');
            } else {
                throw new Error('Failed to submit booking');
            }
        } catch (error) {
            console.error('Error submitting booking:', error);
        }
    };

    return (
        <div className="chauffeur-container">
        <h1 className="chauffeur-title">Book a Chauffeur</h1>
        
        <div className="location-selector">
            <select value={selectedLocation} onChange={handleLocationChange}>
                <option value="">Select Location</option>
                {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                ))}
            </select>
        </div>

        {selectedLocation && (
    <div className="chauffeur-selection">
        {chauffeurs.map((chauffeur) => (
            <div key={chauffeur._id} className="chauffeur-card" onClick={() => handleSelectChauffeur(chauffeur._id)}>
                <img src={chauffeur.image} alt={`${chauffeur.firstName} ${chauffeur.lastName}`} className="chauffeur-image" />
                <div className="chauffeur-info">
                    <h2 className="chauffeur-name">{`${chauffeur.firstName} ${chauffeur.lastName}`}</h2>
                    <p className="chauffeur-price">{`Price per hour: $${chauffeur.pricePerHour}`}</p>
                    <p className="chauffeur-sex">{`Sex: ${chauffeur.sex}`}</p>
                    <p className="chauffeur-sex">{`Description: ${chauffeur.description}`}</p>
                    {/* <div className="chauffeur-reviews"> */}
                        {/* Ensure reviews is an array before mapping */}
                        {/* {Array.isArray(chauffeur.reviews) ? ( */}
                            {/* chauffeur.reviews.map((review, index) => ( */}
                                {/* <p key={index} className="chauffeur-review">{review}</p> */}
                            {/* )) */}
                        {/* ) : ( */}
                            {/* <p>No reviews available.</p> */}
                        {/* )} */}
                    {/* </div> */}
                </div>
            </div>
        ))}
    </div>
)}
        {selectedChauffeur && (
            <div className="booking-form">
                <input
                    type="date"
                    name="date"
                    value={bookingDetails.date}
                    onChange={handleBookingChange}
                />
                <input
                    type="time"
                    name="time"
                    value={bookingDetails.time}
                    onChange={handleBookingChange}
                />
                <input
                    type="text"
                    name="location"
                    value={bookingDetails.location}
                    onChange={handleBookingChange}
                    placeholder="Pick-up location"
                />
                <input
                    type="number"
                    name="duration"
                    value={bookingDetails.duration}
                    onChange={handleBookingChange}
                    placeholder="Duration (in hours)"
                />
                <button className="submit-booking-button" onClick={handleSubmitBooking}>
                    Submit Booking
                </button>
            </div>
        )}
    </div>
);
};

export default ChauffeurPage;
