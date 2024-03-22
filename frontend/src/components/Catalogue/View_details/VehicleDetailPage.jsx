
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const RentalFormPage = () => {
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

  // Simulate fetching vehicle details and reservations
  const fetchVehicleDetails = async (vehicleId) => {
    // Fetch logic...
  };

  const fetchVehicleReservations = async (vehicleId) => {
    // Fetch logic...
    // Assume you set the reservations state here
    // For each reservation, convert start and end dates to Date objects and add to disabledDates
    const newDisabledDates = reservations.map(reservation => {
      return [new Date(reservation.start_Date), new Date(reservation.end_Date)];
    }).flat(); // Flatten in case there are ranges you want to break down
    setDisabledDates(newDisabledDates);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Submit logic...
  };

  return (
    <div className="container mx-auto p-8 shadow-lg rounded-lg bg-white">
      <h2 className="text-3xl font-bold text-center mb-6">Complete Your Rental</h2>

      {/* Vehicle Information */}
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


// //import { useParams, useNavigate } from 'react-router-dom';
// //import products from '.components/Catalogue/ProductCatalogue'; // Make sure this path is correct
// //import { products } from '../Catalogue/ProductCatalogue';


// import { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';

// const VehicleDetailPage = () => {
//   const [vehicle, setVehicle] = useState(null);
//   const { vehicleId } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchVehicleDetails = async () => {
//       try {
//         // Replace this URL with the actual URL to your API
//         const response = await fetch(`/api/vehicle/${vehicleId}`);
//         if (!response.ok) {
//           throw new Error('Vehicle not found');
//         }
//         const data = await response.json();
//         setVehicle(data);
//       } catch (error) {
//         console.error(error.message);
//         // Handle the error, possibly navigate to an error page or display a message
//       }
//     };

//     fetchVehicleDetails();
//   }, [vehicleId]); // Dependency array includes vehicleId to refetch if it changes

//   if (!vehicle) {
//     return <div>Loading vehicle details...</div>;
//   }

//   const handleRentClick = () => {
//     navigate('/rental-form', { state: { vehicle } });
//   };

//   // Render the vehicle details
//   return (
//     <div className="container mx-auto p-4">
//     <div className="max-w-2xl mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
//       <h2 className="text-2xl font-bold mb-4">{vehicle.make} {vehicle.model} ({vehicle.year})</h2>
//       <img
//         src={vehicle.image}
//         alt={`${vehicle.make} ${vehicle.model}`}
//         className="w-full h-64 object-cover mb-4"
//       />
//       <p className="text-gray-700 mb-4">{vehicle.description}</p>
//       <div className="vehicle-details">
//         <p>Type: {vehicle.type}</p>
//         <p>Price: ${vehicle.price}</p>
//         <p>Mileage: {vehicle.mileage} km</p>
//         <p>Location: {vehicle.location}</p>
//         {/* Add other details that you want to show */}
//       </div>
//       <button
//         onClick={handleRentClick}
//         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
//       >
//         Rent
//       </button>
//     </div>
//   </div>
//   );
// };

// export default VehicleDetailPage;


