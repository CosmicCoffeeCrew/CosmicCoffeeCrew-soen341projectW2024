import React, { useState } from 'react';
import NavBar from '../components/CSR-compos/NavBar';
import Checkin from '../components/CSR-compos/Checkin';
import Checkout from '../components/CSR-compos/Checkout';

const CSRPage = () => {
  const [activeTab, setActiveTab] = useState('check-in'); // Default to showing Check-in

  return (
    <div>
      <NavBar
        onCheckInClick={() => setActiveTab('check-in')}
        onCheckOutClick={() => setActiveTab('check-out')}
      />
      {activeTab === 'check-in' && <Checkin />}
      {activeTab === 'check-out' && <Checkout />}
    </div>
  );
};

export default CSRPage;