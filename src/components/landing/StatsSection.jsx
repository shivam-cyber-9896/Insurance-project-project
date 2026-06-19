const stats = [
  { number: "50,000+", label: "Happy Customers"       },
  { number: "98%",     label: "Claim Settlement Rate" },
  { number: "150+",    label: "Insurance Advisors"    },
  { number: "₹500Cr+", label: "Claims Processed"      },
];

export default function StatsSection() {
  return (
    <div className="ca-stats-section">
      <div className="ca-container">
        <div className="ca-gold-separator">
          <span className="ca-sep-crown">👑</span>
        </div>
        <div className="ca-stats-grid" style={{ marginTop: 40 }}>
          {stats.map((s) => (
            <div key={s.label} className="ca-stat-item">
              <div className="ca-stat-number ca-shimmer">{s.number}</div>
              <div className="ca-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
