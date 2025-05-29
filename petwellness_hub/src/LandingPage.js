import React from "react";
import "./LandingPage.css";

// PUBLIC_INTERFACE
function LandingPage() {
  /**
   * FurEverCare Landing Page - Hero, Features, About, (optional) Testimonials, Footer.
   * - Placeholder images/icons are used.
   * - Ready for future animation/dark mode upgrades.
   */
  return (
    <div className="furever-landing">
      {/* Hero Section */}
      <section className="furever-hero">
        <div className="furever-hero-left">
          <h1 className="furever-hero-title">
            Caring for Pets. Empowering Owners.<br />
            <span className="gradient-text">FurEverCare.</span>
          </h1>
          <p className="furever-hero-desc">
            Your all-in-one pet wellness companion.<br />
            Track health, nutrition, activity, and more—all in one beautiful dashboard.
          </p>
          <div className="furever-hero-cta-row" style={{justifyContent: 'center', width: '100%'}}>
            <a href="/signup" className="furever-btn furever-btn-gradient" tabIndex={0}>Get Started</a>
            <a href="/profile" className="furever-btn furever-btn-glass" tabIndex={0}>See Dashboard</a>
          </div>
          <div className="furever-hero-note">
            {/* Could add AOS/GSAP for fade-in: See <LandingPage.css> for upgrade comment */}
            <span role="img" aria-label="paw">🐾</span> Loved by pet parents and vets.
          </div>
        </div>
        <div className="furever-hero-right">
          {/* Main dashboard illustration */}
          <div className="furever-hero-illus-wrapper">
            <img
              className="furever-hero-illus"
              src="https://undraw.co/api/illustrations/038ae9e2-b5e2-48a6-973b-f47153b57c46"
              alt="Pet dashboard illustration (placeholder)"
            />
            {/* Floating icons */}
            <div className="furever-hero-float-icon furever-float-1" title="Profile">
              <span role="img" aria-label="profile">🐶</span>
            </div>
            <div className="furever-hero-float-icon furever-float-2" title="Heart">
              <span role="img" aria-label="heart">❤️</span>
            </div>
            <div className="furever-hero-float-icon furever-float-3" title="Checked">
              <span role="img" aria-label="check">✅</span>
            </div>
            {/* Placeholders for possible parallax animation */}
            {/* TODO: Add parallax with GSAP/AOS in upgrade */}
          </div>
        </div>
      </section>
      {/* Key Features */}
      <section className="furever-features">
        <h2 className="furever-section-title">Key Features</h2>
        <div className="furever-features-grid">
          <FeatureCard
            icon={<span role="img" aria-label="profile">🐕</span>}
            title="Pet Profiles"
            desc="Create and manage detailed pet profiles for every furry friend."
          />
          <FeatureCard
            icon={<span role="img" aria-label="health">🩺</span>}
            title="Health Records"
            desc="Track vaccinations, vet visits, medications, deworming & more."
          />
          <FeatureCard
            icon={<span role="img" aria-label="nutrition">🥕</span>}
            title="Diet & Nutrition"
            desc="Log daily meals and receive nutrition recommendations for healthy pets."
          />
          <FeatureCard
            icon={<span role="img" aria-label="activity">🏃‍♂️</span>}
            title="Activity Monitoring"
            desc="Visualize walks, playtime, and exercise with fun progress stats."
          />
        </div>
      </section>
      {/* About/Our Story */}
      <section className="furever-about-story">
        <div className="furever-about-content">
          <h2 className="furever-section-title">Our Story</h2>
          <p>
            FurEverCare began with a simple mission: to help every pet thrive and every owner feel confident. 
            Our founders, both pet lovers and technologists, wanted to build a safer, more joyful world for animals—using the power of modern technology and design.
            Join us as we make pet wellness easy, accessible, and beautiful!
          </p>
          {/* Could add chat widget or timeline animation here */}
        </div>
        <div className="furever-about-illus-wrapper">
          <img
            src="https://undraw.co/api/illustrations/f22cdaa9-67e6-48d7-b072-2bdfd2e914b1"
            alt="Pet owner & dog illustration"
            className="furever-about-illus"
          />
        </div>
        {/* SVG background for soft curves */}
        <svg className="furever-about-bg-svg" viewBox="0 0 500 160" preserveAspectRatio="none">
          <path
            d="M0,48 C180,120 320,10 500,70 L500,00 L0,0 Z"
            style={{ fill: "rgba(138,161,130, 0.07)" }}
          />
        </svg>
      </section>
      {/* (Optional) Testimonials */}
      <section className="furever-testimonials">
        <h2 className="furever-section-title">What Users Say</h2>
        <div className="furever-testimonial-grid">
          <TestimonialCard
            avatar="https://api.dicebear.com/7.x/adventurer/svg?seed=dog1"
            user="Alex P."
            feedback="FurEverCare makes tracking vet appointments easy, and I love the design!"
          />
          <TestimonialCard
            avatar="https://api.dicebear.com/7.x/adventurer/svg?seed=cat3"
            user="Morgan K."
            feedback="My cats and I are fans. The reminders and meal logs are a lifesaver 💖."
          />
          <TestimonialCard
            avatar="https://api.dicebear.com/7.x/adventurer/svg?seed=rabbit"
            user="Samantha W."
            feedback="Finally, a pet app that's beautiful AND useful. So many features in one place!"
          />
        </div>
      </section>
      {/* Footer */}
      <footer className="furever-footer">
        <div className="furever-footer-inner">
          <div className="furever-footer-brand">
            <span className="footer-logo" role="img" aria-label="paw">🐾</span>
            <span>FurEverCare</span>
          </div>
          <div className="furever-footer-links">
            <a href="/about">About</a>
            <a href="/support/contact">Contact</a>
            <a href="/profile">Dashboard</a>
          </div>
          <div className="furever-footer-social">
            <a href="#" aria-label="Twitter" title="Twitter" rel="noopener noreferrer">
              <span role="img" aria-label="twitter">🐦</span>
            </a>
            <a href="#" aria-label="Instagram" title="Instagram" rel="noopener noreferrer">
              <span role="img" aria-label="instagram">📸</span>
            </a>
          </div>
        </div>
        <div className="furever-footer-bottom">
          &copy; {new Date().getFullYear()} FurEverCare. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

// PUBLIC_INTERFACE
function FeatureCard({ icon, title, desc }) {
  /** @public Glassmorphism feature card */
  return (
    <div className="furever-feature-card">
      <div className="furever-feature-icon">{icon}</div>
      <h3 className="furever-feature-title">{title}</h3>
      <div className="furever-feature-desc">{desc}</div>
    </div>
  );
}

// PUBLIC_INTERFACE
function TestimonialCard({ avatar, user, feedback }) {
  /** @public Glass testimonial card */
  return (
    <div className="furever-testimonial-card">
      <div className="furever-testimonial-avatar">
        <img src={avatar} alt={user + " avatar"} />
      </div>
      <div className="furever-testimonial-user">{user}</div>
      <div className="furever-testimonial-feedback">"{feedback}"</div>
      <div className="furever-testimonial-stars" aria-label="5 stars">
        {Array(5)
          .fill()
          .map((_, i) => (
            <span key={i} role="img" aria-label="star">
              ⭐
            </span>
          ))}
      </div>
    </div>
  );
}

export default LandingPage;
