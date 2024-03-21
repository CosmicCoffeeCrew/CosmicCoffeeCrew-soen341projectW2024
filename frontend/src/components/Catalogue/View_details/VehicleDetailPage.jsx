import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const VehicleDetailPage = () => {
  const [vehicle, setVehicle] = useState(null);
  const { vehicleId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVehicleDetails = async () => {
      try {
        // Replace this URL with the actual URL to your API
        const response = await fetch('api/vehicle/_id= ${vehicleId}');
        console.log('response',response);
        if (!response.ok) {
          throw new Error('Vehicle not found');
        }
        const data = await response.json();
        setVehicle(data);
      } catch (error) {
        console.error(error.message);
        // Handle the error, possibly navigate to an error page or display a message
      }
    };

    fetchVehicleDetails();
  }, [vehicleId]); // Dependency array includes vehicleId to refetch if it changes

  if (!vehicle) {
    return <div>Loading vehicle details...</div>;
  }

  const handleRentClick = () => {
    navigate('/rental-form', { state: { vehicle } });
  };

  // Render the vehicle details
  return (
    <div className="container mx-auto p-4">
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">{vehicle.make} {vehicle.model} ({vehicle.year})</h2>
      <img
        src={vehicle.image}
        alt={`${vehicle.make} ${vehicle.model}`}
        className="w-full h-64 object-cover mb-4"
      />
      <p className="text-gray-700 mb-4">{vehicle.description}</p>
      <div className="vehicle-details">
        <p>Type: {vehicle.type}</p>
        <p>Price: ${vehicle.price}</p>
        <p>Mileage: {vehicle.mileage} km</p>
        <p>Location: {vehicle.location}</p>
        {/* Add other details that you want to show */}
      </div>
      <button
        onClick={handleRentClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
      >
        Rent
      </button>
    </div>
  </div>
  );
};

export default VehicleDetailPage;


