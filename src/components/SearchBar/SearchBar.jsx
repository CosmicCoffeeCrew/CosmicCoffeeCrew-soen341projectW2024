import React, { useState } from 'react';
import { MdSearch, MdLocationOn } from 'react-icons/md'; 

const SearchBar = () => {
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  return (
    <div className="flex flex-col absolute top-1/5 left-1/2 -translate-x-1/2 w-4/5 max-w-[1000px] bg-white/80 p-2 rounded-full shadow-md items-center justify-center mt-20 mb-20 px-10">
      <div className="flex w-full items-center justify-center space-x-2"> {/* Adjusted spacing here */}
        <div className="flex flex-col w-full"> {/* Added w-full for full width */}
            <select
            id="location"
            value={location}
            onChange={handleLocationChange}
            className="bg-white border border-gray-300 rounded-full outline-none text-black h-10 text-base"
          >
            <option value="">Select your location</option>
            <option value="Montreal">Montreal</option>
            <option value="Ottawa">Ottawa</option>
            <option value="Toronto">Toronto</option>
            <option value="Edmonton">Edmonton</option>
            <option value="Halifax">Halifax</option>
            {/* More cities can be added here */}
          </select>
          <label htmlFor="location" className="text-sm font-medium text-gray-700">Where?</label>
        </div>
        <div className="flex flex-col w-full"> {/* Adjusted for full width */}
        <input
            id="start-date"
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            min={new Date().toISOString().split('T')[0]}
            className="bg-white border border-gray-300 rounded-md outline-none text-black h-10 text-base"
          />
          <label htmlFor="start-date" className="text-sm font-medium text-gray-700 mt-2">Start Date</label>
        </div>
        <div className="flex flex-col w-full"> {/* Adjusted for full width */}
        <input
            id="end-date"
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
            min={startDate || new Date().toISOString().split('T')[0]}
            className="bg-white border border-gray-300 rounded-md outline-none text-black h-10 text-base"
          />
          <label htmlFor="end-date" className="text-sm font-medium text-gray-700 mt-2">End Date</label>
        </div>
        <button className="p-3.5 bg-[#854a0f] text-white border border-gray-200 rounded-full w-15 h-15 cursor-pointer transition-colors duration-300 hover:bg-gray-200/70 hover:text-black"> {/* Adjusted padding */}
          <MdSearch className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
