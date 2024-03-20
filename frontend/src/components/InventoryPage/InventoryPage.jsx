//Need to be connected with the catalogue
import products from '../Catalogue/ProductDetails';
import { Link } from 'react-router-dom';
const InventoryPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Our Vehicle Inventory</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((vehicle) => (
           <Link to={`/inventory/${vehicle.id}`} key={vehicle.id} className="border border-secondary-300 rounded-lg p-4 shadow-lg">
            <img
              src={vehicle.image}
              alt={`${vehicle.make} ${vehicle.model}`}
              className="w-full h-64 object-cover mb-4 rounded"
            />
            <h3 className="text-lg font-semibold">
              {vehicle.make} {vehicle.model} ({vehicle.year})
            </h3>
            <p className="text-gray-600">{vehicle.type}</p>
            <p className="text-gray-600">{vehicle.mileage}</p>
            <p className="text-gray-600">{vehicle.location}</p>
            <p className="text-primary font-bold">${vehicle.price}</p>
            {/* Add more details as needed */}
            </Link>
        ))}
      </div>
    </div>
  );
};

export default InventoryPage;
  