import { useState, useEffect } from 'react';
import "./AdminDashboard.css";
import PropTypes from 'prop-types';

const AdminDashboard = () => {
    const [showVForm, setShowVForm] = useState(false);
    const [showUForm, setShowUForm] = useState(false);
    const [showCForm, setShowCForm] = useState(false);
    const [showVTable, setShowVTable] = useState(false);
    const [showUTable, setShowUTable] = useState(false);
    const [showCTable, setShowCTable] = useState(false);
    const [vehicles, setVehicles] = useState([]);
    const [users, setUsers] = useState([]);
    const [chauffeurs, setChauffeurs] = useState([]);
    const [vehicleError, setVehicleError] = useState(null);
    const [userError, setUserError] = useState(null);
    const [chauffeurError, setChauffeurError] = useState(null);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [formData, setFormData] = useState({
        make: '',
        licensePlateNumber: '',
        model: '',
        year: '',
        type: '',
        color: '',
        mileage: '',
        transmission: '',
        location: '',
        fuelType: '',
        seats: '',
        pricePerDay: '',
        image: ''
    });
    const [userFormData, setUserFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        contactNumber: '',
        password: '',
        username: '',
        permission: 'CSR',
        License: '',
        birthdate: '',
        rentalHistory: ''
    });
    const [chauffeurFormData, setChauffeurFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        age: '',
        contactNumber: '',
        description: '',
        pricePerHour: '',
        carMake: '',
        carModel: '',
        carYear: '',
        image: '',
        sex: 'M',
        location: 'Montreal'
    });
    
    const [showVEdit, setShowVEdit] = useState(null);
    const [showUEdit, setShowUEdit] = useState(null);
    const [showCEdit, setShowCEdit] = useState(null);
    const [editedVehicle, setEditedVehicle] = useState(null); // New state to store edited vehicle
    const [editedUser, setEditedUser] = useState(null); // New state to store edited user
    const [editedChauffeur, setEditedChauffeur] = useState(null); // New state to store edited user


    useEffect(() => {
        fetchVehicles();
        fetchUsers();
        fetchChauffeurs();
    }, []);

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
            setVehicleError('Failed to fetch vehicles. Please try again later.');
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await fetch('/api/users');
            if (response.ok) {
                const json = await response.json();
                setUsers(json);
            } else {
                throw new Error('Failed to fetch users');
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            setUserError('Failed to fetch users. Please try again later.');
        }
    };

    const fetchChauffeurs = async () => {
        try {
            const response = await fetch('/api/chauffeurs');
            if (response.ok) {
                const json = await response.json();
                setChauffeurs(json);
            } else {
                throw new Error('Failed to fetch chauffeurs');
            }
        } catch (error) {
            console.error('Error fetching chauffeurs:', error);
            setUserError('Failed to fetch chauffeurs. Please try again later.');
        }
    };

    const handleListClick = (type) => {
        setShowVForm(type === 'vForm');
        setShowUForm(type === 'uForm');
        setShowCForm(type === 'cForm');
        setShowVTable(type === 'vTable');
        setShowUTable(type === 'uTable');
        setShowCTable(type === 'cTable');
        
        //if any button gets clicked, edit form disapears
        setShowVEdit(false);
        setShowUEdit(false);
        setShowCEdit(false);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleUserChange = (e) => {
        setUserFormData({
            ...userFormData,
            [e.target.name]: e.target.value
        });
    };

    const handleChauffeurChange = (e) => {
        setChauffeurFormData({
            ...chauffeurFormData,
            [e.target.name]: e.target.value
        });
    };

    const handleEditVehicle = (vehicle) => {
        console.log('Editing vehicle:', vehicle);
        setShowVEdit(true);
        setEditedVehicle(vehicle);
        // Autofill the fields with the data of the selected vehicle
        setFormData({
            make: vehicle.make || '',
            licensePlateNumber: vehicle.licensePlateNumber || '',
            model: vehicle.model || '',
            year: vehicle.year || '',
            type: vehicle.type || '',
            color: vehicle.color || '',
            mileage: vehicle.mileage || '',
            transmission: vehicle.transmission || '',
            location: vehicle.location || '',
            fuelType: vehicle.fuelType || '',
            seats: vehicle.seats || '',
            pricePerDay: vehicle.pricePerDay || '',
            image: vehicle.image || '',
            description: vehicle.description || ''
        });
    };
    
    const handleEditUser = (user) => {
        console.log('Editing user:', user);
        setShowUEdit(true);
        setEditedUser(user); 
        // Autofill the fields with the data of the selected user
        setUserFormData({
            email: user.email || '',
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            address: user.address || '',
            contactNumber: user.contactNumber || '',
            password: user.password || '',
            username: user.username || '',
            permission: user.permission || 'CSR',
            License: user.License || '',
            birthdate: user.birthdate || '',
            rentalHistory: user.rentalHistory || ''
        });
    };

    const handleEditChauffeur = (chauffeur) => {
        console.log('Editing chauffeur:', chauffeur);
        setShowCEdit(true);
        setEditedChauffeur(chauffeur); 
        // Autofill the fields with the data of the selected chauffeur
        setChauffeurFormData({
            email: chauffeur.email || '',
            firstName: chauffeur.firstName || '',
            lastName: chauffeur.lastName || '',
            age: chauffeur.age || 0,
            sex: chauffeur.sex || '',
            contactNumber: chauffeur.contactNumber || '',
            location: chauffeur.location || '',
            description: chauffeur.description || '',
            pricePerHour: chauffeur.pricePerHour || 0,
            carMake: chauffeur.carMake || '',
            carModel: chauffeur.carModel || '',
            carYear: chauffeur.carYear || 0,
            image: chauffeur.image || ''
        });
        
    };

    const handleSubmitVehicle = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/vehicles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            console.log(response); //for debugging
            const responseBody = await response.json();
            console.log('Response body:', responseBody);
            if (response.ok) {
                // Handle success, maybe show a success message
                console.log('Vehicle created successfully');              
                setVehicleError(null);// Reset error state               
                setShowSuccessPopup(true);// Show success popup
                fetchVehicles();// Fetch vehicles data after submission
            } else {
                // Handle error, maybe show an error message
                console.error('Failed to create vehicle');
                setVehicleError('Failed to create vehicle. Please try again later.');
            }
        } catch (error) {
            console.error('Error creating vehicle:', error);
            setVehicleError('Failed to create vehicle. Please try again later.');
        }
    };

    const handleSubmitUser = async (e) => {
        e.preventDefault();
        try {
            // Set rentalHistory to null in userFormData
            const updatedUserFormData = {
                ...userFormData,
                rentalHistory: []
            };
    
            const response = await fetch('/api/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedUserFormData)
            });
    
            if (response.ok) {
                // Check content type before parsing
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    // Parse JSON response
                    const responseBody = await response.json(); 
                    console.log('Response body:', responseBody);
                    console.log('User created successfully'); // Handle success, maybe show a success message
                    setUserError(null); // Reset error state
                    setShowSuccessPopup(true); // Show success popup
                    fetchUsers(); // Fetch users data after submission
                } else {
                    console.error('Invalid content type in response:', contentType);
                    setUserError('Failed to create user. Invalid response from server.');
                }
            } else {
                // Handle error, maybe show an error message
                console.error('Failed to create user:', response.statusText);
                setUserError('Failed to create user. Please try again later.');
            }
        } catch (error) {
            console.error('Error creating user:', error);
            setUserError('Failed to create user. Please try again later.');
        }
    };


    const handleSubmitChauffeur = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/chauffeurs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(chauffeurFormData)
            });
            console.log(response); //for debugging
            const responseBody = await response.json();
            console.log('Response body:', responseBody);
            if (response.ok) {
                // Handle success, maybe show a success message
                console.log('Chauffeur created successfully');              
                setChauffeurError(null);// Reset error state               
                setShowSuccessPopup(true);// Show success popup
                fetchChauffeurs();// Fetch vehicles data after submission
            } else {
                // Handle error, maybe show an error message
                console.error(chauffeurFormData);
                console.error('Failed to create chauffeur');
                setChauffeurError('Failed to create chauffeur. Please try again later.');
            }
        } catch (error) {
            console.error('Error creating chauffeur:', error);
            setChauffeurError('Failed to create chauffeur. Please try again later.');
        }
    };

    const handleEditVehicleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/vehicles/${editedVehicle._id}`, {
                method: 'PATCH', // Use PATCH method for updating
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            console.log(response); //for debugging
            const responseBody = await response.json();
            console.log('Response body:', responseBody);
            if (response.ok) {
                // Handle success, maybe show a success message
                console.log('Vehicle updated successfully');
                setVehicleError(null); // Reset error state
                setShowSuccessPopup(true); // Show success popup
                fetchVehicles(); // Fetch vehicles data after submission
            } else {
                // Handle error, maybe show an error message
                console.error('Failed to update vehicle');
                setVehicleError('Failed to update vehicle. Please try again later.');
            }
        } catch (error) {
            console.error('Error updating vehicle:', error);
            setVehicleError('Failed to update vehicle. Please try again later.');
        }
    };

    const handleEditUserSubmit = async (e) => {
        e.preventDefault();
        try {
            // Set rentalHistory to null in userFormData
            const updatedUserFormData = {
                ...userFormData,
                rentalHistory: []
            };
    
            const response = await fetch(`/api/users/${editedUser._id}`, {
                method: 'PATCH', // Use PATCH method for updating
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedUserFormData)
            });
    
            if (response.ok) {
                // Check content type before parsing
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    // Parse JSON response
                    const responseBody = await response.json();
                    console.log('Response body:', responseBody);
                    console.log('User updated successfully'); // Handle success, maybe show a success message
                    setUserError(null); // Reset error state
                    setShowSuccessPopup(true); // Show success popup
                    fetchUsers(); // Fetch users data after submission
                } else {
                    console.error('Invalid content type in response:', contentType);
                    setUserError('Failed to update user. Invalid response from server.');
                }
            } else {
                // Handle error, maybe show an error message
                console.error('Failed to update user:', response.statusText);
                setUserError('Failed to update user. Please try again later.');
            }
        } catch (error) {
            console.error('Error updating user:', error);
            setUserError('Failed to update user. Please try again later.');
        }
    };

    const handleEditChauffeurSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/chauffeurs/${editedChauffeur._id}`, {
                method: 'PATCH', // Use PATCH method for updating
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(chauffeurFormData)
            });
            console.log(response); //for debugging
            const responseBody = await response.json();
            console.log('Response body:', responseBody);
            if (response.ok) {
                // Handle success, maybe show a success message
                console.log('Chauffeur updated successfully');
                setChauffeurError(null); // Reset error state
                setShowSuccessPopup(true); // Show success popup
                fetchChauffeurs(); // Fetch chauffeurs data after submission
            } else {
                // Handle error, maybe show an error message
                console.error('Failed to update chauffeur');
                setChauffeurError('Failed to update chauffeur. Please try again later.');
            }
        } catch (error) {
            console.error('Error updating chauffeur:', error);
            setChauffeurError('Failed to update chauffeur. Please try again later.');
        }
    };

    const SuccessPopup = ({ message }) => {
        return (
            <div className="success-popup">
                <p>{message}</p>
            </div>
        );
    };
    
    SuccessPopup.propTypes = {
        message: PropTypes.string.isRequired // Validate that message is a string and is required
    };

    // Function to handle deleting a vehicle by ID
    const handleDeleteVehicle = async (id) => {
        try {
            //remove dit form if present
            setShowVEdit(false);
            setShowUEdit(false);
            setShowCEdit(false);

            const response = await fetch(`/api/vehicles/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                // Remove the deleted vehicle from the local state
                setVehicles(vehicles.filter(vehicle => vehicle._id !== id));
                console.log('Vehicle deleted successfully');
            } else {
             console.error('Failed to delete vehicle');
             setVehicleError('Failed to delete vehicle. Please try again later.');
          }
     } catch (error) {
            console.error('Error deleting vehicle:', error);
            setVehicleError('Failed to delete vehicle. Please try again later.');
     }
    };

    // Function to handle deleting a user by ID
    const handleDeleteUser = async (id) => {
        try {
            //remove dit form if present
            setShowVEdit(false);
            setShowUEdit(false);
            setShowCEdit(false);

            const response = await fetch(`/api/users/${id}`, {
            method: 'DELETE'
            });
            if (response.ok) {
                // Remove the deleted user from the local state
                setUsers(users.filter(user => user._id !== id));
                console.log('User deleted successfully');
            } else {
                console.error('Failed to delete user');
                setUserError('Failed to delete user. Please try again later.');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            setUserError('Failed to delete user. Please try again later.');
        }
    };

    // Function to handle deleting a chauffeur by ID
    const handleDeleteChauffeur = async (id) => {
        try {
            //remove dit form if present
            setShowVEdit(false);
            setShowUEdit(false);
            setShowCEdit(false);

            const response = await fetch(`/api/chauffeurs/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                // Remove the deleted chauffeur from the local state
                setChauffeurs(chauffeurs.filter(chauffeur => chauffeur._id !== id));
                console.log('Chauffeur deleted successfully');
            } else {
             console.error('Failed to delete chauffeur');
             setChauffeurError('Failed to delete chauffeur. Please try again later.');
          }
     } catch (error) {
            console.error('Error deleting chauffeur:', error);
            setChauffeurError('Failed to delete chauffeur. Please try again later.');
     }
    };
    

    return (
        <div className="dark:bg-black dark:text-white duration-300">
            <div className="container mx-auto py-8">
                <div className="flex justify-between mb-8">
                    <div>
                        <button className="button is-primary mr-4" onClick={() => handleListClick('vForm')}>Create Vehicle</button>
                        <button className="button is-primary mr-4" onClick={() => handleListClick('uForm')}>Create User</button>
                        <button className="button is-primary mr-4" onClick={() => handleListClick('cForm')}>Create Chauffeur</button>
                    </div>
                    <div>
                        <button className="button is-primary mr-4" onClick={() => handleListClick('vTable')}>List Vehicles</button>
                        <button className="button is-primary" onClick={() => handleListClick('uTable')}>List Users</button>
                        <button className="button is-primary mr-4" onClick={() => handleListClick('cTable')}>List Chauffeurs</button>
                    </div>
                </div>

                {vehicleError && <div>Error: {vehicleError}</div>} {/* Render error message if vehicleError is not null */}
                {userError && <div>Error: {userError}</div>} {/* Render error message if userError is not null */}
                {chauffeurError && <div>Error: {chauffeurError}</div>} {/* Render error message if chauffeurError is not null */}

                {showVForm && (
                    <div>
                        <form onSubmit={handleSubmitVehicle}>
                        <div>
                <label htmlFor="make">Make <hr></hr> </label>
                <input type="text" id="make" name="make" value={formData.make} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="licensePlateNumber">licensePlateNumber <hr></hr> </label>
                <input type="text" id="licensePlateNumber" name="licensePlateNumber" value={formData.licensePlateNumber} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="model">Model <hr></hr> </label>
                <input type="text" id="model" name="model" value={formData.model} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="year">Year <hr></hr> </label>
                <input type="number" id="year" name="year" value={formData.year} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="type">Type <hr></hr> </label>
                <select id="type" name="type" value={formData.type} onChange={handleChange} required>
                    <option value="">Select Type</option>
                    {['sedan', 'SUV', 'truck', 'van', 'convertible', 'other', 'sport'].map((type) => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="color">Color <hr></hr> </label>
                <input type="text" id="color" name="color" value={formData.color} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="mileage">Mileage <hr></hr> </label>
                <input type="number" id="mileage" name="mileage" min="3" value={formData.mileage} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="transmission">Transmission <hr></hr> </label>
                <select id="transmission" name="transmission" value={formData.transmission} onChange={handleChange} required>
                    <option value="">Select Transmission</option>
                    {['automatic', 'manual'].map((transmission) => (
                        <option key={transmission} value={transmission}>{transmission}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="location">Location <hr></hr> </label>
                <select id="location" name="location" value={formData.location} onChange={handleChange} required>
                    <option value="">Select Location</option>
                    {['Montreal', 'Ottawa', 'Toronto', 'Vancouver', 'Halifax', 'Edmonton'].map((location) => (
                        <option key={location} value={location}>{location}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="fuelType">Fuel Type <hr></hr> </label>
                <select id="fuelType" name="fuelType" value={formData.fuelType} onChange={handleChange} required>
                    <option value="">Select Fuel Type</option>
                    {['gasoline', 'diesel', 'electric', 'hybrid'].map((fuelType) => (
                        <option key={fuelType} value={fuelType}>{fuelType}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="seats">Seats <hr></hr> </label>
                <input type="range" id="seats" name="seats" className="slider" min="1" max="8" value={formData.seats} onChange={handleChange} required />
                <span>{formData.seats}</span>
            </div>
            <div>
                <label htmlFor="pricePerDay">Price Per Day <hr></hr> </label>
                <input type="number" id="pricePerDay" name="pricePerDay" value={formData.pricePerDay} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="image">Image Link<hr></hr> </label>
                <input type="text" id="image" name="image" value={formData.image} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="description">Description <hr></hr> </label>
                <textarea id="description" name="description" value={formData.description} onChange={handleChange} />
            </div>
            <br></br>
            <button className="formButton" type="submit">Submit</button>
            {showSuccessPopup && <SuccessPopup message="Vehicle created successfully!" />}

        </form>
                    </div>
                )}

                {showUForm &&  (
                    <div>
                        <form onSubmit={handleSubmitUser}>
                            <div>
                                <label htmlFor="email">Email <hr></hr> </label>
                                <input type="email" id="email" name="email" value={userFormData.email} onChange={handleUserChange} />
                            </div>
                            <div>
                                <label htmlFor="firstName">firstName <hr></hr> </label>
                                <input type="firstName" id="firstName" name="firstName" value={userFormData.firstName} onChange={handleUserChange} />
                            </div>
                            <div>
                                <label htmlFor="lastName">lastName <hr></hr> </label>
                                <input type="lastName" id="lastName" name="lastName" value={userFormData.lastName} onChange={handleUserChange} />
                            </div>
                            <div>
                                <label htmlFor="address">address <hr></hr> </label>
                                <input type="address" id="address" name="address" value={userFormData.address} onChange={handleUserChange} />
                            </div>
                            <div>
                                <label htmlFor="contactNumber">contactNumber <hr></hr> </label>
                                <input type="contactNumber" id="contactNumber" name="contactNumber" value={userFormData.contactNumber} onChange={handleUserChange} />
                            </div>

                            <div>
                                <label htmlFor="password">Password <hr></hr> </label>
                                <input type="password" id="password" name="password" value={userFormData.password} onChange={handleUserChange} />
                            </div>
                            <div>
                                <label htmlFor="username">Username <hr></hr> </label>
                                <input type="text" id="username" name="username" value={userFormData.username} onChange={handleUserChange} />
                            </div>
                            <div>
                                <label htmlFor="permission">Permission <hr /></label>
                                <select id="permission" name="permission" value={userFormData.permission} onChange={handleUserChange}>
                                    <option value="Customer">Customer</option>
                                    <option value="CSR">CSR</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="License">License <hr></hr> </label>
                                <input type="text" id="License" name="License" value={userFormData.License} onChange={handleUserChange} />
                            </div>
                            <div>
                                <label htmlFor="birthdate">Birthdate <hr></hr> </label>
                                <input type="date" id="birthdate" name="birthdate" value={userFormData.birthdate} onChange={handleUserChange} />
                            </div>
                            <br></br>
                            <button className="formButton" type="submit">Submit</button>
                            {showSuccessPopup && <SuccessPopup message="User was created successfully!" />}
                        </form>
                    </div>
                )}

                {showCForm &&  (
                    <div>
                        <form onSubmit={handleSubmitChauffeur}>
                            <div>
                                <label htmlFor="email">Email <hr></hr> </label>
                                <input type="email" id="email" name="email" value={chauffeurFormData.email} onChange={handleChauffeurChange} />
                            </div>
                            <div>
                                <label htmlFor="firstName">firstName <hr></hr> </label>
                                <input type="firstName" id="firstName" name="firstName" value={chauffeurFormData.firstName} onChange={handleChauffeurChange} />
                            </div>
                            <div>
                                <label htmlFor="lastName">lastName <hr></hr> </label>
                                <input type="lastName" id="lastName" name="lastName" value={chauffeurFormData.lastName} onChange={handleChauffeurChange} />
                            </div>
                            <div>
                                <label htmlFor="age">age <hr></hr> </label>
                                <input type="age" id="age" name="age" value={chauffeurFormData.age} onChange={handleChauffeurChange} />
                            </div>
                            <div>
                                <label htmlFor="contactNumber">contactNumber <hr></hr> </label>
                                <input type="contactNumber" id="contactNumber" name="contactNumber" value={chauffeurFormData.contactNumber} onChange={handleChauffeurChange} />
                            </div>
                            <div>
                                <label htmlFor="description">description <hr></hr> </label>
                                <input type="description" id="description" name="description" value={chauffeurFormData.description} onChange={handleChauffeurChange} />
                            </div>
                            <div>
                                <label htmlFor="pricePerHour">pricePerHour <hr></hr> </label>
                                <input type="pricePerHour" id="pricePerHour" name="pricePerHour" value={chauffeurFormData.pricePerHour} onChange={handleChauffeurChange} />
                            </div>
                            <div>
                                <label htmlFor="carMake">carMake <hr></hr> </label>
                                <input type="carMake" id="carMake" name="carMake" value={chauffeurFormData.carMake} onChange={handleChauffeurChange} />
                            </div>
                            <div>
                                <label htmlFor="carModel">carModel <hr></hr> </label>
                                <input type="carModel" id="carModel" name="carModel" value={chauffeurFormData.carModel} onChange={handleChauffeurChange} />
                            </div>
                            <div>
                                <label htmlFor="carYear">carYear <hr></hr> </label>
                                <input type="carYear" id="carYear" name="carYear" value={chauffeurFormData.carYear} onChange={handleChauffeurChange} />
                            </div>
                            
                            <div>
                                <label htmlFor="image">image <hr></hr> </label>
                                <input type="text" id="image" name="image" value={chauffeurFormData.image} onChange={handleChauffeurChange} />
                            </div>
                            <div>
                <label htmlFor="sex">Sex <hr></hr> </label>
                <select id="sex" name="sex" value={chauffeurFormData.sex} onChange={handleChauffeurChange} required>
                    <option value="">Select Sex</option>
                    {['M', 'F'].map((sex) => (
                        <option key={sex} value={sex}>{sex}</option>
                    ))}
                </select>
            </div>
                            <div>
                <label htmlFor="location">Location <hr></hr> </label>
                <select id="location" name="location" value={chauffeurFormData.location} onChange={handleChauffeurChange} required>
                    <option value="">Select Location</option>
                    {['Montreal', 'Ottawa', 'Toronto', 'Vancouver', 'Halifax', 'Edmonton'].map((location) => (
                        <option key={location} value={location}>{location}</option>
                    ))}
                </select>
            </div>
                            <br></br>

                            <button className="formButton" type="submit">Submit</button>

                            {showSuccessPopup && <SuccessPopup message="Chauffeur was created successfully!" />}
                        </form>
                    </div>
                )}

                

                {/* Display editing forms when corresponding "Edit" buttons are clicked */}
                {showVEdit && (
                    <div>
                        <form onSubmit={handleEditVehicleSubmit}>
                    <div>
                        <label htmlFor="color">Color <hr></hr> </label>
                        <input type="text" id="color" name="color" value={formData.color} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="licensePlateNumber">licensePlateNumber <hr></hr> </label>
                        <input type="text" id="licensePlateNumber" name="licensePlateNumber" value={formData.licensePlateNumber} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="mileage">Mileage <hr></hr> </label>
                        <input type="number" id="mileage" name="mileage" value={formData.mileage} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="location">Location <hr></hr> </label>
                        <select id="location" name="location" value={formData.location} onChange={handleChange} required>
                            <option value="">Select Location</option>
                            {['Montreal', 'Ottawa', 'Toronto', 'Vancouver', 'Halifax', 'Edmonton'].map((location) => (
                            <option key={location} value={location}>{location}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="pricePerDay">Price Per Day <hr></hr> </label>
                        <input type="number" id="pricePerDay" name="pricePerDay" value={formData.pricePerDay} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="image">Image Link<hr></hr> </label>
                        <input type="text" id="image" name="image" value={formData.image} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="description">Description <hr></hr> </label>
                        <textarea id="description" name="description" value={formData.description} onChange={handleChange} />
                    </div >
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <button type="submit"className="formButton">Update Vehicle</button>
                    </div>
                        </form>
                        <br></br>
                    </div>
                )}

                {showUEdit && (
                    <div>
                        <form onSubmit={handleEditUserSubmit}>
                            <div>
                                <label htmlFor="email">Email <hr></hr> </label>
                                <input type="email" id="email" name="email" value={userFormData.email} onChange={handleUserChange} />
                            </div>
                            <div>
                                <label htmlFor="firstName">firstName <hr></hr> </label>
                                <input type="firstName" id="firstName" name="firstName" value={userFormData.firstName} onChange={handleUserChange} />
                            </div>
                            <div>
                                <label htmlFor="lastName">lastName <hr></hr> </label>
                                <input type="lastName" id="lastName" name="lastName" value={userFormData.lastName} onChange={handleUserChange} />
                            </div>
                            <div>
                                <label htmlFor="address">address <hr></hr> </label>
                                <input type="address" id="address" name="address" value={userFormData.address} onChange={handleUserChange} />
                            </div>
                            <div>
                                <label htmlFor="contactNumber">contactNumber <hr></hr> </label>
                                <input type="contactNumber" id="contactNumber" name="contactNumber" value={userFormData.contactNumber} onChange={handleUserChange} />
                            </div>
                            <div>
                                <label htmlFor="password">Password <hr></hr> </label>
                                <input type="password" id="password" name="password" value={userFormData.password} onChange={handleUserChange} />
                            </div>
                            <div>
                                <label htmlFor="username">Username <hr></hr> </label>
                                <input type="text" id="username" name="username" value={userFormData.username} onChange={handleUserChange} />
                            </div>
                            <div>
                                <label htmlFor="permission">Permission <hr /></label>
                                <select id="permission" name="permission" value={userFormData.permission} onChange={handleUserChange}>
                                    <option value="Customer">Customer</option>
                                    <option value="CSR">CSR</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="License">License <hr></hr> </label>
                                <input type="text" id="License" name="License" value={userFormData.License} onChange={handleUserChange} />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <button type="submit"className="formButton">Update User</button>
                            </div>
                        </form>
                        <br></br>
                    </div>
                )}

                {showVTable && (
                    <div>
                        <table>
                            {/* Vehicle table contents */}
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>ID</th>
                                    <th>license Plate number</th>
                                    <th>Make</th>
                                    <th>Model</th>
                                    <th>Year</th>
                                    <th>Type</th>
                                    <th>Color</th>
                                    <th>Mileage</th>
                                    <th>Transmission</th>
                                    <th>Location</th>
                                    <th>Fuel Type</th>
                                    <th>Seats</th>
                                    <th>Price Per Day</th>
                                    <th>Description</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            
                            {vehicles.map(vehicle => (
                                    <tr key={vehicle._id}>
                                        <td>
                                            <img src={vehicle.image} alt="e" style={{ width: "200px", height: "auto" }} />
                                        </td>
                                        <td>{vehicle._id}</td>
                                        <td>{vehicle.licensePlateNumber}</td>
                                        <td>{vehicle.make}</td>
                                        <td>{vehicle.model}</td>
                                        <td>{vehicle.year}</td>
                                        <td>{vehicle.type}</td>
                                        <td>{vehicle.color}</td>
                                        <td>{vehicle.mileage}</td>
                                        <td>{vehicle.transmission}</td>
                                        <td>{vehicle.location}</td>
                                        <td>{vehicle.fuelType}</td>
                                        <td>{vehicle.seats}</td>
                                        <td>{vehicle.pricePerDay}</td>
                                        <td>{vehicle.description.split(' ').slice(0, 7).join(' ')}...</td> {/* Show only the first 7 words of the description */}
                                        <td>
                                            <button className="formButton" onClick={() => handleEditVehicle(vehicle)}>Edit</button>
                                            <br/><br/>
                                            <button className="formButton" onClick={() => handleDeleteVehicle(vehicle._id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}


{showCTable && (
    <div>
        <table>
            {/* Chauffeur table contents */}
            <thead>
                <tr>
                    <th>Image</th>
                    <th>ID</th>
                    <th>Email</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Age</th>
                    <th>Sex</th>
                    <th>Contact Number</th>
                    <th>Location</th>
                    <th>Description</th>
                    <th>Price Per Hour</th>
                    <th>Car Make</th>
                    <th>Car Model</th>
                    <th>Car Year</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {console.log(chauffeurs)}
            {chauffeurs.map(chauffeur => (
                    <tr key={chauffeur._id}>
                        <td>
                            <img src={chauffeur.image} alt="Chauffeur" style={{ width: "200px", height: "auto" }} />
                        </td>
                        <td>{chauffeur._id}</td>
                        <td>{chauffeur.email}</td>
                        <td>{chauffeur.firstName}</td>
                        <td>{chauffeur.lastName}</td>
                        <td>{chauffeur.age}</td>
                        <td>{chauffeur.sex}</td>
                        <td>{chauffeur.contactNumber}</td>
                        <td>{chauffeur.location}</td>
                        <td>{chauffeur.description}</td>
                        <td>{chauffeur.pricePerHour}</td>
                        <td>{chauffeur.carMake}</td>
                        <td>{chauffeur.carModel}</td>
                        <td>{chauffeur.carYear}</td>
                        <td>
                            <button className="formButton" onClick={() => handleEditChauffeur(chauffeur)}>Edit</button>
                            <br/><br/>
                            <button className="formButton" onClick={() => handleDeleteChauffeur(chauffeur._id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
)}



                {showUTable && (
                    <div>
                        <table>
                            {/* User table contents */}
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Email</th>
                                    <th>firstName</th>
                                    <th>lastName</th>
                                    <th>address</th>
                                    <th>contactNumber</th>
                                    
                                    <th>Password</th>
                                    <th>Username</th>
                                    <th>Permission</th>
                                    <th>License</th>
                                    <th>Birthdate</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.email}</td>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.address}</td>
                                        <td>{user.contactNumber}</td>
                                        <td>{user.password}</td>
                                        <td>{user.username}</td>
                                        <td>{user.permission}</td>
                                        <td>{user.License}</td>
                                        <td>{user.birthdate}</td>
                                        <td>
                                            <button className="formButton" onClick={() => handleEditUser(user)}>Edit</button>
                                            <br/><br/>
                                            <button className="formButton" onClick={() => handleDeleteUser(user._id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminDashboard;
