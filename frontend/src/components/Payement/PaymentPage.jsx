//------------------------------
//*****************************
//For axios import
//npm install axios
//Becarefull where you installed
//*****************************
//------------------------------

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import axios from 'axios'; //For backend purpose
const PaymentPage = () => {
  const navigate = useNavigate();
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    paymentMethod: 'card', // Default to card payment
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
    
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log('Payment details: ', paymentDetails);
    // Here you would integrate with a payment API
    navigate('/payment-success');
  };

  //---------------------------BACKEND------------------------------------
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  
  //   // Validate payment details here before sending
  
  //   try {
  //     // Send payment information to your backend server
  //     const response = await axios.post('https://yourbackend.com/api/payment', paymentDetails);
  //     // Handle the response from the backend
  //     if (response.data.success) {
  //       console.log('Payment successful');
  //       // Navigate to a success page or reset form ---> We need to do one when everything is working adequately
  //     } else {
  //       console.error('Payment failed:', response.data.message);
  //       // Show error message
  //     }
  //   } catch (error) {
  //     console.error('Payment error:', error);
  //     // Show error message
  //   }
  // };
  //--------------------------------------------------------------------------------------------------
  

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Payment Information</h2>
        <form onSubmit={handleSubmit}>
          {/* Payment method selection */}
          <div className="mb-4">
            <span className="text-gray-700">Payment Method</span>
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentDetails.paymentMethod === 'card'}
                  onChange={handleChange}
                />
                <span className="ml-2">Card</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  className="form-radio"
                  name="paymentMethod"
                  value="paypal"
                  checked={paymentDetails.paymentMethod === 'paypal'}
                  onChange={handleChange}
                />
                <span className="ml-2">PayPal</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  className="form-radio"
                  name="paymentMethod"
                  value="checking"
                  checked={paymentDetails.paymentMethod === 'checking'}
                  onChange={handleChange}
                />
                <span className="ml-2">Checking</span>
              </label>
            </div>
          </div>

          {/* Conditional rendering for Card Details if 'card' is selected */}
          {paymentDetails.paymentMethod === 'card' && (
            <div className="grid gap-4 mb-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cardNumber">
                  Card Number
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="cardNumber"
                  type="text"
                  placeholder="1111 2222 3333 4444"
                  name="cardNumber"
                  value={paymentDetails.cardNumber}
                  onChange={handleChange}
                />
              </div>
              {/* ...other input fields like cardholderName, expiryDate, cvv */}
            </div>
          )}

          {/* Submit button */}
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Pay Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
