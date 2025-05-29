import React, { useState } from "react";
import "./Dashboard.css";
// You may need to install icon packages for FontAwesome/Lucide - using emoji and SVG here as placeholder.
// Uncomment and install libraries as needed for production: 
// import { FaPaw, FaHeartbeat, FaUtensils, FaRunning, FaCalendarAlt, FaBell, FaChevronDown, FaCheckCircle, FaClock, FaPlus, FaExchangeAlt, FaQuoteLeft } from "react-icons/fa";

// PUBLIC_INTERFACE
function Dashboard() {
  /**
   * PetWellness Dashboard - modern snapshot & hub for owner and pet wellness.
   * Sections: Welcome header, summary grid, reminders/tasks, analytics placeholder, timeline/activity, actions, pet switcher, and motivational quote.
   * All sections are styled with pastel backgrounds, clean modern fonts, rounded cards, and soft transitions.
   * Placeholder data, emoji icons and comments for where to wire up real data/integrations.
   */
  const [selectedPet, setSelectedPet] = useState("Bella");
  const pets = [
    { name: "Bella", type: "Dog", avatar: "🐶" },
    { name: "Luna", type: "Cat", avatar: "🐱" },
    { name: "Rocky", type: "Dog", avatar: "🐕" },
  ];
  // Example data - replace with user context/backend when available
  const user = { name: "Alex", avatar: "🧑", location: "San Francisco, CA" };
  const today = new Date();
  const formattedDate = today.toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" });

  const summaryCards = [
    {
      label: "Health",
      value: "Excellent",
      icon: "🩺", // Substitute with FaHeartbeat or similar
      progress: 90,
      color: "var(--dashboard-green)",
    },
    {
      label: "Diet",
      value: "On Track",
      icon: "🥕", // Substitute with FaUtensils
      progress: 78,
      color: "var(--dashboard-orange)",
    },
    {
      label: "Activity",
      value: "45 min",
      icon: "🏃‍♂️", // Substitute with FaRunning
      progress: 60,
      color: "var(--dashboard-blue)",
    },
    {
      label: "Appointments",
      value: "Next: 5/26",
      icon: "📅", // Substitute with FaCalendarAlt
      progress: 100,
      color: "var(--dashboard-purple)",
    },
  ];

  const reminders = [
    { id: 1, task: "Morning walk", time: "8:00 AM", actionable: true },
    { id: 2, task: "Feed breakfast", time: "8:30 AM", actionable: true },
    { id: 3, task: "Grooming - brush coat", time: "3:00 PM", actionable: false },
    { id: 4, task: "Vet: Vaccination", time: "Friday 10:30 AM", actionable: true },
  ];
  const analyticsPlaceholder = {
    // Once charts integration (Recharts, Chart.js, etc.) is ready, plot stat series here
    // Currently, just a static callout and illustration
    title: "Analytics (Coming Soon!)",
    desc: "Beautiful charts and trends for health, nutrition, and activity will appear here.",
  };
  const recentActivity = [
    { id: 1, time: "07:45 AM", desc: "Walked in the park (15 mins)", icon: "🦮" },
    { id: 2, time: "08:31 AM", desc: "Ate breakfast", icon: "🍽️" },
    { id: 3, time: "12:00 PM", desc: "Drink water", icon: "💧" },
    { id: 4, time: "02:25 PM", desc: "Played fetch with ball", icon: "🎾" },
    { id: 5, time: "08:15 PM", desc: "Evening checkup complete", icon: "👩‍⚕️" },
  ];
  const quickActions = [
    { label: "Add Health", icon: "➕🩺" },
    { label: "Log Meal", icon: "➕🍲" },
    { label: "Log Activity", icon: "➕🏃" },
    { label: "Book Appt", icon: "➕📅" },
  ];
  const motivationalQuotes = [
    "A healthy pet is a happy heart.",
    "Caring for pets is caring for ourselves.",
    "Every walk is a new adventure.",
    "Love is a four-legged word.",
    "Small steps, big paws – progress every day!"
  ];
  const tipOfDay = motivationalQuotes[today.getDate() % motivationalQuotes.length];

  const handlePetChange = (e) => setSelectedPet(e.target.value);

  return (
    <div className="dashboard-root">
      {/* Header: Soft gradient, user & pet info, date, dropdown switcher */}
      <section className="dashboard-header">
        <div className="header-user">
          <span className="user-avatar">{user.avatar}</span>
          <span>
            <span className="greet">Welcome, <strong>{user.name}</strong>!</span>
            <br />
            <span className="location">{user.location}</span>
          </span>
        </div>
        <div className="header-center">
          <span className="date">{formattedDate}</span>
          {/* Pet switcher dropdown */}
          <div className="pet-switch">
            <span className="pet-avatar" aria-label="pet avatar">
              {pets.find((p) => p.name === selectedPet)?.avatar ?? "🐾"}
            </span>
            <select value={selectedPet} className="pet-switch-dropdown" onChange={handlePetChange}>
              {pets.map((p) => (
                <option key={p.name} value={p.name}>
                  {p.avatar} {p.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="header-pet-info">
          <span className="pet-label">Pet</span>
          <span className="pet-name">{selectedPet}</span>
          {/* Placeholder for pet image */}
          <span className="pet-img">{pets.find((p) => p.name === selectedPet)?.avatar ?? "🐾"}</span>
        </div>
      </section>

      {/* Summary Cards: health, diet, activity, appointments */}
      <section className="dashboard-card-grid">
        {summaryCards.map((card) => (
          <SummaryCard
            key={card.label}
            label={card.label}
            value={card.value}
            icon={card.icon}
            progress={card.progress}
            color={card.color}
          />
        ))}
      </section>

      {/* Reminders/Tasks: Mark done/reschedule */}
      <section className="dashboard-main-row">
        <div className="dashboard-reminders shadow-card">
          <div className="section-title">
            <span role="img" aria-label="bell" className="section-icon">🔔</span>
            Reminders &amp; Tasks
          </div>
          <ul className="reminders-list">
            {reminders.map((rem) => (
              <li className="reminder-item" key={rem.id}>
                <span className="reminder-task">{rem.task}</span>
                <span className="reminder-time">{rem.time}</span>
                <span className="reminder-actions">
                  {rem.actionable && (
                    <>
                      <button className="reminder-btn done" title="Mark as done" tabIndex={0}>✓</button>
                      <button className="reminder-btn resched" title="Reschedule" tabIndex={0}>⟳</button>
                    </>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Analytics / Chart Section (placeholder) */}
        <div className="dashboard-analytics shadow-card">
          <div className="section-title">
            <span role="img" aria-label="chart" className="section-icon">📈</span>
            {analyticsPlaceholder.title}
          </div>
          <div className="analytics-content">
            <div className="analytics-illus" aria-label="charts coming soon"> 
              {/* <ChartComponent data={chartData} /> */}
              {/* Placeholder graphics */}
              <svg width="96" height="44">
                <rect x="3" y="16" width="16" height="25" rx="5" fill="#FBE7C7"/>
                <rect x="22" y="2" width="16" height="39" rx="5" fill="#E7F7F3"/>
                <rect x="41" y="10" width="16" height="31" rx="5" fill="#E6EBF9"/>
                <rect x="60" y="24" width="16" height="17" rx="5" fill="#F3E7F7"/>
                <rect x="79" y="8" width="16" height="33" rx="5" fill="#F6F6E9"/>
              </svg>
            </div>
            <div className="analytics-callout">
              {analyticsPlaceholder.desc}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline / Recent Activity */}
      <section className="dashboard-recents shadow-card">
        <div className="section-title">
          <span role="img" aria-label="history" className="section-icon">🕑</span>
          Recent Activity
        </div>
        <ul className="activity-timeline">
          {recentActivity.map((act, idx) => (
            <li className="timeline-item" key={act.id}>
              <span className="timeline-dot" style={{background: idx === 0 ? "var(--dashboard-green)" : "#cfdad7"}} />
              <span className="timeline-icon">{act.icon}</span>
              <span className="timeline-desc">{act.desc}</span>
              <span className="timeline-time">{act.time}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Floating/side quick actions panel */}
      <aside className="dashboard-quick-actions">
        {quickActions.map((qa) => (
          <button className="quick-action-btn" key={qa.label} title={qa.label}>
            <span className="qa-ic">{qa.icon}</span>
            <span className="qa-label">{qa.label}</span>
          </button>
        ))}
      </aside>

      {/* Motivational tip/quote at bottom */}
      <footer className="dashboard-tip">
        <span role="img" aria-label="lightbulb">💡</span>
        <span className="quote-text">"{tipOfDay}"</span>
      </footer>
    </div>
  );
}

/**
 * Summary Card for dashboard grid - rounded, pastel, icon, animated progress bar
 */
function SummaryCard({ label, value, icon, progress, color }) {
  // For Appointments card, use .card-main-flex to better constrain and wrap the text.
  const isAppointments = label === "Appointments";
  return (
    <div className="summary-card shadow-card" tabIndex={0} style={{"--bg-accent": color}}>
      <div className="card-icon" style={{background: color+"22"}}>
        <span>{icon}</span>
      </div>
      {/* 
        LAYOUT FIX: 
        - For Appointments card, apply .card-main-flex class to switch main area to a flex column with wrap and min-width constraint.
        - Ensures the value (e.g., 'Next: 5/26') does not overflow parent, and wraps if required.
      */}
      <div className={isAppointments ? "card-main card-main-flex" : "card-main"}>
        <div className="card-label">{label}</div>
        <div className="card-value">{value}</div>
        <div className="card-progress">
          <div
            className="progress-bar"
            style={{
              width: `${progress}%`,
              background: color,
              transition: "width 0.65s cubic-bezier(.31,.6,.16,1.19)"
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
