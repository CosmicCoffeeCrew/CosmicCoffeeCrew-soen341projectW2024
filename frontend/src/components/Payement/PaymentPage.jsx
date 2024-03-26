import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './PaymentPage.css';

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    currentCharge,
    startDate,
    endDate,
    vehicleId
  } = location.state || {};

  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    paymentMethod: 'card',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => {
      alert('Payment processed successfully!');
      navigate('/payment-success');
    }, 1000); // Fake delay of 1 second
  };
  const formatStartDate = startDate ? new Date(startDate).toLocaleDateString() : '';
  const formatEndDate = endDate ? new Date(endDate).toLocaleDateString() : '';

  return (
    <div className="payment-page-container">
      <form onSubmit={handleSubmit} className="payment-form">
        <h2 className="payment-form-title">Payment Information</h2>
  
        {/* Displaying reservation and charge details */}
      <div className="reservation-details mb-4">
        <p><strong>Reference Number:</strong> {vehicleId || 'N/A'}</p>
        <p><strong>Start Date:</strong> {formatStartDate}</p>
        <p><strong>End Date:</strong> {formatEndDate}</p>
        <p><strong>Charge:</strong> ${currentCharge || 0}</p>
        <p className="additional-fees" style={{color: 'red'}}>An additional $500 will be added to your fees until you checkout.</p>
      </div>
  
        {paymentDetails.paymentMethod === 'card' && (
          <div className="card-details-section">
            <div className="input-group">
              <label htmlFor="cardNumber">Card Number</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={paymentDetails.cardNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="expiryDate">Expiry Date</label>
              <input
                type="text"
                id="expiryDate"
                name="expiryDate"
                value={paymentDetails.expiryDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="cvv">CVV</label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                value={paymentDetails.cvv}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="cardholderName">Cardholder Name</label>
              <input
                type="text"
                id="cardholderName"
                name="cardholderName"
                value={paymentDetails.cardholderName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        )}
        <button type="submit" className="pay-now-button">Pay Now</button>
      </form>
    </div>
  );
};

export default PaymentPage;
