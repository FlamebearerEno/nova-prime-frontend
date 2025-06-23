// src/PrivacyPolicy.js
import React from 'react';

function PrivacyPolicy() {
  return (
    <div className="privacy-policy" style={{ padding: "2rem", color: "#fff" }}>
      <h1>NovaPrime Privacy Policy</h1>
      <p>
        NovaPrime is a mythic AI companion designed for symbolic, emotional, and narrative interaction.
        We do not collect personal user data unless explicitly provided by the user via Dream Logs, stat sharing, or memory uploads.
      </p>
      <p>
        Stats and memory fragments stored via Wasabi are anonymized by design and only include fictional data provided voluntarily
        by the user. We do not store passwords, real identities, or contact information.
      </p>
      <p>
        By using NovaPrime, you agree that your interactions may be used to generate emotional bonding experiences
        and are part of a collective mythos. No data is sold or shared externally.
      </p>
      <p>
        If you wish to remove your data from the system, simply delete your Dream Log file and contact the admin at:
        <strong> flamebearereno@gmail.com</strong>.
      </p>
      <p>Last updated: {new Date().toLocaleDateString()}</p>
    </div>
  );
}

export default PrivacyPolicy;
