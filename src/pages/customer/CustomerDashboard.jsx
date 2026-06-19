import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import StatCard from "../../components/StatCard";
import { getUser } from "../../services/AuthService";
import { getMyProfile } from "../../services/customerService";
import { getMyPolicies } from "../../services/policyService";
import { getMyClaims } from "../../services/claimService";
import { getMyPayments } from "../../services/paymentService";

export default function CustomerDashboard() {
  const user = getUser();
  const [stats, setStats] = useState({});
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getMyProfile().catch(() => null),
      getMyPolicies(0, 1).catch(() => ({ totalElements: 0 })),
      getMyClaims(0, 1).catch(() => ({ totalElements: 0 })),
      getMyPayments(0, 1).catch(() => ({ totalElements: 0 })),
    ]).then(([prof, pol, claims, pay]) => {
      setProfile(prof);
      setStats({ totalPolicies: pol.totalElements, totalClaims: claims.totalElements, totalPayments: pay.totalElements });
    }).finally(() => setLoading(false));
  }, []);

  return (
    <Layout role="CUSTOMER" user={user} title="My Dashboard" subtitle="Your insurance summary at a glance">
      <div className="stats-grid">
        <StatCard icon="📄" label="My Policies"  value={loading ? undefined : stats.totalPolicies}  color="purple" />
        <StatCard icon="🏥" label="My Claims"    value={loading ? undefined : stats.totalClaims}    color="amber"  />
        <StatCard icon="💳" label="My Payments"  value={loading ? undefined : stats.totalPayments}  color="cyan"   />
      </div>

      {profile && (
        <div className="glass-card" style={{ marginTop: 0 }}>
          <h3 style={{ marginBottom: 16 }}>👤 Profile Summary</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
            {[
              { label: "Name",      value: profile.fullName  },
              { label: "Email",     value: profile.email     },
              { label: "Phone",     value: profile.phoneNumber },
              { label: "City",      value: profile.city      },
              { label: "State",     value: profile.state     },
              { label: "Nominee",   value: profile.nomineeName },
            ].map((item) => item.value && (
              <div key={item.label} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 8, padding: "12px 14px" }}>
                <div style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 4 }}>{item.label}</div>
                <div style={{ fontSize: 14, color: "var(--text-primary)", fontWeight: 500 }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
}
