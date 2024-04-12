import { useState } from 'react';
import { useParams, useNavigate /*, useLocation*/ } from 'react-router-dom';
import '../CheckIn/CheckInPage.css';

const CheckInPage = () => {
  // Extracting reservationId from URL params
  const { reservationId } = useParams();
  const navigate = useNavigate();
  //const location = useLocation();

  // State for loading indicator, error message, and form data
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    licensePlate: '',
    creditCard: '',
    inDamageReport: '', // Added for damage report input
  });

  // Handler for input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Update form data based on input changes
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Function to validate form inputs
  const validateForm = () => {
    // Simple validation logic here
    // For a real application, consider using a library like Yup for schema validation
    if (formData.creditCard.length < 16) {
      setError("Please enter a valid credit card number.");
      return false;
    }
    if (!formData.licensePlate) {
      setError("Please enter a license plate.");
      return false;
    }
    if (!formData.inDamageReport) {
      setError("Please enter a damage report.");
      return false;
    }
    return true;
  };

  // Handler for check-in action
  const handleCheckIn = async () => {
    if (!validateForm()) { // Validate the form first
      return; // Stop the function if validation fails
    }
  
    setIsLoading(true);
    try {
      // Assuming your API requires both license plate and credit card number,
      // you'll include them in the request's body along with the damage report.
      const response = await fetch(`/api/reservations/checkin/${reservationId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          licensePlate: formData.licensePlate,
          creditCard: formData.creditCard,
          inDamageReport: formData.inDamageReport,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Check-in failed.');
      }
  
      // Notify the user of success
      alert('Check-in successful!');
      navigate('/reservations'); // Navigate away after successful check-in
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // JSX rendering
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="check-in-container">
      <h2>Check-In for Reservation {reservationId}</h2>
      {/* Check-in form */}
      <form onSubmit={(e) => e.preventDefault()} className="check-in-form">
        <label htmlFor="licensePlate">License Plate:</label>
        <input
          id="licensePlate"
          name="licensePlate"
          type="text"
          value={formData.licensePlate}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="creditCard">Credit Card Number:</label>
        <input
          id="creditCard"
          name="creditCard"
          type="text"
          value={formData.creditCard}
          onChange={handleInputChange}
          maxLength="16"
          required
        />

        {/* Input for damage report */}
        <label htmlFor="inDamageReport">Damage Report:</label>
        <input
          id="inDamageReport"
          name="inDamageReport"
          type="text"
          value={formData.inDamageReport}
          onChange={handleInputChange}
          required
        />

        {/* Button for check-in action */}
        <button onClick={handleCheckIn} disabled={isLoading} className="check-in-button">
          Confirm Check-In
        </button>
      </form>
    </div>
  );
};

export default CheckInPage;
