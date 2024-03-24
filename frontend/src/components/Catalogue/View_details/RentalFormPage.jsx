import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAuthContext } from '../../../hooks/useAuthContext';
//import Vehicle from '../../../../../backend/models/vehicleModel';

const RentalFormPage = () => {
  const { vehicleId } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [errorMessage, setErrorMessage] = useState('');
  const [disabledDates, setDisabledDates] = useState([]);

  //Message Display
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('error'); // 'success' or 'error'
  
  const { user } = useAuthContext();
  const userId = user.id;
  console.log("This is the id:", userId);

  useEffect(() => {
    console.log('Current user: ', user);
    const fetchVehicleDetails = async (vehicleId) => {
      try {
        const response = await fetch(`/api/vehicles/${vehicleId}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setVehicle(data);
      } catch (error) {
        console.error("Error fetching vehicle details:", error);
      }
    };

    fetchVehicleDetails(vehicleId);
  }, [vehicleId,user]);

  useEffect(() => {
    const fetchVehicleReservations = async (vehicleId) => {
      try {
        const response = await fetch(`/api/reservations/vehicle/${vehicleId}`); //Think i need the id
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setReservations(data);
        const newDisabledDates = data.map(reservation => [new Date(reservation.start_Date), new Date(reservation.end_Date)]).flat();
        setDisabledDates(newDisabledDates);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    fetchVehicleReservations(vehicleId);
  }, [vehicleId]);

  const checkAvailability = (start, end, existingReservations) => {
    const requestedStart = new Date(start);
    const requestedEnd = new Date(end);

    return existingReservations.every(reservation => {
      const reservationStart = new Date(reservation.start_Date);
      const reservationEnd = new Date(reservation.end_Date);
      return requestedEnd < reservationStart || requestedStart > reservationEnd;
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(vehicle,userId);

    if (!vehicle) {
      setErrorMessage('Missing vehicle');
      return;
    }
    if (!user) {
      setErrorMessage('Missing user');
      return;
    }


    if (!checkAvailability(startDate, endDate, reservations)) {
      setErrorMessage('The vehicle is not available for the selected dates.');
      return;
    }

    const numberOfDays = Math.max((endDate - startDate) / (1000 * 60 * 60 * 24), 1); // Ensure at least one day is charged
    const currentCharge = numberOfDays * (vehicle.pricePerDay || 0);

    try {
      console.log('test0');
      const response = await fetch(`/api/Reservations/record`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userID: user.id,
          vehicleID: vehicleId,
          start_Date: startDate.toISOString(),
          end_Date: endDate.toISOString(),
          charge: currentCharge,
          status: 'pending'
        }),
        
      });
      console.log('test1');

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'Failed to create reservation');
      }

       // Set message for successful operation
       setMessageType('success'); // Set the message type to success
       setMessage('Congratulations! Reservation created successfully!');
       // Optionally, fetch reservations again if needed to update the UI
     } catch (error) {
       console.error("Error creating reservation:", error);
       setMessageType('error'); // Keep message type as error
       setMessage(error.message || 'Error creating reservation.');
     }
  };

  if (!vehicle) {
    return <div className="text-center"><p>Loading vehicle details...</p></div>;
  
  }
  return (
    <div className="container mx-auto p-8 shadow-lg rounded-lg bg-white">
      <h2 className="text-3xl font-bold text-center mb-6">Complete Your Rental</h2>

      {/* Vehicle Information Display */}
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Vehicle Information</h3>
        <p><strong>Vehicle:</strong> {vehicle.make} {vehicle.model} ({vehicle.year})</p>
        {/* <p><strong>Price per Day:</strong> ${vehicle.pricePerDay}</p> */}
        <p><strong>Price per Day:</strong> ${vehicle ? vehicle.pricePerDay : 'Loading...'}</p>
      </div>


      {/* Display error message */}
      {errorMessage && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
          <p className="font-bold">Error</p>
          <p>{errorMessage}</p>
        </div>
      )}

       {/* Conditional message display */}
       {message && (
        <div className={`border-l-4 p-4 ${messageType === 'success' ? 'bg-green-100 border-green-500 text-green-700' : 'bg-red-100 border-red-500 text-red-700'}`} role="alert">
          <p className={`font-bold ${messageType === 'success' ? 'text-green-700' : 'text-red-700'}`}>{messageType === 'success' ? 'Success' : 'Error'}</p>
          <p>{message}</p>
        </div>
      )}

      {/* Rental Form */}
      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label htmlFor="startDate" className="block text-gray-700 text-sm font-bold mb-2">
            Start Date:
          </label>
          <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            excludeDates={disabledDates}
            minDate={new Date()}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="endDate" className="block text-gray-700 text-sm font-bold mb-2">
            End Date:
          </label>
          <DatePicker
            selected={endDate}
            onChange={date => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            excludeDates={disabledDates}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
      
};
export default RentalFormPage;