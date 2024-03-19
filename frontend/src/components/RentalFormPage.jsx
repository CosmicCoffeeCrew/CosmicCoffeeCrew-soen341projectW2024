// src/components/RentalFormPage.jsx    CURRENT LOCATION ---> NEED TO BE CHANGED
import { useLocation } from 'react-router-dom';
const RentalFormPage = () => {
    // Assuming you're passing the vehicle details via state in the navigate function
    // You might need to adjust this based on how you implement navigation
    const { state } = useLocation();
    const vehicle = state.vehicle;
  
    if (!vehicle) {
      return <div>No vehicle data found.</div>;
    }
  
    return (
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Complete Your Rental</h2>
        {/* Display vehicle information */}
        <div className="mb-4">
          <p><strong>Vehicle:</strong> {vehicle.make} {vehicle.model} ({vehicle.year})</p>
          <p><strong>Price per Day:</strong> ${vehicle.price}</p>
          {/* Add more vehicle details as needed */}
        </div>
        
        {/* Rental form */}
        {/* Implement the form according to your requirements */}
        <form>
          {/* Form fields */}
          <div>
            <label htmlFor="rentalDays" className="block">Rental Days:</label>
            <input type="number" id="rentalDays" name="rentalDays" className="border-gray-400 border rounded px-4 py-2 mt-1 block w-full" />
          </div>
          <button type="submit" className="bg-primary text-white font-bold py-2 px-4 rounded hover:bg-primary-dark mt-4">
            Submit Rental Request
          </button>
        </form>
      </div>
    );
  };
  
  export default RentalFormPage;
  