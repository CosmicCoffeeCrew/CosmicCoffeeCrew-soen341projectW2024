import {useState } from 'react';
import { useParams, useNavigate, /*useLocation*/ } from 'react-router-dom';
import  '../CheckIn/CheckInPage.css';
const CheckInPage = () => {
  const { reservationId } = useParams();
  const navigate = useNavigate();
  //const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    licensePlate: '',
    creditCard: '',
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
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
    return true;
  };

  // Accessing the data passed in state
  //const additionalData = location.state?.additionalData;
  const handleCheckIn = async () => {
    if (!validateForm()) { // First, validate the form
      return; // Stop the function if validation fails
    }
  
    setIsLoading(true);
    try {
      // Assuming your API requires both license plate and credit card number,
      // you'll include them in the request's body.
      const response = await fetch(`/api/reservations/checkin/${reservationId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
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

  // const handleCheckIn = async () => {
  //   setIsLoading(true);
  //   try {
  //     // Use `additionalData` as needed, for example, in your fetch request body
  //     const response = await fetch(`/api/reservations/record/${reservationId}`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         // Include any needed body or credentials, if necessary
  //         ...additionalData, // spreading the additionalData into the body 
  //         checkIn : true,
  //         checkOut: false
  //       }),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Check-in failed.');
  //     }

  //     alert('Check-in successful!');
  //     navigate('/reservations');
  //   } catch (error) {
  //     setError(error.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   // If you need to do something on component mount or with `reservationId`
  // }, [reservationId]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="check-in-container">
    <h2>Check-In for Reservation {reservationId}</h2>
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

      <label htmlFor="inDamageReport">Damage Report:</label>
      <input
        id="inDamageReport"
        name="inDamageReport"
        type="text"
        value={formData.inDamageReport}
        onChange={handleInputChange}
        required
      />

      <button onClick={handleCheckIn} disabled={isLoading} className="check-in-button">
        Confirm Check-In
      </button>
    </form>
  </div>
);
};

export default CheckInPage;
