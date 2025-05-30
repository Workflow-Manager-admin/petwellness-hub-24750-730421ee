import React, { useState } from "react";
import "./Notification.css";

// Example SVG icons (inlined for isolation)
const BellIcon = (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path stroke="#8aa182" strokeWidth="2" d="M12 21c1.656 0 3-1.343 3-3h-6c0 1.657 1.344 3 3 3zm6-7v-5a6 6 0 10-12 0v5a2 2 0 01-2 2h16a2 2 0 01-2-2z"/></svg>
);
const ReminderIcon = (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#d1d5ae" strokeWidth="2"/><path stroke="#8aa182" strokeWidth="2" d="M12 6v6l4 2"/></svg>
);
const HealthIcon = (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M17 6.1A5.989 5.989 0 0012 4c-3.314 0-6 2.686-6 6 0 6 6 10 6 10s6-4 6-10c0-.671-.101-1.315-.287-1.91" stroke="#8aa182" strokeWidth="2" fill="none"/></svg>
);
const FoodIcon = (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="8" rx="4" stroke="#8aa182" strokeWidth="2"/><path d="M7 15v-4a5 5 0 0110 0v4" stroke="#d1d5ae" strokeWidth="2"/></svg>
);
const CalendarIcon = (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><rect x="4" y="5" width="16" height="16" rx="4" stroke="#8aa182" strokeWidth="2"/><path d="M8 3v4M16 3v4M4 11h16" stroke="#d1d5ae" strokeWidth="2"/></svg>
);
const EmailIcon = (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="3" stroke="#71706f" strokeWidth="2"/><path d="M3 7l9 6 9-6" stroke="#d1d5ae" strokeWidth="2"/></svg>
);
const SmsIcon = (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="3" stroke="#71706f" strokeWidth="2"/><path d="M8 13h8M8 9h8" stroke="#d1d5ae" strokeWidth="2"/></svg>
);
const AppIcon = (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5" stroke="#71706f" strokeWidth="2"/><circle cx="12" cy="12" r="3" stroke="#d1d5ae" strokeWidth="2"/></svg>
);

const notificationTypes = [
  { key: "general", name: "General Alerts", icon: BellIcon },
  { key: "health", name: "Health Updates", icon: HealthIcon },
  { key: "diet", name: "Diet Reminders", icon: FoodIcon },
  { key: "appointments", name: "Appointments", icon: CalendarIcon },
];
const notificationChannels = [
  { key: "email", name: "Email", icon: EmailIcon },
  { key: "sms", name: "SMS", icon: SmsIcon },
  { key: "inapp", name: "In-App", icon: AppIcon },
];

// Demo notification feed entries
const mockFeed = [
  { id: 1, type: "health", text: "Rabies vaccination reminder", time: "Today, 11:00 AM" },
  { id: 2, type: "diet", text: "Lunch meal time for Bella", time: "Yesterday, 12:45 PM" },
  { id: 3, type: "appointments", text: "Checkup with Dr. Smith scheduled", time: "2 days ago, 10:00 AM" },
];

// PUBLIC_INTERFACE
function Notification() {
  // Isolated internal state only for this component
  const [prefs, setPrefs] = useState({
    general: true,
    health: true,
    diet: false,
    appointments: true,
  });
  const [channels, setChannels] = useState({
    email: true,
    sms: false,
    inapp: true,
  });
  const [reminders, setReminders] = useState({
    general: "15",
    health: "30",
    diet: "0",
    appointments: "60",
  });
  const [reminderTimes, setReminderTimes] = useState({
    general: "09:00",
    health: "08:00",
    diet: "07:30",
    appointments: "07:45",
  });
  const [dnd, setDnd] = useState(false);
  const [dndFrom, setDndFrom] = useState("22:00");
  const [dndTo, setDndTo] = useState("07:00");
  const [feed] = useState(mockFeed);
  const [saveAnim, setSaveAnim] = useState(false);

  const handlePrefToggle = k => setPrefs(p => ({ ...p, [k]: !p[k] }));
  const handleChannelToggle = k => setChannels(c => ({ ...c, [k]: !c[k] }));
  const handleReminderChange = (k, v) => setReminders(r => ({ ...r, [k]: v }));
  const handleReminderTime = (k, v) => setReminderTimes(t => ({ ...t, [k]: v }));

  // Simulate save animation
  const handleSave = () => {
    setSaveAnim(true);
    setTimeout(() => setSaveAnim(false), 1500);
  };

  // DND animated toggle utility
  const handleDndToggle = () => setDnd(v => !v);

  return (
    <div className="notification-page">
      <div className="section-card">
        <div className="section-title">Notification Preferences</div>
        <div className="notif-pref-list">
          {notificationTypes.map(type => (
            <label key={type.key} className={`notif-toggle${prefs[type.key] ? " active" : ""}`}>
              <span className="notif-icon">{type.icon}</span>
              <span>{type.name}</span>
              <input
                type="checkbox"
                checked={prefs[type.key]}
                onChange={() => handlePrefToggle(type.key)}
                style={{ display: "none" }}
              />
              <span className="custom-toggle">
                <span />
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="section-card">
        <div className="section-title">Notification Channels</div>
        <div className="channel-row">
          {notificationChannels.map(c => (
            <button
              key={c.key}
              className={`pill${channels[c.key] ? " pill-active" : ""}`}
              onClick={() => handleChannelToggle(c.key)}
              type="button"
            >
              <span className="pill-icon">{c.icon}</span> {c.name}
            </button>
          ))}
        </div>
      </div>

      <div className="section-card">
        <div className="section-title">Reminder Timing</div>
        <div className="reminder-grid">
          {notificationTypes.map(type => (
            <div key={type.key} className="reminder-setting">
              <span className="notif-icon">{type.icon}</span>
              <span className="reminder-label">{type.name}</span>
              <select
                value={reminders[type.key]}
                onChange={e => handleReminderChange(type.key, e.target.value)}
              >
                <option value="0">At time</option>
                <option value="5">5 min before</option>
                <option value="15">15 min before</option>
                <option value="30">30 min before</option>
                <option value="60">1 hr before</option>
              </select>
              <input
                type="time"
                value={reminderTimes[type.key]}
                onChange={e => handleReminderTime(type.key, e.target.value)}
                className="time-input"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="section-card dnd-card">
        <div className="section-title">Do Not Disturb</div>
        <div className="dnd-row">
          <div className="dnd-labels">
            <span
              className="dnd-status"
              style={{ color: dnd ? "#E87A41" : "#8aa182" }}
            >
              {dnd ? "ON" : "OFF"}
            </span>
            <span className="dnd-times">
              {dnd ? `From ${dndFrom} to ${dndTo}` : ""}
            </span>
          </div>
          <div
            className={`dnd-toggle${dnd ? " dnd--on" : ""}`}
            onClick={handleDndToggle}
            tabIndex={0}
            aria-label="Toggle Do Not Disturb"
            role="button"
          >
            <span />
          </div>
        </div>
        {dnd && (
          <div className="dnd-time-inputs">
            <label>
              Start:
              <input
                type="time"
                value={dndFrom}
                onChange={e => setDndFrom(e.target.value)}
              />
            </label>
            <label>
              End:
              <input
                type="time"
                value={dndTo}
                onChange={e => setDndTo(e.target.value)}
              />
            </label>
          </div>
        )}
      </div>

      <div className="section-card">
        <div className="section-title">Notification Feed</div>
        <div className="notif-feed">
          {feed.length === 0 && (
            <div className="notif-feed-empty">No notifications yet.</div>
          )}
          {feed.map(n => (
            <div key={n.id} className={`notif-feed-entry notif-${n.type}`}>
              <span className="notif-feed-icon">
                {
                  notificationTypes.find(t => t.key === n.type)
                    ? notificationTypes.find(t => t.key === n.type).icon
                    : BellIcon
                }
              </span>
              <span className="notif-feed-content">
                <span className="notif-feed-text">{n.text}</span>
                <span className="notif-feed-time">{n.time}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      <button
        className={`sticky-save-btn${saveAnim ? " sticky-save--anim" : ""}`}
        onClick={handleSave}
      >
        {saveAnim ? "Saved!" : "Save Preferences"}
      </button>
    </div>
  );
}

export default Notification;
