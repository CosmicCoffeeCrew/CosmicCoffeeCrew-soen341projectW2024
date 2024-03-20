import React, {useState, useEffect} from 'react';

const Checkin = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
      setIsModalOpen(true);
    };

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
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg">
              <p>Form to add reservation details will go here.</p>
              <button className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => setIsModalOpen(false)}>Close</button>
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
          {reservations.filter(reservation => reservation.status === 'pending').map((reservation) => (
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
  ))}
          </tbody>
        </table>
      </div>


      {/* Upcoming Reservations table */}
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
          {  reservations .filter(reservation => {
        const today = new Date();
        const pickUpDate = new Date(reservation.pickUpDate);
  
        // Set hours, minutes, seconds, and milliseconds to 0 for today's date to ensure correct comparison
        today.setHours(0, 0, 0, 0);
  
        // Include the reservation if its pick-up date is today or later
        return pickUpDate >= today;
      }).map((reservation) => (
    <tr key={reservation.id}>
      <td className="px-4 py-2 border">{reservation.id}</td>
      <td className="px-4 py-2 border">{reservation.pickUpDate}</td>
      <td className="px-4 py-2 border">{reservation.returnDate}</td>
      <td className="px-4 py-2 border">{reservation.vehicleInfo}</td>
      <td className="px-4 py-2 border">{reservation.customerInfo}</td>
      <td className="text-center align-middle">
         <button 
              className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${reservation.status === 'Confirmed' ? 'bg-green-500 text-white' : reservation.status === 'Declined' || reservation.status === 'Canceled' ? 'bg-red-500 text-white' : 'bg-gray-500 text-white'}`}
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
  ))}
          </tbody>
        </table>
      </div>
    </div>
    );
};

export default Checkin;