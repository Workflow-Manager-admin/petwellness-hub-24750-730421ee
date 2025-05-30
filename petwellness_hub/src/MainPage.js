import React from "react";
import "./MainPage.css";

// PUBLIC_INTERFACE
function MainPage() {
  return (
    <div className="mainpage-root">
      <header className="mainpage-header">
        <div className="header-content">
          <div className="brand-area">
            <span className="brand-logo" aria-label="FurEverCare">🐾</span>
            <span className="brand-title">FurEverCare</span>
          </div>
          <nav className="main-nav" aria-label="Main navigation">
            <a href="/dashboard">Dashboard</a>
            <a href="/profile">Profile</a>
            <a href="/health-tracker">Health</a>
            <a href="/nutrition">Nutrition</a>
            <a href="/activity">Activity</a>
            <a href="/appointments/manage">Appointments</a>
            <a href="/documents">Documents</a>
          </nav>
          <div className="avatar-area">
            <img
              src="https://api.dicebear.com/7.x/bottts/svg?seed=petowner"
              className="user-avatar"
              alt="User Avatar"
            />
          </div>
        </div>
      </header>

      <main className="main-layout">
        {/* Hero/Welcoming Section */}
        <section className="hero-section">
          <div className="hero-text">
            <h1>Welcome back, <span className="hero-highlight">Pet Parent!</span></h1>
            <p>
              Keeping your pets healthy &amp; happy has never been easier. Review your dashboard for today's care updates, wellness stats, and helpful tips!
            </p>
          </div>
          <div className="hero-visual">
            <img
              src="https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=480&q=80"
              alt="Happy pets"
              className="hero-img"
              draggable="false"
            />
          </div>
        </section>
        
        {/* Grid of Pet Summary Cards */}
        <section className="pet-grid-panel" aria-label="Your Pets Overview">
          <h2>Your Pets</h2>
          <div className="pet-card-grid">
            {[
              {
                name: "Bella",
                type: "Dog",
                img: "https://api.dicebear.com/7.x/thumbs/svg?seed=Bella",
                age: "3y 4mo",
                nextCheckup: "Jul 28",
                activity: "185/200 mins",
                color: "#fcf1d1",
              },
              {
                name: "Mochi",
                type: "Cat",
                img: "https://api.dicebear.com/7.x/thumbs/svg?seed=Mochi",
                age: "1y 6mo",
                nextCheckup: "Aug 12",
                activity: "120/150 mins",
                color: "#e4effc",
              },
              {
                name: "Theo",
                type: "Rabbit",
                img: "https://api.dicebear.com/7.x/thumbs/svg?seed=Theo",
                age: "2y 2mo",
                nextCheckup: "Oct 3",
                activity: "60/90 mins",
                color: "#eaf5ea",
              },
            ].map((pet) => (
              <div className="pet-card" key={pet.name} style={{ background: pet.color }}>
                <img src={pet.img} alt={`${pet.name} avatar`} className="pet-avatar" />
                <div className="pet-info">
                  <div className="pet-name">{pet.name}</div>
                  <div className="pet-type-age">{pet.type} &middot; {pet.age}</div>
                  <div className="pet-next-checkup">
                    <span role="img" aria-label="Calendar">🗓️</span>
                    Next checkup: <strong>{pet.nextCheckup}</strong>
                  </div>
                  <div className="pet-activity">
                    <span role="img" aria-label="Activity">🏃</span> Activity: <span className="pet-activity-bar-bg">
                      <span
                        className="pet-activity-bar"
                        style={{
                          width: `${
                            Number(pet.activity.split("/")[0]) /
                            Number(pet.activity.split("/")[1].split(" ")[0])
                          } * 100%`,
                        }}
                      ></span>
                    </span>{pet.activity}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        <div className="main-panels-row">
          {/* Health/Care Overview Panel */}
          <section className="health-overview-panel" aria-label="Health Overview">
            <h3>Health &amp; Care Overview</h3>
            <div className="overview-grid">
              <div className="overview-item" style={{ background: "linear-gradient(135deg, #ffe5e5 40%, #ffeedd 80%)" }}>
                <span className="overview-icon" role="img" aria-label="Vaccinations">💉</span>
                Vaccinations
                <span className="overview-status positive">Up-to-date</span>
              </div>
              <div className="overview-item" style={{ background: "linear-gradient(135deg, #e6fce6 40%, #d1f7e1 80%)" }}>
                <span className="overview-icon" role="img" aria-label="Appointments">📅</span>
                Vet Appointments
                <span className="overview-status">2 upcoming</span>
              </div>
              <div className="overview-item" style={{ background: "linear-gradient(135deg, #e5f0ff 40%, #d4e6fc 80%)" }}>
                <span className="overview-icon" role="img" aria-label="Nutrition">🥗</span>
                Nutrition
                <span className="overview-status">Normal</span>
              </div>
              <div className="overview-item" style={{ background: "linear-gradient(135deg, #fae3fc 40%, #ede2fa 80%)" }}>
                <span className="overview-icon" role="img" aria-label="Activity">🚶</span>
                Exercise
                <span className="overview-status warning">185/200 mins</span>
              </div>
              <div className="overview-item" style={{ background: "linear-gradient(135deg, #faffd6 40%, #f1fca3 80%)" }}>
                <span className="overview-icon" role="img" aria-label="Weight">⚖️</span>
                Weight
                <span className="overview-status">Healthy</span>
              </div>
            </div>
          </section>
          
          {/* Reminders / Notifications */}
          <section className="reminders-panel" aria-label="Reminders and Notifications">
            <h3>
              <span role="img" aria-label="bell">🔔</span> Reminders
            </h3>
            <div className="reminders-scroll-list">
              {[
                {
                  text: "Bella: Deworming due July 19",
                  type: "alert",
                },
                {
                  text: "Mochi: Grooming appointment Aug 2, 2pm",
                  type: "info",
                },
                {
                  text: "Theo: Add weight tracking update",
                  type: "reminder",
                },
                {
                  text: "All: Next vaccine review - in 10 days",
                  type: "info",
                },
                {
                  text: "Bella: Log yesterday's walk",
                  type: "reminder",
                },
              ].map((rem, idx) => (
                <div className={`reminder-item ${rem.type}`} key={idx}>
                  {rem.text}
                </div>
              ))}
            </div>
          </section>

          {/* Tips / Care Panel */}
          <section className="tips-panel" aria-label="Care Tips">
            <h3>
              <span role="img" aria-label="light bulb">💡</span> Care Tips
            </h3>
            <div className="tips-columns">
              <ul>
                <li>
                  <strong>Hydration:</strong> Always keep fresh water accessible for your pets, especially after walks.
                </li>
                <li>
                  <strong>Routine:</strong> Consistent meal and exercise timings help maintain a healthy rhythm.
                </li>
                <li>
                  <strong>Dental Care:</strong> Brush teeth or provide dental chews weekly.
                </li>
              </ul>
              <ul>
                <li>
                  <strong>Grooming:</strong> Brush or groom fur regularly to spot health issues early.
                </li>
                <li>
                  <strong>Mental Enrichment:</strong> Rotate toys and play interactive games for stimulation.
                </li>
                <li>
                  <strong>Vet Check:</strong> Record all unusual symptoms and bring them up promptly.
                </li>
              </ul>
            </div>
          </section>
        </div>
      </main>

      <footer className="mainpage-footer">
        <div className="footer-gradient"></div>
        <div className="footer-content">
          <div className="footer-brand-social">
            <span className="brand-logo footer-logo" aria-label="FurEverCare">🐾</span>
            <span className="brand-title footer-title">FurEverCare</span>
            <div className="footer-social-icons">
              <a href="https://instagram.com/" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="https://facebook.com/" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-facebook"></i>
              </a>
              <a href="mailto:support@furevercare.app" aria-label="Email" target="_blank" rel="noopener noreferrer">
                <i className="fa-regular fa-envelope"></i>
              </a>
            </div>
          </div>
          <nav className="footer-links">
            <a href="/about">About</a>
            <a href="/privacy">Privacy</a>
            <a href="/help">Help</a>
            <a href="/contact">Contact</a>
          </nav>
          <span className="footer-copyright">
            &copy; {new Date().getFullYear()} FurEverCare. All rights reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}

export default MainPage;
