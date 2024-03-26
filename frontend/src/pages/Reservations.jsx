import { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext'; // Make sure the path is correct
import '../index.css';
import { useNavigate } from 'react-router-dom';
const ReservationsPage = () => {
  const [reservations, setReservations] = useState([]);
  const { user } = useAuthContext(); // Assuming this hook provides the logged-in user's data
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservations = async () => {
      setIsLoading(true);
      setError('');

      try {
        // Fetch user reservations
        const resResponse = await fetch(`/api/Reservations/user/${user.tempId}`);
        if (!resResponse.ok) {
          throw new Error('Failed to fetch reservations');
        }
        const reservationsData = await resResponse.json();

        // Fetch vehicles for each reservation
        const vehicleFetchPromises = reservationsData.map((reservation) =>
          fetch(`/api/vehicles/${reservation.vehicleID}`).then((res) => res.json())
        );

        // Resolve all vehicle fetch promises
        const vehiclesData = await Promise.all(vehicleFetchPromises);

        // Combine the reservations with their vehicle data
        const combinedData = reservationsData.map((reservation, index) => {
          return { ...reservation, vehicle: vehiclesData[index] };
        });

        setReservations(combinedData);
      } catch (error) {
        setError('Error: ' + error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (user && user.tempId) {
      fetchReservations();
    }
  }, [user]);
  const handleCheckIn = (reservationId) => {
    //navigate(`/check-in/${reservationId}`); //change in here
    navigate(`/check-in/${reservationId}`,{ state: reservationId }); //change in here
  };

  //Delete Reservations
  const handleDelete = async (reservationId) => {
    if (window.confirm('Are you sure you want to delete this reservation?')) {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/reservations/${reservationId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Could not delete the reservation.');
        }

        // Filter out the deleted reservation from the state
        setReservations(prevReservations =>
          prevReservations.filter(reservation => reservation._id !== reservationId)
        );
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="reservations-container">
      <h2>My Reservations</h2>
      {reservations.length > 0 ? (
        <div className="reservations-list">
          {reservations.map((reservation) => (
            <div key={reservation._id} className="reservation-card">
              <img
                src={reservation.vehicle?.image || 'path/to/default/image.png'}
                alt={`${reservation.vehicle?.make || 'Vehicle'} model`}
                className="vehicle-image"
              />
              <div className="reservation-details">
                <h3>{`${reservation.vehicle?.make || 'Unknown Make'} ${reservation.vehicle?.model || 'Unknown Model'} (${reservation.vehicle?.year || 'Unknown Year'})`}</h3>
                {/* ... other details ... */}
                <p><strong>Rental Dates:</strong> {new Date(reservation.start_Date).toLocaleDateString()} - {new Date(reservation.end_Date).toLocaleDateString()}</p>
                <p className="cost"><strong>Cost:</strong> {reservation.charge || 'Unknown'} CAD$</p>
                <p className="status"><strong>Status:</strong> {reservation.status || 'Unknown'}</p>
                <button onClick={() => handleDelete(reservation._id)} className="delete-reservation-button">
                  Delete Reservation
                </button>
                <button onClick={() => handleCheckIn(reservation._id)} className="check-in-button">
                  Check In
                </button>
                <button
                  onClick={() => navigate(`/checkout/${reservation._id}`)} // Navigate to CheckOutPage
                  className="check-out-button"
                >
                  Check Out
                </button>
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
