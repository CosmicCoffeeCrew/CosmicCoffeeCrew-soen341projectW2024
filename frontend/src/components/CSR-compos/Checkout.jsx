import React, { useState } from 'react';

const Checkout = () => {

  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [currentReservation, setCurrentReservation] = useState(null);

  const [physicalInspectionCompleted, setPhysicalInspectionCompleted] = useState(false);
  const [noDamageObserved, setNoDamageObserved] = useState(false);
  const [termsMet, setTermsMet] = useState(false);
  const [fuelFull, setFuelFull] = useState(false);

  const allConditionsMet = physicalInspectionCompleted && noDamageObserved && termsMet && fuelFull;

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const [reservations] = useState([
    {
      id: 'Res101',
      pickUpDate: '2024-03-01',
      returnDate: '2024-03-22',
      vehicleInfo: 'Tesla Model 3',
      customerInfo: 'Jane Doe',
      rentalAgreement: 'Signed',
      paymentInfo: 'MasterCard 0094 5683 3345 8949',
      status: 'confirmed'
    },
    {
      id: 'Res102',
      pickUpDate: '2024-03-07',
      returnDate: '2024-03-22',
      vehicleInfo: 'Toyota',
      customerInfo: 'Peter Peterson',
      rentalAgreement: 'Signed',
      paymentInfo: 'Visa 0094 5683 3345 8949',
      status: 'confirmed'
    }
  ]);

  // Generate today's date in YYYY-MM-DD format for comparison
  const today = new Date().toISOString().split('T')[0];

  const initiateCheckout = (reservation) => {
    setCurrentReservation(reservation);
    setIsCheckoutModalOpen(true);
  };

  const handleCheckoutFormSubmit = (e) => {
    e.preventDefault();
    console.log("Checkout Completed for", currentReservation?.id);
    setIsCheckoutModalOpen(false);
     // Display the success pop-up message after a brief delay
    setTimeout(() => {
        setShowSuccessPopup(true);
        // Automatically close the success pop-up after a few seconds
        setTimeout(() => setShowSuccessPopup(false), 5000);
    }, 300);
  };

  return (
    <div className="mt-8 mr-10 ml-10 font-serif ">
      <h2 className="text-lg font-semibold mt-8">Today's Scheduled Returns - {today}</h2>
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border">Reservation ID</th>
            <th className="px-4 py-2 border">Vehicle Information</th>
            <th className="px-4 py-2 border">Customer Information</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations.filter(reservation => reservation.returnDate === today).length > 0 ? (
            reservations.filter(reservation => reservation.returnDate === today).map((reservation) => (
              <tr key={reservation.id}>
                <td className="px-4 py-2 border">{reservation.id}</td>
                <td className="px-4 py-2 border">{reservation.vehicleInfo}</td>
                <td className="px-4 py-2 border">{reservation.customerInfo}</td>
                <td className="px-4 py-2 border text-center">
                  <button 
                    onClick={() => initiateCheckout(reservation)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Initiate Check-Out
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-3">No reservations are due for return today.</td>
            </tr>
          )}
        </tbody>
      </table>

       {/* Checkout Modal */}
       {isCheckoutModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md">
            <form onSubmit={handleCheckoutFormSubmit} className="space-y-4">
              <h3 className="text-lg font-semibold">Check-Out Verification</h3>
              {/* Check-Out Verification Checklist */}
<div className="space-y-2">
  <div>
    <label htmlFor="physicalInspection" className="inline-flex items-center">
      <input type="checkbox" id="physicalInspection" className="form-checkbox" checked={physicalInspectionCompleted}
  onChange={(e) => setPhysicalInspectionCompleted(e.target.checked)} />
      <span className="ml-2">Physical Inspection Completed</span>
    </label>
  </div>
  <div>
    <label htmlFor="noDamage" className="inline-flex items-center">
      <input type="checkbox" id="noDamage" className="form-checkbox" checked={noDamageObserved}
  onChange={(e) => setNoDamageObserved(e.target.checked)}/>
      <span className="ml-2">No Damage Observed</span>
    </label>
  </div>
  <div>
    <label htmlFor="termsMet" className="inline-flex items-center">
      <input type="checkbox" id="termsMet" className="form-checkbox" checked={termsMet}
  onChange={(e) => setTermsMet(e.target.checked)}/>
      <span className="ml-2">Rental Terms and Conditions Met</span>
    </label>
  </div>
  <div>
    <label htmlFor="fuelFull" className="inline-flex items-center">
      <input type="checkbox" id="fuelFull" className="form-checkbox" checked={fuelFull}
  onChange={(e) => setFuelFull(e.target.checked)} />
      <span className="ml-2">Fuel Tank Full</span>
    </label>
  </div>
</div>

{/* Additional Services */}
<div className="mt-4">
  <h4 className="font-semibold mb-2">Additional Services:</h4>
  <div>
    <label htmlFor="carWash" className="inline-flex items-center">
      <input type="checkbox" id="carWash" className="form-checkbox" />
      <span className="ml-2">Car Wash (40.00$)</span>
    </label>
  </div>
  <div>
    <label htmlFor="gpsAddOn" className="inline-flex items-center">
      <input type="checkbox" id="gpsAddOn" className="form-checkbox" />
      <span className="ml-2">GPS Add-on (25.00$) </span>
    </label>
  </div>
  <div>
    <label htmlFor="extraInsurance" className="inline-flex items-center">
      <input type="checkbox" id="extraInsurance" className="form-checkbox" />
      <span className="ml-2">Extra Insurance (30.00$)</span>
    </label>
  </div>
  {/* Add more additional services as needed */}
</div>
              <h4 className="font-semibold mb-2">Review Payment Details:</h4>
              <p>{currentReservation?.paymentInfo}</p>
              <div className="flex justify-between">
               {allConditionsMet && (
                   <button
                       type="submit"
                       className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                    Complete Check-Out
                    </button>
                )}
                <button type="button" onClick={() => setIsCheckoutModalOpen(false)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    {showSuccessPopup && (
        <div className="fixed inset-0 flex justify-center items-center z-20">
          <div className="bg-green-500 text-white p-4 rounded-lg shadow-lg">
            Checkout is successful. We'll inform the customer with an email. Thank you!
          </div>
        </div>
    )}
    </div>
  );
};

export default Checkout;
