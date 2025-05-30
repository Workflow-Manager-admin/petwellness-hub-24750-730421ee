import React, { useState } from "react";
import "./DietNutrition.css";

// PUBLIC_INTERFACE
function DietNutrition() {
  // State hooks for dynamic sections: meal planner, hydration, notes, uploads, etc.
  const [meals, setMeals] = useState([
    {
      name: "Breakfast",
      completed: false,
      time: "08:00 AM",
      food: "Chicken Kibble",
      emoji: "🍗",
    },
    {
      name: "Lunch",
      completed: false,
      time: "12:30 PM",
      food: "Wet Food",
      emoji: "🥫",
    },
    {
      name: "Dinner",
      completed: false,
      time: "07:00 PM",
      food: "Turkey & Rice",
      emoji: "🍚",
    },
  ]);
  const [hydration, setHydration] = useState(2.5); // liters (any suitable scale)
  const [hydrationGoal] = useState(3); // liters per day
  const [waterRemind, setWaterRemind] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const [vetNotes, setVetNotes] = useState("");
  const [uploadFiles, setUploadFiles] = useState([]);
  const [pdfExporting, setPdfExporting] = useState(false);
  // For Preferred/Restricted tabs
  const [activeFoodTab, setActiveFoodTab] = useState("preferred");
  // Dummy data for foods
  const preferredFoods = [
    { label: "Chicken", emoji: "🍗" },
    { label: "Salmon", emoji: "🐟" },
    { label: "Rice", emoji: "🍚" },
  ];
  const restrictedFoods = [
    { label: "Chocolate", emoji: "🍫", alert: true },
    { label: "Onions", emoji: "🧅", alert: true },
    { label: "Grapes", emoji: "🍇", alert: true },
  ];
  // Chart.js for Diet Overview - just use a static chart; can be replaced with Chart.js or Recharts in production
  // For this template, use a CSS-only chart

  // Daily Meal Planner logic
  const toggleMeal = (idx) => {
    setMeals((prev) =>
      prev.map((meal, i) =>
        i === idx ? { ...meal, completed: !meal.completed } : meal
      )
    );
  };
  const updateMeal = (idx, newFood) => {
    setMeals((prev) =>
      prev.map((meal, i) =>
        i === idx ? { ...meal, food: newFood } : meal
      )
    );
  };

  // Hydration UI logic
  const addWater = () => {
    setHydration((prev) => (prev + 0.25 > 99 ? 99 : +(prev + 0.25).toFixed(2)));
  };
  const removeWater = () => {
    setHydration((prev) => (prev - 0.25 < 0 ? 0 : +(prev - 0.25).toFixed(2)));
  };

  // Upload section logic
  const handleUpload = (e) => {
    const files = Array.from(e.target.files ?? []);
    setUploadFiles((prev) => [...prev, ...files]);
  };
  const removeUpload = (idx) => {
    setUploadFiles(files => files.filter((_, i) => i !== idx));
  };

  // Weekly Food Schedule (dummy data)
  const weekSchedule = [
    // Each day is an object: { label: "Monday", meals: [ {mealname, food, complete}, ... ] }
    { label: "Mon", meals: ["Chicken Kibble", "Wet Food", "Turkey & Rice"], colors: ["#FFD8BE", "#A9DDD6", "#FEC3A6"] },
    { label: "Tue", meals: ["Salmon", "Dry Food", "Pumpkin"], colors: ["#B9E8E0", "#FFD8BE", "#FBC2EB"] },
    { label: "Wed", meals: ["Turkey", "Rice", "Carrot Mash"], colors: ["#A9DDD6", "#FEC3A6", "#FBC2EB"] },
    { label: "Thu", meals: ["Beef", "Chicken", "Sweet Potato"], colors: ["#FFD8BE", "#A9DDD6", "#FBC2EB"] },
    { label: "Fri", meals: ["Fish", "Wet Food", "Rice"], colors: ["#B9E8E0", "#FFD8BE", "#FEC3A6"] },
    { label: "Sat", meals: ["Duck", "Carrots", "Pea Mash"], colors: ["#A9DDD6", "#FFD8BE", "#FBC2EB"] },
    { label: "Sun", meals: ["Salmon", "Dry Food", "Pumpkin"], colors: ["#FFD8BE", "#A9DDD6", "#FEC3A6"] },
  ];

  // Render main UI
  return (
    <div className="diet-nutrition-main">
      <h2 className="diet-page-heading">Diet &amp; Nutrition</h2>

      {/* Daily Meal Planner */}
      <section className="meal-planner-card">
        <h3 className="section-title">Daily Meal Planner</h3>
        <div className="meal-list">
          {meals.map((meal, idx) => (
            <div
              className={`meal-card${meal.completed ? " meal-complete" : ""}`}
              key={meal.name}
            >
              <div className="meal-icon">{meal.emoji}</div>
              <div>
                <div className="meal-name">{meal.name}</div>
                <div className="meal-details">
                  <span>{meal.food}&nbsp;•&nbsp;{meal.time}</span>
                </div>
              </div>
              <button
                className={`meal-check${meal.completed ? " checked" : ""}`}
                onClick={() => toggleMeal(idx)}
                aria-label="Mark meal done"
              >
                {meal.completed ? (
                  <span className="meal-checkmark-anim">&#10003;</span>
                ) : (
                  <span className="meal-checkmark">&#9711;</span>
                )}
              </button>
              <button className="meal-edit-btn"
                onClick={() => {
                  const newFood = window.prompt(
                    "Edit food for " + meal.name,
                    meal.food
                  );
                  if (newFood) updateMeal(idx, newFood);
                }}
                aria-label="Edit meal"
              >✏️</button>
            </div>
          ))}
        </div>
      </section>

      {/* Weekly Food Schedule */}
      <section className="weekly-food-schedule-card">
        <div className="schedule-header">
          <h3 className="section-title">Weekly Food Schedule</h3>
          <button className="btn-export"
            onClick={() => {
              setPdfExporting(true);
              setTimeout(() => setPdfExporting(false), 1200);
            }}
            disabled={pdfExporting}
            aria-label="Export Schedule PDF"
          >{pdfExporting ? "Exporting..." : "Export PDF"}</button>
        </div>
        <div className="food-schedule-calendar">
          {weekSchedule.map((day, idx) => (
            <div key={day.label} className="schedule-col">
              <div className="calendar-day">{day.label}</div>
              {day.meals.map((food, midx) => (
                <div
                  key={food + midx}
                  className="calendar-meal"
                  style={{
                    background: day.colors[midx],
                  }}
                >{food}</div>
              ))}
            </div>
          ))}
        </div>
        <div className="calendar-legend">
          <span className="legend-box" style={{ background: "#FFD8BE" }} />
          <span className="black-legend-label">Protein</span>
          <span className="legend-box" style={{ background: "#A9DDD6" }} />
          <span className="black-legend-label">Carbs</span>
          <span className="legend-box" style={{ background: "#FBC2EB" }} />
          <span className="black-legend-label">Veggies</span>
        </div>
      </section>

      {/* Diet Overview & Nutrition Breakdown */}
      <section className="nutrition-breakdown-card">
        <h3 className="section-title">Diet Overview &amp; Nutrition Breakdown</h3>
        <div className="nutrition-charts-row">
          {/* Simulated donut chart */}
          <div className="donut-chart-wrap">
            <svg className="donut-svg" width="110" height="110">
              <circle className="donut-bg" cx="55" cy="55" r="48" fill="#f8f8f8" />
              <circle
                className="donut-protein"
                cx="55"
                cy="55"
                r="48"
                fill="none"
                stroke="#ffb347"
                strokeWidth="12"
                strokeDasharray="82 189"
                strokeDashoffset="0"
              />
              <circle
                className="donut-carbs"
                cx="55"
                cy="55"
                r="48"
                fill="none"
                stroke="#b9e8e0"
                strokeWidth="12"
                strokeDasharray="60 211"
                strokeDashoffset="82"
              />
              <circle
                className="donut-fat"
                cx="55"
                cy="55"
                r="48"
                fill="none"
                stroke="#fbc2eb"
                strokeWidth="12"
                strokeDasharray="47 223"
                strokeDashoffset="142"
              />
            </svg>
            <div className="donut-center-label">
              <span className="total-cal">620</span>
              <div>kcal/day</div>
            </div>
          </div>
          <div className="macro-chart-labels">
            <span style={{ color: "#ffb347" }}>Protein: 40%</span>
            <span style={{ color: "#b9e8e0" }}>Carbs: 30%</span>
            <span style={{ color: "#fbc2eb" }}>Fat: 20%</span>
          </div>
        </div>
      </section>

      {/* Preferred & Restricted Foods */}
      <section className="foods-tabs-card">
        <div className="foods-tabs">
          <button
            className={`food-tab${activeFoodTab === "preferred" ? " tab-active" : ""}`}
            onClick={() => setActiveFoodTab("preferred")}
          >Preferred Foods</button>
          <button
            className={`food-tab${activeFoodTab === "restricted" ? " tab-active" : ""}`}
            onClick={() => setActiveFoodTab("restricted")}
          >Restricted Foods</button>
        </div>
        <div className="foods-list">
          {(activeFoodTab === "preferred" ? preferredFoods : restrictedFoods).map(
            (f, i) => (
              <div
                key={f.label}
                className={`food-tile${f.alert ? " alert" : ""}`}
                tabIndex={0}
                title={f.alert ? "Consult vet before feeding" : ""}
              >
                <span className="food-icon">{f.emoji}</span>
                <span>{f.label}</span>
                {f.alert && <span className="alert-icon" aria-label="alert">⚠️</span>}
              </div>
            )
          )}
          <button className="food-add-btn" aria-label="Add food">
            ➕
          </button>
        </div>
      </section>

      {/* Water Intake Monitor */}
      <section className="water-intake-card">
        <h3 className="section-title">Water Intake Monitor</h3>
        <div className="hydration-tracker-row">
          <div className="hydration-bar-wrap">
            <div className="hydration-bar-bg">
              <div
                className="hydration-bar-fg"
                style={{
                  width: `${Math.min(100, (hydration / hydrationGoal) * 100)}%`,
                }}
              />
            </div>
            <div className="hydration-amount">
              {hydration} / {hydrationGoal} L
            </div>
          </div>
          <button className="hydration-btn add" onClick={addWater} title="Add water">+</button>
          <button className="hydration-btn sub" onClick={removeWater} title="Subtract water">−</button>
        </div>
        <div className="hydration-reminders">
          <label>
            <input
              type="checkbox"
              checked={waterRemind}
              onChange={e => setWaterRemind(e.target.checked)}
            />{" "}
            Receive hydration reminders
          </label>
        </div>
      </section>

      {/* Dietary Notes/Vet Instructions */}
      <section className="notes-vet-card">
        <div className="notes-card-header" onClick={() => setNotesOpen((o) => !o)}>
          <h3 className="section-title">Dietary Notes / Vet Instructions</h3>
          <span className="notes-toggle" aria-label="Expand notes">{notesOpen ? "▼" : "►"}</span>
        </div>
        {notesOpen && (
          <div className="notes-content">
            <textarea
              className="notes-textarea"
              placeholder="Type notes, allergies, restrictions, or vet advice..."
              value={vetNotes}
              onChange={e => setVetNotes(e.target.value)}
              rows={3}
            />
            <div className="notes-tools-row">
              <label className="notes-file-upload">
                📎 Upload
                <input
                  type="file"
                  className="notes-upload-input"
                  style={{ display: "none" }}
                  multiple
                  onChange={handleUpload}
                />
              </label>
            </div>
          </div>
        )}
      </section>

      {/* Upload Diet Documents */}
      <section className="diet-documents-card">
        <h3 className="section-title">Upload Diet Documents</h3>
        <input
          type="file"
          className="diet-file-input"
          multiple
          onChange={handleUpload}
        />
        <div className="uploaded-files-list">
          {uploadFiles.length === 0 && <p className="file-placeholder">No files uploaded.</p>}
          {uploadFiles.map((file, idx) => (
            <div key={file.name + idx} className="uploaded-file-row">
              <span className="file-icon">
                {file.type && file.type.includes("pdf") ? "📄" : "🗂️"}
              </span>
              <span className="file-name">{file.name}</span>
              <button className="file-remove-btn" onClick={() => removeUpload(idx)}>
                ❌
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default DietNutrition;
