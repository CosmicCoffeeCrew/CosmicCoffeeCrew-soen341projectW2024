import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCatalogue.css';
import { location } from '../SearchBar/SearchBar';

const ProductCatalogue = () => {
    // State to hold all vehicles and filtered vehicles
    const [vehicles, setVehicles] = useState([]);
    const [filteredVehicles, setFilteredVehicles] = useState([]);

    // State to hold filter inputs
    const [filterInputs, setFilterInputs] = useState({ make: '', model: '', year: '' });

    // Navigation hook
    const navigate = useNavigate();
   
    // Fetching vehicles on component mount
    useEffect(() => {
        async function fetchAndFilterVehicles() {
            let response;
            try {
                // Check if location was determined in Home Page search bar
                if (location != null) {
                    response = await fetch(`/api/vehicles/?location=${location}`);
                } else {
                    response = await fetch('/api/vehicles');
                }
                if (response.ok) {
                    const json = await response.json();
                    // Set both all vehicles and filtered vehicles initially
                    setVehicles(json);
                    setFilteredVehicles(json);
                } else {
                    throw new Error('Failed to fetch vehicles');
                }
            } catch (error) {
                console.error('Error fetching vehicles:', error);
            }
        }
        fetchAndFilterVehicles();
    }, []);

    // Filtering vehicles whenever the filterInputs or vehicles state changes
    useEffect(() => {
        const filtered = vehicles.filter(vehicle => {
            // Filter based on make, model, and year
            const makeMatch = !filterInputs.make || vehicle.make.toLowerCase().includes(filterInputs.make.toLowerCase());
            const modelMatch = !filterInputs.model || vehicle.model.toLowerCase().includes(filterInputs.model.toLowerCase());
            const yearMatch = !filterInputs.year || vehicle.year.toString().includes(filterInputs.year);

            return makeMatch && modelMatch && yearMatch;
        });
        setFilteredVehicles(filtered);
    }, [filterInputs, vehicles]);

    // Function to navigate to vehicle details page
    const viewDetails = (vehicleId) => {
        navigate(`/vehicles/${vehicleId}`);
    };

    // Handler for filter input changes
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        // Update filter inputs based on the input change
        setFilterInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }));
    };

    // Handler to reset all filters
    const handleResetFilters = () => {
        // Reset all filter inputs
        setFilterInputs({ make: '', model: '', year: '' });
    };
    
    return (
        <div className="catalogue-container dark:bg-dark bg-white">
            <h1 className="catalogue-title">Catalogue</h1>
            {/* Filter bar with inputs */}
            <div className="filter-bar">
                <input
                    type="text"
                    name="make"
                    value={filterInputs.make}
                    onChange={handleFilterChange}
                    placeholder="Filter by make"
                    className="filter-input"
                />
                <input
                    type="text"
                    name="model"
                    value={filterInputs.model}
                    onChange={handleFilterChange}
                    placeholder="Filter by model"
                    className="filter-input"
                />
                <input
                    type="text"
                    name="year"
                    value={filterInputs.year}
                    onChange={handleFilterChange}
                    placeholder="Filter by year"
                    className="filter-input"
                />
                {/* Button to reset all filters */}
                <button className="reset-filters-button" onClick={handleResetFilters}>
                    Reset Filters
                </button>
            </div>

            {/* Grid to display vehicles */}
            <div className="catalogue-grid">
                {filteredVehicles.length > 0 ? (
                    // Display filtered vehicles
                    filteredVehicles.map((vehicle) => (
                        <div key={vehicle._id} className="vehicle-card dark:bg-dark bg-white" data-aos="fade-up">
                            <div>
                                {/* Image and vehicle info */}
                                <img src={vehicle.image} alt={`${vehicle.make} ${vehicle.model}`} className="vehicle-image" />
                                <div className="vehicle-info">
                                    <h2 className="vehicle-make">{vehicle.make}</h2>
                                    <h3 className="vehicle-model">{`${vehicle.model} (${vehicle.year})`}</h3>
                                    <p className="vehicle-detail vehicle-mileage">{`Mileage: ${vehicle.mileage} km`}</p>
                                    <p className="vehicle-detail vehicle-location">{`Location: ${vehicle.location}`}</p>
                                    <p className="vehicle-detail vehicle-price">{`Price: $${vehicle.pricePerDay} / day`}</p>
                                </div>
                            </div>
                            <div className="button-container">  {/* Container for button */}
                                {/* Button to view details */}
                                <button className="view-details-button" onClick={() => viewDetails(vehicle._id)}>
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    // If no vehicles match filters, display a message
                    <p className="no-vehicles">No vehicles match the selected filters.</p>
                )}
            </div>
        </div>
    );
};

export default ProductCatalogue;
