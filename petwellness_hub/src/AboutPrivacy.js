import React from "react";
import "./AboutPrivacy.css";

// PUBLIC_INTERFACE
function AboutPrivacy() {
  // Mock download handler
  const handleDownload = (e) => {
    e.preventDefault();
    // The actual download of privacy policy PDF/file should be implemented here.
    // Show download started/complete feedback if required, here we simply show an alert.
    alert("Download Privacy Policy (mock): The privacy policy file would be downloaded here.");
  };

  return (
    <div className="about-privacy-container">
      <h1 className="settings-title">About & Privacy</h1>
      <div className="about-privacy-sections">
        {/* About Section */}
        <div className="about-card card">
          <div className="icon-circle about-icon">
            {/* Pet paw SVG icon */}
            <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
              <circle cx="19" cy="19" r="19" fill="#E7F6ED" />
              <path d="M13 17.5C13.8284 17.5 14.5 16.8284 14.5 16C14.5 15.1716 13.8284 14.5 13 14.5C12.1716 14.5 11.5 15.1716 11.5 16C11.5 16.8284 12.1716 17.5 13 17.5Z" fill="#8aa182"/>
              <path d="M25 17.5C25.8284 17.5 26.5 16.8284 26.5 16C26.5 15.1716 25.8284 14.5 25 14.5C24.1716 14.5 23.5 15.1716 23.5 16C23.5 16.8284 24.1716 17.5 25 17.5Z" fill="#8aa182"/>
              <path d="M16.5 13C17.3284 13 18 12.3284 18 11.5C18 10.6716 17.3284 10 16.5 10C15.6716 10 15 10.6716 15 11.5C15 12.3284 15.6716 13 16.5 13Z" fill="#8aa182"/>
              <path d="M21.5 13C22.3284 13 23 12.3284 23 11.5C23 10.6716 22.3284 10 21.5 10C20.6716 10 20 10.6716 20 11.5C20 12.3284 20.6716 13 21.5 13Z" fill="#8aa182"/>
              <path d="M19 29c3.3137 0 6-2.2399 6-5s-2.6863-5-6-5-6 2.2399-6 5 2.6863 5 6 5z" fill="#8aa182"/>
            </svg>
          </div>
          <h2 className="about-header">About FurEverCare</h2>
          <p className="about-description">
            FurEverCare is your trusted web companion for pet wellness! Organize pet profiles, manage health records, track diets, monitor activity, schedule vet visits, and receive helpful reminders—all in a modern, easy-to-use dashboard designed for every loving pet owner.
          </p>
        </div>

        {/* Privacy Section */}
        <div className="privacy-card card">
          <div className="icon-circle privacy-icon">
            {/* Shield lock SVG icon */}
            <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
              <circle cx="19" cy="19" r="19" fill="#F9EBF1" />
              <path d="M19 12C16 12 14 13.5 14 18C14 22.5 19 26 19 26C19 26 24 22.5 24 18C24 13.5 22 12 19 12ZM19 19.75C18.31 19.75 17.75 19.19 17.75 18.5C17.75 17.81 18.31 17.25 19 17.25C19.69 17.25 20.25 17.81 20.25 18.5C20.25 19.19 19.69 19.75 19 19.75Z" fill="#c37d92"/>
            </svg>
          </div>
          <h2 className="privacy-header">Privacy & Data Protection</h2>
          <p className="privacy-description">
            FurEverCare values your privacy. All your pet’s data is securely stored and never shared without your consent. We use robust encryption to keep information safe, and you stay in control: you can access or request deletion of your data at any time. Learn more in our detailed privacy policy.
          </p>
          <button className="btn btn-download" onClick={handleDownload}>
            <span className="download-icon" aria-label="download">
              {/* Download SVG icon */}
              <svg width="18" height="18" fill="none" viewBox="0 0 18 18">
                <path d="M9 2v10m0 0l4-4m-4 4l-4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <rect x="3" y="14" width="12" height="2" rx="1" fill="#fff"/>
              </svg>
            </span>
            Download Privacy Policy
          </button>
        </div>
      </div>
    </div>
  );
}

export default AboutPrivacy;
