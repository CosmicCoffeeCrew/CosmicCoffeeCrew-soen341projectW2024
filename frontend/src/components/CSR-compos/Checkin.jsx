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
          vehicleModel: 'Tesla Model 3',
          rentalAgreement: 'Signed',
          paymentInfo: 'MasterCard 0094 5683 3345 8949',
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
      <div className="p-4">
        <p>You have logged in as a Customer Service Representative. Check the requested reservations for verification...</p>
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
          {reservations.map((reservation) => (
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
    </div>
    );
};

export default Checkin;