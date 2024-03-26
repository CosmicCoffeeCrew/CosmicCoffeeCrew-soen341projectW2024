// //import React from 'react';
// import { useParams } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import products from '../Catalogue/ProductDetails';

// const VehicleDetailPage = () => {
//     const navigate = useNavigate();
//     const { vehicleId } = useParams();
//   const vehicle = products.find((product) => product.id === vehicleId);
//   const handleRentClick = () => {
//     navigate('/rental-form', { state: { vehicle } });
//   };
  

//   if (!vehicle) {
//     return <div>Vehicle not found</div>;
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <div className="max-w-2xl mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
//         <h2 className="text-2xl font-bold mb-4">{vehicle.make} {vehicle.model}</h2>
//         <img
//           src={vehicle.image}
//           alt={`${vehicle.make} ${vehicle.model}`}
//           className="w-full h-64 object-cover mb-4"
//         />
//         <p className="text-gray-700 mb-4">{vehicle.short_description}</p>
//         <ul>
//           {vehicle.bullet_description.map((bullet, index) => (
//             <li key={index} className="text-gray-600">{bullet}</li>
//           ))}
//         </ul>
//         {/* Add more details as needed */
//         <button
//         onClick={handleRentClick}
//         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//       >
//         Rent
//       </button>
//         }
//       </div>
//     </div>
//   );
// };

// export default VehicleDetailPage;