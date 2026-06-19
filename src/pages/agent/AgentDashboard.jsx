import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import StatCard from "../../components/StatCard";
import { getUser } from "../../services/AuthService";
import { getAllCustomers } from "../../services/customerService";
import { getAllPolicies } from "../../services/policyService";
import { getAllClaims } from "../../services/claimService";

export default function AgentDashboard() {
  const user = getUser();
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getAllCustomers(0, 1), getAllPolicies(0, 1), getAllClaims(0, 1)])
      .then(([cust, pol, claims]) =>
        setStats({ totalCustomers: cust.totalElements, totalPolicies: pol.totalElements, totalClaims: claims.totalElements })
      )
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout role="AGENT" user={user} title="Agent Dashboard" subtitle="Your activity overview">
      <div className="stats-grid">
        <StatCard icon="👤" label="Customers"        value={loading ? undefined : stats.totalCustomers} color="cyan"   />
        <StatCard icon="📄" label="Total Policies"   value={loading ? undefined : stats.totalPolicies}  color="purple" />
        <StatCard icon="🏥" label="Claims to Review" value={loading ? undefined : stats.totalClaims}    color="amber"  />
      </div>

      <div className="glass-card">
        <p style={{ textAlign: "center", color: "var(--text-muted)", padding: "40px 0" }}>
          👋 Welcome, Agent! Use the sidebar to manage customers, policies, and claims.
        </p>
      </div>
    </Layout>
  );
}
