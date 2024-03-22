import { useState, useEffect } from 'react';
import "./AdminDashboard.css";

const AdminDashboard = () => {
    const [showVForm, setShowVForm] = useState(false);
    const [showUForm, setShowUForm] = useState(false);
    const [showVTable, setShowVTable] = useState(false);
    const [showUTable, setShowUTable] = useState(false);
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        fetchVehicles();
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
        }
    };
    const handleListClick = (type) => {
        setShowVForm(false);
        setShowUForm(false);
        setShowVTable(false);
        setShowUTable(false);

        if (type === 'vForm') {
            setShowVForm(true);
        } else if (type === 'uForm') {
            setShowUForm(true);
        } else if (type === 'vTable') {
            setShowVTable(true);
        } else if (type === 'uTable') {
            setShowUTable(true);
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
                        <form>
                            <div>
                                <label htmlFor="make">Make <hr></hr> </label>
                                <input type="text" id="make" name="make" />
                            </div>
                            <div>
                                <label htmlFor="model">Model <hr></hr> </label>
                                <input type="text" id="model" name="model" />
                            </div>
                            <div>
                                <label htmlFor="year">Year <hr></hr> </label>
                                <input type="number" id="year" name="year" />
                            </div>
                            <div>
                                <label htmlFor="type">Type <hr></hr> </label>
                                <input type="text" id="type" name="type" />
                            </div>
                            <div>
                                <label htmlFor="color">Color <hr></hr> </label>
                                <input type="text" id="color" name="color" />
                            </div>
                            <div>
                                <label htmlFor="mileage">Mileage <hr></hr> </label>
                                <input type="number" id="mileage" name="mileage" />
                            </div>
                            <div>
                                <label htmlFor="transmission">Transmission <hr></hr> </label>
                                <input type="text" id="transmission" name="transmission" />
                            </div>
                            <div>
                                <label htmlFor="location">Location <hr></hr> </label>
                                <input type="text" id="location" name="location" />
                            </div>
                            <div>
                                <label htmlFor="fuelType">Fuel Type <hr></hr> </label>
                                <input type="text" id="fuelType" name="fuelType" />
                            </div>
                            <div>
                                <label htmlFor="seats">Seats <hr></hr> </label>
                                <input type="number" id="seats" name="seats" />
                            </div>
                            <div>
                                <label htmlFor="pricePerDay">Price Per Day <hr></hr> </label>
                                <input type="number" id="pricePerDay" name="pricePerDay" />
                            </div>
                            <div>
                                <label htmlFor="image">Image Link<hr></hr> </label>
                                <input type="text" id="image" name="image" />
                            </div>
                            <br></br>
                            <button className="formButton" type="submit">Submit</button>
                        </form>
                    </div>
                )}

                {showUForm &&  (
                    <div>
                        <form>
                            <div>
                                <label htmlFor="email">Email <hr></hr> </label>
                                <input type="email" id="email" name="email" />
                            </div>
                            <div>
                                <label htmlFor="password">Password <hr></hr> </label>
                                <input type="password" id="password" name="password" />
                            </div>
                            <div>
                                <label htmlFor="username">Username <hr></hr> </label>
                                <input type="text" id="username" name="username" />
                            </div>
                            <div>
                                <label htmlFor="permission">Permission <hr></hr> </label>
                                <select id="permission" name="permission">
                                    <option value="Customer">Customer</option>
                                    <option value="CSR">CSR</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="license">License <hr></hr> </label>
                                <input type="text" id="license" name="license" />
                            </div>
                            <div>
                                <label htmlFor="birthdate">Birthdate <hr></hr> </label>
                                <input type="date" id="birthdate" name="birthdate" />
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
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {vehicles.map(vehicle => (
                                    <tr key={vehicle._id}>
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
                                <tr>
                                    <td>1</td>
                                    <td>example@example.com</td>
                                    <td>password123</td>
                                    <td>Example User</td>
                                    <td>Customer</td>
                                    <td>yes</td>
                                    <td>1990-01-01</td>
                                    <td>
                                        <button className="formButton">Edit</button>
                                        <br></br><br></br>
                                        <button className="formButton">Delete</button>
                                    </td>
                                </tr>
                                {/* Connect to Backend */}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminDashboard;
