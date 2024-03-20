import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCatalogue.css';

const ProductCatalogue = () => {
    const [vehicles, setVehicles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const response = await fetch('/api/vehicles');
                if (response.ok) {
                    const json = await response.json();
                    setVehicles(json);
                } else {
                    throw new Error('Failed to fetch vehicles');
                }
            } catch (error) {
                console.error('Error fetching vehicles:', error);
            }
        };

        fetchVehicles();
    }, []);

    const viewDetails = (vehicleId) => {
        navigate(`/vehicle/${vehicleId}`);
    };

    return (
        <div className="catalogue-container">
            <h1 className="catalogue-title">Catalogue</h1>
            <div className="catalogue-grid">
                {vehicles.map((vehicle) => (
                    <div key={vehicle._id} className="vehicle-card" data-aos="fade-up" data-aos-delay={vehicle.aosDelay}>
                        <h2 className="vehicle-make">{vehicle.make}</h2>
                        <img src={vehicle.image} alt={`${vehicle.make} ${vehicle.model}`} className="vehicle-image" />
                        <div className="vehicle-info">
                            <h3 className="vehicle-model">{`${vehicle.model} (${vehicle.year})`}</h3>
                            <p className="vehicle-type">{vehicle.type}</p>
                            <p className="vehicle-mileage">{`${vehicle.mileage} km`}</p>
                            <p className="vehicle-location">{vehicle.location}</p>
                            <p className="vehicle-price">{`$${vehicle.price} / day`}</p>
                        </div>
                        <button className="view-details-button" onClick={() => viewDetails(vehicle._id)}>
                            View Details
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductCatalogue;

// import { useEffect, useState } from 'react';
// import './ProductCatalogue.css';

// const ProductCatalogue = () => {
//     const [vehicles, setVehicles] = useState(null);

//     useEffect(() => {
//         const fetchVehicles = async () => {
//             try {
//                 const response = await fetch('/api/vehicles');
//                 console.log(response);
//                 const json = await response.json();
//                 console.log(json);
//                 if (response.ok) {
//                     setVehicles(json);
//                 } else {
//                     throw new Error('Failed to fetch vehicles');
//                 }
//             } catch (error) {
//                 console.error('Error fetching vehicles:', error);
//             }
//         };

//         fetchVehicles();
//     }, []); // Empty dependency array means this effect runs only once after the component mounts

//     return (
//         <div className="dark:bg-dark bg-secondary-100 sm:min-h-[600px] sm:grid sm:place-items-center duration-300 mt-14 rounded-t-3xl">
//             <h1
//                 data-aos="fade-up"
//                 className="text-3xl font-semibold text-center sm:text-4xl font-serif py-32"
//             >
//                 Catalogue
//             </h1>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-screen-xl mx-auto">
//                 {vehicles && vehicles.map((vehicle) => 
//                 <div key={vehicle._id}                        
//                      className="card text-center group space-y-3 sm:space-y-6 p-4 sm:py-16 bg-dark hover:bg-primary duration-300 text-white hover:text-black rounded-lg"
//                      data-aos="fade-up"
//                      data-aos-delay={vehicle.aosDelay}>
//                         <h1 className="text-2xl font-bold">{vehicle.make}</h1>
//                     <div
//                          key={vehicle.id}
//                          className="card text-center group space-y-3 sm:space-y-6 p-4 sm:py-16 bg-dark hover:bg-primary duration-300 text-white hover:text-black rounded-lg"
//                          data-aos="fade-up"
//                          data-aos-delay={vehicle.aosDelay}
//                      >
//                          <div className="grid place-items-center">
//                              <img src={vehicle.image} alt="Product Image" className="w-24 h-24" />
//                          </div>
//                          <h1 className="text-2xl font-bold">{vehicle.model}</h1>
//                          <button className="button is-primary bg-transparent">
//                              <strong>View Details</strong>
//                          </button>
//                      </div>
//                 </div>)}
//             </div>
//         </div>
//     );
// };

// export default ProductCatalogue;
