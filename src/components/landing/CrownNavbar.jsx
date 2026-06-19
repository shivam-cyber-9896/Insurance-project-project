import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import "./CrownNavbar.css";

const NAV_LINKS = [
  { label: "Products", id: "products" },
  { label: "Why Us",   id: "why-us"   },
  { label: "Plans",    id: "plans"    },
  { label: "Claims",   id: "claims"   },
  { label: "Contact",  id: "contact"  },
];

export default function CrownNavbar({ showSmoothLinks = false }) {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav className={`crn-nav ${scrolled ? "crn-nav--scrolled" : ""}`}>
      <div className="crn-nav__inner">
        {/* Logo */}
        <Link
          to="/"
          className="crn-logo"
          onClick={() => showSmoothLinks && scrollTo("hero")}
        >
          <span className="crn-logo__crown">👑</span>
          <div className="crn-logo__text">
            <span className="crn-logo__name">Crown Assurance</span>
            <span className="crn-logo__tag">Protected · Premium · Trusted</span>
          </div>
        </Link>

        {/* Desktop links */}
        {showSmoothLinks && (
          <ul className="crn-nav__links">
            {NAV_LINKS.map(({ label, id }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={(e) => { e.preventDefault(); scrollTo(id); }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        )}

        {/* Right controls */}
        <div className="crn-nav__right">
          {/* Theme Toggle */}
          <button
            className="crn-theme-toggle"
            onClick={toggleTheme}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            aria-label="Toggle theme"
          >
            <span className="crn-theme-toggle__track">
              <span className="crn-theme-toggle__thumb">
                {theme === "dark" ? "🌙" : "☀️"}
              </span>
            </span>
            <span className="crn-theme-toggle__label">
              {theme === "dark" ? "Dark" : "Light"}
            </span>
          </button>

          <Link to="/login"    className="crn-btn crn-btn--outline">Sign In</Link>
          <Link to="/register" className="crn-btn crn-btn--gold">Get Started</Link>

          {/* Mobile hamburger */}
          <button
            className={`crn-hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="crn-mobile-menu">
          {showSmoothLinks && NAV_LINKS.map(({ label, id }) => (
            <a
              key={id}
              href={`#${id}`}
              className="crn-mobile-link"
              onClick={(e) => { e.preventDefault(); scrollTo(id); }}
            >
              {label}
            </a>
          ))}
          <Link to="/login"    className="crn-btn crn-btn--outline" onClick={() => setMenuOpen(false)}>Sign In</Link>
          <Link to="/register" className="crn-btn crn-btn--gold"    onClick={() => setMenuOpen(false)}>Get Started</Link>
        </div>
      )}
    </nav>
  );
}
