import "./StatCard.css";

export default function StatCard({ icon, label, value, color = "purple", trend }) {
  const colors = {
    purple: { bg: "var(--accent-subtle)", accent: "var(--accent)", glow: "var(--accent-glow)" },
    cyan:   { bg: "rgba(6,182,212,0.12)",  accent: "#22d3ee", glow: "rgba(6,182,212,0.2)"  },
    green:  { bg: "rgba(16,185,129,0.12)", accent: "#34d399", glow: "rgba(16,185,129,0.2)" },
    amber:  { bg: "rgba(245,158,11,0.12)", accent: "#fbbf24", glow: "rgba(245,158,11,0.2)" },
    red:    { bg: "rgba(239,68,68,0.12)",  accent: "#f87171", glow: "rgba(239,68,68,0.2)"  },
  };
  const c = colors[color] || colors.purple;

  return (
    <div className="stat-card glass-card" style={{ "--stat-color": c.accent, "--stat-glow": c.glow }}>
      <div className="stat-icon" style={{ background: c.bg, color: c.accent }}>
        {icon}
      </div>
      <div className="stat-body">
        <div className="stat-label">{label}</div>
        <div className="stat-value">{value ?? <span className="stat-loading" />}</div>
        {trend !== undefined && (
          <div className={`stat-trend ${trend >= 0 ? "up" : "down"}`}>
            {trend >= 0 ? "↑" : "↓"} {Math.abs(trend)}%
          </div>
        )}
      </div>
    </div>
  );
}
