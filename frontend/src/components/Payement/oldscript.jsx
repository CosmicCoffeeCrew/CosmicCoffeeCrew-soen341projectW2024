//------------------------------
//*****************************
//For axios import
//npm install axios
//Becarefull where you installed
//*****************************
//------------------------------

import { useState } from 'react';
//import axios from 'axios'; //For backend purpose
const PaymentPage = () => {
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
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
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would integrate with a payment API
    console.log('Payment details: ', paymentDetails);
    // Reset payment details or navigate user to success page
  };

  return (
    <div className="review-container">
      <h2 className="text-2xl font-bold mb-4">Payment Information</h2>
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="form-field">
          <label className="block mb-2">Card Number</label>
          <input
            name="cardNumber"
            type="text"
            value={paymentDetails.cardNumber}
            onChange={handleChange}
            className="border-gray-400 border rounded px-4 py-2 mt-1 block w-full"
            placeholder="1111 2222 3333 4444"
            maxLength="19"
          />
        </div>
        <div className="form-field">
          <label className="block mb-2">Cardholder Name</label>
          <input
            name="cardholderName"
            type="text"
            value={paymentDetails.cardholderName}
            onChange={handleChange}
            className="border-gray-400 border rounded px-4 py-2 mt-1 block w-full"
            placeholder="Name as it appears on card"
          />
        </div>
        <div className="form-field">
          <label className="block mb-2">Expiry Date</label>
          <input
            name="expiryDate"
            type="text"
            value={paymentDetails.expiryDate}
            onChange={handleChange}
            className="border-gray-400 border rounded px-4 py-2 mt-1 block w-full"
            placeholder="MM/YY"
            maxLength="5"
          />
        </div>
        <div className="form-field">
          <label className="block mb-2">CVV</label>
          <input
            name="cvv"
            type="password"
            value={paymentDetails.cvv}
            onChange={handleChange}
            className="border-gray-400 border rounded px-4 py-2 mt-1 block w-full"
            placeholder="CVV"
            maxLength="3"
          />
        </div>
        <button type="submit" className="bg-primary text-white px-4 py-2 rounded mt-2">
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default PaymentPage;
