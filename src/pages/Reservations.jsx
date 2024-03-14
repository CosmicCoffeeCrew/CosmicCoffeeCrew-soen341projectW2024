import { useState } from 'react';
import carData from '../assets/carData'; // Importing the car dataset
import '../index.css';

const Reservation = () => {
  // State variables to manage form input and reservations
  const [formData, setFormData] = useState({
    carModel: '',
    startDate: '',
    endDate: ''
  });
  const [reservations, setReservations] = useState([]);

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const carId = parseInt(formData.carId);
    const carIndex = carData.findIndex(car => car.id === carId);
    if (carIndex !== -1) {
      const updatedCarData = [...carData];
      updatedCarData[carIndex].reservations.push({
        startDate: formData.startDate,
        endDate: formData.endDate
      });
      // Assuming here that you would send this data to a backend server
      // For now, we'll just add the reservation to the reservations array
      setReservations([...reservations, formData]);
      // Update car data
      carData[carIndex] = updatedCarData[carIndex];
      // Reset form data after submission
      setFormData({ carModel: '', startDate: '', endDate: '' });
    }
  };

  // Function to handle form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Function to cancel a reservation
  const cancelReservation = (index) => {
    const updatedReservations = [...reservations];
    updatedReservations.splice(index, 1);
    setReservations(updatedReservations);
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">Create New Reservation</h2>
      <form onSubmit={handleSubmit} className="mb-8">
        <label className="block mb-4">
          Car Model:
          <input type="text" name="carModel" value={formData.carModel} onChange={handleInputChange} className="border-gray-400 border rounded px-4 py-2 mt-1 block w-full" />
        </label>
        <label className="block mb-4">
          Start Date:
          <input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} className="border-gray-400 border rounded px-4 py-2 mt-1 block w-full" />
        </label>
        <label className="block mb-4">
          End Date:
          <input type="date" name="endDate" value={formData.endDate} onChange={handleInputChange} className="border-gray-400 border rounded px-4 py-2 mt-1 block w-full" />
        </label>
        <button type="submit" className="bg-primary text-white px-4 py-2 rounded">Submit</button>
      </form>

      <h2 className="text-2xl font-bold mb-4">Current Reservations</h2>
      <ul>
        {reservations.map((reservation, index) => (
          <li key={index} className="mb-4">
            <strong>Car Model:</strong> {reservation.carModel}, <strong>Start Date:</strong> {reservation.startDate}, <strong>End Date:</strong> {reservation.endDate}
            <button onClick={() => cancelReservation(index)} className="ml-2 bg-red-500 text-white px-2 py-1 rounded">Cancel</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reservation;
