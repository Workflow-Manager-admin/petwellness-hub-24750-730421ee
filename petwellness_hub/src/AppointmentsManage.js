import React, { useState } from "react";
import "./AppointmentsManage.css";

/*
  AppointmentsManage Component - Isolated, full-featured Appointments > Manage page.
  All logic, helpers, and UI sections are localized to this file. Styles in AppointmentsManage.css.

  - Modern UI/UX, pastel and gradient backgrounds, rounded cards, icons, soft-shadow.
  - Sections: Upcoming (list/cards/table), Calendar (month/week, filters), Multi-step Booking Form, History, Reminders/Notifications, and Document preview/upload for appointments.
  - Accessible, responsive for desktop/mobile.
*/

// --- Helpers: Mock data/Reusable constants ---
const pets = [
  { id: 1, name: "Bella", type: "Dog", avatar: "🐶" },
  { id: 2, name: "Luna", type: "Cat", avatar: "🐱" },
  { id: 3, name: "Rocky", type: "Dog", avatar: "🐕" },
];
const veterinarians = [
  { id: 1, name: "Dr. Green", location: "Pawsitive Vet Clinic" },
  { id: 2, name: "Dr. Lee", location: "Happy Tails Animal Hospital" },
];

const appointmentTypes = [
  { key: "checkup", label: "Checkup", icon: "🧺" },
  { key: "vaccination", label: "Vaccination", icon: "💉" },
  { key: "grooming", label: "Grooming", icon: "✂️" },
  { key: "surgery", label: "Surgery", icon: "🏥" },
  { key: "other", label: "Other", icon: "📋" },
];

const reminderIcons = {
  default: "🔔",
  important: "❗",
  appt: "📅",
  done: "✅",
};

const mockUpcoming = [
  {
    id: 101,
    petId: 1,
    type: "checkup",
    datetime: "2024-06-23T10:00",
    status: "scheduled",
    vet: veterinarians[0].name,
    notes: "Annual wellness exam",
    hasDocuments: true,
  },
  {
    id: 102,
    petId: 2,
    type: "vaccination",
    datetime: "2024-06-25T14:30",
    status: "scheduled",
    vet: veterinarians[1].name,
    notes: "Rabies booster",
    hasDocuments: false,
  },
  {
    id: 103,
    petId: 1,
    type: "grooming",
    datetime: "2024-06-30T16:30",
    status: "scheduled",
    vet: "-",
    notes: "Full grooming",
    hasDocuments: false,
  },
];

const mockHistory = [
  {
    id: 201,
    petId: 1,
    type: "checkup",
    datetime: "2024-03-10T09:30",
    vet: veterinarians[0].name,
    notes: "Dental cleaning. All good.",
    hasDocuments: true,
  },
  {
    id: 202,
    petId: 2,
    type: "vaccination",
    datetime: "2023-12-01T13:00",
    vet: veterinarians[1].name,
    notes: "FVRCP. No reaction.",
    hasDocuments: false,
  },
];

const mockReminders = [
  {
    id: 1,
    icon: reminderIcons.appt,
    text: "Vet (Bella): Tomorrow at 10:00 AM",
    time: "2024-06-23T10:00",
    done: false,
  },
  {
    id: 2,
    icon: reminderIcons.appt,
    text: "Vaccination (Luna): June 25, 2:30 PM",
    time: "2024-06-25T14:30",
    done: false,
  },
  {
    id: 3,
    icon: reminderIcons.important,
    text: "Re-book missed: Grooming (Rocky)",
    time: "",
    done: false,
  },
];

// Utility: Find pet by id
function getPet(pid) {
  return pets.find((p) => p.id === pid) || { name: "Unknown", avatar: "🦎" };
}
// Utility: Find type display for appointment
function getTypeObj(key) {
  return appointmentTypes.find((t) => t.key === key) || { label: key, icon: "📋" };
}

function renderStepPet({ bookingForm, errors, onInput }) {
  return (
    <div className="booking-step-content">
      <label style={{color: "#000"}}>Pet <span className="asterisk" style={{color: "#000"}}>*</span></label>
      <select name="petId" value={bookingForm.petId} onChange={onInput} style={{ color: "#000", borderColor: "#000", background: "#fff" }}>
        <option value="">Select pet...</option>
        {pets.map((p) => <option value={p.id} key={p.id}>{p.avatar} {p.name}</option>)}
      </select>
      {errors.petId && <div className="booking-error" style={{color:"#000"}}>{errors.petId}</div>}
    </div>
  );
}
function renderStepType({ bookingForm, errors, onInput }) {
  return (
    <div className="booking-step-content">
      <label style={{color:"#000"}}>Appointment Type <span className="asterisk" style={{color:"#000"}}>*</span></label>
      <div className="booking-type-grid">
        {appointmentTypes.map((t) => (
          <button
            key={t.key}
            type="button"
            className={`appt-type-btn${bookingForm.type === t.key ? " selected" : ""}`}
            style={{
              color: "#000",
              borderColor: "#000",
              background: bookingForm.type === t.key ? "#e7eafb" : "#fff"
            }}
            onClick={() => onInput({ target: { name: "type", value: t.key } })}
          >
            <span className="appt-type-icon" style={{color:"#000"}}>{t.icon}</span> {t.label}
          </button>
        ))}
      </div>
      {errors.type && <div className="booking-error" style={{color:"#000"}}>{errors.type}</div>}
    </div>
  );
}
function renderStepTime({ bookingForm, errors, onInput }) {
  // Suggest nearest available slot
  const minDate = new Date().toISOString().split("T")[0];
  return (
    <div className="booking-step-content">
      <label htmlFor="date" style={{color:"#000"}}>Date <span className="asterisk" style={{color:"#000"}}>*</span></label>
      <input
        type="date"
        id="date"
        name="date"
        min={minDate}
        value={bookingForm.date}
        onChange={onInput}
        style={{ color: "#000", borderColor: "#000", background: "#fff" }}
      />
      {errors.date && <div className="booking-error" style={{color:"#000"}}>{errors.date}</div>}
      <label htmlFor="time" style={{color:"#000"}}>Time <span className="asterisk" style={{color:"#000"}}>*</span></label>
      <input
        type="time"
        id="time"
        name="time"
        value={bookingForm.time}
        onChange={onInput}
        style={{ color: "#000", borderColor: "#000", background: "#fff" }}
      />
      {errors.time && <div className="booking-error" style={{color:"#000"}}>{errors.time}</div>}
      {/* Suggestions */}
      <div className="booking-tips">
        <small style={{color:"#000"}}>Next available: 10:30 AM, 1:30 PM, 3:00 PM</small>
      </div>
    </div>
  );
}
function renderStepVet({ bookingForm, errors, onInput }) {
  return (
    <div className="booking-step-content">
      <label style={{color:"#000"}}>Veterinarian <span className="asterisk" style={{color:"#000"}}>*</span></label>
      <select name="vetId" value={bookingForm.vetId} onChange={onInput} style={{ color: "#000", borderColor: "#000", background: "#fff" }}>
        <option value="">Choose vet...</option>
        {veterinarians.map((v) => <option value={v.id} key={v.id}>{v.name} – {v.location}</option>)}
      </select>
      {errors.vetId && <div className="booking-error" style={{color:"#000"}}>{errors.vetId}</div>}
    </div>
  );
}
function renderStepDocuments({ bookingForm, errors, onInput }) {
  return (
    <div className="booking-step-content">
      <label style={{color:"#000"}}>Attach Documents (optional):</label>
      <input
        type="file"
        name="attachments"
        multiple
        onChange={onInput}
        accept="image/*,application/pdf"
        style={{color: "#000", borderColor: "#000", background: "#fff"}}
      />
      {/* Preview attached files */}
      {bookingForm.attachments && bookingForm.attachments.length > 0 &&
        <div className="booking-attachments-preview">
          {bookingForm.attachments.map((f, idx) => (
            <div className="booking-attachment" key={idx} style={{color:"#000"}}>
              <IconUI name={f.type === "img" ? "img" : "doc"} />
              <span className="attach-filename">{f.filename}</span>
            </div>
          ))}
        </div>
      }
    </div>
  );
}
function renderStepConfirm({ bookingForm, errors }) {
  const pet = getPet(bookingForm.petId);
  const type = getTypeObj(bookingForm.type);
  const vet = veterinarians.find(v => v.id === parseInt(bookingForm.vetId));
  return (
    <div className="booking-step-content" style={{color:"#000"}}>
      <h3 style={{color:"#000"}}>Review Appointment</h3>
      <div className="booking-confirm-field">
        <b className="label-status-info" style={{color:"#000"}}>Pet:</b>
        <span className="appt-detail-output" style={{color:"#000"}}> {pet.avatar} {pet.name}</span>
      </div>
      <div className="booking-confirm-field">
        <b className="label-status-info" style={{color:"#000"}}>Type:</b>
        <span className="appt-detail-output" style={{color:"#000"}}> {type.icon} {type.label}</span>
      </div>
      <div className="booking-confirm-field">
        <b className="label-status-info" style={{color:"#000"}}>Date:</b>
        <span className="appt-detail-output" style={{color:"#000"}}> {bookingForm.date}</span>
      </div>
      <div className="booking-confirm-field">
        <b className="label-status-info" style={{color:"#000"}}>Time:</b>
        <span className="appt-detail-output" style={{color:"#000"}}> {bookingForm.time}</span>
      </div>
      <div className="booking-confirm-field">
        <b className="label-status-info" style={{color:"#000"}}>Veterinarian:</b>
        <span className="appt-detail-output" style={{color:"#000"}}> {vet ? vet.name : ""}</span>
      </div>
      <div className="booking-confirm-field">
        <b className="label-status-info" style={{color:"#000"}}>Notes:</b>
        <span className="appt-detail-output" style={{color:"#000"}}> {bookingForm.note}</span>
      </div>
      <div className="booking-confirm-field">
        <b className="label-status-info" style={{color:"#000"}}>Attachments:</b>
        <span className="appt-detail-output" style={{color:"#000"}}>
          {(bookingForm.attachments || []).map((f, i) => (
            <span key={i}>{f.filename}&nbsp;</span>
          ))}
        </span>
      </div>
    </div>
  );
}

// --- Main Component ---
function AppointmentsManage() {
  // State for active tab/section
  const [activeView, setActiveView] = useState("upcoming"); // "upcoming", "calendar", "history", "reminders"
  // Modal/Popup/Drawer states
  const [showBooking, setShowBooking] = useState(false);
  const [bookingStep, setBookingStep] = useState(0);
  const [bookingForm, setBookingForm] = useState(defaultBookingForm());
  const [bookingErrors, setBookingErrors] = useState({});
  const [showApptModal, setShowApptModal] = useState({ open: false, appt: null, type: null });
  const [showDocPreview, setShowDocPreview] = useState(null);

  // Demo state for data (would be from backend/context)
  const [upcoming, setUpcoming] = useState([...mockUpcoming]);
  const [history, setHistory] = useState([...mockHistory]);
  const [reminders, setReminders] = useState([...mockReminders]);

  // Document store per appointmentId
  const [documents, setDocuments] = useState({
    101: [
      { filename: "VetReport2024.pdf", type: "pdf", url: "#" },
      { filename: "Bella-checkup.png", type: "img", url: "https://api.dicebear.com/7.x/adventurer/svg?seed=bella" }
    ],
    201: [{ filename: "Dental2024.pdf", type: "pdf", url: "#" }]
  });

  // --- CALENDAR LOGIC (simplified for demo only) ---
  const todayDate = new Date().toISOString().split("T")[0];
  const [calendarPetId, setCalendarPetId] = useState("");

  function fmtDate(dt, withTime = true) {
    const d = new Date(dt);
    return d.toLocaleString(undefined, {
      weekday: withTime ? "short" : undefined,
      month: "short",
      day: "numeric",
      hour: withTime ? "2-digit" : undefined,
      minute: withTime ? "2-digit" : undefined,
    });
  }

  function openBooking() {
    setBookingForm(defaultBookingForm());
    setBookingStep(0);
    setShowBooking(true);
    setBookingErrors({});
  }
  function closeBooking() {
    setShowBooking(false);
    setBookingStep(0);
    setBookingErrors({});
  }

  function handleBookingStepNext() {
    const current = validateBookingStep(bookingStep, bookingForm);
    if (current.valid) {
      if (bookingStep === BOOKING_STEPS.length - 1) {
        const newAppt = {
          id: Math.floor(Math.random() * 1000000) + 200,
          petId: bookingForm.petId,
          type: bookingForm.type,
          datetime: bookingForm.date + "T" + bookingForm.time,
          status: "scheduled",
          vet: veterinarians.find((v) => v.id === parseInt(bookingForm.vetId))?.name || "-",
          notes: bookingForm.note,
          hasDocuments: (bookingForm.attachments || []).length > 0
        };
        setUpcoming((prev) => [...prev, newAppt]);
        if (bookingForm.attachments?.length) {
          setDocuments((docs) => ({ ...docs, [newAppt.id]: [...bookingForm.attachments] }));
        }
        closeBooking();
      } else {
        setBookingStep((n) => n + 1);
        setBookingErrors({});
      }
    } else {
      setBookingErrors({ ...bookingErrors, ...current.errors });
    }
  }
  function handleBookingStepBack() {
    if (bookingStep > 0) setBookingStep((n) => n - 1);
  }
  function handleBookingInput(e) {
    const { name, value, files } = e.target;
    setBookingForm((form) => {
      if (name === "attachments") {
        return { ...form, attachments: Array.from(files).map((f) => ({ filename: f.name, type: getFileType(f), file: f, url: URL.createObjectURL(f) })) };
      }
      return { ...form, [name]: value };
    });
  }

  const BOOKING_STEPS = [
    { label: "Select Pet", render: renderStepPet },
    { label: "Appointment Type", render: renderStepType },
    { label: "Date & Time", render: renderStepTime },
    { label: "Veterinarian", render: renderStepVet },
    { label: "Add Documents", render: renderStepDocuments },
    { label: "Notes & Confirm", render: renderStepConfirm },
  ];
  function defaultBookingForm() {
    return { petId: "", type: "", date: "", time: "", vetId: "", note: "", attachments: [] };
  }
  function validateBookingStep(step, form) {
    let errors = {};
    let valid = true;
    switch (step) {
      case 0: if (!form.petId) { errors.petId = "Pet required"; valid = false; } break;
      case 1: if (!form.type) { errors.type = "Type required"; valid = false; } break;
      case 2:
        if (!form.date) { errors.date = "Date required"; valid = false; }
        if (!form.time) { errors.time = "Time required"; valid = false; }
        break;
      case 3: if (!form.vetId) { errors.vetId = "Vet required"; valid = false; } break;
      default: break;
    }
    return { valid, errors };
  }
  function getFileType(file) {
    if (file.type.startsWith("image/")) return "img";
    if (file.type === "application/pdf") return "pdf";
    return "doc";
  }

  function openApptModal(type, appt) {
    setShowApptModal({ open: true, appt, type });
  }
  function closeApptModal() {
    setShowApptModal({ open: false, appt: null, type: null });
  }

  function markReminderDone(rid) {
    setReminders((rs) =>
      rs.map((r) => (r.id === rid ? { ...r, done: true } : r))
    );
  }

  function handleDocDelete(apptId, idx) {
    setDocuments((docs) => {
      const newDocs = { ...docs };
      if (newDocs[apptId]) {
        newDocs[apptId] = newDocs[apptId].filter((_, i) => i !== idx);
      }
      return newDocs;
    });
  }

  // --- Render Section: Upcoming (Update: headline uses green class, appointment item spacing via CSS only) ---
  function renderUpcoming() {
    return (
      <section className="appt-section">
        <div className="section-header">
          <h2 className="upcoming-appts-heading">
            <IconUI name="calendar" /> Upcoming Appointments
          </h2>
          <button className="btn-primary" onClick={openBooking}>
            <IconUI name="plus" /> Book Appointment
          </button>
        </div>
        <div className="appt-list">
          {upcoming.length === 0 ? (
            <div className="no-appts-msg">No upcoming appointments.</div>
          ) : (
            upcoming
              .sort((a, b) => new Date(a.datetime) - new Date(b.datetime))
              .map((appt) => (
                <div className="appt-card card-shadow" key={appt.id}>
                  <div className="appt-card-header">
                    <span className="appt-type-icon">{getTypeObj(appt.type).icon}</span>
                    <span className="appt-type label-status-info">{getTypeObj(appt.type).label}</span>
                    <span className={`appt-status appt-status-${appt.status}`}>
                      {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                    </span>
                  </div>
                  <div className="appt-info-row">
                    <span className="appt-pet appt-detail-output">{getPet(appt.petId).avatar} {getPet(appt.petId).name}</span>
                    <span className="appt-time appt-detail-output">
                      <IconUI name="clock" /> {fmtDate(appt.datetime)}
                    </span>
                  </div>
                  <div className="appt-info-row">
                    <span className="appt-vet appt-detail-output">
                      <IconUI name="vet" /> {appt.vet}
                    </span>
                    <span className="appt-docs">
                      {appt.hasDocuments || (documents[appt.id]?.length > 0) ? (
                        <button className="doc-btn" onClick={() => setShowDocPreview(appt.id)} title="Preview documents">
                          <IconUI name="doc" /> Docs
                        </button>
                      ) : null}
                    </span>
                  </div>
                  <div className="appt-notes appt-detail-output">{appt.notes}</div>
                  <div className="appt-card-actions">
                    <button onClick={() => openApptModal("details", appt)}><IconUI name="info" /> Details</button>
                    <button onClick={() => openApptModal("edit", appt)}><IconUI name="edit" /> Edit</button>
                    <button className="btn-cancel" onClick={() => openApptModal("cancel", appt)}><IconUI name="cancel" /> Cancel</button>
                  </div>
                </div>
              ))
          )}
        </div>
        {showDocPreview && (
          <Modal onClose={() => setShowDocPreview(null)}>
            <DocPreview
              docs={documents[showDocPreview] || []}
              onDelete={(idx) => handleDocDelete(showDocPreview, idx)}
            />
          </Modal>
        )}
        {showApptModal.open && (
          <Modal onClose={closeApptModal}>
            <ApptModal modal={showApptModal} close={closeApptModal} />
          </Modal>
        )}
        {showBooking && (
          <Modal onClose={closeBooking} wide={true}>
            <BookingWizard
              step={bookingStep}
              setStep={setBookingStep}
              bookingForm={bookingForm}
              setBookingForm={setBookingForm}
              errors={bookingErrors}
              onInput={handleBookingInput}
              onContinue={handleBookingStepNext}
              onBack={handleBookingStepBack}
              onClose={closeBooking}
            />
          </Modal>
        )}
      </section>
    );
  }

  function renderCalendar() {
    const filtered = calendarPetId
      ? upcoming.filter((a) => a.petId === parseInt(calendarPetId))
      : upcoming;
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const apptsByDay = {};
    filtered.forEach(appt => {
      const day = new Date(appt.datetime).getDate();
      if (!apptsByDay[day]) apptsByDay[day] = [];
      apptsByDay[day].push(appt);
    });
    return (
      <section className="appt-section">
        <div className="section-header">
          <h2><IconUI name="calendar" /> Calendar View</h2>
          <div className="calendar-filters">
            <label>
              Pet:&nbsp;
              <select value={calendarPetId} onChange={e => setCalendarPetId(e.target.value)}>
                <option value="">All Pets</option>
                {pets.map(p => <option value={p.id} key={p.id}>{p.avatar} {p.name}</option>)}
              </select>
            </label>
          </div>
        </div>
        <div className="calendar-grid">
          {[...Array(daysInMonth).keys()].map(d => {
            const day = d + 1;
            const appts = apptsByDay[day] || [];
            const isToday = todayDate === `${year}-${(month + 1).toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
            return (
              <div className={`calendar-day${isToday ? " calendar-today" : ""}`} key={day}>
                <span className="calendar-day-num">{day}</span>
                {appts.length > 0 && (
                  <div className="calendar-appts">
                    {appts.map((a, idx) => (
                      <span
                        className="calendar-appt-dot"
                        key={a.id}
                        title={`${fmtDate(a.datetime)}: ${getTypeObj(a.type).label} (${getPet(a.petId).name})`}
                        style={{ background: pastelColor(a.type) }}
                        onClick={() => openApptModal("details", a)}
                      >
                        {getTypeObj(a.type).icon}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {showApptModal.open && (
          <Modal onClose={closeApptModal}>
            <ApptModal modal={showApptModal} close={closeApptModal} />
          </Modal>
        )}
      </section>
    );
  }

  function renderHistory() {
    return (
      <section className="appt-section">
        <div className="section-header">
          <h2><IconUI name="history" /> Past Appointments</h2>
        </div>
        <div className="appt-list appt-history-list">
          {history.length === 0 ? (
            <div className="no-appts-msg">No appointment history yet.</div>
          ) : (
            history
              .sort((a, b) => new Date(b.datetime) - new Date(a.datetime))
              .map((appt) => (
                <div className="appt-card card-shadow" key={appt.id}>
                  <div className="appt-card-header">
                    <span className="appt-type-icon">{getTypeObj(appt.type).icon}</span>
                    <span className="appt-type label-status-info">{getTypeObj(appt.type).label}</span>
                    <span className="appt-vet label-status-info">
                      <IconUI name="vet" /> {appt.vet}
                    </span>
                  </div>
                  <div className="appt-info-row">
                    <span className="appt-pet appt-detail-output">{getPet(appt.petId).avatar} {getPet(appt.petId).name}</span>
                    <span className="appt-time appt-detail-output">
                      <IconUI name="clock" /> {fmtDate(appt.datetime)}
                    </span>
                  </div>
                  <div className="appt-notes appt-detail-output">{appt.notes}</div>
                  <div className="appt-card-actions">
                    <button onClick={() => openApptModal("details", appt)}><IconUI name="info" /> Details</button>
                    <button onClick={() => {
                      setBookingForm({
                        petId: appt.petId + "",
                        type: appt.type,
                        date: "",
                        time: "",
                        vetId: veterinarians.find((v) => v.name === appt.vet)?.id + "" || "",
                        note: appt.notes,
                        attachments: [],
                      });
                      setBookingStep(0);
                      setShowBooking(true);
                      setBookingErrors({});
                    }}>
                      <IconUI name="plus" /> Rebook
                    </button>
                  </div>
                </div>
              ))
          )}
        </div>
        {showApptModal.open && (
          <Modal onClose={closeApptModal}>
            <ApptModal modal={showApptModal} close={closeApptModal} />
          </Modal>
        )}
        {showBooking && (
          <Modal onClose={closeBooking} wide={true}>
            <BookingWizard
              step={bookingStep}
              setStep={setBookingStep}
              bookingForm={bookingForm}
              setBookingForm={setBookingForm}
              errors={bookingErrors}
              onInput={handleBookingInput}
              onContinue={handleBookingStepNext}
              onBack={handleBookingStepBack}
              onClose={closeBooking}
            />
          </Modal>
        )}
      </section>
    );
  }

  // --- Render Section: Reminders (output text gets green class for span.reminder-text) ---
  function renderReminders() {
    return (
      <aside className="appt-section appt-reminders">
        <div className="section-header">
          <h2>
            <IconUI name="bell" /> Reminders
          </h2>
        </div>
        <ul className="reminders-list">
          {reminders.length === 0 ? <li><span className="reminder-text">No reminders</span></li> : reminders.map(r => (
            <li className={`reminder-item${r.done ? " reminder-done" : ""}`} key={r.id}>
              <span className="reminder-icon">{r.icon}</span>
              <span className="reminder-text">{r.text}</span>
              <span className="reminder-actions">
                {!r.done ? (
                  <button onClick={() => markReminderDone(r.id)} title="Mark as done">
                    <IconUI name="done" />
                  </button>
                ) : null}
              </span>
            </li>
          ))}
        </ul>
      </aside>
    );
  }

  return (
    <div className="appt-manage-root">
      <nav className="appt-navbar">
        <button
          className={activeView === "upcoming" ? "active" : ""}
          onClick={() => setActiveView("upcoming")}
        >
          <IconUI name="calendar" /> Upcoming
        </button>
        <button
          className={activeView === "calendar" ? "active" : ""}
          onClick={() => setActiveView("calendar")}
        >
          <IconUI name="calendar" /> Calendar
        </button>
        <button
          className={activeView === "history" ? "active" : ""}
          onClick={() => setActiveView("history")}
        >
          <IconUI name="history" /> History
        </button>
      </nav>
      <div className="appt-view-grid">
        <div className="appt-main">
          {activeView === "upcoming" && renderUpcoming()}
          {activeView === "calendar" && renderCalendar()}
          {activeView === "history" && renderHistory()}
        </div>
        <div className="appt-sidebar">
          {renderReminders()}
        </div>
      </div>
    </div>
  );
}

// --- Modal/Drawer Components ---
function Modal({ children, onClose, wide }) {
  return (
    <div className="appt-modal-overlay" tabIndex={-1}>
      <div className={`appt-modal${wide ? " modal-wide" : ""}`}>
        <button
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close"
          style={{
            color: "#000",
            borderColor: "#000",
            background: "#fff",
            fontSize: 28
          }}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}

function DocPreview({ docs, onDelete }) {
  return (
    <div className="doc-preview-root" style={{color:"#000"}}>
      <h3 style={{color:"#000"}}>Attachments</h3>
      {docs.length === 0 ? <div style={{color:"#000"}}>No documents attached.</div> : docs.map((att, idx) => (
        <div className="doc-preview-entry" key={idx}>
          <span className="doc-preview-ic">
            <IconUI name={att.type === "img" ? "img" : "doc"} />
          </span>
          <span className="doc-preview-fn">{att.filename}</span>
          <span>
            {att.type === "img" && att.url ? (
              <a href={att.url} target="_blank" rel="noopener noreferrer" className="doc-preview-thumb" style={{color:"#000"}}>Preview</a>
            ) : (
              <a href={att.url} target="_blank" rel="noopener noreferrer" style={{color:"#000"}}>Open</a>
            )}
          </span>
          <button className="doc-preview-del" title="Delete" onClick={() => onDelete(idx)} style={{color:"#000"}}><IconUI name="cancel" /></button>
        </div>
      ))}
    </div>
  );
}

// --- Interactive Editable Appointment Modal ---
function ApptModal({ modal, close }) {
  // Interactive edit appointment fields are managed here
  const { appt, type } = modal;
  const [tempForm, setTempForm] = React.useState(
    appt
      ? {
          petId: appt.petId ? String(appt.petId) : "",
          type: appt.type || "",
          date: appt.datetime ? appt.datetime.split("T")[0] : "",
          time: appt.datetime ? (appt.datetime.split("T")[1]?.slice(0,5) || "") : "",
          vetId: appt.vet
            ? (
                veterinarians.find((v) => v.name === appt.vet)?.id + "" ||
                ""
              )
            : "",
          note: appt.notes || "",
        }
      : {
          petId: "",
          type: "",
          date: "",
          time: "",
          vetId: "",
          note: "",
        }
  );
  const [editErrors, setEditErrors] = React.useState({});

  function handleInput(e) {
    const { name, value } = e.target;
    setTempForm((f) => ({ ...f, [name]: value }));
  }

  function handleTypeClick(val) {
    setTempForm((f) => ({ ...f, type: val }));
  }

  function handleSave() {
    // Validate fields for demo only (minimum, not all rules)
    let errors = {};
    if (!tempForm.petId) errors.petId = "Pet required";
    if (!tempForm.type) errors.type = "Type required";
    if (!tempForm.date) errors.date = "Date required";
    if (!tempForm.time) errors.time = "Time required";
    if (!tempForm.vetId) errors.vetId = "Vet required";
    setEditErrors(errors);
    if (Object.keys(errors).length === 0) {
      close();
    }
  }

  if (!appt) return null;
  if (type === "details") {
    function getTypeObjModal(key) {
      return appointmentTypes.find((t) => t.key === key) || { label: key, icon: "📋" };
    }
    function getPetModal(pid) {
      return pets.find((p) => p.id === pid) || { name: "Unknown", avatar: "🦎" };
    }
    function getFmtDateModal(dt) {
      const d = new Date(dt);
      return d.toLocaleString(undefined, {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    return (
      <div className="appt-details-modal" style={{color: "#000"}}>
        <h3 style={{color: "#000"}}>Appointment Details</h3>
        <div>
          <b className="label-status-info" style={{color:"#000"}}>Pet:</b>
          <span className="appt-detail-output" style={{color:"#000"}}> {getPetModal(appt.petId).avatar} {getPetModal(appt.petId).name}</span>
        </div>
        <div>
          <b className="label-status-info" style={{color:"#000"}}>Type:</b>
          <span className="appt-detail-output" style={{color:"#000"}}> {getTypeObjModal(appt.type).icon} {getTypeObjModal(appt.type).label}</span>
        </div>
        <div>
          <b className="label-status-info" style={{color:"#000"}}>Date:</b>
          <span className="appt-detail-output" style={{color:"#000"}}>{getFmtDateModal(appt.datetime)}</span>
        </div>
        <div>
          <b className="label-status-info" style={{color:"#000"}}>Veterinarian:</b>
          <span className="appt-detail-output" style={{color:"#000"}}>{appt.vet}</span>
        </div>
        <div>
          <b className="label-status-info" style={{color:"#000"}}>Notes:</b>
          <span className="appt-detail-output" style={{color:"#000"}}>{appt.notes}</span>
        </div>
      </div>
    );
  }
  if (type === "cancel") {
    return (
      <div className="appt-cancel-modal" style={{color: "#000"}}>
        <h3 style={{color: "#000"}}>Cancel Appointment</h3>
        <div style={{color: "#000"}}>Are you sure you want to cancel this appointment?</div>
        <div style={{ marginTop: 18 }}>
          <button className="btn-cancel" style={{color:"#000", borderColor:"#000"}} onClick={close}>Yes, Cancel</button> &nbsp;
          <button className="btn-secondary" style={{color:"#000", borderColor:"#000"}} onClick={close}>No</button>
        </div>
      </div>
    );
  }
  if (type === "edit") {
    return (
      <div className="appt-edit-modal" style={{ color: "#000" }}>
        <h3 style={{color:"#000"}}>Edit Appointment</h3>
        <form
          style={{ display: "flex", flexDirection: "column", gap: "14px", color: "#000" }}
          onSubmit={e => { e.preventDefault(); handleSave(); }}
          autoComplete="off"
        >
          <label style={{color:"#000"}}>Pet <span>*</span></label>
          <select
            name="petId"
            value={tempForm.petId}
            onChange={handleInput}
            style={{ color: "#000", borderColor: "#000", background: "#fff" }}
          >
            <option value="">Select pet...</option>
            {pets.map((p) => (
              <option key={p.id} value={p.id}>{p.avatar} {p.name}</option>
            ))}
          </select>
          {editErrors.petId && (
            <div style={{ color: "#000", fontSize: 12 }}>{editErrors.petId}</div>
          )}

          <label style={{color:"#000"}}>Appointment Type <span>*</span></label>
          <div style={{display:"flex", flexWrap:"wrap", gap:"6px"}}>
            {appointmentTypes.map((t) => (
              <button
                key={t.key}
                type="button"
                className={`appt-type-btn${tempForm.type === t.key ? " selected" : ""}`}
                style={{
                  color: "#000",
                  borderColor: "#000",
                  background: tempForm.type === t.key ? "#e7eafb" : "#fff"
                }}
                onClick={() => handleTypeClick(t.key)}
              >
                <span style={{color:"#000"}}>{t.icon}</span> {t.label}
              </button>
            ))}
          </div>
          {editErrors.type && (
            <div style={{ color: "#000", fontSize: 12 }}>{editErrors.type}</div>
          )}

          <label htmlFor="date" style={{color:"#000"}}>Date <span>*</span></label>
          <input
            type="date"
            id="date"
            name="date"
            value={tempForm.date}
            onChange={handleInput}
            style={{ color: "#000", borderColor: "#000", background: "#fff" }}
          />
          {editErrors.date && (
            <div style={{ color: "#000", fontSize: 12 }}>{editErrors.date}</div>
          )}

          <label htmlFor="time" style={{color:"#000"}}>Time <span>*</span></label>
          <input
            type="time"
            id="time"
            name="time"
            value={tempForm.time}
            onChange={handleInput}
            style={{ color: "#000", borderColor: "#000", background: "#fff" }}
          />
          {editErrors.time && (
            <div style={{ color: "#000", fontSize: 12 }}>{editErrors.time}</div>
          )}

          <label style={{color:"#000"}}>Veterinarian <span>*</span></label>
          <select
            name="vetId"
            value={tempForm.vetId}
            onChange={handleInput}
            style={{ color: "#000", borderColor: "#000", background: "#fff" }}
          >
            <option value="">Choose vet...</option>
            {veterinarians.map((v) => (
              <option key={v.id} value={v.id}>{v.name} – {v.location}</option>
            ))}
          </select>
          {editErrors.vetId && (
            <div style={{ color: "#000", fontSize: 12 }}>{editErrors.vetId}</div>
          )}

          <label style={{color:"#000"}}>Notes</label>
          <textarea
            name="note"
            value={tempForm.note}
            onChange={handleInput}
            rows={2}
            style={{
              color: "#000",
              borderColor: "#000",
              background: "#fff",
              minHeight: "40px"
            }}
          />
          <div style={{display:"flex", gap:"14px", marginTop:"6px"}}>
            <button
              type="submit"
              className="btn-primary"
              style={{
                color:"#000",
                borderColor:"#000",
                background:"#eaeaea"
              }}
            >Save</button>
            <button
              type="button"
              className="btn-secondary"
              onClick={close}
              style={{
                color:"#000",
                borderColor:"#000",
                background:"#fff"
              }}
            >Cancel</button>
          </div>
        </form>
      </div>
    );
  }
  return null;
}

// --- Booking Wizard ---
function BookingWizard({ step, setStep, bookingForm, setBookingForm, errors, onInput, onContinue, onBack, onClose }) {
  const BOOKING_STEP_LABELS = [
    "Pet", "Type", "Date/Time", "Vet", "Documents", "Confirm"
  ];
  const BOOKING_STEP_COMPONENTS = [
    BookingStepPet, BookingStepType, BookingStepTime, BookingStepVet, BookingStepDocuments, BookingStepConfirm
  ];
  function BookingStepPet(props) { return renderStepPet(props); }
  function BookingStepType(props) { return renderStepType(props); }
  function BookingStepTime(props) { return renderStepTime(props); }
  function BookingStepVet(props) { return renderStepVet(props); }
  function BookingStepDocuments(props) { return renderStepDocuments(props); }
  function BookingStepConfirm(props) { return renderStepConfirm(props); }

  const Component = BOOKING_STEP_COMPONENTS[step];
  return (
    <div className="booking-wizard-root" style={{color:"#000"}}>
      <h2 style={{color:"#000"}}>
        <IconUI name="calendar" /> Book Appointment
      </h2>
      <div className="booking-progress">
        {BOOKING_STEP_LABELS.map((lbl, idx) => (
          <div className={`booking-step-label${idx <= step ? " active" : ""}`} key={idx} style={{color:"#000"}}>{lbl}</div>
        ))}
      </div>
      <div className="booking-step-main">
        <Component bookingForm={bookingForm} errors={errors} onInput={onInput} />
      </div>
      <div className="booking-step-actions">
        {step > 0 && (
          <button className="btn-secondary" type="button" onClick={onBack} style={{color:"#000", borderColor:"#000"}}>Back</button>
        )}
        <button className="btn-primary" type="button" onClick={onContinue}
            style={{color:"#000", borderColor:"#000"}} >
          {step === BOOKING_STEP_LABELS.length - 1 ? "Book" : "Next"}
        </button>
        <button className="btn-secondary" type="button" onClick={onClose} style={{color:"#000", borderColor:"#000"}}>Cancel</button>
      </div>
    </div>
  );
}

// --- IconUI util ---
function IconUI({ name }) {
  const icons = {
    calendar: <span role="img" aria-label="calendar">📅</span>,
    bell: <span role="img" aria-label="bell">🔔</span>,
    history: <span role="img" aria-label="history">🗂️</span>,
    edit: <span role="img" aria-label="edit">✏️</span>,
    plus: <span role="img" aria-label="add">➕</span>,
    cancel: <span role="img" aria-label="cancel">❌</span>,
    info: <span role="img" aria-label="info">ℹ️</span>,
    doc: <span role="img" aria-label="doc">📄</span>,
    img: <span role="img" aria-label="img">🖼️</span>,
    done: <span role="img" aria-label="done">✅</span>,
    clock: <span role="img" aria-label="clock">⏰</span>,
    vet: <span role="img" aria-label="vet">👩‍⚕️</span>,
  };
  return <span className="icon-ui" style={{color:"#000"}}>{icons[name] || "❔"}</span>;
}

function pastelColor(type) {
  switch (type) {
    case "checkup": return "#aeece7";
    case "vaccination": return "#ffd8c1";
    case "grooming": return "#fae6ff";
    case "surgery": return "#ffd6e3";
    default: return "#e7eafb";
  }
}

export default AppointmentsManage;
