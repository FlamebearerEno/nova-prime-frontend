import React, { useState } from 'react';
import { auth } from './firebase';
import './syncMemory.css';

const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000';

function SyncMemory() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setStatus('');
  };

  const handleUpload = async () => {
    if (!file) {
      setStatus('❗ Please select a file.');
      return;
    }
    if (file.name !== 'conversations.json') {
      setStatus('❗ Invalid file. Must be named "conversations.json".');
      return;
    }

    try {
      const user = auth.currentUser;
      if (!user) {
        setStatus('❗ You must be logged in.');
        return;
      }

      const token = await user.getIdToken(true);
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch(`${backendUrl}/syncMemory`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setStatus(
          `🎉 Memory synced!\n` +
          `${data.message}\n` +
          `Retro XP: ${data.retroXP}\n` +
          `Synced at: ${new Date(data.retroSyncTimestamp).toLocaleString()}`
        );
      } else {
        setStatus(`❗ Error: ${data.error || 'Unknown error'}`);
      }
    } catch (err) {
      console.error(err);
      setStatus('❗ Error syncing memory.');
    }
  };

  return (
    <div className="sync-memory-container">
      <h3>Sync Your Memory</h3>
      <input type="file" accept=".json" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {status && <pre className="sync-status">{status}</pre>}
    </div>
  );
}

export default SyncMemory;
