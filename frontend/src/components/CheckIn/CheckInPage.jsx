import { useState,useEffect } from 'react';
import './CheckInPage.css';
//import { useParams } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
//import {  useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const CheckInPage = () => {
  //const { reservationId } = useParams();
  const { user } = useAuthContext();
  //const navigate = useNavigate();
  //const { vehicleId } = useParams();
  //const [vehicle, setVehicle] = useState(null);
  const location = useLocation();
  const dataFromPreviousPage = location.state;

  const [error, setError] = useState('');
  const [reservations, setReservations] = useState([]);

  console.log("DATA FROM PREVIOUS PAGE:",dataFromPreviousPage);
  const [formData, setFormData] = useState({
    licensePlate: '',
    carCondition: '',
  });

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
  // const handleCheckIn = (reservationId) => {
  //   navigate(`/check-in/${reservationId}`,{ state: reservationId }); //change in here
  // };
  const handleCheckIn = async (reservationId) => {
    if (window.confirm('Are you sure you want to check in this reservation?')) {
      setIsLoading(true);
      try {
        // Assuming `/api/reservations/checkin/${reservationId}` is the endpoint
        // that marks a reservation as checked in. This may vary based on your backend API.
        const response = await fetch(`/api/reservations/checkin/${reservationId}`, {
          method: 'POST', // or 'PUT', depending on your API specification
        });
  
        if (!response.ok) {
          throw new Error('Could not check in the reservation.');
        }
  
        // Optionally, update the reservation list to reflect the check-in status.
        // This would likely involve fetching the updated list or modifying the state
        // directly if the response includes the updated reservation data.
        setReservations(prevReservations =>
          prevReservations.map(reservation =>
            reservation._id === reservationId ? { ...reservation, isCheckedIn: true } : reservation
          )
        );
        
        // Optionally, display a success message or navigate the user to a different page
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target; // Correctly destructure the name and value from the event target
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value, // Use computed property names to update the key corresponding to the input's name attribute
    }));
};

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   console.log(formData);
  //   //fetch the request to the backeend

  //   // Here you would typically make a fetch/axios request to your backend
  //   // For now, we will just log the formData to the console
  //   const submissionData = {
  //     ...formData,
  //     userID: user.tempId, // Assuming user.tempId is available from useAuthContext
  //     vehicleID: vehicleId, // Assuming vehicleId is obtained from useParams
  // };

  //   // If the check-in is successful, you can then navigate the user to a new route
  //   // navigate('/some-success-page');
  //   try {
  //     console.log('test0');
  //     const response = await fetch(`/api/Reservations/record`, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         userID: submissionData.userID,
  //         vehicleID: submissionData.vehicleID,
  //         start_Date: formData.start_Date,
  //         end_Date: formData.endDate,
  //         charge: formData.currentCharge,
  //         status: 'pending',
  //         checkIn : true,
  //         checkOut: false
  //       }),
        
  //     });
  //     console.log('test1');
  //     const someHeaderValue = response.headers.get(vehicleId);
  //     console.log('Header value:', someHeaderValue);

  //     if (!response.ok) {
  //       const errorResponse = await response.json();
  //       throw new Error(errorResponse.message || 'Failed to create reservation');
  //     }
  //      // If the reservation was successfully created, navigate to the payment page
  //      //navigate('/PaymentPage', { state: { currentCharge, startDate, endDate, vehicleId } }); // Pass any necessary state

  //      // Set message for successful operation
  //      //setMessageType('success'); // Set the message type to success
  //      //setMessage('Congratulations! Reservation created successfully!');
  //      // Optionally, fetch reservations again if needed to update the UI
  //    } catch (error) {
  //      console.error("Error creating reservation:", error);
  //      //setMessageType('error'); // Keep message type as error
  //      //setMessage(error.message || 'Error creating reservation.');
  //    }
  // };

  return (
    <div className="check-in-container">
    <h2>Car Check-In</h2>
    <form onSubmit={handleSubmit} className="check-in-form">
      {/* License Plate Input */}
      <div className="form-group">
        <label htmlFor="licensePlate" className="form-label">License Plate:</label>
        <input
          type="text"
          id="licensePlate"
          name="licensePlate"
          value={formData.licensePlate}
          onChange={handleChange}
          className="form-input"
          required
        />
      </div>

      {/* Car Condition Select */}
      <div className="form-group">
        <label htmlFor="carCondition" className="form-label">Car Condition:</label>
        <select
          id="carCondition"
          name="carCondition"
          value={formData.carCondition}
          onChange={handleChange}
          className="form-input"
          required
        >
          <option value="">Select Condition</option>
          <option value="Excellent">Excellent</option>
          <option value="Good">Good</option>
          <option value="Fair">Fair</option>
          <option value="Poor">Poor</option>
        </select>
      </div>

      {/* Submit Button */}
      <div className="form-group">
        <button type="submit" className="check-in-button">
          Check-In Vehicle
        </button>
      </div>
    </form>
  </div>
  );
};

export default CheckInPage;
