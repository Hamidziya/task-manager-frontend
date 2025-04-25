import React, { useState } from 'react';
import axios from 'axios';
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
const ImportForm = ({ onImport }) => {
  const [sheetUrl, setSheetUrl] = useState('');

  const handleImport = async () => {
    try {
      await axios.post('http://localhost:5000/import/googleSheet', { sheetUrl,config });
      onImport();
      setSheetUrl('');
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
