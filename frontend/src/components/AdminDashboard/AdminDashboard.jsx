import { useState, useEffect } from 'react';
import "./AdminDashboard.css";

const AdminDashboard = () => {
    const [showVForm, setShowVForm] = useState(false);
    const [showUForm, setShowUForm] = useState(false);
    const [showVTable, setShowVTable] = useState(false);
    const [showUTable, setShowUTable] = useState(false);
    const [vehicles, setVehicles] = useState([]);
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        make: '',
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
        password: '',
        username: '',
        permission: 'Customer',
        license: '',
        birthdate: ''
    });
    const [vehicleError, setVehicleError] = useState(null);
    const [userError, setUserError] = useState(null);

    useEffect(() => {
        fetchVehicles();
        fetchUsers();
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

    const handleListClick = (type) => {
        setShowVForm(type === 'vForm');
        setShowUForm(type === 'uForm');
        setShowVTable(type === 'vTable');
        setShowUTable(type === 'uTable');
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
            if (response.ok) {
                // Handle success, maybe show a success message
                console.log('Vehicle created successfully');
                // Fetch vehicles data after submission
                fetchVehicles();
            } else {
                // Handle error, maybe show an error message
                console.error('Failed to create vehicle');
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

            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedUserFormData)
            });

           // Log the response body
            const responseBody = await response.json();
            console.log('Response body:', responseBody);

            if (response.ok) {
                // Handle success, maybe show a success message
                console.log('User created successfully');
                // Fetch users data after submission
                fetchUsers();
            } else {
                // Handle error, maybe show an error message
                console.error('Failed to create user');
            }
        } catch (error) {
            console.error('Error creating user:', error);
            setUserError('Failed to create user. Please try again later.');
        }
    };

    return (
        <div className="dark:bg-black dark:text-white duration-300">
            <div className="container mx-auto py-8">
                <div className="flex justify-between mb-8">
                    <div>
                        <button className="button is-primary mr-4" onClick={() => handleListClick('vForm')}>Create Vehicle</button>
                        <button className="button is-primary mr-4" onClick={() => handleListClick('uForm')}>Create User</button>
                    </div>
                    <div>
                        <button className="button is-primary mr-4" onClick={() => handleListClick('vTable')}>List Vehicles</button>
                        <button className="button is-primary" onClick={() => handleListClick('uTable')}>List Users</button>
                    </div>
                </div>

                {showVForm && (
                    <div>
                        <form onSubmit={handleSubmitVehicle}>
                        <div>
                <label htmlFor="make">Make <hr></hr> </label>
                <input type="text" id="make" name="make" value={formData.make} onChange={handleChange} required />
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
                <input type="text" id="type" name="type" value={formData.type} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="color">Color <hr></hr> </label>
                <input type="text" id="color" name="color" value={formData.color} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="mileage">Mileage <hr></hr> </label>
                <input type="number" id="mileage" name="mileage" value={formData.mileage} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="transmission">Transmission <hr></hr> </label>
                <input type="text" id="transmission" name="transmission" value={formData.transmission} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="location">Location <hr></hr> </label>
                <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="fuelType">Fuel Type <hr></hr> </label>
                <input type="text" id="fuelType" name="fuelType" value={formData.fuelType} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="seats">Seats <hr></hr> </label>
                <input type="number" id="seats" name="seats" value={formData.seats} onChange={handleChange} required />
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
                                <label htmlFor="license">License <hr></hr> </label>
                                <input type="text" id="license" name="license" value={userFormData.license} onChange={handleUserChange} />
                            </div>
                            <div>
                                <label htmlFor="birthdate">Birthdate <hr></hr> </label>
                                <input type="date" id="birthdate" name="birthdate" value={userFormData.birthdate} onChange={handleUserChange} />
                            </div>
                            <br></br>
                            <button className="formButton" type="submit">Submit</button>
                        </form>
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
                                            <button className="formButton">Edit</button>
                                            <br/><br/>
                                            <button className="formButton">Delete</button>
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
                                        <td>{user.password}</td>
                                        <td>{user.username}</td>
                                        <td>{user.permission}</td>
                                        <td>{user.license}</td>
                                        <td>{user.birthdate}</td>
                                        <td>
                                            <button className="formButton">Edit</button>
                                            <br/><br/>
                                            <button className="formButton">Delete</button>
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
