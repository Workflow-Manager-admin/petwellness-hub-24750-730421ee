import React, { useState } from "react";
import "./Profile.css";

/**
 * PUBLIC_INTERFACE
 * Pet Profile Page - feature-rich, visually appealing "digital scrapbook" for a pet.
 * - Warm pastel scrapbook accent, divided clear sections, responsive 2-col layout
 * - Circular header display, editable cards, badges, collapsibles/tabs, icons, soft transitions, illustrative data
 * - All locations for future interactivity (edit/upload) are clearly commented
 * 
 * Designed per: My Pets → Profile
 */
function Profile() {
  // Placeholder/sample data
  const [pet, setPet] = useState({
    photo: "https://api.dicebear.com/7.x/adventurer/svg?seed=fido", // placeholder
    name: "Fido",
    breed: "Golden Retriever",
    species: "Dog",
    petId: "PET-00421",
    markings: "White spot on chest",
    gender: "Male",
    dob: "2018-06-22",
    age: "5y",
    microchip: "985141002348120"
  });

  const [owner, setOwner] = useState({
    name: "Alex Carter",
    relationship: "Primary Owner",
    contact: "+1 555-928-1122",
    emergency: "Morgan K, (Friend), +1 555-627-3322"
  });

  const [medical, setMedical] = useState({
    healthStatus: "Excellent",
    lastVet: "Lenox Veterinary Clinic - 2024-05-22",
    conditions: ["Arthritis", "Hip Sensitivity"], // Example badges
    allergies: ["Chicken"],
    meds: ["Joint Support Tabs (daily)"]
  });

  const [vaccinations, setVaccinations] = useState([
    { id: 1, name: "Rabies", status: "complete", date: "2023-04-15" },
    { id: 2, name: "Distemper", status: "due", date: "2024-07-12" },
    { id: 3, name: "Parvo", status: "complete", date: "2023-04-15" },
    { id: 4, name: "Bordetella", status: "upcoming", date: "2024-11-18" }
  ]);

  const [notes, setNotes] = useState(
    "2024-06-18: Fido loved his new puzzle toy! Noticed a bit of a limp after walk; will monitor for a few days. Appetite is great.

2024-06-12: Quick afternoon swim. Next grooming: end of June."
  );

  // For the owner panel
  const [showOwnerPanel, setShowOwnerPanel] = useState(true);

  // Attachments placeholder (up to 2 sample files, not real uploads)
  const [attachments, setAttachments] = useState([
    { filename: "VetReport-May2024.pdf", type: "pdf", url: "#" },
    { filename: "Fido-Portrait.png", type: "img", url: "https://api.dicebear.com/7.x/adventurer/svg?seed=fido" }
  ]);

  // PUBLIC_INTERFACE
  function handleEditPet(() => {
    // TODO: Wire this to open edit modal/form
    alert("Edit pet details coming soon!");
  });

  // PUBLIC_INTERFACE
  function handleEditInfo(field) {
    // TODO: Trigger inline edit for field
    alert("Inline edit for '" + field + "' coming soon!");
  }

  // PUBLIC_INTERFACE
  function handleAddAttachment(e) {
    // TODO: Wire to file upload widget
    alert("File uploads will be supported soon!");
  }

  // PUBLIC_INTERFACE
  function handleVaccinationAdd() {
    // TODO: Wire to vaccination add dialog
    alert("Add vaccination feature coming soon!");
  }

  // Helper for age (could compute from dob)
  function dobPretty(dob, age) {
    return (
      <span>
        {dob}{" "}
        <span className="profile-pet-age">({age})</span>
      </span>
    );
  }

  // --- Icon helpers (could use react-icons/Lucide/FontAwesome; emojis as fallback) ---
  function Icon({ name, color = "#8aa182", size = 20, outlined = false }) {
    // Example quick-mock for icons (could swap for react-icons or SVG)
    const icons = {
      edit: <span role="img" aria-label="edit">✏️</span>,
      id: <span role="img" aria-label="pet id">🏷️</span>,
      pet: <span role="img" aria-label="species">🐶</span>,
      breed: <span role="img" aria-label="breed">🐾</span>,
      gender: <span role="img" aria-label="gender">♂️</span>,
      dob: <span role="img" aria-label="birth">🎂</span>,
      markings: <span role="img" aria-label="markings">⭐</span>,
      chip: <span role="img" aria-label="microchip">🔗</span>,
      phone: <span role="img" aria-label="phone">📞</span>,
      owner: <span role="img" aria-label="owner">👤</span>,
      email: <span role="img" aria-label="contact">✉️</span>,
      health: <span role="img" aria-label="health">🩺</span>,
      vet: <span role="img" aria-label="vet">🏥</span>,
      badge: <span role="img" aria-label="condition">🔖</span>,
      allergy: <span role="img" aria-label="allergy">⚠️</span>,
      pill: <span role="img" aria-label="meds">💊</span>,
      doc: <span role="img" aria-label="pdf">📄</span>,
      img: <span role="img" aria-label="image">🖼️</span>,
      plus: <span role="img" aria-label="add">➕</span>,
      collapse: <span role="img" aria-label="collapse">🔽</span>,
      expand: <span role="img" aria-label="expand">▶️</span>,
      check: <span role="img" aria-label="complete">✅</span>,
      due: <span role="img" aria-label="due">⏰</span>,
      next: <span role="img" aria-label="upcoming">🕓</span>,
      history: <span role="img" aria-label="history">📜</span>,
      attach: <span role="img" aria-label="attach">📎</span>,
      star: <span role="img" aria-label="star">⭐</span>,
      notes: <span role="img" aria-label="notes">📔</span>,
    };
    return <span className="profile-icon" style={{ color, fontSize: size }}>{icons[name] || "❓"}</span>;
  }

  // --- RENDER ---
  return (
    <div className="profile-root">
      {/* HEADER: Pet image/name/breed, edit, soft shadowed background */}
      <section className="profile-header-bg">
        <div className="profile-header-inner">
          <img
            className="profile-pet-photo"
            src={pet.photo}
            alt={pet.name + " profile"}
          />
          <div className="profile-header-details">
            <h2 className="profile-pet-name">
              {pet.name}
              <button
                className="profile-edit-btn"
                title="Edit pet"
                onClick={handleEditPet}
              >
                <Icon name="edit" size={18} />
              </button>
            </h2>
            <div className="profile-pet-breed">
              <Icon name="breed" size={17} /> {pet.breed}
            </div>
          </div>
        </div>
      </section>
      {/* END HEADER */}

      <div className="profile-cards-2col">
        {/* LEFT COLUMN */}
        <div className="profile-col">
          {/* BASIC INFO CARD */}
          <section className="profile-section profile-info-card">
            <div className="profile-card-title">
              <Icon name="pet" />
              Basic Info
            </div>
            <div className="profile-info-grid">
              <ProfileInfoRow
                icon={<Icon name="id" />}
                label="Pet ID"
                value={pet.petId}
                onEdit={() => handleEditInfo("petId")}
              />
              <ProfileInfoRow
                icon={<Icon name="pet" />}
                label="Species"
                value={pet.species}
                onEdit={() => handleEditInfo("species")}
              />
              <ProfileInfoRow
                icon={<Icon name="breed" />}
                label="Breed"
                value={pet.breed}
                onEdit={() => handleEditInfo("breed")}
              />
              <ProfileInfoRow
                icon={<Icon name="gender" />}
                label="Gender"
                value={pet.gender}
                onEdit={() => handleEditInfo("gender")}
              />
              <ProfileInfoRow
                icon={<Icon name="dob" />}
                label="Birthdate"
                value={dobPretty(pet.dob, pet.age)}
                onEdit={() => handleEditInfo("dob")}
              />
              <ProfileInfoRow
                icon={<Icon name="markings" />}
                label="Markings"
                value={pet.markings}
                onEdit={() => handleEditInfo("markings")}
                showEdit
              />
              <ProfileInfoRow
                icon={<Icon name="chip" />}
                label="Microchip"
                value={pet.microchip}
                onEdit={() => handleEditInfo("microchip")}
                showEdit
              />
            </div>
            {/* Inline edit buttons are placeholders - insert input/form on click */}
          </section>

          {/* OWNER INFO (Collapsible/Tabbed for Emergency) */}
          <section className="profile-section profile-owner-card">
            <div
              className="profile-card-title"
              title="Click to expand/collapse"
              onClick={() => setShowOwnerPanel((v) => !v)}
              style={{ cursor: "pointer" }}
            >
              <Icon name="owner" />
              Owner Info
              <span style={{ marginLeft: 8, fontSize: "1.1em" }}>
                <Icon name={showOwnerPanel ? "collapse" : "expand"} />
              </span>
            </div>
            {showOwnerPanel && (
              <div className="profile-owner-details">
                <div>
                  <Icon name="owner" /> <b>{owner.name}</b>
                  <span className="profile-owner-rel">({owner.relationship})</span>
                </div>
                <div>
                  <Icon name="phone" /> {owner.contact}
                </div>
                <div className="profile-owner-emergency">
                  <span>
                    <Icon name="phone" /> <b>Emergency:</b> {owner.emergency}
                  </span>
                </div>
              </div>
            )}
            {/* To add tabs or more owners/emergencies, replace or extend owner/emergency nodes above */}
          </section>

          {/* NOTES DIARY */}
          <section className="profile-section profile-notes-card">
            <div className="profile-card-title">
              <Icon name="notes" />
              Diary & Notes
            </div>
            <div className="profile-notes-area">
              <pre>{notes}</pre>
              <button
                className="profile-notes-edit-btn"
                onClick={() => alert("Inline notes editing will be available soon!")}
                title="Edit notes"
              >
                <Icon name="edit" />
              </button>
            </div>
            {/* Replace the <pre> and button with textarea/input and save logic */}
          </section>

          {/* ATTACHMENTS (Upload & preview/list) */}
          <section className="profile-section profile-attachments-card">
            <div className="profile-card-title">
              <Icon name="attach" />
              Attachments
            </div>
            <div className="profile-attachments-list">
              {attachments.map((att, idx) => (
                <AttachmentPreview key={idx} att={att} />
              ))}
            </div>
            <div className="profile-attachments-upload">
              {/* File input is hidden, add logic to show on button click */}
              <input
                type="file"
                id="file-upload"
                style={{ display: "none" }}
                onChange={handleAddAttachment}
              />
              <button
                className="profile-attachments-upload-btn"
                onClick={handleAddAttachment}
                title="Upload file"
              >
                <Icon name="plus" /> Add File
              </button>
            </div>
            {/* TODO: Wire up actual uploads, file management, show previews or links */}
          </section>
        </div>
        {/* END LEFT COLUMN */}

        {/* RIGHT COLUMN */}
        <div className="profile-col">
          {/* MEDICAL OVERVIEW */}
          <section className="profile-section profile-medical-card">
            <div className="profile-card-title">
              <Icon name="health" />
              Medical Overview
            </div>
            <div className="profile-medical-row">
              <div>
                <span className="profile-medical-label">
                  <Icon name="health" /> Current Health:
                </span>{" "}
                <span className="profile-medical-status">{medical.healthStatus}</span>
              </div>
              <div>
                <span className="profile-medical-label">
                  <Icon name="vet" /> Last Vet Visit:
                </span>{" "}
                {medical.lastVet}
              </div>
              <div>
                <span className="profile-medical-label">
                  <Icon name="badge" /> Conditions:
                </span>
                {medical.conditions.map((condition, i) => (
                  <span className="profile-badge badge-condition" key={i}>
                    <Icon name="badge" /> {condition}
                  </span>
                ))}
              </div>
              <div>
                <span className="profile-medical-label">
                  <Icon name="allergy" /> Allergies:
                </span>
                {medical.allergies.length ? (
                  medical.allergies.map((all, i) => (
                    <span className="profile-badge badge-allergy" key={i}>
                      <Icon name="allergy" color="#EE857C" /> {all}
                    </span>
                  ))
                ) : (
                  <span className="profile-badge badge-none">None</span>
                )}
              </div>
              <div>
                <span className="profile-medical-label">
                  <Icon name="pill" /> Medications:
                </span>
                {medical.meds.map((med, i) => (
                  <span className="profile-badge badge-meds" key={i}>
                    <Icon name="pill" /> {med}
                  </span>
                ))}
              </div>
              <button
                className="profile-medical-history-btn"
                onClick={() => alert("Full medical history coming soon!")}
                title="View full medical history"
              >
                <Icon name="history" /> Full History
              </button>
            </div>
          </section>

          {/* VACCINATION STATUS */}
          <section className="profile-section profile-vax-card">
            <div className="profile-card-title">
              <Icon name="pill" />
              Vaccination Status
            </div>
            <div className="profile-vax-list">
              {vaccinations.map((vax) => (
                <div
                  className={`profile-vax-item profile-vax-${vax.status}`}
                  key={vax.id}
                  title={vax.name}
                >
                  <Icon
                    name={
                      vax.status === "complete"
                        ? "check"
                        : vax.status === "due"
                        ? "due"
                        : "next"
                    }
                    color={
                      vax.status === "complete"
                        ? "#82ca8a"
                        : vax.status === "due"
                        ? "#f18c63"
                        : "#62aadd"
                    }
                  />
                  <span className="profile-vax-label">{vax.name}</span>
                  <span className="profile-vax-date">{vax.date}</span>
                </div>
              ))}
            </div>
            <button
              className="profile-vax-add-btn"
              onClick={handleVaccinationAdd}
              title="Add vaccination"
            >
              <Icon name="plus" /> Add
            </button>
            {/* Timeline/list view, could use slick slider or timeline AOS animation */}
          </section>
        </div>
        {/* END RIGHT COLUMN */}
      </div>

      {/* TODO: Animated slide-in, tooltip, and transitions can be added on section mount/unmount or interaction.
          For react-icons/Lucide/FontAwesome, swap "Icon" component for library icons.
          Typography set for Poppins/Inter/Roboto by App.css and Dashboard.css.
      */}
    </div>
  );
}

/**
 * Reusable profile info row: used for two-column layout in basic info card
 * @param {icon, label, value, onEdit}
 */
function ProfileInfoRow({ icon, label, value, onEdit, showEdit }) {
  return (
    <div className="profile-info-row">
      <span className="profile-info-icon">{icon}</span>
      <span className="profile-info-label">{label}</span>
      <span className="profile-info-value">{value}</span>
      {showEdit && (
        <button
          className="profile-row-edit-btn"
          title={"Edit " + label}
          onClick={onEdit}
        >
          <span role="img" aria-label="edit">✏️</span>
        </button>
      )}
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * Preview for attachments/files: shows icon for type/image preview, filename, delete placeholder.
 */
function AttachmentPreview({ att }) {
  return (
    <div className="profile-attachment-preview">
      {/* Could preview thumbnails for img, icon for pdf/doc */}
      <span className="preview-icon">
        {att.type === "img" ? (
          <img src={att.url} alt={att.filename} className="profile-img-thumb" />
        ) : (
          <span role="img" aria-label={att.type}>📄</span>
        )}
      </span>
      <span className="preview-filename">{att.filename}</span>
      {/* Replace with download/view/delete logic */}
      <button
        className="profile-attachment-delete-btn"
        title="Remove file"
        onClick={() => alert("Delete/Remove attachment coming soon!")}
      >
        <span role="img" aria-label="delete">🗑️</span>
      </button>
    </div>
  );
}

export default Profile;
