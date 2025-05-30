import React, { useState } from "react";
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";

// PUBLIC_INTERFACE
function SignUp() {
  const navigate = useNavigate();

  // State for form fields
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
    consent: false,
  });

  // State for form visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // State for errors & status messages
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });

  const navigate = useNavigate ? useNavigate() : () => {};

  // Utils for validation
  function validate(fields = form) {
    let errs = {};
    if (!fields.username.trim()) errs.username = "Username is required";
    if (!fields.email.trim()) {
      errs.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(fields.email)
    ) {
      errs.email = "Enter a valid email";
    }
    if (!fields.password) {
      errs.password = "Password is required";
    } else if (fields.password.length < 8) {
      errs.password = "Password must be at least 8 characters";
    } else if (!/[0-9]/.test(fields.password)) {
      errs.password = "Password must contain a number";
    } else if (!/[A-Za-z]/.test(fields.password)) {
      errs.password = "Password must contain a letter";
    }
    if (!fields.confirm) {
      errs.confirm = "Please confirm your password";
    } else if (fields.confirm !== fields.password) {
      errs.confirm = "Passwords do not match";
    }
    if (!fields.consent) {
      errs.consent = "You must agree to Terms & Privacy Policy";
    }
    return errs;
  }

  // Icon SVGs (inlined for demo)
  const icons = {
    user: (
      <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
        <circle cx="10" cy="7" r="4" stroke="#8aa182" strokeWidth="1.5" />
        <path
          d="M17 17c0-2.209-2.686-4-6-4s-6 1.791-6 4"
          stroke="#8aa182"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    mail: (
      <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
        <rect
          x="3"
          y="5"
          width="14"
          height="10"
          rx="2"
          stroke="#8aa182"
          strokeWidth="1.5"
        />
        <path
          d="M3.5 6l6.878 5.263a2 2 0 0 0 2.449 0L18 6"
          stroke="#8aa182"
          strokeWidth="1.5"
        />
      </svg>
    ),
    lock: (
      <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
        <rect
          x="3.5"
          y="8.5"
          width="13"
          height="7"
          rx="2"
          stroke="#8aa182"
          strokeWidth="1.5"
        />
        <path
          d="M7 8V6a3 3 0 1 1 6 0v2"
          stroke="#8aa182"
          strokeWidth="1.5"
        />
        <circle cx="10" cy="13" r="1" fill="#8aa182" />
      </svg>
    ),
    eye: (
      <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
        <path
          d="M10 15c4 0 7-5 7-5s-3-5-7-5-7 5-7 5 3 5 7 5z"
          stroke="#71706f"
          strokeWidth="1.3"
        />
        <circle
          cx="10"
          cy="10"
          r="2"
          stroke="#71706f"
          strokeWidth="1.3"
          fill="none"
        />
      </svg>
    ),
    eyeOff: (
      <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
        <path
          d="M2 2l16 16"
          stroke="#d1d5ae"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M10 15c4 0 7-5 7-5s-1.1-1.8-3-3M5.7 5.7C3.75 7.18 3 10 3 10s3 5 7 5"
          stroke="#71706f"
          strokeWidth="1.3"
        />
        <circle
          cx="10"
          cy="10"
          r="2"
          stroke="#71706f"
          strokeWidth="1.3"
          fill="none"
        />
      </svg>
    ),
    paw: (
      // Pet paw for branding/illustration
      <svg width="82" height="54" fill="none" viewBox="0 0 82 54">
        <ellipse
          cx="41"
          cy="47.5"
          rx="15"
          ry="6.5"
          fill="#d1d5ae"
          fillOpacity="0.6"
        />
        <circle cx="15" cy="27" r="8" fill="#8aa182" />
        <circle cx="67" cy="27" r="8" fill="#8aa182" />
        <ellipse
          cx="41"
          cy="20"
          rx="17"
          ry="20"
          fill="#8aa182"
        />
        <ellipse
          cx="16"
          cy="8"
          rx="5"
          ry="7"
          fill="#d1d5ae"
        />
        <ellipse
          cx="66"
          cy="8"
          rx="5"
          ry="7"
          fill="#d1d5ae"
        />
      </svg>
    )
  };

  // Handlers
  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(f => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Real-time validation
    setErrors(validate({ ...form, [name]: type === "checkbox" ? checked : value }));
  }

  function handleTogglePassword() {
    setShowPassword(v => !v);
  }

  function handleToggleConfirm() {
    setShowConfirm(v => !v);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validation = validate(form);
    setErrors(validation);

    if (Object.keys(validation).length === 0) {
      setSubmitting(true);
      setSubmitStatus({ type: "", message: "" });
      // Fake delay for demo
      setTimeout(() => {
        setSubmitting(false);
        // Demonstrate success/failure randomly
        if (form.username.toLowerCase() === "petlover") {
          setSubmitStatus({
            type: "error",
            message:
              "Username already exists. Please choose another one."
          });
        } else {
          setSubmitStatus({
            type: "success",
            message:
              "Sign up successful! Welcome to FurEverCare 🐾"
          });
          setForm({
            username: "",
            email: "",
            password: "",
            confirm: "",
            consent: false,
          });
          // For demo, navigate to Log In after a delay
          setTimeout(() => {
            if (navigate) navigate("/login");
          }, 1200);
        }
      }, 1300);
    } else {
      setSubmitStatus({ type: "error", message: "Please correct the above errors." });
    }
  }

  return (
    <div className="signup-root">
      {/* Welcome branding */}
      <div className="signup-branding">
        <span className="signup-paw">{icons.paw}</span>
        <h1 className="signup-title">
          Welcome to <span>FurEverCare!</span>
        </h1>
        <p className="signup-desc">
          Create your account to manage your pet's wellness journey with ease.
        </p>
      </div>
      {/* Signup Form */}
      <form className="signup-form" onSubmit={handleSubmit} noValidate>
        <div className="signup-field">
          <label htmlFor="username">
            <span className="signup-icon">{icons.user}</span> Username
          </label>
          <input
            name="username"
            id="username"
            placeholder="Choose a username"
            value={form.username}
            onChange={handleChange}
            className={errors.username ? "has-error" : ""}
            autoComplete="username"
            disabled={submitting}
          />
          {errors.username && (
            <span className="signup-err">{errors.username}</span>
          )}
        </div>
        <div className="signup-field">
          <label htmlFor="email">
            <span className="signup-icon">{icons.mail}</span> Email
          </label>
          <input
            name="email"
            id="email"
            type="email"
            placeholder="you@email.com"
            value={form.email}
            onChange={handleChange}
            className={errors.email ? "has-error" : ""}
            autoComplete="email"
            disabled={submitting}
          />
          {errors.email && (
            <span className="signup-err">{errors.email}</span>
          )}
        </div>
        <div className="signup-field signup-password-wrap">
          <label htmlFor="password">
            <span className="signup-icon">{icons.lock}</span> Password
          </label>
          <div className="signup-password-box">
            <input
              name="password"
              id="password"
              placeholder="Create a password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              className={errors.password ? "has-error" : ""}
              autoComplete="new-password"
              disabled={submitting}
            />
            <button
              type="button"
              className="signup-eyebtn"
              tabIndex={-1}
              onClick={handleTogglePassword}
              aria-label={showPassword ? "Hide password" : "Show password"}
              disabled={submitting}
            >
              {showPassword ? icons.eyeOff : icons.eye}
            </button>
          </div>
          {errors.password && (
            <span className="signup-err">{errors.password}</span>
          )}
        </div>
        <div className="signup-field signup-password-wrap">
          <label htmlFor="confirm">
            <span className="signup-icon">{icons.lock}</span> Confirm Password
          </label>
          <div className="signup-password-box">
            <input
              name="confirm"
              id="confirm"
              placeholder="Re-enter password"
              type={showConfirm ? "text" : "password"}
              value={form.confirm}
              onChange={handleChange}
              className={errors.confirm ? "has-error" : ""}
              autoComplete="new-password"
              disabled={submitting}
            />
            <button
              type="button"
              className="signup-eyebtn"
              tabIndex={-1}
              onClick={handleToggleConfirm}
              aria-label={showConfirm ? "Hide password" : "Show password"}
              disabled={submitting}
            >
              {showConfirm ? icons.eyeOff : icons.eye}
            </button>
          </div>
          {errors.confirm && (
            <span className="signup-err">{errors.confirm}</span>
          )}
        </div>

        {/* Consent Checkbox */}
        <div className="signup-field signup-consent">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            checked={!!form.consent}
            onChange={handleChange}
            disabled={submitting}
          />
          <label htmlFor="consent">
            I agree to the{" "}
            <a href="/about" target="_blank" rel="noopener noreferrer">
              Terms &amp; Conditions
            </a>{" "}
            and{" "}
            <a href="/about#privacy" target="_blank" rel="noopener noreferrer">
              Privacy Policy
            </a>
            .
          </label>
        </div>
        {errors.consent && (
          <span className="signup-err">{errors.consent}</span>
        )}

        {/* Error or success message */}
        {submitStatus.type && (
          <div className={`signup-status ${submitStatus.type}`}>
            {submitStatus.message}
          </div>
        )}
        {/* Animated gradient button */}
        <button
          type="submit"
          className={`signup-btn ${submitting ? "is-loading" : ""}`}
          disabled={submitting}
        >
          {submitting ? (
            <span className="signup-btn-loader"></span>
          ) : (
            "Sign Up"
          )}
        </button>
      </form>
      {/* Redirect to Log In */}
      <div className="signup-login-redirect">
        Already have an account?{" "}
        <Link to="/login" className="signup-login-link">
          Log In
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
