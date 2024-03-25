import React, { useState, useEffect } from 'react';

const Checkout = () => {

  const [formData, setFormData] = useState([]); 

  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [currentReservationId, setCurrentReservationId] = useState(null);

  const [physicalInspectionCompleted, setPhysicalInspectionCompleted] = useState(false);
  const [noDamageObserved, setNoDamageObserved] = useState(false);
  const [termsMet, setTermsMet] = useState(false);
  const [fuelFull, setFuelFull] = useState(false);

 const allConditionsMet = physicalInspectionCompleted && noDamageObserved && termsMet && fuelFull;

 const [showSuccessPopup, setShowSuccessPopup] = useState(false);


 useEffect(() => {
    const fetchReservations = async () => {
     try {
      const resResponse = await fetch('/api/reservations');
       if (!resResponse.ok) throw new Error('Failed to fetch reservations');
       const reservations = await resResponse.json();
       console.log("Fetched reservations:", reservations); 

       const detailedReservations = await Promise.all(reservations.map(async (reservation) => {
        //Fetch vehicle details
          const vehicleResponse = await fetch(`/api/vehicles/${reservation.vehicleID}`);
          const vehicle = vehicleResponse.ok ? await vehicleResponse.json() : null;

        // Fetch customer details
           const customerResponse = await fetch(`/api/users/${reservation.userID}`);
           const customer = customerResponse.ok ? await customerResponse.json() : null;

         // Combine data into a structured object
          return {
             id: reservation._id,
             pickUpDate: new Date(reservation.start_Date),
             returnDate: new Date(reservation.end_Date),
             vehicleInfo: vehicle ? `${vehicle.make} ${vehicle.model}` : 'Vehicle details not available',
             customerInfo: customer ? customer.email : 'Customer details not available',
             status: reservation.status,
           // Include any other fields you need
        };
     }));
        setFormData(detailedReservations);
        console.log("Processed formData:", formData); // Debug log after processing
        } catch (error) {
        console.error('Error:', error);
     }
    };

    fetchReservations();
    }, []); 
 
    //Generate today's date in YYYY-MM-DD format for comparison
   const today = new Date().toISOString().split('T')[0];

   const initiateCheckout = (reservationId) => {
    console.log("Setting currentReservationId to:", reservationId); // For debugging
    setCurrentReservationId(reservationId);
    setIsCheckoutModalOpen(true);
  };
  

  const handleCheckoutFormSubmit  = async (reservationId) => {
    console.log("Attempting to checkout reservation with ID:", reservationId); // For debugging
    try {
        const response = await fetch(`/api/reservations/checkout/${reservationId}`, {
          method: 'PATCH', // or 'POST' if your server expects POST for this action
          headers: {
            'Content-Type': 'application/json',
            // Include any other headers your API requires
          },
          // No need to send body for this particular request as per your backend code
        });
  
        if (!response.ok) {
          throw new Error('Failed to complete the check-out process');
        }
        const data = await response.json();
        console.log('Check-Out Successful:', data);
        alert('Check-out successful!'); // Provide feedback to the user
        // You can perform further actions here, such as updating the state or redirecting the user
        setIsCheckoutModalOpen(false);
       // Display the success pop-up message after a brief delay
        setTimeout(() => {
        setShowSuccessPopup(true);
        // Automatically close the success pop-up after a few seconds
        setTimeout(() => setShowSuccessPopup(false), 5000);
        }, 300);
      } catch (error) {
        console.error('Check-Out Error:', error);
        alert('Error during check-out. Please try again.'); // Provide feedback to the user
      }
  };

  return (
    <div className="mt-8 mr-10 ml-10 font-serif ">
      <h2 className="text-2xl font-semibold mt-8">Today's Scheduled Returns - {today}</h2>
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border">Reservation ID</th>
            <th className="px-4 py-2 border">Pick-up Date</th>
            <th className="px-4 py-2 border">Return Date</th>
            <th className="px-4 py-2 border">Vehicle Information</th>
            <th className="px-4 py-2 border">Customer Information</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {formData.filter(reservation => reservation.returnDate.toISOString().split('T')[0] === today &&
          reservation.status === 'accepted').length > 0 ? (
            formData.filter(reservation => reservation.returnDate.toISOString().split('T')[0] === today && 
            reservation.status === 'accepted').map((reservation) => (
              <tr key={reservation.id}>
                <td className="px-4 py-2 border">{reservation.id}</td>
                <td className="px-4 py-2 border">{reservation.pickUpDate.toLocaleDateString('en-CA')}</td>
                <td className="px-4 py-2 border">{reservation.returnDate.toLocaleDateString('en-CA')}</td>
                <td className="px-4 py-2 border">{reservation.vehicleInfo}</td>
                <td className="px-4 py-2 border">{reservation.customerInfo}</td>
                <td className="px-4 py-2 border text-center">
                  <button 
                    onClick={() => initiateCheckout(reservation.id)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Initiate Check-Out
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-3">No reservations are due for return today.</td>
            </tr>
          )}
        </tbody>
      </table>

       {/* Checkout Modal */}
       {isCheckoutModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white p-2 rounded-lg shadow-xl max-w-md">
            <form className="space-y-1 p-2">
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
              <p>MasterCard 0094 5683 3345 8949</p>
              <div className="flex justify-between">
               {allConditionsMet && (
                   <button
                       type="button"
                       className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                       onClick={() => handleCheckoutFormSubmit(currentReservationId)} 
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
           Checkout is successful for reservation {currentReservationId}. We'll inform the customer with an email. Thank you!
         </div>
      </div>
  )}
    </div>
  );
};

export default Checkout;

