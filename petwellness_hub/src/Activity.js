import React, { useState } from "react";
import "./Activity.css";

// PUBLIC_INTERFACE
function Activity() {
  // Demo state for each section

  // 1. Daily Activity Log
  const [activityLogs, setActivityLogs] = useState([
    { time: "07:00", desc: "Morning walk - 30 mins 🐾" },
    { time: "12:20", desc: "Fetch in backyard - 15 mins 🎾" },
    { time: "17:50", desc: "Dog park run - 45 mins 🏃" },
  ]);
  const [logInput, setLogInput] = useState("");
  const [logTime, setLogTime] = useState("");

  // 2. Weekly Activity Summary
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const weekData = [40, 55, 30, 60, 40, 70, 50]; // minutes/day

  // 3. Activity Goals & Progress
  const goals = [
    { label: "Walk Time", target: 120, current: 90, emoji: "🐕" },
    { label: "Play Sessions", target: 10, current: 7, emoji: "🎾" },
    { label: "Training", target: 4, current: 2, emoji: "🎓" },
  ];

  // 4. Energy & Behavior Tracker
  const energyLevels = [
    { label: "High", emoji: "⚡" },
    { label: "Moderate", emoji: "🙂" },
    { label: "Low", emoji: "😴" },
  ];
  const [selectedEnergy, setSelectedEnergy] = useState("High");
  const [behaviorLogs, setBehaviorLogs] = useState([
    { mood: "🙂", text: "Calm on leash today." },
    { mood: "⚡", text: "Excited at park, lots of energy!" },
  ]);
  const [behaviorInput, setBehaviorInput] = useState("");
  const [behaviorMood, setBehaviorMood] = useState("🙂");

  // 5. Milestones/Achievements
  const achievements = [
    { label: "Walked 10 Miles!", emoji: "🏅" },
    { label: "First Fetch!", emoji: "🎉" },
    { label: "Learned Sit", emoji: "🦴" },
  ];

  // 6. Photo/Video Uploads & Gallery
  const [gallery, setGallery] = useState([
    { type: "photo", src: "https://images.pexels.com/photos/1707825/pexels-photo-1707825.jpeg?auto=compress&w=300&q=60", label: "At Park" },
    { type: "photo", src: "https://images.pexels.com/photos/5255238/pexels-photo-5255238.jpeg?auto=compress&w=300&q=60", label: "Sleeping" },
    { type: "video", src: "", label: "Playing Fetch" },
  ]);
  const [uploadInput, setUploadInput] = useState("");
  const [galleryTypeFilter, setGalleryTypeFilter] = useState("all");

  // 7. Reminders & Alerts
  const reminders = [
    { text: "Don't forget the 5pm walk! 🚶", urgent: false },
    { text: "Low step count compared to goal.", urgent: true },
    { text: "New achievement unlocked: 7 play sessions!", urgent: false },
  ];

  // Daily Activity Log handlers
  const addActivityLog = (e) => {
    e.preventDefault();
    if (!logTime || !logInput.trim()) return;
    setActivityLogs([{ time: logTime, desc: logInput }, ...activityLogs]);
    setLogInput("");
    setLogTime("");
  };

  // Behavior log handlers
  const addBehaviorLog = (e) => {
    e.preventDefault();
    if (!behaviorInput.trim()) return;
    setBehaviorLogs([{ mood: behaviorMood, text: behaviorInput }, ...behaviorLogs]);
    setBehaviorInput("");
  };

  // Gallery handlers (local only, mock photo input)
  const onPhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setGallery([{ type: file.type.startsWith("video") ? "video" : "photo", src: url, label: file.name }, ...gallery]);
    setUploadInput("");
  };

  const filterGallery = (type) => setGalleryTypeFilter(type);

  // Filter gallery by type
  const visibleGallery = gallery.filter((item) =>
    galleryTypeFilter === "all" ? true : item.type === galleryTypeFilter
  );

  return (
    <div className="activity-main container">
      <div className="activity-header">Activity</div>

      {/* Daily Activity Log */}
      <div className="section-card">
        <div className="section-title">Daily Activity Log</div>
        <form className="add-log-form" onSubmit={addActivityLog}>
          <input
            type="time"
            className="add-log-time"
            value={logTime}
            onChange={e => setLogTime(e.target.value)}
            required
            style={{ width: 110 }}
          />
          <input
            type="text"
            className="add-log-input"
            placeholder="Describe today's activity..."
            value={logInput}
            onChange={e => setLogInput(e.target.value)}
            required
            maxLength={48}
          />
          <button className="add-log-btn" type="submit">Add</button>
        </form>
        <ul className="activity-log-list">
          {activityLogs.map((log, idx) => (
            <li className="log-entry" key={idx}>
              <span className="log-time">{log.time}</span>
              <span className="log-desc">{log.desc}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Weekly Activity Summary */}
      <div className="section-card">
        <div className="section-title">Weekly Activity Summary</div>
        <div className="weekly-summary-chart-container">
          <div className="activity-chart">
            {weekData.map((val, idx) => {
              // For a simple bar chart: normalize max bar height
              const maxVal = Math.max(...weekData, 60);
              const barHeight = 120 * (val / maxVal); // px
              return (
                <div
                  className="chart-bar"
                  key={weekDays[idx]}
                  style={{ height: barHeight + 18 }}
                  title={`${weekDays[idx]}: ${val} min`}
                >
                  <span className="chart-bar-value">{val}</span>
                  <span className="chart-bar-label">{weekDays[idx]}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Activity Goals & Progress */}
      <div className="section-card">
        <div className="section-title">Activity Goals & Progress</div>
        <div className="activity-goals">
          {goals.map((goal) => {
            const percent = Math.min(100, Math.round((goal.current / goal.target) * 100));
            return (
              <div className="goal-progress-card" key={goal.label}>
                <div className="goal-label">{goal.emoji} {goal.label}</div>
                <div className="progress-bar-bg">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>
                <div className="progress-bar-value">{goal.current} / {goal.target}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Energy & Behavior Tracker */}
      <div className="section-card">
        <div className="section-title">Energy & Behavior Tracker</div>
        <div className="energy-behavior-tracker">
          <div className="energy-toggle-row">
            Energy Level:
            {energyLevels.map(lvl => (
              <button
                className={`energy-btn${selectedEnergy === lvl.label ? " selected" : ""}`}
                type="button"
                key={lvl.label}
                onClick={() => setSelectedEnergy(lvl.label)}
              >
                {lvl.emoji} {lvl.label}
              </button>
            ))}
          </div>
          <form className="add-log-form" style={{marginBottom: 0}} onSubmit={addBehaviorLog}>
            <select
              className="add-log-input"
              value={behaviorMood}
              onChange={e => setBehaviorMood(e.target.value)}
              style={{ width: 72 }}
            >
              {energyLevels.map(lvl => (
                <option key={lvl.label} value={lvl.emoji}>{lvl.emoji}</option>
              ))}
            </select>
            <input
              type="text"
              className="add-log-input"
              placeholder="Describe today's behavior..."
              value={behaviorInput}
              onChange={e => setBehaviorInput(e.target.value)}
              maxLength={36}
              required
            />
            <button className="add-log-btn" type="submit">Add</button>
          </form>
          <ul className="behavior-log-list">
            {behaviorLogs.map((entry, idx) => (
              <li className="behavior-entry" key={idx}>
                <span style={{ fontSize: "1.07rem", marginRight: 4 }}>{entry.mood}</span>
                <span>{entry.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Milestones & Achievements */}
      <div className="section-card">
        <div className="section-title">Milestones & Achievements</div>
        <div className="achievement-list">
          {achievements.map(({ label, emoji }) => (
            <span className="achievement-badge" key={label}>
              <span className="emoji">{emoji}</span> {label}
            </span>
          ))}
        </div>
      </div>

      {/* Photo/Video Uploads & Gallery */}
      <div className="section-card">
        <div className="section-title">Photo & Video Gallery</div>
        <div className="upload-section">
          <input
            type="file"
            accept="image/*,video/*"
            className="photo-upload-input"
            onChange={onPhotoUpload}
          />
          <div className="gallery-controls">
            <span style={{ color: "var(--kavia-orange)" }}>Show:</span>
            <button
              type="button"
              className={`energy-btn${galleryTypeFilter === "all" ? " selected" : ""}`}
              onClick={() => filterGallery("all")}
            >
              🐾 All
            </button>
            <button
              type="button"
              className={`energy-btn${galleryTypeFilter === "photo" ? " selected" : ""}`}
              onClick={() => filterGallery("photo")}
            >
              📸 Photos
            </button>
            <button
              type="button"
              className={`energy-btn${galleryTypeFilter === "video" ? " selected" : ""}`}
              onClick={() => filterGallery("video")}
            >
              🎥 Videos
            </button>
          </div>
        </div>
        <div className="gallery-grid">
          {visibleGallery.length === 0 && (
            <div style={{ color: "var(--text-secondary)", gridColumn: "1/-1", textAlign: "center", opacity: 0.63 }}>
              No items in gallery
            </div>
          )}
          {visibleGallery.map((item, idx) => (
            <div className="gallery-item" key={idx}>
              {item.type === "photo" ? (
                <img src={item.src} alt={item.label} />
              ) : (
                <video src={item.src} controls>
                  Sorry, video not supported.
                </video>
              )}
              <div className="gallery-item-label">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Reminders & Alerts */}
      <div className="section-card">
        <div className="section-title">Activity Reminders & Alerts</div>
        <ul className="reminders-list">
          {reminders.map((r, idx) => (
            <li key={idx} className={`reminder-alert${r.urgent ? " urgent" : ""}`}>
              {r.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Activity;
