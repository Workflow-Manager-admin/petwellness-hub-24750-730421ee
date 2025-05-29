import React, { useState } from "react";
import "./TopNavBar.css";

// PUBLIC_INTERFACE
function TopNavBar() {
  /**
   * FurEverCare Main Top Navigation Bar Component.
   * - Left: Logo (paw icon) & brand (clickable, returns to landing page)
   * - Right: Responsive navigation (Dashboard, My Pets with dropdown, Profile, Health Tracker, Diet & Nutrition, Activity,
   *   Appointments dropdown, Notifications, Settings (multi-level dropdown including Account/Login/Signup, Support, About))
   * - Responsive for mobile/desktop. Modern/friendly colors per requirements.
   */

  // Dropdown menu open/close state for nav and nested dropdowns
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openSubDropdown, setOpenSubDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handles dropdown toggles
  const handleDropdown = (menu) =>
    setOpenDropdown(openDropdown === menu ? null : menu);

  // Handles sub-dropdown toggles
  const handleSubDropdown = (submenu) =>
    setOpenSubDropdown(openSubDropdown === submenu ? null : submenu);

  // Handles closing all dropdowns (for mobile menu links, overlay, etc)
  const closeAllDropdowns = () => {
    setOpenDropdown(null);
    setOpenSubDropdown(null);
    setMobileMenuOpen(false);
  };

  // Logo (inline SVG paw/heart-pet style)
  const LogoSVG = (
    <span className="furever-logo-symbol" aria-label="paw logo">
      {/* Simple stylized paw */}
      <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true" fill="none">
        <ellipse cx="8" cy="9" rx="3" ry="4" fill="#8aa182"/>
        <ellipse cx="20" cy="9" rx="3" ry="4" fill="#8aa182"/>
        <ellipse cx="14" cy="18.5" rx="7.5" ry="7" fill="#8aa182"/>
        <ellipse cx="14" cy="7" rx="2.2" ry="2.6" fill="#71706f"/>
      </svg>
    </span>
  );
  
  // Main navigation links and structure
  return (
    <nav className="furever-navbar">
      <div className="furever-navbar-inner">
        {/* Brand Logo and Name (left): links to landing */}
        <a className="furever-logo" href="/" onClick={closeAllDropdowns}>
          {LogoSVG}
          <span className="furever-logo-text">FurEverCare</span>
        </a>

        {/* Mobile hamburger button */}
        <button
          aria-label="Open navigation menu"
          className="furever-navbar-hamburger"
          onClick={() => setMobileMenuOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        {/* Overlay for mobile menu */}
        {mobileMenuOpen && (
          <div className="furever-navbar-backdrop" onClick={closeAllDropdowns}></div>
        )}

        {/* Main nav - desktop or mobile */}
        <ul className={`furever-navbar-links${mobileMenuOpen ? " open" : ""}`}>
          {/* Dashboard */}
          <li>
            <a href="/dashboard" onClick={closeAllDropdowns}>
              Dashboard
            </a>
          </li>

          {/* My Pets dropdown with new links */}
          <li
            className={`dropdown${openDropdown === "mypets" ? " open" : ""}`}
            tabIndex={0}
            onBlur={() => setTimeout(() => setOpenDropdown(null), 140)}
          >
            <button
              aria-haspopup="menu"
              aria-expanded={openDropdown === "mypets"}
              onClick={() => handleDropdown("mypets")}
              type="button"
            >
              My Pets <span className="dropdown-caret">&#9662;</span>
            </button>
            <ul className="dropdown-menu">
              <li>
                <a href="/profile" tabIndex={openDropdown === "mypets" ? 0 : -1} onClick={closeAllDropdowns}>
                  Profile
                </a>
              </li>
            </ul>
          </li>

          {/* Appointments dropdown (Manage, Notes/Documents) */}
          <li
            className={`dropdown${openDropdown === "appointments" ? " open" : ""}`}
            tabIndex={0}
            onBlur={() => setTimeout(() => setOpenDropdown(null), 140)}
          >
            <button
              aria-haspopup="menu"
              aria-expanded={openDropdown === "appointments"}
              onClick={() => handleDropdown("appointments")}
              type="button"
            >
              Appointments <span className="dropdown-caret">&#9662;</span>
            </button>
            <ul className="dropdown-menu">
              <li>
                <a href="/appointments/manage" tabIndex={openDropdown === "appointments" ? 0 : -1} onClick={closeAllDropdowns}>
                  Manage
                </a>
              </li>
              <li>
                <a href="/appointments/notes" tabIndex={openDropdown === "appointments" ? 0 : -1} onClick={closeAllDropdowns}>
                  Notes / Documents
                </a>
              </li>
            </ul>
          </li>

          {/* Notifications */}
          <li>
            <a href="/notifications" aria-label="Reminders and Alerts" onClick={closeAllDropdowns}>
              <span role="img" aria-label="bell" style={{ marginRight: 6, fontSize: 18 }}>
                &#128276;
              </span>
              Notifications
            </a>
          </li>

          {/* Settings dropdown (Settings, Support sub-dropdown, About & Privacy, Account sub-dropdown) */}
          <li
            className={`dropdown${openDropdown === "settings" ? " open" : ""}`}
            tabIndex={0}
            onBlur={() => setTimeout(() => { setOpenDropdown(null); setOpenSubDropdown(null); }, 140)}
          >
            <button
              aria-haspopup="menu"
              aria-expanded={openDropdown === "settings"}
              onClick={() => handleDropdown("settings")}
              type="button"
            >
              Settings <span className="dropdown-caret">&#9662;</span>
            </button>
            <ul className="dropdown-menu">
              {/* Support sub-dropdown */}
              <li
                className={`dropdown-submenu dropdown-submenu-left${openSubDropdown === "support" ? " open" : ""}`}
                onMouseEnter={() => handleSubDropdown("support")}
                onMouseLeave={() => handleSubDropdown(null)}
              >
                <button
                  aria-haspopup="menu"
                  aria-expanded={openSubDropdown === "support"}
                  onClick={() => handleSubDropdown("support")}
                  tabIndex={openDropdown === "settings" ? 0 : -1}
                  type="button"
                >
                  {/* Caret left for submenu opening to the left */}
                  Support <span className="dropdown-caret">&#9666;</span>
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <a href="/support/contact" tabIndex={openSubDropdown === "support" ? 0 : -1} onClick={closeAllDropdowns}>
                      Contact
                    </a>
                  </li>
                  <li>
                    <a href="/support/help" tabIndex={openSubDropdown === "support" ? 0 : -1} onClick={closeAllDropdowns}>
                      Help
                    </a>
                  </li>
                </ul>
              </li>

              {/* About & Privacy */}
              <li>
                <a href="/about" tabIndex={openDropdown === "settings" ? 0 : -1} onClick={closeAllDropdowns}>
                  About &amp; Privacy
                </a>
              </li>

              {/* Account sub-dropdown (Login, Signup) */}
              <li
                className={`dropdown-submenu dropdown-submenu-left${openSubDropdown === "account" ? " open" : ""}`}
                onMouseEnter={() => handleSubDropdown("account")}
                onMouseLeave={() => handleSubDropdown(null)}
              >
                <button
                  aria-haspopup="menu"
                  aria-expanded={openSubDropdown === "account"}
                  onClick={() => handleSubDropdown("account")}
                  tabIndex={openDropdown === "settings" ? 0 : -1}
                  type="button"
                >
                  {/* Caret left for submenu opening to the left */}
                  Account <span className="dropdown-caret">&#9666;</span>
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <a href="/login" tabIndex={openSubDropdown === "account" ? 0 : -1} onClick={closeAllDropdowns}>
                      Login
                    </a>
                  </li>
                  <li>
                    <a href="/signup" tabIndex={openSubDropdown === "account" ? 0 : -1} onClick={closeAllDropdowns}>
                      Sign Up
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default TopNavBar;
