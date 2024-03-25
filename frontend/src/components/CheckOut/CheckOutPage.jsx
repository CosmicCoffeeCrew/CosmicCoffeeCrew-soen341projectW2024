// // src/pages/CheckOutPage.jsx

// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';

// const CheckOutPage = () => {
//   const { reservationId } = useParams(); // Grab the reservation ID from the URL
//   const navigate = useNavigate();
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const checkOutReservation = async () => {
//       try {
//         // Assuming you have an API endpoint to handle checkout
//         const response = await fetch(`/api/reservations/checkout/${reservationId}`, {
//           method: 'POST', // Adjust if necessary (POST, PUT, etc.)
//           headers: { 'Content-Type': 'application/json' },
//           // Include additional headers as needed (e.g., authorization headers)
//         });

//         if (!response.ok) {
//           throw new Error('Failed to check out the reservation.');
//         }

//         // Handle successful checkout (e.g., navigate to a success page or back to reservations)
//         navigate('/reservations'); // Navigate back to reservations list as an example
//       } catch (error) {
//         setError(error.message);
//       }
//     };

//     checkOutReservation();
//   }, [reservationId, navigate]);

//   return (
//     <div className="container mx-auto p-4">
//         <h2 className="text-center text-2xl font-bold mb-4">Vehicle Return Instructions</h2>

//         {/* Vehicle Return Instructions */}
//        {/* Vehicle Return Instructions */}
//        <div className="mt-4">
//             <h3 className="text-lg mb-2 font-semibold">Returning Your Vehicle</h3>
//             <p>Please return the vehicle to the designated branch. Follow these steps to ensure a smooth return process:</p>
//             <ol className="list-decimal ml-5">
//                 <li>Return Location: <strong> 1455 Blvd. De Maisonneuve Ouest, Montreal, Quebec H3G 1M8</strong></li>
//                 <li>Operational Hours: <strong>Monday to Friday, 9:00 AM - 5:00 PM</strong></li>
//                 <li>Ensure the vehicle is refueled to the level it was at the start of the rental.</li>
//                 <li>Remove all personal belongings and trash from the vehicle.</li>
//                 <li>Bring all required documents, including the rental agreement and your driver’s license.</li>
//                 <li>If returning outside of operational hours, please use our key drop box located at the entrance.</li>
//             </ol>
//             <p>If you encounter any issues or have questions about your return, please contact us at <strong>+1 (438)876-9054</strong> or <strong>support@CosmicCoffeeCrew.com</strong>.</p>
//         </div>

//         {/* Rental End Date Reminder */}
//         <div className="mt-4">
//             <h3 className="text-lg mb-2 font-semibold">Rental End Date Reminder</h3>
//             <p>Your rental period ends on <strong>{rentalEndDate}</strong>. Please ensure you return the vehicle by this date to avoid late fees.</p>
//         </div>
//         {/* Rating Reminder Section */}
        
//         {/* Conditional rendering based on whether the rating has been submitted */}
//         {!isRatingSubmitted ? (
//             <div className="mt-4">
//                 <h3 className="text-lg mb-2 font-semibold">We&apos;d Love Your Feedback!</h3>
//                 <p>Please rate your rental experience:</p>
//                 <div className="flex">
//                     {[1, 2, 3, 4, 5].map((star) => (
//                         <button
//                             key={star}
//                             onClick={() => setRating(star)}
//                             className={`px-2 py-1 mx-1 ${rating >= star ? 'text-yellow-500' : 'text-gray-400'}`}
//                             aria-label={`Rate ${star} out of 5`}
//                         >★</button>
//                     ))}
//                 </div>
//                 <button onClick={submitRating} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" disabled={rating === 0}>
//                     Submit Rating
//                 </button>
//             </div>
//         ) : (
//             <p>Thank you for your feedback!</p>
//         )}

//         <form onSubmit={submitDamageReport}>
//             <div className="mt-4">
//                 <label htmlFor="damageCheck" className="inline-flex items-center">
//                     <input
//                         type="checkbox"
//                         id="damageCheck"
//                         checked={isDamaged}
//                         onChange={handleDamageCheckChange}
//                         className="form-checkbox"
//                     />
//                     <span className="ml-2">Report Damage</span>
//                 </label>
//             </div>

//             {isDamaged && (
//                 <>
//                     <div className="mt-4">
//                         <label htmlFor="damageDescription" className="block">Damage Description:</label>
//                         <textarea
//                             id="damageDescription"
//                             value={damageReport}
//                             onChange={handleDamageReportChange}
//                             placeholder="Describe any damage here..."
//                             className="border border-gray-300 rounded p-2 w-full"
//                         ></textarea>
//                     </div>
//                     <div className="mt-4">
//                         <label htmlFor="damagePhoto" className="block">Upload Damage Photo:</label>
//                         <input
//                             type="file"
//                             id="damagePhoto"
//                             onChange={handleFileChange}
//                             className="block w-full text-sm text-gray-500"
//                         />
//                     </div>
//                 </>
//             )}

//             <div className="mt-4">
//                 <button
//                     type="submit"
//                     className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                 >
//                     Submit
//                 </button>
//             </div>
//         </form>
//     </div>
// );
// };
// const Star = ({ selected, onSelect }) => (
// <span className={selected ? "star selected" : "star"} onClick={onSelect}>
//   &#9733;
// </span>
// );

// Star.propTypes = {
// selected: PropTypes.bool,
// onSelect: PropTypes.func.isRequired,
// };
// export default CheckOutPage;

