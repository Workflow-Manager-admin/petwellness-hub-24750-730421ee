import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Help.css";

// Demo FAQ data (can be replaced with real or loaded from API)
const faqs = [
  {
    q: "How do I reset my password?",
    a: "Go to Profile Settings and click on 'Change Password'. Follow the prompts to reset."
  },
  {
    q: "How can I add a new pet profile?",
    a: "Navigate to Dashboard > Pet Profiles and select 'Add New Pet'. Fill out the details and save."
  },
  {
    q: "What should I do if I cannot access my account?",
    a: "Please contact our support team via the Contact Us page for account recovery."
  },
  {
    q: "Is my pet's health data private?",
    a: "Yes. We take privacy seriously; your data is encrypted and stored securely."
  },
];

const quickLinks = [
  { title: "Pet Profiles", url: "/dashboard", icon: "🐾", desc: "Manage pets" },
  { title: "Appointments", url: "/appointments/manage", icon: "📅", desc: "Vet visits" },
  { title: "Health Records", url: "/health-tracker", icon: "🩺", desc: "Track health" },
  { title: "Diet/Nutrition", url: "/diet-nutrition", icon: "🍽️", desc: "Diet logs" },
];

const demoVideo = "https://www.youtube-nocookie.com/embed/lLJk1YgSaFQ";

// PUBLIC_INTERFACE
function Help() {
  const [q, setQ] = useState("");
  const [expanded, setExpanded] = useState(null);
  const navigate = useNavigate();

  // Search FAQ
  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.q.toLowerCase().includes(q.trim().toLowerCase()) ||
      faq.a.toLowerCase().includes(q.trim().toLowerCase())
  );

  return (
    <div className="help-root">
      <h2 className="title help-title">Help</h2>
      {/* Search Bar */}
      <section className="card card-search">
        <input
          type="search"
          className="help-searchbar"
          placeholder="Search help articles, FAQs..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Search Help"
        />
      </section>

      {/* FAQ Accordion */}
      <section className="faq-card-list">
        <h3 className="subtitle">Frequently Asked Questions</h3>
        <div className="faq-accordion">
          {(filteredFaqs.length > 0 ? filteredFaqs : faqs).map((faq, i) => (
            <div
              className={`faq-card ${expanded === i ? "open" : ""}`}
              key={faq.q}
            >
              <button
                type="button"
                className="faq-question"
                onClick={() => setExpanded(expanded === i ? null : i)}
                aria-expanded={expanded === i}
                aria-controls={`faq${i}_body`}
              >
                <span className="faq-q-icon">{expanded === i ? "➖" : "➕"}</span> {faq.q}
              </button>
              <div
                id={`faq${i}_body`}
                className="faq-answer"
                style={{ maxHeight: expanded === i ? 150 : 0 }}
                aria-hidden={expanded !== i}
              >
                <p>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Links */}
      <section className="quicklinks-grid">
        <h3 className="subtitle">Quick Links</h3>
        <div className="quicklinks-cards">
          {quickLinks.map((link) => (
            <div
              className="card quicklink-card"
              key={link.title}
              onClick={() => navigate(link.url)}
              tabIndex={0}
              role="link"
              aria-label={link.title}
            >
              <div className="quicklink-icon">{link.icon}</div>
              <div className="quicklink-title">{link.title}</div>
              <div className="quicklink-desc">{link.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Embedded media/help */}
      <section className="card media-card">
        <h3 className="subtitle">Getting Started Video</h3>
        <div className="media-wrapper">
          <iframe
            title="PetWellness Hub Demo"
            src={demoVideo}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen=""
            style={{
              width: "100%",
              height: 230,
              border: 0,
              borderRadius: 16,
              background: "#000",
            }}
          />
        </div>
      </section>

      {/* Call to action */}
      <section className="cta-card">
        <div className="card cta-content">
          <span>Still need help?</span>
          <button
            className="btn btn-large"
            onClick={() => navigate("/settings/support/contact")}
            aria-label="Contact Support"
            style={{
              marginLeft: 20,
              borderRadius: 25,
              background: "linear-gradient(90deg,var(--kavia-orange),#ffa94d)",
            }}
          >
            Contact Support
          </button>
        </div>
      </section>
    </div>
  );
}

export default Help;
