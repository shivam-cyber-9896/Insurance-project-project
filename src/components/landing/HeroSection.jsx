import { Link } from "react-router-dom";

const stats = [
  { number: "50,000+", label: "Happy Customers"       },
  { number: "98%",     label: "Claim Settlement Rate" },
  { number: "150+",    label: "Insurance Advisors"    },
  { number: "₹500Cr+", label: "Claims Processed"      },
];

export default function HeroSection({ scrollTo }) {
  return (
    <section id="hero" className="ca-hero">
      <div className="ca-hero-bg" />
      <div className="ca-hero-grid" />

      {/* Decorative rings */}
      <div style={{ position:"absolute", right:"8%",  top:"18%", width:420, height:420, borderRadius:"50%", border:"1px solid rgba(212,175,55,0.07)", animation:"heroRing 20s linear infinite",          pointerEvents:"none" }} />
      <div style={{ position:"absolute", right:"12%", top:"24%", width:280, height:280, borderRadius:"50%", border:"1px solid rgba(212,175,55,0.11)", animation:"heroRing 14s linear infinite reverse",  pointerEvents:"none" }} />
      <div style={{ position:"absolute", right:"17%", top:"32%", width:160, height:160, borderRadius:"50%", border:"1px solid rgba(212,175,55,0.18)", animation:"heroRing 8s linear infinite",           pointerEvents:"none" }} />

      {/* Floating crown */}
      <div style={{ position:"absolute", right:"19%", top:"28%", fontSize:100, opacity:0.06, pointerEvents:"none", animation:"float 8s ease-in-out infinite", filter:"blur(1px)" }}>
        👑
      </div>

      <div className="ca-container ca-hero-content">
        <div className="ca-hero-badge">
          <span className="ca-hero-badge-dot">✦</span>
          India's Most Trusted Insurance Platform 2024
        </div>

        <h1 className="ca-hero-title">
          Protect What
          <span className="gold-text ca-shimmer">Matters Most</span>
        </h1>

        <p className="ca-hero-subtitle">
          Trusted insurance solutions for individuals, families, and businesses.
          Coverage that's clear, claims that are fast, and service that's exceptional.
        </p>

        <div className="ca-hero-actions">
          <Link to="/register" className="ca-btn ca-btn-gold" style={{ padding:"15px 34px", fontSize:"15px" }}>
            Get a Quote ✦
          </Link>
          <a
            href="#plans"
            className="ca-btn ca-btn-outline"
            style={{ padding:"15px 34px", fontSize:"15px" }}
            onClick={(e) => { e.preventDefault(); scrollTo?.("plans"); }}
          >
            Explore Plans →
          </a>
        </div>

        <div className="ca-hero-stats">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="ca-hero-stat-num">{s.number}</div>
              <div className="ca-hero-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
