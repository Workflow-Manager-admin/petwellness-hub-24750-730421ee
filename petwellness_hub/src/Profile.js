import React, { useState } from "react";
import "./Profile.css";

// PUBLIC_INTERFACE
function Profile() {
  // Mock data for demo purposes
  const [profile] = useState({
    name: "Charlie",
    type: "Dog",
    breed: "Golden Retriever",
    age: 4,
    weight: "30kg",
    owner: "Jamie Peters",
    contact: "jamie.peters@email.com",
    medical: {
      vaccinations: ["Rabies (2022)", "Distemper (2023)", "Parvo (2023)"],
      allergies: ["Chicken"],
      conditions: ["Arthritis"],
      vet: "Happy Tails Vet Clinic"
    },
    documents: [
      { name: "Vaccination Certificate", url: "#" },
      { name: "Adoption Papers", url: "#" }
    ]
  });

  return (
    <div className="profile-page">
      <h1>Pet Profile</h1>
      <div className="profile-card-container">
        <div className="card profile-card">
          <div className="profile-section">
            <div className="profile-photo">
              {/* Placeholder circle photo */}
              <div className="pet-photo"></div>
            </div>
            <div className="profile-details">
              <h2>{profile.name}</h2>
              <p>
                <b>Type:</b> {profile.type}
              </p>
              <p>
                <b>Breed:</b> {profile.breed}
              </p>
              <p>
                <b>Age:</b> {profile.age} yrs
              </p>
              <p>
                <b>Weight:</b> {profile.weight}
              </p>
              <p>
                <b>Owner:</b> {profile.owner}
              </p>
              <p>
                <b>Contact:</b> {profile.contact}
              </p>
            </div>
          </div>
        </div>

        <div className="card medical-card">
          <div className="medical-section">
            <h3>Medical Info</h3>
            <ul>
              <li>
                <b>Vaccinations:</b> {profile.medical.vaccinations.join(", ")}
              </li>
              <li>
                <b>Allergies:</b> {profile.medical.allergies.join(", ")}
              </li>
              <li>
                <b>Medical Conditions:</b> {profile.medical.conditions.join(", ")}
              </li>
              <li>
                <b>Vet:</b> {profile.medical.vet}
              </li>
            </ul>
          </div>
        </div>

        <div className="card document-card">
          <div className="document-section">
            <h3>Documents</h3>
            <ul>
              {profile.documents.map((doc, idx) => (
                <li key={idx}>
                  <a href={doc.url} target="_blank" rel="noopener noreferrer">
                    {doc.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
