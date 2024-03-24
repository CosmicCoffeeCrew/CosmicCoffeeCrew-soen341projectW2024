import { useState,useEffect } from 'react';
import './CheckInPage.css';
import { useParams } from 'react-router-dom';
//import {  useNavigate } from 'react-router-dom';
const CheckInPage = () => {
  const { reservationId } = useParams();
  //const navigate = useNavigate();
  const [formData, setFormData] = useState({
    licensePlate: '',
    carCondition: '',
  });
  useEffect(() => {
    const fetchReservationDetails = async () => {
      try {
        const response = await fetch(`/api/reservations/${reservationId}`);
        if (!response.ok) throw new Error('Failed to fetch reservation details');
        const data = await response.json();
        setFormData({ 
          ...formData, 
          licensePlate: data.licensePlate, // Assuming these fields exist in your reservation
          vehicleModel: data.vehicleModel,
          // Don't set checkInDate here as it's the action being performed
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchReservationDetails();
  }, [reservationId]); // Dependency array to ensure this runs once upon component mount


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    //fetch the request to the backeend

    // Here you would typically make a fetch/axios request to your backend
    // For now, we will just log the formData to the console

    // If the check-in is successful, you can then navigate the user to a new route
    // navigate('/some-success-page');
  };

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
