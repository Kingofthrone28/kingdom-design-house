import React, { useState } from 'react';
import { useSiteData } from '../contexts/SiteDataContext';

// Example component showing how to manage dynamic data
const DataManager = () => {
  const { data, updateContact, getNavbarData } = useSiteData();
  const [newPhone, setNewPhone] = useState(data.contact.phone);
  const [newEmail, setNewEmail] = useState(data.contact.email);

  const handleUpdateContact = () => {
    updateContact({
      phone: newPhone,
      email: newEmail
    });
  };

  const handleResetContact = () => {
    setNewPhone("347.927.8846");
    setNewEmail("info@kingdomdesignhouse.com");
    updateContact({
      phone: "347.927.8846",
      email: "info@kingdomdesignhouse.com"
    });
  };

  return (
    <div style={{ 
      position: 'fixed', 
      top: '10px', 
      right: '10px', 
      background: 'white', 
      padding: '20px', 
      border: '1px solid #ccc',
      borderRadius: '8px',
      zIndex: 9999,
      minWidth: '300px'
    }}>
      <h3>Dynamic Data Manager</h3>
      <p><strong>Current Phone:</strong> {data.contact.phone}</p>
      <p><strong>Current Email:</strong> {data.contact.email}</p>
      
      <div style={{ marginTop: '15px' }}>
        <label>
          Phone:
          <input 
            type="text" 
            value={newPhone} 
            onChange={(e) => setNewPhone(e.target.value)}
            style={{ width: '100%', marginTop: '5px', padding: '5px' }}
          />
        </label>
        
        <label style={{ display: 'block', marginTop: '10px' }}>
          Email:
          <input 
            type="email" 
            value={newEmail} 
            onChange={(e) => setNewEmail(e.target.value)}
            style={{ width: '100%', marginTop: '5px', padding: '5px' }}
          />
        </label>
        
        <div style={{ marginTop: '15px' }}>
          <button 
            onClick={handleUpdateContact}
            style={{ 
              background: '#007bff', 
              color: 'white', 
              border: 'none', 
              padding: '8px 16px', 
              marginRight: '10px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Update Contact
          </button>
          
          <button 
            onClick={handleResetContact}
            style={{ 
              background: '#6c757d', 
              color: 'white', 
              border: 'none', 
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataManager;