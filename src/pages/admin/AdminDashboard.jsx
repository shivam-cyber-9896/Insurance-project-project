import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import StatCard from "../../components/StatCard";
import DataTable from "../../components/DataTable";
import { getUser } from "../../services/AuthService";
import { getAllCustomers } from "../../services/customerService";
import { getAllPolicies } from "../../services/policyService";
import { getAllProducts } from "../../services/productService";
import { getAllClaims } from "../../services/claimService";

export default function AdminDashboard() {
  const user = getUser();
  const [stats, setStats] = useState({});
  const [recentPolicies, setRecentPolicies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getAllCustomers(0, 5),
      getAllPolicies(0, 5),
      getAllProducts(0, 1),
      getAllClaims(0, 1),
    ])
      .then(([cust, pol, prod, claims]) => {
        setStats({
          totalCustomers: cust.totalElements,
          totalPolicies:  pol.totalElements,
          totalProducts:  prod.totalElements,
          totalClaims:    claims.totalElements,
        });
        setRecentPolicies(pol.content || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const policyColumns = [
    { key: "policyId",     label: "ID"     },
    { key: "policyNumber", label: "Policy #" },
    { key: "startDate",    label: "Start Date" },
    { key: "endDate",      label: "End Date" },
    { key: "status", label: "Status",
      render: (row) => (
        <span className={`badge badge-${
          row.status === "ACTIVE" ? "success" :
          row.status === "CANCELLED" ? "danger" : "info"
        }`}>{row.status}</span>
      )
    },
  ];

  return (
    <Layout role="ADMIN" user={user} title="Admin Dashboard" subtitle="Overview of your insurance platform">
      <div className="stats-grid">
        <StatCard icon="👥" label="Total Customers" value={loading ? undefined : stats.totalCustomers} color="cyan"   />
        <StatCard icon="📄" label="Total Policies"  value={loading ? undefined : stats.totalPolicies}  color="purple" />
        <StatCard icon="📦" label="Total Products"  value={loading ? undefined : stats.totalProducts}  color="green"  />
        <StatCard icon="🏥" label="Total Claims"    value={loading ? undefined : stats.totalClaims}    color="amber"  />
      </div>

      <div className="glass-card">
        <div className="page-header" style={{ marginBottom: 16 }}>
          <div>
            <h3 className="page-title" style={{ fontSize: 16 }}>Recent Policies</h3>
          </div>
        </div>
        <DataTable columns={policyColumns} data={recentPolicies} loading={loading} />
      </div>
    </Layout>
  );
}
