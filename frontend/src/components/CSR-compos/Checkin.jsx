import {useState, useEffect} from 'react';

const Checkin = () => {
      const [reservations, setReservations] = useState([]);
      const [formData, setFormData] = useState([]);

      const [isModalOpen, setIsModalOpen] = useState(false);
      const [vehicleId, setVehicleId] = useState('');
      const [pickUpDate, setPickUpDate] = useState('');
      const [returnDate, setReturnDate] = useState('');
      const [customerId, setCustomerId] = useState(''); 
      const [customerEmail, setCustomerEmail] = useState(''); 
      const [customerExists, setCustomerExists] = useState(false); // Declare customerExists state
      const [paymentMethod, setPaymentMethod] = useState('');
      const [cardNumber, setCardNumber] = useState(''); 

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
    

    const handleOpenModal = () => {
       setIsModalOpen(true);
     };

    
    const handleCustomerEmailChange = async (e) => {
      const enteredEmail = e.target.value;
      setCustomerEmail(enteredEmail); // Assuming you have a state setter for customerEmail
    
      try {
        const customerResponse = await fetch(`/api/users/?email=${enteredEmail}`);
        const customer = customerResponse.ok ? await customerResponse.json() : null;
        console.log('Customer Object:', customer);
        console.log('Customer ID:', customer ? customer[0]._id : 'Customer ID not available');

        if (customer[0]) {
          // Customer found, set the customer's ID and other info
          setCustomerId(customer[0]._id);
          setCustomerExists(true);
        } else {
          // No customer found, reset states
          setCustomerId('no customer found');
          setCustomerExists(false);
        }
      } catch (error) {
        console.error("Failed to fetch customer", error);
        // Handle error, e.g., reset states or show an error message
      }
    };
    

     const handleSubmit = async (e) => {
         e.preventDefault();
         // Collect form data
         const newReservation = {
           userID: customerId,
           vehicleID: vehicleId,
           start_Date: pickUpDate,
           end_Date: returnDate,
           status: "pending",
        };
        console.log(newReservation);

         // Now, make a fetch request to submit this data to your backend
        try {
            const response = await fetch('/api/reservations/record', {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json',
                    // Include other headers like Authorization if necessary
               },
               body: JSON.stringify(newReservation),
        });
    
         setIsModalOpen(false); // Close the modal after form submission

        // Show success message
         setSuccessPopup({
             show: true, 
             message: "The reservation has been successfully created. An email will be sent to the customer shortly. Thank you!"
         });

         // Optionally close the success message after some time
         setTimeout(() => setSuccessPopup({ show: false, message: '' }), 3000);
        } catch (error) {
          console.error('Failed to submit reservation:', error);
          // Handle submission error
        }
       };


const updateStatus = async (reservationId, newStatus) => {
    if (newStatus === 'accepted') {
      try {
          const response = await fetch(`/api/reservations/confirm/${reservationId}`, {
          method: 'PATCH', // Using PATCH as specified
          headers: {
            'Content-Type': 'application/json',
          },
          // If additional data needs to be sent in the request body, include it here
        });
  
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Failed to update reservation status:', errorData.error);
            return; // Exit the function if there was an error response
          }
    
          // Assuming the successful response includes the updated reservation, you might want to update your local state
          const updatedReservation = await response.json();
          console.log('Reservation status updated successfully:', updatedReservation);
    
          // Update local state to reflect the change
          const updatedReservations = formData.map(reservation =>
            reservation.id === reservationId ? { ...reservation, status: 'accepted' } : reservation
          );
          setFormData(updatedReservations);
        } catch (error) {
          console.error('Error confirming reservation:', error);
        }
      }

    // Handle other status updates similarly, if applicable
    if (newStatus === 'refused') {
      try {
        const response = await fetch(`/api/reservations/cancel/${reservationId}`, {
          method: 'PATCH', // Using PATCH as specified
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          console.error('Failed to update reservation status:', errorData.error);
          return; // Exit the function if there was an error response
        }
  
        // Assuming the successful response includes the updated reservation, you might want to update your local state
        const updatedReservation = await response.json();
        console.log('Reservation status updated successfully:', updatedReservation);
  
        // Update local state to reflect the change
        const updatedReservations = formData.map(reservation =>
          reservation.id === reservationId ? { ...reservation, status: 'refused' } : reservation
        );
        setFormData(updatedReservations);
      } catch (error) {
        console.error('Error canceling reservation:', error);
      }
    }

    // Inside your updateStatus function, after successfully updating the reservation
    handleStatusUpdate(newStatus, reservationId);
    
  };
  
  const [successPopup, setSuccessPopup] = useState({ show: false, message: '' });

   const handleStatusUpdate = (newStatus, reservationId) => {
    let message = '';
    switch (newStatus) {
        case 'accepted':
            message = `Reservation ${reservationId} has been successfully accepted. We'll inform the customer with an email. Thank you!`;
            break;
        case 'refused':
            message = `Reservation ${reservationId} has been successfully canceled. We'll inform the customer accordingly. Thank you!`;
            break;
        default:
            console.error('Unhandled status:', newStatus);
            return; // Exit if the status is not recognized
    }

    // Show the success message popup
    setSuccessPopup({ show: true, message });

    // Optionally close the popup after some time
    setTimeout(() => setSuccessPopup({ show: false, message: '' }), 3000);
};


        const [isEditModalOpen, setIsEditModalOpen] = useState(false);
        const [editingReservation, setEditingReservation] = useState(null);
        
        const handleEditClick = (reservation) => {
           setEditingReservation(reservation);
           setIsEditModalOpen(true);
         };

        const handleEditReservation = (e) => {
           e.preventDefault();
           const updatedReservations = reservations.map(reservation =>
            reservation.id === editingReservation.id ? editingReservation : reservation
           );
           setReservations(updatedReservations);
           setIsEditModalOpen(false); // Close the edit modal

            // Set the success message to be displayed
            setSuccessPopup({
                show: true,
                message: "The changes have been successfully applied to the current reservation. We will update the customer with an email shortly."
   });

           // Optionally, auto-hide the success message after a few seconds
           setTimeout(() => setSuccessPopup({ show: false, message: '' }), 5000);
         };
              

     return (
      <div className="p-4 font-serif">
         <p>  Welcome! You have logged in as a <b>Customer Service Representative.</b> </p>
         <p>  your role is crucial in verifying and managing reservation requests efficiently. Lets get Started! </p>
         <p>  Should you receive a call from a customer wishing to make a reservation, please proceed to manually create a reservation for them by clicking on the <b> Create a new reservation </b> button below.</p>
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

              {/* Customer Email */}
               <label htmlFor="customerEmail" className="block">Customer Email:</label>
               <input type="email" id="customerEmail" value={customerEmail} onChange={handleCustomerEmailChange} className="mb-4 w-full" />

               {/* Display Customer ID if customer exists (after checking database in handleCustomerEmailChange) */}
               {customerExists && (
                  <div className="mb-4">
                    <p><strong>Customer ID:</strong> {customerId}</p>
                 </div>
                )}

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
                 {formData.filter(reservation => reservation.status === 'pending').length > 0 ? (
                  formData.filter(reservation => reservation.status === 'pending').map((reservation) => (
                     <tr key={reservation.id}>
                     <td className="px-4 py-2 border">{reservation.id}</td>
                     <td className="px-4 py-2 border">{reservation.pickUpDate.toLocaleDateString('en-CA')}</td>
                     <td className="px-4 py-2 border">{reservation.returnDate.toLocaleDateString('en-CA')}</td>
                     <td className="px-4 py-2 border">{reservation.vehicleInfo}</td>
                     <td className="px-4 py-2 border">{reservation.customerInfo}</td>
                     <td className="px-4 py-2 border">Signed</td>
                     <td className="px-4 py-2 border">Credit Card xxxx-xxxx-xxxx-xxxx</td>
                     <td className="px-4 py-2 border flex justify-around">
                     <button 
                       onClick={() => updateStatus(reservation.id, 'accepted')}
                       className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-2">
                       Accept
                     </button>
                     <button 
                       onClick={() => updateStatus(reservation.id, 'refused')}
                       className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-2">
                       Decline
                     </button>
                    </td>
                  </tr>                  ))
               ) : (
                   <tr>
                       <td colSpan="8" className="text-center py-3">No requested reservations found.</td>
                    </tr>
               )}
           </tbody>
         </table>
      </div>

       {successPopup.show && (
           <div className="fixed inset-0 flex justify-center items-center z-20">
              <div className="bg-gray-500 text-white p-4 rounded-lg shadow-lg">
                {successPopup.message}
              </div>
           </div>
 )}

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
               {formData.filter(reservation => reservation.status === 'accepted').length > 0 ? (
                  formData.filter(reservation => reservation.status === 'accepted').map((reservation) => (
              <tr key={reservation.id}>
                   <td className="px-4 py-2 border">{reservation.id}</td>
                   <td className="px-4 py-2 border">{reservation.pickUpDate.toLocaleDateString('en-CA')}</td>
                   <td className="px-4 py-2 border">{reservation.returnDate.toLocaleDateString('en-CA')}</td>
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
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded" onClick={() => handleEditClick(reservation)}>Edit</button>
                {reservation.status !== 'refused' && (
                 <button 
                   onClick={() => updateStatus(reservation.id, 'refused')}
                   className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                   Cancel
                 </button>
               )}
        </td>
     </tr>
     ))
   ) : (
     <tr>
       <td colSpan="8" className="text-center py-3">No scheduled reservations found.</td>
     </tr>
    )}
           </tbody>
           </table>
       </div>
       {isEditModalOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg max-w-md">
         <form onSubmit={handleEditReservation} className="space-y-2 p-[2px]">
         <h3 className="text-lg font-semibold">Edit Reservation</h3>

        {/* Vehicle Information */}
         <div>
           <label htmlFor="editVehicleInfo" className="block">Vehicle Information:</label>
           <input type="text" id="editVehicleInfo" value={editingReservation.vehicleInfo} onChange={(e) => setEditingReservation({...editingReservation, vehicleInfo: e.target.value})} className="mb-4 w-full" />
         </div>

         {/* Pickup Date */}
         <div>
           <label htmlFor="editPickUpDate" className="block">Pickup Date:</label>
           <input type="date" id="editPickUpDate" value={editingReservation.pickUpDate} onChange={(e) => setEditingReservation({...editingReservation, pickUpDate: e.target.value})} className="mb-4 w-full" />
         </div>

         {/* Return Date */}
         <div>
           <label htmlFor="editReturnDate" className="block">Return Date:</label>
           <input type="date" id="editReturnDate" value={editingReservation.returnDate} onChange={(e) => setEditingReservation({...editingReservation, returnDate: e.target.value})} className="mb-4 w-full" />
         </div>

         <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Save Changes</button>
         <button type="button" onClick={() => setIsEditModalOpen(false)} className="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Close</button>
       </form>
     </div>
   </div>
 )}

     {/* Declined Reservations table */}
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
         </tr>
      </thead>
      <tbody>
       {formData.filter(reservation => reservation.status === 'refused').length > 0 ? (
         formData.filter(reservation => reservation.status === 'refused').map((reservation) => (
           <tr key={reservation.id}>
             <td className="px-4 py-2 border">{reservation.id}</td>
             <td className="px-4 py-2 border">{reservation.pickUpDate.toLocaleDateString('en-CA')}</td>
             <td className="px-4 py-2 border">{reservation.returnDate.toLocaleDateString('en-CA')}</td>
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
           </tr>
         ))
       ) : (
         <tr>
           <td colSpan="7" className="text-center py-3">No declined reservations found.</td>
         </tr>
       )}
     </tbody>
   </table>
 </div>
</div>

    
 );
 };

export default Checkin;
