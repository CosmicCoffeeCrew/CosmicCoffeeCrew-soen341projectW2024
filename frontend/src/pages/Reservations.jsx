import { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext'; // Make sure the path is correct
import '../index.css';
import { useNavigate } from 'react-router-dom';
//import chauffeurBookingModel from '../../../backend/models/chauffeurBookingModel';
const ReservationsPage = () => {
  const [reservations, setReservations] = useState([]);
  const [chauffeurBookings, setChauffeurBookings] = useState([]);
  const { user } = useAuthContext(); // Assuming this hook provides the logged-in user's data
 // const [isLoading, setIsLoading] = useState(true);
 //const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservations = async () => {
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
        console.error('No vehicle reservation for this user', error);
     }
    };

    const fetchChauffeurBookings = async () => {
       try {
        // Fetch user bookings of Chauffeur
        const resResponse = await fetch(`/api/bookings/user/${user.tempId}`);
        if (!resResponse.ok) {
          throw new Error('Failed to fetch chauffeur bookings');
        }
        const chauffeurBookingData = await resResponse.json();
        console.log("Fetched Chauffeur Bookings Data:", chauffeurBookingData); // Debugging line


        // Fetch chauffeur for each reservation
        const chauffeurFetchPromises = chauffeurBookingData.map((chauffeurBooking) =>
          fetch(`/api/chauffeurs/${chauffeurBooking.chauffeurID}`).then((res) => res.json())
        );

        // Resolve all vehicle fetch promises
        const chauffeursData = await Promise.all(chauffeurFetchPromises);

        // Combine the reservations with their vehicle data
        const combinedData = chauffeurBookingData.map((chauffeurBooking, index) => {
          return { ...chauffeurBooking, chauffeur: chauffeursData[index] };
        });
        setChauffeurBookings(combinedData);
      } catch (error) {
        console.error('No chauffeur booking for this user', error);
     }

    };

    if (user && user.tempId) {
      (async () => {
        await fetchReservations();
        await fetchChauffeurBookings();
      })();
    }
  }, [user]);
  
  const handleCheckIn = (reservationId) => {
    //navigate(`/check-in/${reservationId}`); //change in here
    navigate(`/check-in/${reservationId}`,{ state: reservationId }); //change in here
  };

  //Delete Reservations
  const handleDelete = async (reservationId) => {
    if (window.confirm('Are you sure you want to delete this reservation?')) {

     
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
      
    }
  };

//Delete chauffeur bookings
const handleDeleteChauffeur = async (chauffeurBookingId) => {
  if (window.confirm('Are you sure you want to delete this reservation?')) {

      const response = await fetch(`/api/bookings/${chauffeurBookingId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Could not delete the reservation.');
      }

      // Filter out the deleted reservation from the state
      setChauffeurBookings(prevChauffeurBookings =>
        prevChauffeurBookings.filter(ChauffeurBooking=> ChauffeurBooking._id !== chauffeurBookingId)
      );
    
  }
};

 /* if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="max-w-lg mx-auto my-10 p-6 bg-white rounded-lg shadow-md font-serif">
    <h1 className="text-xl font-semibold text-gray-800 mb-2 text-red-500 text-center">No Upcoming Reservations!</h1>
    <p className="text-lg font-italic text-gray-600 text-center">
      You currently do not have any upcoming reservations scheduled.
      <br />
      It is the perfect opportunity to start browsing our large selection of vehicles and chauffeurs and start planning your journey today!
    </p>
  </div>;
  } */

  return (
    <div className="reservations-container font-serif">
      <h1 className="p-4 mb-6 text-xl font-semibold">My Upcoming Reservations </h1>
      {reservations.length > 0 || chauffeurBookings.length > 0? (
        <div className="reservations-list">
  
          {reservations.map((reservation) => (
            <div key={reservation._id} className="reservation-card w-300 h-200 overflow-hidden">
              <img
                src={reservation.vehicle?.image || 'path/to/default/image.png'}
                alt={`${reservation.vehicle?.make || 'Vehicle'} model`}
                className="vehicle-image"
              />
              <div className="reservation-details">
                <h3 className="text-xl font-semibold font-serif">{`${reservation.vehicle?.make || 'Unknown Make'} ${reservation.vehicle?.model || 'Unknown Model'} (${reservation.vehicle?.year || 'Unknown Year'})`}</h3>
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
           {chauffeurBookings.map((chauffeurBooking) => (
            <div key={chauffeurBooking._id} className="reservation-card w-300 h-200">
              <img
                src={chauffeurBooking.chauffeur.image || 'path/to/default/image.png'}
                className="vehicle-image"
              />
              <div className="reservation-details">
                <h3 className="text-xl font-semibold font-serif">{`${chauffeurBooking.chauffeur?.firstName} ${chauffeurBooking.chauffeur?.lastName}`}</h3>
                {/* ... other details ... */}
                <p><strong>Car Details:</strong> {`${chauffeurBooking.chauffeur.carMake} ${chauffeurBooking.chauffeur.carModel} ${chauffeurBooking.chauffeur.carYear}`}</p>
                <p><strong>Booking Date:</strong> {new Date(chauffeurBooking.date).toLocaleDateString()}</p>
                <p><strong>Duration:</strong> {(chauffeurBooking.duration) || 'Undetermined'}</p>
                <p><strong>Pick Up Location:</strong> {(chauffeurBooking.location) || 'Undetermined'}</p>
                <p className="cost"><strong>Cost:</strong> {(chauffeurBooking.charge)|| 'Unknown'} CAD$/hour</p>
                <button onClick={() => handleDeleteChauffeur(chauffeurBooking._id)} className="delete-reservation-button">
                  Delete Reservation
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="max-w-lg mx-auto my-10 p-6 bg-white rounded-lg shadow-md font-serif">
             <h1 className="text-xl font-semibold text-gray-800 mb-2 text-red-500 text-center">No Upcoming Reservations!</h1>
                  <p className="text-lg text-gray-600 text-center">
                     You currently do not have any upcoming reservations scheduled.
                     <br />
                     It is the perfect opportunity to start browsing our large selection of vehicles and chauffeurs and start planning your journey today!
                  </p>
        </div>
      )}
    </div>
  );
};

export default ReservationsPage;
