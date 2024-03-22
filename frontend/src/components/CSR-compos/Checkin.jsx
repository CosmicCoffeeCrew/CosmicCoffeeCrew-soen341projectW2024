import React, {useState, useEffect} from 'react';

const Checkin = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isExistingCustomer, setIsExistingCustomer] = useState(true); // To toggle between existing and new customer forms
    const [vehicleId, setVehicleId] = useState('');
    const [pickUpDate, setPickUpDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [customerId, setCustomerId] = useState(''); // For existing customer
    const [customerInfo, setCustomerInfo] = useState({ fullName: '', emailAddress: '', phoneNumber: '' }); // For existing Customer
    const [customerName, setCustomerName] = useState(''); // For new customer
    const [customerEmail, setCustomerEmail] = useState(''); // For new customer
    const [customerPhone, setCustomerPhone] = useState(''); // For new customer
    const [paymentMethod, setPaymentMethod] = useState('');
    const [cardNumber, setCardNumber] = useState(''); 

    const handleOpenModal = () => {
      setIsModalOpen(true);
    };

    const handleCustomerIDChange = (e) => {
        const enteredId = e.target.value;
        setCustomerId(enteredId);
    
        // Check if enteredId matches the hardcoded customer's ID
        if (enteredId === hardcodedCustomer.id) {
          // Populate the form with the hardcoded customer's information
          setCustomerInfo({
            fullName: hardcodedCustomer.fullName,
            emailAddress: hardcodedCustomer.emailAddress,
            phoneNumber: hardcodedCustomer.phoneNumber,
          });
        } else {
          // Reset customerInfo if the ID does not match
          setCustomerInfo({ fullName: '', emailAddress: '', phoneNumber: '' });
        }
      };
    

    const handleSubmit = (e) => {
        e.preventDefault();
        // Collect form data
        const formData = {
          vehicleId,
          pickUpDate,
          returnDate,
          customerInfo: isExistingCustomer
            ? { customerId }
            : { customerName, customerEmail, customerPhone },
          paymentMethod,
        };
    
        console.log(formData);
    
        // Here you would typically send formData to your backend via an API call
        // Example:
        // await fetch('/api/reservations', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(formData),
        // });
    
        setIsModalOpen(false); // Close the modal after form submission
      };

      // Hardcoded customer data for demonstration
    const hardcodedCustomer = {
         id: '123',
         fullName: 'John Doe',
         emailAddress: 'john.doe@example.com',
         phoneNumber: '555-1234',
    };
    
     // Hardcoded Reservations data for demonstration
    const [reservations, setReservations] = useState([
        {
          id: 'Res101',
          pickUpDate: '2024-03-30',
          returnDate: '2024-04-05',
          vehicleInfo: 'Tesla Model 3',
          customerInfo: 'Jane Doe',
          rentalAgreement: 'Signed',
          paymentInfo: 'MasterCard 0094 5683 3345 8949',
          status: 'pending'
        },

        {
            id: 'Res102',
            pickUpDate: '2024-03-27',
            returnDate: '2024-04-05',
            vehicleInfo: 'Toyota',
            customerInfo: 'Peter Peterson',
            rentalAgreement: 'Signed',
            paymentInfo: 'Visa 0094 5683 3345 8949',
            status: 'pending'
       }
    ]);

      const updateStatus = async (reservationId, newStatus) => {
        console.log(`Updating status for reservation ${reservationId} to ${newStatus}`);
        const updatedReservations = reservations.map(reservations =>
        reservations.id === reservationId ? { ...reservations, status: newStatus } : reservations
        );
        setReservations(updatedReservations);
        };
/* Temporarily until linked with backend
      // Define reservations state variable with useState
     const [reservations, setReservations] = useState([]);

    useEffect(() => {
        fetchReservations();
      }, []);
    
      const fetchReservations = async () => {
        // Placeholder for fetching reservations data
        // This should be replaced with actual fetching logic
        console.log('Fetching reservations...');
        // Assuming the fetch populates the 'reservations' state
      };
    
      const updateStatus = async (reservationId, newStatus) => {
        console.log(`Updating status for reservation ${reservationId} to ${newStatus}`);
        // Placeholder for API call to update reservation status
        // Replace with your actual API call logic
        // After updating, re-fetch reservations to reflect changes
        fetchReservations();
      };
      */
  
    return (
      <div className="p-4 font-serif">
        <p>  Welcome! You have logged in as a <b>Customer Service Representative.</b> </p>
        <p>  your role is crucial in verifying and managing reservation requests efficiently. Let's get Started! </p>
        <p>  Should you receive a call from a customer wishing to make a reservation, please proceed to manually create a reservation for them by clicking on the 'Create a new reservation' button below.</p>
        <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleOpenModal}>
          Create a new reservation
        </button>
  
        {/* Modal Placeholder, Add reservation form to be completed */}
        {isModalOpen && (
          <div className="absolute bg-black bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white p-2 rounded-lg max-w-md">
            <form onSubmit={handleSubmit} className="space-y-1 p-[2px]">
              <h2 className="text-lg font-semibold mb-4">Add New Reservation</h2>

              {/* Vehicle ID */}
              <label htmlFor="vehicleId" className="block">Enter Vehicle ID:</label>
              <input type="text" id="vehicleId" value={vehicleId} onChange={(e) => setVehicleId(e.target.value)} className="mb-4 w-full" />

              {/* Pickup Date */}
              <label htmlFor="pickUpDate" className="block">Pickup Date:</label>
              <input type="date" id="pickUpDate" value={pickUpDate} onChange={(e) => setPickUpDate(e.target.value)} className="mb-4 w-full" />

              {/* Return Date */}
              <label htmlFor="returnDate" className="block">Return Date:</label>
              <input type="date" id="returnDate" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} className="mb-4 w-full" />

              {/* Customer Info */}
              <div>
                <button type="button" onClick={() => setIsExistingCustomer(true)}  className={`px-4 py-2 mr-2 ml-2 rounded ${isExistingCustomer ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Existing Customer</button>
                <button type="button" onClick={() => setIsExistingCustomer(false)}  className={`px-4 py-2 mr-2 ml-2 rounded ${isExistingCustomer ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>New Customer</button>
                
                {isExistingCustomer ? (
                  // Existing Customer Form
                  <div>
                  <label htmlFor="customerId" className="block">Enter Customer ID:</label>
                  <input type="text" id="customerId" value={customerId} onChange={handleCustomerIDChange} 
                    className="mb-4 w-full p-2 border rounded" />

                  {/* Display customer info if available */}
                  {customerId === hardcodedCustomer.id && (
                    <div className="mb-4">
                      <p><strong>Full Name:</strong> {customerInfo.fullName}</p>
                      <p><strong>Email Address:</strong> {customerInfo.emailAddress}</p>
                      <p><strong>Phone Number:</strong> {customerInfo.phoneNumber}</p>
                    </div>
                  )}
                </div>
                ) : (
                  // New Customer Form
                  <div>
                    <label htmlFor="customerName" className="block mt-4">Full Name:</label>
                    <input type="text" id="customerName" className="mb-4 w-full" />
                    <label htmlFor="customerEmail" className="block">Email Address:</label>
                    <input type="email" id="customerEmail" className="mb-4 w-full" />
                    <label htmlFor="customerPhone" className="block">Phone Number:</label>
                    <input type="text" id="customerPhone" className="mb-4 w-full" />
                  </div>
                )}
              </div>

              {/* Payment Method */}
              <label htmlFor="paymentMethod" className="block">Payment Method:</label>
              <select id="paymentMethod" className="mb-4 w-full">
                {/* Options for payment method */}
                <option value="mastercard">MasterCard</option>
                <option value="visa">Visa</option>
                <option value="americanexpress">American Express</option>
              </select>
              <label htmlFor="cardNumber" className="block">Card Number:</label>
                <input type="text" id="cardNumber" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} 
                  className="mb-4 w-full p-2 border rounded" placeholder="1234 5678 9012 3456" />
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
              <button type="button" onClick={() => setIsModalOpen(false)} className="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Close</button>
            </form>
              
            </div>
          </div>
        )}


   {/* Requested Reservations table */}
  <div className="mt-8">
       <h2 className="text-lg font-semibold">Requested Reservations</h2>
       <table className="min-w-full mt-2">
         <thead>
           <tr>
              <th className="px-4 py-2 border">Rservation ID</th>
              <th className="px-4 py-2 border">Pick-up Date</th>
              <th className="px-4 py-2 border">Return Date</th>
              <th className="px-4 py-2 border">Vehicle Info</th>
              <th className="px-4 py-2 border">Customer Info</th>
              <th className="px-4 py-2 border">Rental Agreement</th>
              <th className="px-4 py-2 border">Payment Info</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
                {reservations.filter(reservation => reservation.status === 'pending').length > 0 ? (
                 reservations.filter(reservation => reservation.status === 'pending').map((reservation) => (
                    <tr key={reservation.id}>
                    <td className="px-4 py-2 border">{reservation.id}</td>
                    <td className="px-4 py-2 border">{reservation.pickUpDate}</td>
                    <td className="px-4 py-2 border">{reservation.returnDate}</td>
                    <td className="px-4 py-2 border">{reservation.vehicleInfo}</td>
                    <td className="px-4 py-2 border">{reservation.customerInfo}</td>
                    <td className="px-4 py-2 border">{reservation.rentalAgreement}</td>
                    <td className="px-4 py-2 border">{reservation.paymentInfo}</td>
                    <td className="px-4 py-2 border flex justify-around">
                      <button 
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                        onClick={() => updateStatus(reservation.id, 'confirmed')}>
                        Accept
                      </button>
                      <button 
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                        onClick={() => updateStatus(reservation.id, 'declined')}>
                        Decline
                      </button>
                    </td>
                  </tr>
                 ))
                ) : (
                   <tr>
                       <td colSpan="8" className="text-center py-3">No requested reservations found.</td>
                   </tr>
                )}
           </tbody>
        </table>
      </div>


      {/* Scheduled Reservations table */}
      <div className="mt-8">
       <h2 className="text-lg font-semibold">Scheduled Reservations</h2>
       <table className="min-w-full mt-2">
         <thead>
           <tr>
              <th className="px-4 py-2 border">Rservation ID</th>
              <th className="px-4 py-2 border">Pick-up Date</th>
              <th className="px-4 py-2 border">Return Date</th>
              <th className="px-4 py-2 border">Vehicle Info</th>
              <th className="px-4 py-2 border">Customer Info</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {reservations .filter(reservation => {
               const today = new Date();
               const pickUpDate = new Date(reservation.pickUpDate);
  
               // Set hours, minutes, seconds, and milliseconds to 0 for today's date to ensure correct comparison
               today.setHours(0, 0, 0, 0);
  
               // Include the reservation if its pick-up date is today or later
               return (pickUpDate >= today) && (reservation.status === 'confirmed' || reservation.status === 'canceled');
            }).length > 0 ? (
                reservations.filter(reservation => {
                  const today = new Date();
                  const pickUpDate = new Date(reservation.pickUpDate);
                  today.setHours(0, 0, 0, 0);
                  return (pickUpDate >= today) && (reservation.status === 'confirmed' || reservation.status === 'canceled');
                }).map((reservation) => (
    <tr key={reservation.id}>
      <td className="px-4 py-2 border">{reservation.id}</td>
      <td className="px-4 py-2 border">{reservation.pickUpDate}</td>
      <td className="px-4 py-2 border">{reservation.returnDate}</td>
      <td className="px-4 py-2 border">{reservation.vehicleInfo}</td>
      <td className="px-4 py-2 border">{reservation.customerInfo}</td>
      <td className="text-center align-middle">
         <button 
              className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-500 text-white`}
              disabled
        >
          {reservation.status}
        </button>
      </td>
       <td className="px-4 py-2 border flex justify-around">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded" onClick={() => console.log('Editing reservation', reservation.id)}>Edit</button>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded" onClick={() => console.log('Cancelling reservation', reservation.id)}>Cancel</button>
        </td>
    </tr>
    ))
  ) : (
    <tr>
      <td colSpan="7" className="text-center py-3">No scheduled reservations found.</td>
   </tr>
   )}
          </tbody>
        </table>
      </div>

      <div className="mt-8">
  <h2 className="text-lg font-semibold">Declined Reservations</h2>
  <table className="min-w-full mt-2">
    <thead>
      <tr>
        <th className="px-4 py-2 border">Reservation ID</th>
        <th className="px-4 py-2 border">Pick-up Date</th>
        <th className="px-4 py-2 border">Return Date</th>
        <th className="px-4 py-2 border">Vehicle Info</th>
        <th className="px-4 py-2 border">Customer Info</th>
        <th className="px-4 py-2 border">Status</th>
        <th className="px-4 py-2 border">Reason</th>
        <th className="px-4 py-2 border">Action</th>
      </tr>
    </thead>
    <tbody>
      {reservations.filter(reservation => reservation.status === 'declined').length > 0 ? (
        reservations.filter(reservation => reservation.status === 'declined').map((reservation) => (
          <tr key={reservation.id}>
            <td className="px-4 py-2 border">{reservation.id}</td>
            <td className="px-4 py-2 border">{reservation.pickUpDate}</td>
            <td className="px-4 py-2 border">{reservation.returnDate}</td>
            <td className="px-4 py-2 border">{reservation.vehicleInfo}</td>
            <td className="px-4 py-2 border">{reservation.customerInfo}</td>
            <td className="text-center align-middle">
            <button 
              className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-500 text-white`}
              disabled
            >
            {reservation.status}
            </button>
            </td>
            <td className="px-4 py-2 border">Do not follow rental guidelines</td>
            <td className="px-4 py-2 border flex justify-around">
              {/* Define your actions for declined reservations, such as a possibility to review or delete */}
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">Review</button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="8" className="text-center py-3">No declined reservations found.</td>
        </tr>
      )}
    </tbody>
  </table>
</div>

    </div>

    
    );
};

export default Checkin;

