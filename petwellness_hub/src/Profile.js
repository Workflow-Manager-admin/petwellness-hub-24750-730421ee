import React, { useState } from "react";
import "./Profile.css";

/*
  Refactored pet profile: pet-specific lists (attributes, contacts, attachments)
  are now managed as arrays in local React state, supporting temporary add/edit/cancel
  with appropriate UI controls. No changes are persisted.
*/

// PUBLIC_INTERFACE
const initialPetProfile = {
  name: "Buddy",
  species: "Dog",
  breed: "Golden Retriever",
  age: 5,
  gender: "Male",
  attributes: ["Friendly", "Playful", "Good with kids"],
  contacts: [
    { label: "Vet", value: "Dr. Smith, (123) 456-7890" },
    { label: "Emergency", value: "Pet ER, (987) 654-3210" }
  ],
  attachments: [
    { type: "Vaccination Record", filename: "vaccination.pdf" },
    { type: "Prescription", filename: "heartworm_rx.pdf" }
  ],
  topics: [
    { topic: "General Info", subtopics: ["Breed", "Date of Birth", "Color"] },
    { topic: "Medical", subtopics: ["Vaccinations", "Last Vet Visit"] },
    { topic: "Diet", subtopics: ["Meal Plan", "Allergies"] },
    { topic: "Activity", subtopics: ["Walks", "Exercise Routine"] }
  ],
  contactEmail: "jane.doe@email.com",
};

// Utility function for deep cloning arrays/objects
const clone = val => JSON.parse(JSON.stringify(val));

// Return a random color class for subtopics (deterministic based on index)
function randomSubtopicClass(idx) {
  const colorStyles = [
    "subtopic-violet",
    "subtopic-blue",
    "subtopic-orange",
  ];
  return colorStyles[idx % colorStyles.length];
}

// PUBLIC_INTERFACE
function Profile() {
  // Manage in-memory arrays for editable pet list sections
  const [attributes, setAttributes] = useState(clone(initialPetProfile.attributes));
  const [contacts, setContacts] = useState(clone(initialPetProfile.contacts));
  const [attachments, setAttachments] = useState(clone(initialPetProfile.attachments));

  // Track edit/add in progress for each section
  const [editingAttrIdx, setEditingAttrIdx] = useState(null); // null/number for editing, 'add' for new
  const [pendingAttrInput, setPendingAttrInput] = useState("");

  const [editingContactIdx, setEditingContactIdx] = useState(null);
  const [pendingContactLabel, setPendingContactLabel] = useState("");
  const [pendingContactValue, setPendingContactValue] = useState("");

  const [editingAttachIdx, setEditingAttachIdx] = useState(null);
  const [pendingAttachType, setPendingAttachType] = useState("");
  const [pendingAttachFilename, setPendingAttachFilename] = useState("");

  // Reset all editing states for cancel
  function resetAttributeEdit() {
    setEditingAttrIdx(null);
    setPendingAttrInput("");
  }
  function resetContactEdit() {
    setEditingContactIdx(null);
    setPendingContactLabel("");
    setPendingContactValue("");
  }
  function resetAttachmentEdit() {
    setEditingAttachIdx(null);
    setPendingAttachType("");
    setPendingAttachFilename("");
  }

  // Attribute handlers
  function startEditAttr(idx) {
    setPendingAttrInput(attributes[idx]);
    setEditingAttrIdx(idx);
  }
  function saveAttrEdit() {
    if ((pendingAttrInput || "").trim()) {
      setAttributes(arr => {
        const updated = clone(arr);
        if (editingAttrIdx === "add") {
          updated.push(pendingAttrInput.trim());
        } else {
          updated[editingAttrIdx] = pendingAttrInput.trim();
        }
        return updated;
      });
    }
    resetAttributeEdit();
  }
  function handleAddAttr() {
    setPendingAttrInput("");
    setEditingAttrIdx("add");
  }

  // Contact handlers
  function startEditContact(idx) {
    setPendingContactLabel(contacts[idx].label);
    setPendingContactValue(contacts[idx].value);
    setEditingContactIdx(idx);
  }
  function saveContactEdit() {
    if ((pendingContactLabel || "").trim() && (pendingContactValue || "").trim()) {
      setContacts(arr => {
        const updated = clone(arr);
        if (editingContactIdx === "add") {
          updated.push({ label: pendingContactLabel.trim(), value: pendingContactValue.trim() });
        } else {
          updated[editingContactIdx] = {
            label: pendingContactLabel.trim(),
            value: pendingContactValue.trim()
          };
        }
        return updated;
      });
    }
    resetContactEdit();
  }
  function handleAddContact() {
    setPendingContactLabel("");
    setPendingContactValue("");
    setEditingContactIdx("add");
  }

  // Attachment handlers
  function startEditAttachment(idx) {
    setPendingAttachType(attachments[idx].type);
    setPendingAttachFilename(attachments[idx].filename);
    setEditingAttachIdx(idx);
  }
  function saveAttachmentEdit() {
    if ((pendingAttachType || "").trim() && (pendingAttachFilename || "").trim()) {
      setAttachments(arr => {
        const updated = clone(arr);
        if (editingAttachIdx === "add") {
          updated.push({ type: pendingAttachType.trim(), filename: pendingAttachFilename.trim() });
        } else {
          updated[editingAttachIdx] = {
            type: pendingAttachType.trim(),
            filename: pendingAttachFilename.trim()
          };
        }
        return updated;
      });
    }
    resetAttachmentEdit();
  }
  function handleAddAttachment() {
    setPendingAttachType("");
    setPendingAttachFilename("");
    setEditingAttachIdx("add");
  }

  // UI for editing/adding table rows
  function renderAttributes() {
    return (
      <div>
        <b className="topic-green">Attributes:</b>
        <ul>
          {attributes.map((attr, idx) =>
            editingAttrIdx === idx ? (
              <li key={idx}>
                <input
                  type="text"
                  value={pendingAttrInput}
                  onChange={e => setPendingAttrInput(e.target.value)}
                  autoFocus
                  className="input-black"
                />
                <button className="btn" onClick={saveAttrEdit} style={{ marginLeft: 5 }}>Save</button>
                <button className="btn" onClick={resetAttributeEdit} style={{ marginLeft: 5 }}>Cancel</button>
              </li>
            ) : (
              <li key={idx} className="text-black">
                {attr}
                <button
                  className="btn"
                  onClick={() => startEditAttr(idx)}
                  style={{ marginLeft: 10, fontSize: "0.9em" }}
                >Edit</button>
              </li>
            )
          )}
          {editingAttrIdx === "add" && (
            <li>
              <input
                type="text"
                value={pendingAttrInput}
                onChange={e => setPendingAttrInput(e.target.value)}
                autoFocus
                className="input-black"
              />
              <button className="btn" onClick={saveAttrEdit} style={{ marginLeft: 5 }}>Add</button>
              <button className="btn" onClick={resetAttributeEdit} style={{ marginLeft: 5 }}>Cancel</button>
            </li>
          )}
        </ul>
        {editingAttrIdx === null && (
          <button className="btn" onClick={handleAddAttr}>Add Attribute</button>
        )}
      </div>
    );
  }

  function renderContacts() {
    return (
      <div>
        <b className="topic-green">Contacts:</b>
        <ul style={{ listStyle: "none", paddingLeft: 0 }}>
          {contacts.map((contact, idx) =>
            editingContactIdx === idx ? (
              <li key={idx}>
                <input
                  type="text"
                  placeholder="Label"
                  value={pendingContactLabel}
                  onChange={e => setPendingContactLabel(e.target.value)}
                  style={{ marginRight: 4 }}
                  autoFocus
                  className="input-black"
                />
                <input
                  type="text"
                  placeholder="Value"
                  value={pendingContactValue}
                  onChange={e => setPendingContactValue(e.target.value)}
                  style={{ marginRight: 4 }}
                  className="input-black"
                />
                <button className="btn" onClick={saveContactEdit} style={{ marginLeft: 5 }}>Save</button>
                <button className="btn" onClick={resetContactEdit} style={{ marginLeft: 5 }}>Cancel</button>
              </li>
            ) : (
              <li key={idx} className="text-black">
                <b>{contact.label}:</b> {contact.value}
                <button
                  className="btn"
                  onClick={() => startEditContact(idx)}
                  style={{ marginLeft: 10, fontSize: "0.9em" }}
                >Edit</button>
              </li>
            )
          )}
          {editingContactIdx === "add" && (
            <li>
              <input
                type="text"
                placeholder="Label"
                value={pendingContactLabel}
                onChange={e => setPendingContactLabel(e.target.value)}
                style={{ marginRight: 4 }}
                autoFocus
                className="input-black"
              />
              <input
                type="text"
                placeholder="Value"
                value={pendingContactValue}
                onChange={e => setPendingContactValue(e.target.value)}
                style={{ marginRight: 4 }}
                className="input-black"
              />
              <button className="btn" onClick={saveContactEdit} style={{ marginLeft: 5 }}>Add</button>
              <button className="btn" onClick={resetContactEdit} style={{ marginLeft: 5 }}>Cancel</button>
            </li>
          )}
        </ul>
        {editingContactIdx === null && (
          <button className="btn" onClick={handleAddContact}>Add Contact</button>
        )}
      </div>
    );
  }

  function renderAttachments() {
    return (
      <div>
        <b className="topic-green">Attachments:</b>
        <ul style={{ listStyle: "none", paddingLeft: 0 }}>
          {attachments.map((att, idx) =>
            editingAttachIdx === idx ? (
              <li key={idx}>
                <input
                  type="text"
                  placeholder="Type"
                  value={pendingAttachType}
                  onChange={e => setPendingAttachType(e.target.value)}
                  style={{ marginRight: 4 }}
                  autoFocus
                  className="input-black"
                />
                <input
                  type="text"
                  placeholder="Filename"
                  value={pendingAttachFilename}
                  onChange={e => setPendingAttachFilename(e.target.value)}
                  style={{ marginRight: 4 }}
                  className="input-black"
                />
                <button className="btn" onClick={saveAttachmentEdit} style={{ marginLeft: 5 }}>Save</button>
                <button className="btn" onClick={resetAttachmentEdit} style={{ marginLeft: 5 }}>Cancel</button>
              </li>
            ) : (
              <li key={idx} className="text-black">
                <span>{att.type}:</span> <span>{att.filename}</span>
                <button
                  className="btn"
                  onClick={() => startEditAttachment(idx)}
                  style={{ marginLeft: 10, fontSize: "0.9em" }}
                >Edit</button>
              </li>
            )
          )}
          {editingAttachIdx === "add" && (
            <li>
              <input
                type="text"
                placeholder="Type"
                value={pendingAttachType}
                onChange={e => setPendingAttachType(e.target.value)}
                style={{ marginRight: 4 }}
                autoFocus
                className="input-black"
              />
              <input
                type="text"
                placeholder="Filename"
                value={pendingAttachFilename}
                onChange={e => setPendingAttachFilename(e.target.value)}
                style={{ marginRight: 4 }}
                className="input-black"
              />
              <button className="btn" onClick={saveAttachmentEdit} style={{ marginLeft: 5 }}>Add</button>
              <button className="btn" onClick={resetAttachmentEdit} style={{ marginLeft: 5 }}>Cancel</button>
            </li>
          )}
        </ul>
        {editingAttachIdx === null && (
          <button className="btn" onClick={handleAddAttachment}>Add Attachment</button>
        )}
      </div>
    );
  }

  // Main: modern profile details, topics-section, and static info display
  return (
    <div className="profile-container">
      <h2>
        <span className="topic-green">{initialPetProfile.name}</span> <span className="profile-species">{initialPetProfile.species}</span>
      </h2>
      <div className="profile-details">
        <div className="text-black"><b>Breed:</b> {initialPetProfile.breed}</div>
        <div className="text-black"><b>Age:</b> {initialPetProfile.age} years</div>
        <div className="text-black"><b>Gender:</b> {initialPetProfile.gender}</div>
      </div>
      <div className="topics-section" style={{ marginTop: "28px", marginBottom: "28px" }}>
        {initialPetProfile.topics && initialPetProfile.topics.map((t, i) => (
          <div key={i} className="topic-group">
            <div className="topic-main topic-green">
              {t.topic}
            </div>
            <div className="subtopics-list">
              {t.subtopics.map((s, j) => (
                <span
                  key={j}
                  className={"subtopic-pill " + randomSubtopicClass(j)}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
        <div className="profile-section" style={{marginTop:30}}>
          <label className="text-black">Contact Email</label>
          <input
            name="contactEmail"
            value={initialPetProfile.contactEmail}
            type="email"
            className="input-black"
            readOnly
          />
        </div>
      </div>
      <div className="profile-info">
        <div className="text-black">
          <strong>Name:</strong> {initialPetProfile.name}
        </div>
        <div className="text-black">
          <strong>Species:</strong> {initialPetProfile.species}
        </div>
        <div className="text-black">
          <strong>Breed:</strong> {initialPetProfile.breed}
        </div>
        <div className="text-black">
          <strong>Age:</strong> {initialPetProfile.age}
        </div>
        <div className="text-black">
          <strong>Gender:</strong> {initialPetProfile.gender}
        </div>
        <div className="text-black">
          <strong>Contact Email:</strong> {initialPetProfile.contactEmail}
        </div>
      </div>
      <div style={{marginTop: 30}}>
        {renderAttributes()}
        {renderContacts()}
        {renderAttachments()}
      </div>
    </div>
  );
}

export default Profile;
