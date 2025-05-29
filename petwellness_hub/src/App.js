import React from 'react';
import './App.css';
import TopNavBar from "./TopNavBar";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from "./Profile";
import HealthTracker from "./HealthTracker";
import DietNutrition from "./DietNutrition";
import Activity from "./Activity";

// PUBLIC_INTERFACE
function App() {
  return (
    <div className="app">
      <Router>
        <TopNavBar />

        <main>
          <div className="container" style={{ paddingTop: 80 }}>
            <Routes>
              <Route
                path="/profile"
                element={<Profile />}
              />
              <Route
                path="/health-tracker"
                element={<HealthTracker />}
              />
              <Route
                path="/nutrition"
                element={<DietNutrition />}
              />
              <Route
                path="/activity"
                element={<Activity />}
              />
              {/* Default/fallback landing */}
              <Route
                path="/"
                element={
                  <div className="hero">
                    <div className="subtitle">AI Workflow Manager Template</div>
                    <h1 className="title">petwellness_hub</h1>
                    <div className="description">Start building your application.</div>
                    <button className="btn btn-large">Button</button>
                  </div>
                }
              />
            </Routes>
          </div>
        </main>
      </Router>
    </div>
  );
}

export default App;