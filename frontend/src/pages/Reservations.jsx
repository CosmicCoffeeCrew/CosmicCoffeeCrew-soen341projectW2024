import { useState, useEffect } from 'react';
//import carData from '../assets/carData'; // Importing the car dataset
import '../index.css';

const ReservationsPage = () => {
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReservations = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/reservations/');
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
        const data = await response.json();
        setReservations(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReservations();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="reservations-container">
    <h2>My Reservations</h2>
    {reservations.length > 0 ? (
      <div className="reservations-list">
        {reservations.map((reservation) => (
          <div key={reservation._id} className="reservation-card">
            <img src={reservation.vehicle.image} alt={reservation.vehicle.model} className="vehicle-image"/>
            <div className="reservation-details">
              <h3>{`${reservation.vehicle.make} ${reservation.vehicle.model} (${reservation.vehicle.year})`}</h3>
              <p><strong>Type:</strong> {reservation.vehicle.type}</p>
              <p><strong>Mileage:</strong> {reservation.vehicle.mileage} km</p>
              <p><strong>Location:</strong> {reservation.vehicle.location}</p>
              <p><strong>Start Date:</strong> {new Date(reservation.start_Date).toLocaleDateString()}</p>
              <p><strong>End Date:</strong> {new Date(reservation.end_Date).toLocaleDateString()}</p>
              <p className="cost"><strong>Cost:</strong> ${reservation.charge}</p>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <p>No reservations found.</p>
    )}
  </div>
  );
};

export default ReservationsPage;