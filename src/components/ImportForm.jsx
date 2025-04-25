import React, { useState } from 'react';
import axios from 'axios';

const ImportForm = ({ onImport }) => {
  const [sheetUrl, setSheetUrl] = useState('');

  const handleImport = async () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      // Send the config in the second argument
      await axios.post(
        'https://taskmanager-ge9o.onrender.com/import/googleSheet',
        { sheetUrl },  // Request body
        config         // Request config (headers)
      );
      onImport();  // Callback after import
      setSheetUrl('');  // Clear input
    } catch (error) {
      alert('Invalid or failed to import sheet');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={sheetUrl}
        placeholder="Enter Google Sheets public link"
        onChange={(e) => setSheetUrl(e.target.value)}
      />
      <button onClick={handleImport}>Import Tasks</button>
    </div>
  );
};

export default ImportForm;
