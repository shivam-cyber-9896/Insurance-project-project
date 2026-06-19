import { Link } from "react-router-dom";
import "./CrownFooter.css";

const quickLinks = [
  { label: "Home",             to: "/"         },
  { label: "Browse Plans",     to: "/register" },
  { label: "File a Claim",     to: "/login"    },
  { label: "Track Claim",      to: "/login"    },
  { label: "Policy Renewal",   to: "/login"    },
];

const products = [
  "Health Insurance",
  "Life Insurance",
  "Vehicle Insurance",
  "Travel Insurance",
  "Property Insurance",
  "Business Insurance",
];

const legal = [
  "Privacy Policy",
  "Terms & Conditions",
  "Cookie Policy",
  "Disclaimer",
];

export default function CrownFooter() {
  return (
    <footer className="crn-footer">
      <div className="crn-footer__inner">
        {/* Top grid */}
        <div className="crn-footer__top">
          {/* Brand */}
          <div className="crn-footer__brand">
            <div className="crn-footer__logo">
              <span className="crn-footer__crown">👑</span>
              <div>
                <div className="crn-footer__logo-name">Crown Assurance</div>
                <div className="crn-footer__logo-tag">Protected · Premium · Trusted</div>
              </div>
            </div>
            <p className="crn-footer__brand-desc">
              India's most trusted insurance platform, protecting over 50,000 families
              and businesses with comprehensive, affordable, and transparent coverage.
            </p>
            <div className="crn-footer__social">
              {["𝕏", "in", "f", "📷", "▶"].map((icon, i) => (
                <a key={i} href="#" className="crn-footer__social-btn" onClick={(e) => e.preventDefault()}>
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div className="crn-footer__col-title">Quick Links</div>
            <ul className="crn-footer__links">
              {quickLinks.map(({ label, to }) => (
                <li key={label}>
                  <Link to={to}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <div className="crn-footer__col-title">Products</div>
            <ul className="crn-footer__links">
              {products.map((p) => (
                <li key={p}>
                  <Link to="/register">{p}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="crn-footer__col-title">Contact Us</div>
            <div className="crn-footer__contact-list">
              {[
                { icon: "📧", text: "support@crownassurance.in" },
                { icon: "📞", text: "+91 1800-123-4567 (Free)" },
                { icon: "📍", text: "Crown Tower, BKC, Mumbai" },
                { icon: "🕐", text: "Mon–Sat: 9AM – 8PM IST"  },
              ].map((item) => (
                <div key={item.text} className="crn-footer__contact-item">
                  <span>{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="crn-footer__divider" />

        {/* Bottom bar */}
        <div className="crn-footer__bottom">
          <div className="crn-footer__copy">
            © {new Date().getFullYear()} Crown Assurance Pvt. Ltd. All rights reserved.
            &nbsp;|&nbsp; IRDAI Reg. No. 141
          </div>
          <ul className="crn-footer__legal">
            {legal.map((l) => (
              <li key={l}>
                <a href="#" onClick={(e) => e.preventDefault()}>{l}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
