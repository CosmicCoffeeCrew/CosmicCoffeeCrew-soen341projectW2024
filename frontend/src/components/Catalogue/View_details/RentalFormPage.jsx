import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const RentalFormPage = () => {
  // const { vehicleId } = useParams();
  // const [vehicle, setVehicle] = useState(null);
  // const [reservations, setReservations] = useState([]);
  // const [rentalDays, setRentalDays] = useState(''); //connected to the database

  // const [rentalStart, setRentalStart] = useState('');
  // const [rentalEnd, setRentalEnd] = useState('');
  // const [errorMessage, setErrorMessage] = useState('');
  const { vehicleId } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [errorMessage, setErrorMessage] = useState('');
  const [disabledDates, setDisabledDates] = useState([]);

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
    const newDisabledDates = reservations.map(reservation => {
      return [new Date(reservation.start_Date), new Date(reservation.end_Date)];
    }).flat(); // Flatten in case there are ranges you want to break down
    setDisabledDates(newDisabledDates);
  };

  const checkAvailability = (start, end, existingReservations) => {
    const requestedStart = new Date(start);
    const requestedEnd = new Date(end);

    return existingReservations.every(reservation => {
      const reservationStart = new Date(reservation.start_Date);
      const reservationEnd = new Date(reservation.end_Date);

      // Check if the requested period overlaps with this reservation
      return requestedEnd < reservationStart || requestedStart > reservationEnd;
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!checkAvailability(rentalStart, rentalEnd, reservations)) {
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
    return <div className="text-center"><p>Loading vehicle details...</p></div>;
  }
  return (
    <div className="container mx-auto p-8 shadow-lg rounded-lg bg-white">
      <h2 className="text-3xl font-bold text-center mb-6">Complete Your Rental</h2>

      {/* Vehicle Information Display */}
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Vehicle Information</h3>
        <p><strong>Vehicle:</strong> {vehicle.make} {vehicle.model} ({vehicle.year})</p>
        <p><strong>Price per Day:</strong> ${vehicle.pricePerDay}</p>
      </div>


      {/* Display error message */}
      {errorMessage && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
          <p className="font-bold">Error</p>
          <p>{errorMessage}</p>
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