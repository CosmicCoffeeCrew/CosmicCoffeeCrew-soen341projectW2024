import { useParams, useNavigate } from 'react-router-dom';
import products from '../Catalogue/ProductCatalogue'; // Make sure this path is correct

const VehicleDetailPage = () => {
  const navigate = useNavigate();
  const { vehicleId } = useParams(); // This should be the ID passed in the URL

  // Assuming your products data structure has an array of vehicles with a unique 'id'
  const vehicle = products.find((product) => product.id.toString() === vehicleId);

  // If the vehicle is not found, return an error message
  if (!vehicle) {
    return <div>Vehicle not found</div>;
  }

  // When the "Rent" button is clicked, navigate to the rental form
  const handleRentClick = () => {
    navigate('/rental-form', { state: { vehicle } });
  };

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