import React, { useState } from "react";
import "./ContactUs.css";

// PUBLIC_INTERFACE
function ContactUs() {
  // Form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    file: null,
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Form validation
  function validate() {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name required.";
    if (!form.email.trim()) {
      errs.email = "Email required.";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errs.email = "Invalid email.";
    }
    if (!form.subject.trim()) errs.subject = "Select subject.";
    if (!form.message.trim() || form.message.length < 10)
      errs.message = "Message (min 10 chars) required.";
    return errs;
  }

  // Handle input changes
  function handleChange(e) {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
    setErrors({});
  }

  // Submit handler
  function handleSubmit(e) {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length > 0) {
      setErrors(v);
      return;
    }
    setSubmitted(true);
    // Simulate send; production would use fetch()
    setTimeout(() => setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
      file: null,
    }), 2000);
  }

  // Reset handler
  function handleReset() {
    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
      file: null,
    });
    setErrors({});
    setSubmitted(false);
  }

  return (
    <div className="contactus-root">
      <h2 className="title contact-main-title">Contact Us</h2>
      <div className="contact-panels">
        {/* Contact Info Card */}
        <section className="card contact-info-panel">
          <h3 className="subtitle">Support Info</h3>
          <div className="info-list">
            <div className="info-row">
              <span className="icon" aria-label="Email">&#9993;</span>
              <span>support@petwellnesshub.com</span>
            </div>
            <div className="info-row">
              <span className="icon" aria-label="Phone">&#x260E;</span>
              <span>1-800-247-PAWS</span>
            </div>
            <div className="info-row">
              <span className="icon" aria-label="Hours">&#9200;</span>
              <span>Mon–Fri: 8am–6pm</span>
            </div>
            <div className="info-row">
              <span className="icon" aria-label="Address">&#127968;</span>
              <span>123 Pet Ave, Paw City, USA</span>
            </div>
          </div>
        </section>
        
        <section className="card contact-form-panel">
          <h3 className="subtitle">Contact Form</h3>
          {submitted && <div className="success-msg" role="status">Thank you! We received your message.</div>}
          <form onSubmit={handleSubmit} onReset={handleReset} noValidate autoComplete="off">
            <div className="form-row">
              <label>
                <span className="form-icon">&#128100;</span>
                Name
                <input 
                  type="text" 
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className={errors.name ? "invalid" : ""}
                  autoComplete="name"
                  required
                />
              </label>
              {errors.name && <span className="err-msg">{errors.name}</span>}
            </div>
            <div className="form-row">
              <label>
                <span className="form-icon">&#9993;</span>
                Email
                <input 
                  type="email" 
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className={errors.email ? "invalid" : ""}
                  autoComplete="email"
                  required
                />
              </label>
              {errors.email && <span className="err-msg">{errors.email}</span>}
            </div>
            <div className="form-row">
              <label>
                <span className="form-icon">&#128221;</span>
                Subject
                <select
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className={errors.subject ? "invalid" : ""}
                  required
                >
                  <option value="">Select...</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Account Support">Account Support</option>
                  <option value="Technical Issue">Technical Issue</option>
                  <option value="Feedback">Feedback</option>
                </select>
              </label>
              {errors.subject && <span className="err-msg">{errors.subject}</span>}
            </div>
            <div className="form-row">
              <label>
                <span className="form-icon">&#9998;</span>
                Message
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  minLength={10}
                  className={errors.message ? "invalid" : ""}
                  required
                />
              </label>
              {errors.message && <span className="err-msg">{errors.message}</span>}
            </div>
            <div className="form-row">
              <label>
                <span className="form-icon">&#128206;</span>
                <span style={{marginRight: 8}}>Attachment</span>
                <input 
                  type="file" 
                  name="file"
                  accept="image/*,application/pdf"
                  onChange={handleChange}
                />
                {form.file && (
                  <span className="file-label">{form.file.name}</span>
                )}
              </label>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-large" disabled={submitted}>
                Send
              </button>
              <button type="reset" className="btn btn-secondary" disabled={submitted}>
                Reset
              </button>
            </div>
          </form>
        </section>
      </div>
      {/* Optional: Embed Google map */}
      <section className="map-section">
        <iframe
          title="Office Location"
          src="https://maps.google.com/maps?q=123%20Pet%20Ave,%20Paw%20City&t=&z=13&ie=UTF8&iwloc=&output=embed"
          frameBorder="0"
          style={{border:0, borderRadius: "18px", width:"100%", height:"230px"}}
          allowFullScreen=""
          aria-hidden="false"
          tabIndex="0"
        />
      </section>
    </div>
  );
}

export default ContactUs;
