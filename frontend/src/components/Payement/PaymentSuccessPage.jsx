import { useNavigate } from 'react-router-dom';

const PaymentSuccessPage = () => {
  const navigate = useNavigate();

  const handleBackToMenu = () => {
    navigate('/'); // This will navigate the user back to the homepage
  };

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Payment Successful!</h2>
        <p className="text-center mb-8">Thank you for your payment. Your transaction has been completed, and a receipt for your purchase has been emailed to you.</p>
        <div className="flex justify-center">
          <button
            onClick={handleBackToMenu}
            className="bg-secondary-300 hover:bg-gray-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Back to Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
