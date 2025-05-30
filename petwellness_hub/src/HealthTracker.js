import React, { useState } from "react";

/**
 * PUBLIC_INTERFACE
 * HealthTracker: My Pets > Health Tracker page - a comprehensive, digital health journal for each pet.
 * Features:
 * - Health Summary Card: status badge, weight, last/next vet, color tags.
 * - Medical History Timeline: animated, icons, statuses.
 * - Allergies & Conditions Tag Pills: CRUD, color/severity.
 * - Medication Tracker: grid/cards, toggle reminder.
 * - Vaccination Records: collapsible, upload.
 * - Veterinarian Info: quick contact, panel.
 * - Health Doc Upload: drag & drop, previews, grouping/filtering/search.
 * 
 * Layout:
 * - 2-column (desktop), stacked (mobile).
 * - Modern fonts (Inter/Poppins), soft light theme, accent colors.
 * - Lucide/Feather/FontAwesome/Emoji icons as fallback.
 * - Animations for collapse/expand, hover, tooltips.
 * - All interactivity panels are stateful; actual storage integration is placeholder only.
 */

function HealthTracker() {
  // --- PET DATA (could come from context/db) ---
  const [pet, setPet] = useState({
    name: "Bella",
    avatar: "🐶",
    photo: "https://api.dicebear.com/7.x/adventurer/svg?seed=bella",
    weightKg: 23.1, // kg
    healthStatus: "Stable",
    lastVet: "2024-05-20",
    nextVet: "2024-09-14",
    colorTags: ["Sensitive Skin", "Energetic"],
  });

  // --- MEDICAL HISTORY ---
  const [medicalHistory, setMedicalHistory] = useState([
    {
      date: "2024-06-13",
      type: "Vet Visit",
      desc: "Routine checkup. Vaccination updated.",
      status: "complete",
      icon: "🩺",
    },
    {
      date: "2024-05-20",
      type: "Injury",
      desc: "Minor sprain, prescribed rest.",
      status: "alert",
      icon: "⚠️",
    },
    {
      date: "2024-03-02",
      type: "Medication",
      desc: "Completed 10-day antibiotic course.",
      status: "complete",
      icon: "💊",
    },
    {
      date: "2023-11-30",
      type: "Vaccination",
      desc: "Rabies vaccine booster administered.",
      status: "complete",
      icon: "💉",
    },
    {
      date: "2023-10-23",
      type: "Illness",
      desc: "Seasonal allergies detected.",
      status: "info",
      icon: "🤧",
    },
  ]);

  // --- ALLERGIES & CONDITIONS ---
  const [allergyInput, setAllergyInput] = useState("");
  const [conditionInput, setConditionInput] = useState("");
  const [allergies, setAllergies] = useState([
    { tag: "Chicken", severity: "high" },
    { tag: "Pollen", severity: "moderate" },
  ]);
  const [conditions, setConditions] = useState([
    { tag: "Hip Dysplasia", severity: "high" },
    { tag: "Arthritis", severity: "low" },
  ]);

  // --- MEDICATION TRACKER ---
  const [medications, setMedications] = useState([
    { name: "Carprofen", time: "Evening", status: "active", reminder: true },
    { name: "Omega-3 Supplement", time: "Morning", status: "paused", reminder: false },
  ]);

  // --- VAX RECORDS ---
  const [vaccines, setVaccines] = useState([
    {
      id: 1,
      name: "Rabies",
      complete: true,
      date: "2023-11-30",
      certificate: null,
    },
    {
      id: 2,
      name: "Bordetella",
      complete: false,
      date: "2024-11-30",
      certificate: null,
    },
  ]);
  const [showVax, setShowVax] = useState({});

  // --- VET INFO ---
  const vet = {
    clinic: "Lenox Vet Care",
    address: "1234 Elm St, Springfield",
    phone: "+1 555-112-2387",
    email: "contact@lenoxvet.com",
    doctor: "Dr. Miranda Lee",
    avatar: "👩‍⚕️",
  };

  // --- DOCUMENT UPLOADS ---
  const [documents, setDocuments] = useState([
    {
      id: 1, name: "Rabies Certificate.pdf", type: "pdf", url: "", group: "Vaccination", uploaded: "2023-11-30"
    },
    {
      id: 2, name: "VetVisit-Jun2024.jpg", type: "img", url: "", group: "Checkup", uploaded: "2024-06-13"
    },
  ]);
  const [filter, setFilter] = useState("");
  const [uploadQueue, setUploadQueue] = useState([]);

  // --- INTERACTIONS ---
  // Add, remove allergy/condition, with pill-style chips
  function handleAddAllergy() {
    if (allergyInput.trim())
      setAllergies([...allergies, { tag: allergyInput.trim(), severity: "moderate" }]);
    setAllergyInput("");
  }
  function handleRemoveAllergy(idx) {
    setAllergies(allergies.filter((_, i) => i !== idx));
  }
  function handleAddCondition() {
    if (conditionInput.trim())
      setConditions([...conditions, { tag: conditionInput.trim(), severity: "low" }]);
    setConditionInput("");
  }
  function handleRemoveCondition(idx) {
    setConditions(conditions.filter((_, i) => i !== idx));
  }
  // Severity color
  function pillColor(severity) {
    if (severity === "high") return "#FF6B6B";
    if (severity === "moderate") return "#FFD166";
    return "#00C2A8";
  }

  // Medication toggle
  function toggleMedReminder(idx) {
    const meds = [...medications];
    meds[idx].reminder = !meds[idx].reminder;
    setMedications(meds);
  }

  // Vaccination upload (mock)
  function handleVaxCertUpload(e, vaxId) {
    const file = e.target.files[0];
    setVaccines(
      vaccines.map((vax) =>
        vax.id === vaxId ? { ...vax, certificate: file ? file.name : null } : vax
      )
    );
  }

  // Doc upload (mock)
  function handleDocumentUpload(e) {
    const files = Array.from(e.target.files);
    const newDocs = files.map((f, i) => ({
      id: 'q' + Date.now() + i,
      name: f.name,
      type: f.type.includes("image") ? "img" : f.type.match(/pdf|doc|sheet/) ? "pdf" : "file",
      url: URL.createObjectURL(f),
      group: "Uploaded",
      uploaded: new Date().toISOString().split("T")[0],
    }));
    setDocuments((prev) => [...prev, ...newDocs]);
    setUploadQueue([]);
  }

  // Toggle vaccine panel
  function toggleVaxPanel(id) {
    setShowVax((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  // Document filter
  const filteredDocs = filter
    ? documents.filter((doc) =>
        doc.name.toLowerCase().includes(filter.toLowerCase()) ||
        doc.group.toLowerCase().includes(filter.toLowerCase())
      )
    : documents;

  // --- MAIN RENDER ---
  return (
    <div
      className="health-tracker-root"
      style={{
        fontFamily: "'Inter','Poppins','Roboto',Arial,sans-serif",
        background:
          "linear-gradient(98deg, #f8fafb 12%, #f2fcfa 67%, #fff9f1 99%)",
        minHeight: "calc(100vh - 80px)",
        borderRadius: "26px",
        padding: "14px 2vw 42px 2vw",
        maxWidth: 1320,
        margin: "0 auto 0 auto",
      }}
    >
      {/* Page Heading */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          margin: "40px 0 22px 0",
          gap: 19,
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            fontSize: 45,
            filter: "grayscale(1) contrast(2)",
            WebkitFilter: "grayscale(1) contrast(2)",
            // Remove colored gradient from the emoji for monochrome look
            // No background gradient; force color
            color: "#232323",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            display: "inline-block",
            lineHeight: 1,
          }}
          aria-label="dog"
        >
          {pet.avatar}
        </span>
        <h1
          style={{
            fontSize: "2.25rem",
            fontWeight: 700,
            margin: 0,
            color: "#00A295",
            fontFamily: "'Poppins', 'Inter', Arial, sans-serif",
          }}
        >
          Health Tracker for <span style={{ color: "#FF6B6B" }}>{pet.name}</span>
        </h1>
      </div>
      <div
        style={{
          display: "flex",
          gap: 34,
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        {/* LEFT COLUMN - Timeline/history */}
        <div style={{ flex: 2.2, minWidth: 320, marginRight: 0 }}>
          {/* Medical History Timeline */}
          <section
            className="health-timeline-section"
            style={{
              background: "#fff",
              borderRadius: 22,
              boxShadow: "0 7px 29px #abded738, 0 2px 14px #ff6b6b22",
              padding: "26px 28px 22px 28px",
              marginBottom: 32,
              minHeight: 340,
              border: "2px solid #f7f8fa",
              transition: "box-shadow .19s",
            }}
          >
            <h2
              style={{
                fontSize: "1.2rem",
                fontWeight: 700,
                color: "#00A295",
                margin: "0 0 18px 0",
                letterSpacing: 0.03,
              }}
            >
              <span style={{ fontSize: 22, marginRight: 8 }}>⏳</span> Medical History Timeline
            </h2>
            <ol
              className="ht-timeline"
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: 19,
                position: "relative",
              }}
            >
              {medicalHistory.map((item, idx) => (
                <li
                  key={idx}
                  className="timeline-event"
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 14,
                    position: "relative",
                  }}
                >
                  {/* Vertical line for timeline */}
                  <span
                    style={{
                      width: 7,
                      minWidth: 7,
                      height: "100%",
                      background:
                        idx === 0
                          ? "linear-gradient(120deg, #00C2A8 30%, #FF6B6B 97%)"
                          : "#eaecef",
                      borderRadius: 9,
                      marginRight: 10,
                      marginTop: 5,
                    }}
                  ></span>
                  <span
                    style={{
                      fontSize: 29,
                      filter: "drop-shadow(0 1px 3px #00c2a831)",
                    }}
                    title={item.type}
                  >
                    {item.icon}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontWeight: 600,
                        color:
                          item.status === "complete"
                            ? "#00A295"
                            : item.status === "alert"
                            ? "#FF6B6B"
                            : "#aaa46c",
                        marginBottom: 2,
                        fontFamily: "Poppins,Inter,Arial,sans-serif",
                      }}
                    >
                      {item.type}{" "}
                      <span style={{ marginLeft: 9, fontWeight: 400, color: "#888", fontSize: "0.99em" }}>
                        {item.date}
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: "1.02rem",
                        color: "#344a3f",
                        opacity: 0.9,
                        marginTop: 1,
                        marginBottom: 0,
                      }}
                    >
                      {item.desc}
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: 15,
                      marginLeft: 6,
                      color:
                        item.status === "alert"
                          ? "#FF6B6B"
                          : item.status === "complete"
                          ? "#00C2A8"
                          : "#FFD166",
                      background:
                        item.status === "complete"
                          ? "#e4faf3"
                          : item.status === "alert"
                          ? "#ffdad7"
                          : "#fcf7ea",
                      borderRadius: 8,
                      padding: "2px 9px",
                      fontWeight: 600,
                      transition: "background .18s",
                    }}
                  >
                    {item.status === "complete"
                      ? "✓"
                      : item.status === "alert"
                      ? "!"
                      : "•"}
                  </span>
                </li>
              ))}
            </ol>
          </section>

          {/* Allergies and Conditions - Tag Pills */}
          <section
            className="health-pill-section"
            style={{
              background: "#f8fefa",
              borderRadius: 16,
              boxShadow: "0 1px 7px #ffd16655, 0 1px 8px #00c2a81c",
              padding: "19px 19px 13px 19px",
              marginBottom: 22,
              border: "2px solid #edfaf2",
            }}
          >
            <div
              style={{
                fontWeight: 700,
                color: "#FF6B6B",
                fontSize: "1.12rem",
                marginBottom: 8,
                fontFamily: "Poppins,Inter",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span role="img" aria-label="allergy" style={{ fontSize: 21 }}>
                🌸
              </span>
              Allergies &amp; Medical Conditions
            </div>
            <div style={{ fontWeight: 600, color: "#485", margin: "4px 0 1px 1px", display: "flex", gap: 7 }}>
              Allergies:
              {allergies.map((al, i) => (
                <span
                  key={i}
                  style={{
                    borderRadius: 13,
                    background: pillColor(al.severity) + "22",
                    color: "#FF6B6B",
                    marginLeft: 7,
                    padding: "2.5px 11px",
                    display: "inline-flex",
                    alignItems: "center",
                    fontWeight: 600,
                    boxShadow: "0 1px 5px #ff6b6b2a",
                  }}
                >
                  {al.tag}
                  <button
                    aria-label="Remove allergy"
                    style={{
                      background: "none",
                      border: "none",
                      color: "#c22",
                      fontWeight: "bold",
                      fontSize: 15,
                      cursor: "pointer",
                      marginLeft: 5,
                    }}
                    onClick={() => handleRemoveAllergy(i)}
                    title="Remove"
                  >
                    ×
                  </button>
                </span>
              ))}
              <input
                type="text"
                value={allergyInput}
                placeholder="Add allergy"
                style={{
                  border: "1.3px solid #FF6B6B77",
                  borderRadius: 10,
                  marginLeft: 9,
                  padding: "2px 9px",
                  fontFamily: "Inter,Poppins",
                  width: 90,
                }}
                onChange={(e) => setAllergyInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddAllergy()}
                maxLength={19}
              />
              <button
                style={{
                  background: "linear-gradient(88deg, #FF6B6B 54%, #FFD166 90%)",
                  border: "none",
                  padding: "3px 13px",
                  borderRadius: 9,
                  color: "#fff",
                  fontWeight: 600,
                  marginLeft: 3,
                  cursor: "pointer",
                  fontSize: 14,
                }}
                onClick={handleAddAllergy}
                title="Add allergy"
                tabIndex={0}
              >
                Add +
              </button>
            </div>
            <div style={{ fontWeight: 600, color: "#00A295", margin: "8px 0 3px 1px", display: "flex", gap: 8 }}>
              Conditions:
              {conditions.map((cond, i) => (
                <span
                  key={i}
                  style={{
                    borderRadius: 13,
                    background: pillColor(cond.severity) + "22",
                    color: "#00C2A8",
                    marginLeft: 7,
                    padding: "2.5px 11px",
                    display: "inline-flex",
                    alignItems: "center",
                    fontWeight: 600,
                    boxShadow: "0 1px 5px #00c2a82b",
                  }}
                >
                  {cond.tag}
                  <button
                    aria-label="Remove condition"
                    style={{
                      background: "none",
                      border: "none",
                      color: "#00897b",
                      fontWeight: "bold",
                      fontSize: 15,
                      cursor: "pointer",
                      marginLeft: 5,
                    }}
                    onClick={() => handleRemoveCondition(i)}
                    title="Remove"
                  >
                    ×
                  </button>
                </span>
              ))}
              <input
                type="text"
                value={conditionInput}
                placeholder="Add condition"
                style={{
                  border: "1.3px solid #00C2A877",
                  borderRadius: 10,
                  marginLeft: 9,
                  padding: "2px 9px",
                  fontFamily: "Inter,Poppins",
                  width: 90,
                }}
                onChange={(e) => setConditionInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddCondition()}
                maxLength={19}
              />
              <button
                style={{
                  background: "linear-gradient(77deg, #00C2A8 64%, #FFD166 100%)",
                  border: "none",
                  padding: "3px 13px",
                  borderRadius: 9,
                  color: "#fff",
                  fontWeight: 600,
                  marginLeft: 3,
                  cursor: "pointer",
                  fontSize: 14,
                }}
                onClick={handleAddCondition}
                title="Add condition"
                tabIndex={0}
              >
                Add +
              </button>
            </div>
          </section>
          {/* Medication Tracker */}
          <section
            className="medication-section"
            style={{
              background: "#fff",
              borderRadius: 16,
              boxShadow: "0 1px 8px #00c2a838, 0 1px 9px #ffd1661c",
              padding: "16px 19px",
              marginBottom: 24,
              border: "2px solid #eafcf7",
            }}
          >
            <div
              style={{
                fontWeight: 700,
                color: "#00A295",
                fontSize: "1.12rem",
                marginBottom: 7,
                fontFamily: "Poppins,Inter",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span role="img" aria-label="medication" style={{ fontSize: 21 }}>
                💊
              </span>
              Medication Tracker
            </div>
            <div
              className="medications-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(205px,1fr))",
                gap: 12,
                alignItems: "stretch",
              }}
            >
              {medications.map((med, i) => (
                <div
                  key={i}
                  className="medication-card"
                  style={{
                    background: "#f7faf7",
                    borderRadius: 13,
                    padding: "10px 13px",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "0 1px 8px #00c2a827",
                    border: "2px solid #00C2A825",
                  }}
                >
                  <div
                    style={{
                      color: "#112",
                      fontWeight: 700,
                      fontFamily: "Poppins",
                      fontSize: "1.1em",
                      marginBottom: 4,
                    }}
                  >
                    {med.name}{" "}
                    <span
                      style={{
                        fontSize: 11.5,
                        fontWeight: 500,
                        color: "#00C2A8",
                        marginLeft: 7,
                        background: "#e4faf3",
                        borderRadius: 7,
                        padding: "0.5px 6px",
                      }}
                    >
                      {med.time}
                    </span>
                  </div>
                  <div style={{ fontSize: 13, color: "#4da", marginBottom: 3 }}>
                    Status:{" "}
                    <span style={{ color: med.status === "active" ? "#00C2A8" : "#FFD166", fontWeight: 600 }}>
                      {med.status}
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <label style={{ fontSize: 13, color: "#444" }}>
                      Reminder
                      <input
                        aria-label="Medication Reminder"
                        type="checkbox"
                        style={{
                          marginLeft: 7,
                          transform: "scale(1.18)",
                          accentColor: "#00C2A8",
                        }}
                        checked={!!med.reminder}
                        onChange={() => toggleMedReminder(i)}
                      />
                    </label>
                    <span
                      style={{
                        marginLeft: "auto",
                        color: "#FFD166",
                        fontSize: 19,
                      }}
                      role="img"
                      aria-label="reminder"
                    >
                      {med.reminder ? "⏰" : "🔕"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
        {/* END LEFT */}

        {/* RIGHT COLUMN - Summary, vax, vet, docs */}
        <div style={{ flex: 1.7, minWidth: 310, maxWidth: 440 }}>
          {/* Summary Card */}
          <section
            className="summary-card"
            style={{
              background: "#fff",
              borderRadius: 22,
              boxShadow: "0 7px 32px #00c2a82c, 0 4px 18px #ffd16633",
              minHeight: 108,
              marginBottom: 30,
              padding: "22px 23px",
              display: "flex",
              alignItems: "center",
              gap: 19,
              border: "2px solid #e4faf3",
            }}
          >
            <img
              src={pet.photo}
              alt="Pet avatar"
              style={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                boxShadow: "0 2px 13px #00c2a82b",
                border: "4px solid #edfaf2",
                background: "#f8fefa",
                objectFit: "cover",
                marginRight: 6,
              }}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: "1.17rem",
                  color: "#00A295",
                  marginBottom: 1,
                }}
              >
                <span role="img" aria-label="badge">
                  🩺
                </span>{" "}
                {pet.healthStatus}
                <span
                  style={{
                    fontSize: 13,
                    marginLeft: 10,
                    background: "#00C2A822",
                    color: "#00C2A8",
                    borderRadius: 9,
                    padding: "2.2px 9px",
                    fontWeight: 600,
                  }}
                >
                  {pet.weightKg}kg
                </span>
              </div>
              <div style={{ fontSize: ".99rem", color: "#f35c59", fontWeight: 500 }}>
                <span role="img" aria-label="calendar">
                  🗓️
                </span>{" "}
                Last Vet: {pet.lastVet} <span style={{ color: "#00C2A8", marginLeft: 9 }}>Next: {pet.nextVet}</span>
              </div>
              <div style={{ marginTop: 5 }}>
                {pet.colorTags.map((tag, i) => (
                  <span
                    style={{
                      background: i % 2 ? "#ffdadb" : "#e4faf3",
                      color: i % 2 ? "#FF6B6B" : "#00C2A8",
                      borderRadius: 8,
                      fontSize: 13,
                      fontWeight: 600,
                      padding: "2px 9px",
                      marginRight: 7,
                    }}
                    key={i}
                  >
                    <span role="img" aria-label="tag">
                      {i % 2 ? "🏷️" : "✨"}
                    </span>{" "}
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </section>
          {/* Vaccination Records */}
          <section
            className="vax-section"
            style={{
              background: "#fdfaf6",
              borderRadius: 18,
              boxShadow: "0 1px 11px #ffd16638, 0 1px 8px #FF6B6B12",
              padding: "18px 15px",
              marginBottom: 23,
              border: "2px solid #FFF6E4",
            }}
          >
            <div
              style={{
                fontWeight: 700,
                color: "#FFD166",
                fontSize: "1.1rem",
                marginBottom: 6,
                fontFamily: "Poppins",
                display: "flex",
                alignItems: "center",
                gap: 7,
              }}
            >
              <span role="img" aria-label="vaccine" style={{ fontSize: 20 }}>
                💉
              </span>
              Vaccination Records
            </div>
            <div>
              {vaccines.map((vax) => (
                <div
                  key={vax.id}
                  style={{
                    background: "#fff",
                    borderRadius: 10,
                    boxShadow: "0 1.5px 6px #ffd16622",
                    margin: "11px 0",
                    padding: "9px 14px 7px 12px",
                    border: vax.complete
                      ? "2px solid #e4faf3"
                      : "2px solid #ffd16655",
                    cursor: "pointer",
                    transition: "box-shadow .16s",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      fontWeight: 600,
                      fontSize: 15.5,
                      color: vax.complete ? "#00C2A8" : "#FF6B6B",
                    }}
                    onClick={() => toggleVaxPanel(vax.id)}
                    role="button"
                    aria-label="Toggle vaccine details"
                  >
                    {vax.complete ? (
                      <span role="img" aria-label="done">
                        ✅
                      </span>
                    ) : (
                      <span role="img" aria-label="pending">
                        ⏳
                      </span>
                    )}
                    {vax.name}
                    <span
                      style={{
                        background: "#FFF6E4",
                        color: "#FFD166",
                        borderRadius: 8,
                        fontSize: 13,
                        fontWeight: 600,
                        padding: "2.5px 7px",
                        marginLeft: "auto",
                      }}
                    >
                      {vax.date}
                    </span>
                    <span style={{ marginLeft: 9, fontSize: 17 }}>
                      {showVax[vax.id] ? "▼" : "▶"}
                    </span>
                  </div>
                  {showVax[vax.id] && (
                    <div
                      style={{
                        marginTop: 7,
                        paddingLeft: 22,
                      }}
                    >
                      Certificate:{" "}
                      {vax.certificate ? (
                        <span>
                          <span role="img" aria-label="file">
                            📄
                          </span>{" "}
                          {vax.certificate}
                        </span>
                      ) : (
                        <label
                          style={{
                            color: "#00C2A8",
                            fontWeight: 600,
                            cursor: "pointer",
                          }}
                        >
                          <input
                            type="file"
                            style={{ display: "none" }}
                            onChange={(e) => handleVaxCertUpload(e, vax.id)}
                          />
                          Upload Certificate
                        </label>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
          {/* Veterinarian Info Panel */}
          <section
            className="vet-info-panel"
            style={{
              background: "#F8FEFC",
              borderRadius: 17,
              boxShadow: "0 1.5px 7px #00C2A832",
              padding: "13px 17px",
              marginBottom: 22,
              border: "2px solid #e4faf3",
            }}
          >
            <div
              style={{
                fontWeight: 700,
                color: "#00C2A8",
                fontSize: "1.06rem",
                display: "flex",
                alignItems: "center",
                gap: 7,
                marginBottom: 4,
                fontFamily: "Inter,Poppins",
              }}
            >
              <span role="img" aria-label="vet" style={{ fontSize: 18 }}>
                {vet.avatar}
              </span>
              Veterinarian Info
            </div>
            <div style={{ fontWeight: 500, color: "#2c6c54", fontSize: "0.98rem" }}>
              Clinic:{" "}
              <span style={{ color: "#484", fontWeight: 600 }}>
                {vet.clinic}
              </span>
            </div>
            <div style={{ fontWeight: 500, color: "#6A6A7A", fontSize: "0.97rem" }}>
              Doctor: <span style={{ color: "#346", fontWeight: 600 }}>{vet.doctor}</span>
            </div>
            <div style={{ fontSize: ".99rem", color: "#848", margin: "4px 0 1px" }}>
              <span role="img" aria-label="address">
                📍
              </span>
              {vet.address}
            </div>
            <div style={{ marginTop: 2, display: "flex", gap: 18 }}>
              <a
                href={`tel:${vet.phone}`}
                style={{
                  background: "linear-gradient(88deg,#00C2A8 56%,#00A295 99%)",
                  color: "#fff",
                  borderRadius: 8,
                  fontWeight: 600,
                  padding: "2.5px 14px",
                  textDecoration: "none",
                  fontSize: ".97rem",
                  boxShadow: "0 1px 6px #00c2a81c",
                }}
                title="Call Vet"
              >
                Call {vet.phone}
              </a>
              <a
                href={`mailto:${vet.email}`}
                style={{
                  background: "linear-gradient(88deg,#FF6B6B 56%,#FFD166 99%)",
                  color: "#fff",
                  borderRadius: 8,
                  fontWeight: 600,
                  padding: "2.5px 14px",
                  textDecoration: "none",
                  fontSize: ".97rem",
                  boxShadow: "0 1px 6px #ffd9661c",
                }}
                title="Email Vet"
              >
                Email
              </a>
            </div>
          </section>
          {/* Health Documents Upload */}
          <section
            className="doc-upload-panel"
            style={{
              background: "#F7FAFE",
              borderRadius: 19,
              boxShadow: "0 2px 12px #00c2a818",
              padding: "15px 12px 20px 12px",
              border: "2px solid #eafcf7",
            }}
          >
            <div
              style={{
                fontWeight: 700,
                color: "#00A295",
                fontSize: "1.05rem",
                marginBottom: 3,
                fontFamily: "Poppins,Inter,sans-serif",
                display: "flex",
                alignItems: "center",
                gap: 7,
              }}
            >
              <span role="img" aria-label="doc" style={{ fontSize: 18 }}>
                📄
              </span>
              Health Documents
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              style={{ marginBottom: 8 }}
              autoComplete="off"
            >
              <input
                type="text"
                placeholder="Filter/search documents..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                style={{
                  width: "97%",
                  border: "1.7px solid #00C2A877",
                  borderRadius: 9,
                  padding: "3.7px 8px",
                  fontSize: ".97rem",
                  fontFamily: "Inter,Poppins",
                  marginBottom: 6,
                  background: "#fff",
                  color: "#346",
                }}
              />
            </form>
            <div
              className="docs-list"
              style={{
                maxHeight: 160,
                overflowY: "auto",
                background: "#fff",
                borderRadius: 8,
                boxShadow: "0 1.5px 7px #ffd16619",
                padding: "7px 4px",
                marginBottom: 7,
              }}
            >
              {filteredDocs.length === 0 ? (
                <div style={{ color: "#aaa", fontStyle: "italic", fontSize: ".98em" }}>
                  No documents found.
                </div>
              ) : (
                filteredDocs.map((doc) => (
                  <div
                    key={doc.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 9,
                      padding: "4px 6px",
                      background: "#f8fafd",
                      borderRadius: 7,
                      marginBottom: 4,
                    }}
                  >
                    <span style={{ fontSize: 23, color: "#FFD166" }}>
                      {doc.type === "pdf"
                        ? "📄"
                        : doc.type === "img"
                        ? "🖼️"
                        : "📄"}
                    </span>
                    <span
                      style={{ flex: 1, color: "#222", fontSize: ".99em", fontWeight: 500 }}
                    >
                      {doc.name}
                    </span>
                    <span
                      style={{
                        fontSize: 11,
                        color: "#888",
                        background: "#e4faf3",
                        borderRadius: 6,
                        padding: "0.5px 6px",
                      }}
                    >
                      {doc.group}
                    </span>
                    <span
                      style={{
                        fontSize: 10,
                        color: "#AAA",
                        background: "#edfaf2",
                        borderRadius: 6,
                        padding: "0.5px 6px",
                      }}
                    >
                      {doc.uploaded}
                    </span>
                  </div>
                ))
              )}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // handleDocumentUpload
              }}
            >
              <label
                style={{
                  display: "block",
                  background: "linear-gradient(99deg,#00C2A8 54%,#00A295 99%)",
                  color: "#fff",
                  borderRadius: 8,
                  fontWeight: 600,
                  padding: "5.5px 20px",
                  fontSize: ".98rem",
                  boxShadow: "0 1px 10px #00c2a826",
                  cursor: "pointer",
                  margin: "6px 0 0 0",
                  textAlign: "center",
                }}
                aria-label="Upload Document"
              >
                <span role="img" aria-label="upload">
                  ⬆️
                </span>{" "}
                Upload Documents
                <input
                  type="file"
                  style={{ display: "none" }}
                  multiple
                  onChange={handleDocumentUpload}
                />
              </label>
            </form>
          </section>
        </div>
      </div>
      {/* Responsive stacking via flex (use CSS media queries in actual CSS file) */}
    </div>
  );
}

export default HealthTracker;
