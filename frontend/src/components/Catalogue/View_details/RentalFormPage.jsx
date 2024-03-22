import { useState, useEffect } from 'react';
//import { useLocation } from 'react-router-dom';
import {useParams} from 'react-router-dom';
//import vehicleID from '/backend/models/reservations'

const RentalFormPage = () => {
  const { vehicleId } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [rentalDays, setRentalDays] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchVehicleDetails(vehicleId);
    fetchVehicleReservations(vehicleId);
  }, [vehicleId]);

  const fetchVehicleDetails = async (vehicleId) => {
    try {
      const response = await fetch(`/api/vehicles/${vehicleId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setVehicle(data);
    } catch (error) {
      console.error("Error fetching vehicle details:", error);
    }
  };

  const fetchVehicleReservations = async (vehicleId) => {
    try {
      const response = await fetch(`/api/reservations?vehicleId=${vehicleId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setReservations(data);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  const checkAvailability = (rentalDays, existingReservations) => {
    const today = new Date();
    const rentalStartDate = new Date(today);
    const rentalEndDate = new Date(today);
    rentalEndDate.setDate(rentalEndDate.getDate() + parseInt(rentalDays));

    for (let reservation of existingReservations) {
      const reservationStart = new Date(reservation.start_Date);
      const reservationEnd = new Date(reservation.end_Date);

      if (
        (rentalStartDate >= reservationStart && rentalStartDate <= reservationEnd) ||
        (rentalEndDate >= reservationStart && rentalEndDate <= reservationEnd)
      ) {
        return false;
      }
    }

    return true;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!checkAvailability(rentalDays, reservations)) {
      setErrorMessage('Vehicle is not available for the selected period.');
      return;
    }

    try {
      const response = await fetch(`/api/reservations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          vehicleId: vehicle._id,
          rentalDays,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Here, you may want to update the state or redirect the user
    } catch (error) {
      console.error("Error creating reservation:", error);
      setErrorMessage('Error creating reservation.');
    }
  };

  if (!vehicle) {
    return <p>Loading vehicle details...</p>;
  }
  
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Complete Your Rental</h2>
      {/* Display vehicle information */}
      <div className="mb-4">
      <p><strong>Vehicle:</strong> {vehicle.make} {vehicle.model} ({vehicle.year})</p>
      <p><strong>Price per Day:</strong> ${vehicle.pricePerDay}</p>
      </div>
      {/* Display error message */}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {/* Rental form */}
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="rentalDays" className="block">Rental Days:</label>
          <input
            type="number"
            id="rentalDays"
            name="rentalDays"
            value={rentalDays}
            onChange={(e) => setRentalDays(e.target.value)}
            className="border-gray-400 border rounded px-4 py-2 mt-1 block w-full"
          />
        </div>
        {/* Display existing reservations */}
        <div className="mb-4">
          <h3 className="text-lg font-bold">Existing Reservations</h3>
          {reservations.length > 0 ? (
            <ul>
              {reservations.map((reservation) => (
                <li key={reservation._id}>
                  From: {reservation.start_Date} To: {reservation.end_Date}
                </li>
              ))}
            </ul>
          ) : (
            <p>No existing reservations for this vehicle.</p>
          )}
        </div>

        <button type="submit" className="bg-primary text-white font-bold py-2 px-4 rounded hover:bg-primary-dark mt-4">
          Submit Rental Request
        </button>
      </form>
    </div>
  );
};

export default RentalFormPage;
