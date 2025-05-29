import React from 'react';
import './App.css';
import TopNavBar from "./TopNavBar";
import LandingPage from "./LandingPage";

// Import Dashboard (fix missing import)
import Dashboard from "./Dashboard";

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
              {/* Dashboard route FIX */}
              <Route
                path="/dashboard"
                element={<Dashboard />}
              />
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
                  <LandingPage />
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