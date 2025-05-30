import React from "react";
import "./LandingPage.css";

// PUBLIC_INTERFACE
function LandingPage() {
  return (
    <div className="furevercare-landing">
      {/* --- Hero / Banner Section --- */}
      <section className="furevercare-hero">
        <div className="furevercare-hero-bg-anim" aria-hidden="true"></div>
        <div className="furevercare-hero-content">
          <div className="furevercare-logo-circle">
            <span role="img" aria-label="paw print" className="furevercare-paw">🐾</span>
          </div>
          <h1 className="furevercare-title">
            FurEverCare
          </h1>
          <p className="furevercare-headline">
            Modern pet wellness, <span className="gradient-text">reimagined</span>
          </p>
          <p className="furevercare-subtext">
            All-in-one platform to track, organize, and love your pets better—from health and meals to activity and appointments.
          </p>
          <div className="furevercare-cta-btns">
            <a href="/signup" className="furevercare-btn furevercare-btn-primary">
              Get Started
            </a>
            <a href="/dashboard" className="furevercare-btn furevercare-btn-secondary">
              Live Demo
            </a>
          </div>
        </div>
      </section>

      {/* --- Value Propositions --- */}
      <section className="furevercare-grid-section">
        <h2 className="section-title">Why FurEverCare?</h2>
        <div className="furevercare-value-grid">
          <div className="furevercare-value-card animate-pop">
            <span className="card-icon" role="img" aria-label="profile">🐶</span>
            <h3>Pet Profiles</h3>
            <p>Create detailed, lovable profiles for all your pets.</p>
          </div>
          <div className="furevercare-value-card animate-pop" style={{ animationDelay: "0.07s" }}>
            <span className="card-icon" role="img" aria-label="medical">💉</span>
            <h3>Health Tracking</h3>
            <p>Vaccinations, illnesses & reminders in one place.</p>
          </div>
          <div className="furevercare-value-card animate-pop" style={{ animationDelay: "0.14s" }}>
            <span className="card-icon" role="img" aria-label="nutrition">🍽️</span>
            <h3>Diet & Nutrition</h3>
            <p>Log and manage meals for optimal pet wellness.</p>
          </div>
          <div className="furevercare-value-card animate-pop" style={{ animationDelay: "0.21s" }}>
            <span className="card-icon" role="img" aria-label="activity">🏃‍♂️</span>
            <h3>Activity Monitor</h3>
            <p>Track steps, walks, & playtime with easy logging.</p>
          </div>
          <div className="furevercare-value-card animate-pop" style={{ animationDelay: "0.28s" }}>
            <span className="card-icon" role="img" aria-label="appointment">📅</span>
            <h3>Appointments</h3>
            <p>Book and manage vet visits with smart reminders.</p>
          </div>
          <div className="furevercare-value-card animate-pop" style={{ animationDelay: "0.35s" }}>
            <span className="card-icon" role="img" aria-label="docs">📑</span>
            <h3>Safe Docs</h3>
            <p>Store prescriptions, records & notes securely.</p>
          </div>
        </div>
      </section>

      {/* --- Feature Preview Cards --- */}
      <section className="furevercare-feature-cards-section">
        <h2 className="section-title">Platform Features</h2>
        <div className="furevercare-feature-cards">
          <div className="furevercare-feature-card glassy-card hover-rise">
            <div className="feature-icon" role="img" aria-label="bell">🔔</div>
            <h3>Notifications / Reminders</h3>
            <p>Never miss a vaccine or playdate — smart alerts keep you on track.</p>
          </div>
          <div className="furevercare-feature-card glassy-card hover-rise">
            <div className="feature-icon" role="img" aria-label="dashboard">📊</div>
            <h3>Visual Dashboard</h3>
            <p>Easily spot trends & see progress for each pet at a glance.</p>
          </div>
          <div className="furevercare-feature-card glassy-card hover-rise">
            <div className="feature-icon" role="img" aria-label="secure">🔒</div>
            <h3>Your Data is Safe</h3>
            <p>Bank-level security keeps your pet info and records protected.</p>
          </div>
        </div>
      </section>

      {/* --- How it Works / Infographic --- */}
      <section className="furevercare-howitworks-section">
        <h2 className="section-title">How It Works</h2>
        <div className="furevercare-howitworks-steps">
          <div className="howitworks-step animate-fadein">
            <span className="step-badge">1</span>
            <div className="step-icon" role="img" aria-label="sign up">📝</div>
            <div>
              <h4>Sign up & create a pet profile</h4>
              <p>Add all your furry friends. No limit!</p>
            </div>
          </div>
          <div className="howitworks-arrow"></div>
          <div className="howitworks-step animate-fadein" style={{ animationDelay: "0.2s" }}>
            <span className="step-badge">2</span>
            <div className="step-icon" role="img" aria-label="customize">⚙️</div>
            <div>
              <h4>Personalize wellness details</h4>
              <p>Upload health, schedule meals, customize reminders.</p>
            </div>
          </div>
          <div className="howitworks-arrow"></div>
          <div className="howitworks-step animate-fadein" style={{ animationDelay: "0.4s" }}>
            <span className="step-badge">3</span>
            <div className="step-icon" role="img" aria-label="track">📈</div>
            <div>
              <h4>Track, manage & celebrate</h4>
              <p>See progress, get tips, and enjoy happy pets!</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Testimonials Section --- */}
      <section className="furevercare-testimonials-section">
        <h2 className="section-title">What Pet Parents Say</h2>
        <div className="furevercare-testimonials-grid">
          <div className="testimonial-card glassy-card animate-floating">
            <div className="testimonial-avatar" style={{backgroundColor:"#fed6f4"}}>
              <span role="img" aria-label="dog owner">🧑‍🦱</span>
            </div>
            <blockquote>
              “FurEverCare makes it so easy to keep track of my dog’s vet visits. The reminders are a life saver!”
            </blockquote>
            <div className="testimonial-author">— Jamie</div>
          </div>
          <div className="testimonial-card glassy-card animate-floating" style={{ animationDelay: "0.15s" }}>
            <div className="testimonial-avatar" style={{backgroundColor:"#ffe5b4"}}>
              <span role="img" aria-label="cat owner">👩‍🦰</span>
            </div>
            <blockquote>
              “My two cats' health history is finally organized.
              I love the dashboard and cute vibes!”
            </blockquote>
            <div className="testimonial-author">— Alex</div>
          </div>
          <div className="testimonial-card glassy-card animate-floating" style={{ animationDelay: "0.3s" }}>
            <div className="testimonial-avatar" style={{backgroundColor:"#b4eaff"}}>
              <span role="img" aria-label="pet parent">👨‍🦳</span>
            </div>
            <blockquote>
              “The activity tracker motivates us to walk more together. Highly recommend for busy pet parents.”
            </blockquote>
            <div className="testimonial-author">— Pat</div>
          </div>
        </div>
      </section>

      {/* --- Signup CTA Banner --- */}
      <section className="furevercare-cta-section">
        <h2>Ready to give your pets the best?</h2>
        <p>
          Create your free FurEverCare account and join a happier, healthier pet community.
        </p>
        <a href="/signup" className="furevercare-btn furevercare-btn-large furevercare-btn-brand">
          Try FurEverCare Free
        </a>
      </section>

      {/* --- Footer --- */}
      <footer className="furevercare-footer">
        <div className="footer-main">
          <div className="footer-logo-mark"><span role="img" aria-label="paw">🐾</span></div>
          <div className="footer-nav">
            <a href="/" className="footer-link">Home</a>
            <a href="/about" className="footer-link">About</a>
            <a href="/dashboard" className="footer-link">Dashboard</a>
            <a href="/contact" className="footer-link">Contact</a>
          </div>
        </div>
        <div className="footer-socials">
          <a href="https://twitter.com/" className="footer-social" aria-label="Twitter" rel="noopener noreferrer" target="_blank">🐦</a>
          <a href="https://instagram.com/" className="footer-social" aria-label="Instagram" rel="noopener noreferrer" target="_blank">📸</a>
        </div>
        <div className="footer-copy">
          © {new Date().getFullYear()} FurEverCare. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
