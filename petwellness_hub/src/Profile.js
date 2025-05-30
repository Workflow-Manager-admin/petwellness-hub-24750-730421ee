import React, { useState, useRef } from "react";
import "./Profile.css";

/*
  NOTE: Real icons should be imported from FontAwesome or Lucide once those packages are available/installed.
  Here we assume e.g. FontAwesome and Lucide can be applied by appropriate <i> or <Icon> components.
  If not available, simple unicode or placeholder SVGs are used.
*/

// PUBLIC_INTERFACE
function Profile() {
  // Demo/mock data
  const [profile, setProfile] = useState({
    name: "Charlie",
    type: "Dog",
    breed: "Golden Retriever",
    gender: "Male",
    bio: "My best buddy! Charlie loves swimming and playing fetch in the park.",
    age: 4,
    weight: "30kg",
    color: "Golden",
    dob: "2019-04-23",
    id: "PET-1002283",
    owner: {
      name: "Jamie Peters",
      email: "jamie.peters@email.com",
      phone: "+1 555-421-5009"
    },
    emergencyContact: {
      name: "Brooke Rowe",
      phone: "+1 555-713-2880"
    },
    medical: {
      vet: "Happy Tails Vet Clinic",
      allergies: ["Chicken"],
      medications: ["Carprofen"],
      conditions: ["Arthritis"],
      tags: ["Senior", "Neutered", "No Boarding"],
      vaccinations: [
        { name: "Rabies", status: "Completed", date: "2022-05-12" },
        { name: "Distemper", status: "Overdue", date: "2023-02-15" },
        { name: "Parvo", status: "Upcoming", date: "2024-10-09" },
      ],
      healthStatus: "Stable"
    },
    notes: "Charlie needs extra attention during winter exercises. Remind sitter about joint supplements.",
    documents: [
      { name: "Vaccination Certificate", url: "#", type: "pdf" },
      { name: "Adoption Papers", url: "#", type: "pdf" }
    ],
    attachments: []
  });

  const [isOwnerTabOpen, setIsOwnerTabOpen] = useState(true);
  const [newNote, setNewNote] = useState(profile.notes);
  const [attachments, setAttachments] = useState(profile.attachments || []);
  const [petImg, setPetImg] = useState(null);
  const fileInputRef = useRef();

  // Handle pet image update
  const handlePetImgChange = e => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const fr = new FileReader();
      fr.onload = () => setPetImg(fr.result);
      fr.readAsDataURL(file);
    }
  };

  // Handle attachment upload
  const handleAttachFiles = e => {
    const files = Array.from(e.target.files);
    const fileObjs = files.map(file => ({
      name: file.name,
      url: URL.createObjectURL(file),
      type: file.type.startsWith("image") ? "image" : "file"
    }));
    setAttachments(atts => [...atts, ...fileObjs]);
  };

  // Remove attachment
  const handleRemoveAttachment = idx => {
    setAttachments(atts => atts.filter((_, i) => i !== idx));
  };

  // Helper: icon (Replace later with <FontAwesomeIcon ...> or <LucideIcon /> etc.)
  const icon = (fa, label) =>
    <span className="icon" aria-label={label}>
      {/* Replace below with real icon lib */}
      <i className={"fa fa-" + fa} aria-hidden="true" />
    </span>;

  return (
    <div className="profile-page">
      {/* HEADER with image and edit */}
      <div className="profile-header">
        <div className="pet-photo-lg">
          <img
            src={petImg || "/pet-profile-demo.jpg"}
            alt="Pet"
            className="pet-img"
          />
          <label htmlFor="pet-photo-upload" className="edit-photo-btn" title="Edit photo">
            <i className="fa fa-camera-retro" />
          </label>
          <input
            type="file"
            id="pet-photo-upload"
            ref={fileInputRef}
            style={{ display: "none" }}
            accept="image/*"
            onChange={handlePetImgChange}
          />
        </div>
        <div className="header-details">
          <div className="pet-name-species">
            <span className="pet-name">{profile.name}</span>
            <span className="pet-species">{profile.breed} ({profile.type})</span>
          </div>
          <div className="pet-bio">
            <b>{profile.bio}</b>
          </div>
        </div>
      </div>

      {/* BASIC INFO and OWNER on desktop 2-column */}
      <div className="profile-main">
        {/* Main info section - always visible */}
        <section className="profile-info">
          <ul>
            <li>{icon("id-badge", "pet id")} <span>ID:</span> {profile.id}</li>
            <li>{icon("birthday-cake", "dob")} <span>DOB:</span> {profile.dob}</li>
            <li>{icon("venus-mars", "gender")} <span>Gender:</span> {profile.gender}</li>
            <li>{icon("weight", "weight")} <span>Weight:</span> {profile.weight}</li>
            <li>{icon("palette", "color")} <span>Color:</span> {profile.color}</li>
            <li>{icon("paw", "age")} <span>Age:</span> {profile.age} years</li>
          </ul>
        </section>
        {/* Owner & Emergency section: tab/collapse on mobile */}
        <section className="owner-info-panel">
          <div
            className="panel-toggle"
            onClick={() => setIsOwnerTabOpen(open => !open)}
            role="button"
            tabIndex={0}
            aria-expanded={isOwnerTabOpen}
          >
            {icon("user", "owner")} Owner & Emergency
            <i className={isOwnerTabOpen ? "fa fa-chevron-up" : "fa fa-chevron-down"} style={{marginLeft:8}}/>
          </div>
          <div className={`panel-body${isOwnerTabOpen ? "" : " collapsed"}`}>
            <div className="owner-info-section">
              <b>{profile.owner.name}</b><br />
              <a href={`mailto:${profile.owner.email}`}>{icon("envelope", "email")}{profile.owner.email}</a><br />
              <span>{icon("phone", "phone")}{profile.owner.phone}</span>
            </div>
            <div className="emergency-info-section">
              <b>Emergency: </b>
              <span>{profile.emergencyContact.name} <span style={{ fontWeight: 400, fontStyle: "italic" }}>({profile.emergencyContact.phone})</span></span>
            </div>
          </div>
        </section>
      </div>

      {/* HEALTH AND MEDICATION SUMMARY */}
      <div className="profile-health-section">
        <section className="health-summary">
          <div className="summary-header">
            {icon("heartbeat", "health")} <span className={`health-status-tag status-${profile.medical.healthStatus.toLowerCase()}`}>{profile.medical.healthStatus}</span>
          </div>
          <div className="summary-tags">
            {profile.medical.tags.map((tag, idx) =>
              <span className="badge tag-badge" key={idx}>{tag}</span>
            )}
          </div>
          <div className="summary-list">
            <div>{icon("briefcase-medical", "vet")} Vet: <b>{profile.medical.vet}</b></div>
            <div>{icon("pills", "medications")} Medications: <span>{profile.medical.medications.join(", ")}</span></div>
            <div>{icon("allergies", "allergies")} Allergies: <span>{profile.medical.allergies.join(", ")}</span></div>
            <div>{icon("stethoscope", "conditions")} Medical: <span>{profile.medical.conditions.join(", ") || "None"}</span></div>
            <div>
              <a href="/health-tracker" className="health-history-link">{icon("history", "health history")} View Health History</a>
            </div>
          </div>
        </section>
        {/* VACCINATIONS TIMELINE/PANEL */}
        <section className="vax-panel">
          <div className="panel-title">{icon("syringe", "vaccinations")} Vaccination Status</div>
          <ul className="vax-list">
            {profile.medical.vaccinations.map((vax, idx) => (
              <li key={idx} className={`vax-item vax-${vax.status.toLowerCase()}`}>
                <span className="vax-name">{vax.name}</span>
                <span className="vax-date">{vax.date}</span>
                <span className={`status-bullet status-${vax.status.toLowerCase()}`}>{vax.status}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* NOTES & ATTACHMENTS */}
      <div className="sticky-panel-row">
        <section className="editable-notes">
          <span className="notes-title">{icon("sticky-note", "note")} Notes</span>
          <textarea
            value={newNote}
            onChange={e => setNewNote(e.target.value)}
            rows={4}
            placeholder="Add a note about this pet..."
          />
        </section>
        <section className="attachments-panel">
          <span className="attachments-title">{icon("paperclip", "attach")} Attachments</span>
          <div className="attachment-list">
            {attachments.map((file, idx) => (
              <div className="attachment-preview" key={idx}>
                {file.type === "image" ?
                  <img src={file.url} alt={file.name} className="attachment-img" /> :
                  <a href={file.url} target="_blank" rel="noopener noreferrer">{file.name}</a>
                }
                <button className="remove-attachment-btn" onClick={() => handleRemoveAttachment(idx)} title="Remove attachment">
                  <i className="fa fa-times" />
                </button>
              </div>
            ))}
          </div>
          <label htmlFor="attachment-upload" className="add-attachment-btn" title="Add attachments">
            <i className="fa fa-plus" /> Upload
          </label>
          <input
            type="file"
            id="attachment-upload"
            multiple
            style={{ display: "none" }}
            accept="image/*,.pdf,.doc,.docx,.txt"
            onChange={handleAttachFiles}
          />
        </section>
      </div>
    </div>
  );
}

export default Profile;
