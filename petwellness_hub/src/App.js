import React from 'react';
import './App.css';
import TopNavBar from "./TopNavBar";
import LandingPage from "./LandingPage";

// Import Dashboard (fix missing import)
import Dashboard from "./Dashboard";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from "./Profile";
import HealthTracker from "./HealthTracker";
import "./HealthTracker.css";
import DietNutrition from "./DietNutrition";
import Activity from "./Activity";
import AppointmentsManage from "./AppointmentsManage";
import Notification from "./Notification";
import AboutPrivacy from "./AboutPrivacy";
import Login from "./Login";

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
                path="/diet-nutrition"
                element={<DietNutrition />}
              />
              <Route
                path="/appointments/manage"
                element={<AppointmentsManage />}
              />
              <Route
                path="/activity"
                element={<Activity />}
              />
              {/* Notifications route */}
              <Route
                path="/notifications"
                element={<Notification />}
              />
              {/* Default/fallback landing */}
              <Route
                path="/"
                element={
                  <LandingPage />
                }
              />
              <Route
                path="/login"
                element={<Login />}
              />
              <Route
                path="/signup"
                element={React.createElement(require("./SignUp").default)}
              />
              <Route
                path="/about"
                element={<AboutPrivacy />}
              />
              {/* Support: Contact Us and Help */}
              <Route
                path="/settings/support/contact"
                element={React.createElement(require("./ContactUs").default)}
              />
              <Route
                path="/settings/support/help"
                element={React.createElement(require("./Help").default)}
              />
            </Routes>
          </div>
        </main>
      </Router>
    </div>
  );
}

export default App;
