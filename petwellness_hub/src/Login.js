import React, { useState } from "react";
import "./Login.css";

// SVG Icon components
function UserIcon() {
  return (
    <span className="icon" aria-hidden="true">
      <svg viewBox="0 0 20 20" width="22" height="22" fill="none">
        <circle cx="10" cy="7" r="3.5" stroke="#8aa182" strokeWidth="1.4" />
        <path d="M16.5 16c0-3-2.91-5.5-6.5-5.5S3.5 13 3.5 16" stroke="#8aa182" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    </span>
  );
}

function LockIcon() {
  return (
    <span className="icon" aria-hidden="true">
      <svg viewBox="0 0 20 20" width="22" height="22" fill="none">
        <rect x="4.5" y="8.5" width="11" height="7" rx="2.5" stroke="#8aa182" strokeWidth="1.4"/>
        <path d="M7 8.5v-2A3 3 0 0 1 13 6.5v2" stroke="#8aa182" strokeWidth="1.4"/>
        <circle cx="10" cy="13" r="1" fill="#8aa182" />
      </svg>
    </span>
  );
}

function EyeIcon({ open, onClick }) {
  return (
    <span className="icon eye-icon" aria-label={open ? "Hide password" : "Show password"} onClick={onClick} tabIndex={0} role="button" onKeyDown={e => { if (e.key === "Enter") onClick(); }}>
      {open ? (
        // Eye open
        <svg viewBox="0 0 20 20" width="22" height="22" fill="none">
          <path d="M2 10c2-4 6-6 8-6s6 2 8 6c-2 4-6 6-8 6s-6-2-8-6z" stroke="#71706f" strokeWidth="1.5" />
          <circle cx="10" cy="10" r="2" fill="#8aa182" />
        </svg>
      ) : (
        // Eye closed
        <svg viewBox="0 0 20 20" width="22" height="22" fill="none">
          <path d="M2 10c2-4 6-6 8-6s6 2 8 6c-2 4-6 6-8 6s-6-2-8-6z" stroke="#71706f" strokeWidth="1.5"/>
          <path d="M6 14l8-8" stroke="#71706f" strokeWidth="1.5"/>
        </svg>
      )}
    </span>
  );
}

// Tooltip component
function Tooltip({ text, children }) {
  const [show, setShow] = useState(false);
  return (
    <span className="tooltip-wrap" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)} tabIndex={0} onFocus={() => setShow(true)} onBlur={() => setShow(false)}>
      {children}
      {show && (
        <span className="tooltip" role="tooltip">
          {text}
        </span>
      )}
    </span>
  );
}

// PUBLIC_INTERFACE
function Login() {
  // local state for login form
  const [form, setForm] = useState({ user: "", pass: "", remember: false });
  const [touched, setTouched] = useState({ user: false, pass: false });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form validation (demo only)
  const userValid = form.user.length > 2;
  const passValid = form.pass.length > 5;

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  }

  function handleBlur(e) {
    setTouched(t => ({ ...t, [e.target.name]: true }));
  }

  function handleLogin(e) {
    e.preventDefault();
    setTouched({ user: true, pass: true });
    if (userValid && passValid) {
      setLoading(true);
      setTimeout(() => setLoading(false), 1800); // Demo: simulate login
    }
  }

  return (
    <div className="login-root">
      <div className="login-card">
        {/* Branding / Welcome Area */}
        <section className="brand-panel" aria-label="FurEverCare branding">
          <div className="brand-gradient"></div>
          <div className="brand-content">
            <div className="brand-logo">
              <svg viewBox="0 0 48 48" width="48" height="48">
                {/* Pet paw logo */}
                <circle cx="24" cy="30" r="10" fill="#8aa182"/>
                <circle cx="16" cy="20" r="4" fill="#d1d5ae"/>
                <circle cx="32" cy="20" r="4" fill="#d1d5ae"/>
                <circle cx="29.5" cy="12.5" r="2.2" fill="#71706f"/>
                <circle cx="18.5" cy="12.5" r="2.2" fill="#71706f"/>
              </svg>
            </div>
            <h1 className="brand-title">
              FurEverCare
            </h1>
            <p className="brand-desc">
              Pet wellness, <span className="highlight">simplified</span>.<br/>
              <span style={{ fontSize: "1rem" }}>Sign in to manage your pet’s health, nutrition, and happiness!</span>
            </p>
          </div>
        </section>

        {/* Login form */}
        <section className="login-panel" aria-label="Login form">
          <form className="login-form" autoComplete="off" noValidate onSubmit={handleLogin}>
            <h2>Sign in to your account</h2>
            {/* Username/email */}
            <div className={`field ${touched.user && !userValid ? "field-error" : ""}`}>
              <label htmlFor="user">Username or Email</label>
              <div className="input-wrap">
                <UserIcon />
                <input
                  type="text"
                  name="user"
                  id="user"
                  placeholder="e.g. jane.doe@email.com"
                  autoComplete="username"
                  value={form.user}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={touched.user && !userValid}
                  aria-describedby={touched.user && !userValid ? "userHelp" : undefined}
                  required
                  disabled={loading}
                />
              </div>
              {touched.user && !userValid && (
                <span className="input-message" id="userHelp">
                  Enter at least 3 characters.
                </span>
              )}
            </div>
            {/* Password */}
            <div className={`field ${touched.pass && !passValid ? "field-error" : ""}`}>
              <label htmlFor="pass">Password</label>
              <div className="input-wrap">
                <LockIcon />
                <input
                  type={showPass ? "text" : "password"}
                  name="pass"
                  id="pass"
                  placeholder="Your password"
                  autoComplete="current-password"
                  value={form.pass}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={touched.pass && !passValid}
                  aria-describedby={touched.pass && !passValid ? "passHelp" : undefined}
                  required
                  disabled={loading}
                />
                <EyeIcon open={showPass} onClick={() => setShowPass(v => !v)} />
              </div>
              {touched.pass && !passValid && (
                <span className="input-message" id="passHelp">
                  Password must be at least 6 characters.
                </span>
              )}
            </div>
            {/* Remember Me + forgot password */}
            <div className="login-options">
              <Tooltip text="Keep me logged in for 30 days (not recommended on public devices)">
                <label className="switch-label">
                  <input
                    type="checkbox"
                    name="remember"
                    checked={form.remember}
                    onChange={handleChange}
                    disabled={loading}
                  />
                  <span className="switch-slider" aria-hidden="true"></span>
                  <span style={{ marginLeft: 8 }}>Remember me</span>
                </label>
              </Tooltip>
              <a className="forgot-link" href="#" tabIndex={loading ? -1 : 0} aria-disabled={loading}>
                Forgot password?
              </a>
            </div>
            {/* Login button */}
            <button className="btn btn-login" type="submit" disabled={loading || !userValid || !passValid} aria-busy={loading}>
              {loading ? <span className="loader"></span> : "Log In"}
            </button>
            {/* Divider */}
            <div className="divider">
              <span>or</span>
            </div>
            {/* Placeholder for future social login icons */}
            <div className="social-login">
              <button className="social-btn" type="button" disabled title="Coming soon" aria-disabled="true">
                <svg width="21" height="21" viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="#d1d5ae"/><text x="50%" y="55%" dy=".3em" textAnchor="middle" fontSize="16" fill="#71706f">G</text></svg>
              </button>
              <button className="social-btn" type="button" disabled title="Coming soon" aria-disabled="true">
                <svg width="21" height="21" viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="#d1d5ae"/><text x="50%" y="55%" dy=".3em" textAnchor="middle" fontSize="16" fill="#71706f">f</text></svg>
              </button>
              <button className="social-btn" type="button" disabled title="Coming soon" aria-disabled="true">
                <svg width="21" height="21" viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="#d1d5ae"/><text x="50%" y="55%" dy=".3em" textAnchor="middle" fontSize="16" fill="#71706f">A</text></svg>
              </button>
            </div>
          </form>
          {/* Alternate sign up panel */}
          <div className="alt-panel">
            <span>New to FurEverCare?</span>
            <a className="signup-btn" href="/signup">
              Create an account
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Login;
