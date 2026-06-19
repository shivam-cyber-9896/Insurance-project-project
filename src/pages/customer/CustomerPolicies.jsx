import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import DataTable from "../../components/DataTable";
import Pagination from "../../components/Pagination";
import { getUser } from "../../services/AuthService";
import { getMyPolicies, cancelPolicy } from "../../services/policyService";

export default function CustomerPolicies() {
  const user = getUser();
  const [policies, setPolicies] = useState([]);
  const [page, setPage]         = useState(0);
  const [totalPages, setTotal]  = useState(0);
  const [loading, setLoading]   = useState(true);
  const [msg, setMsg]           = useState({});

  const load = (p = 0) => {
    setLoading(true);
    getMyPolicies(p, 10)
      .then((d) => { setPolicies(d.content || []); setTotal(d.totalPages || 1); })
      .catch(console.error).finally(() => setLoading(false));
  };
  useEffect(() => { load(page); }, [page]);

  const handleCancel = (id) => {
    if (!window.confirm("Cancel this policy?")) return;
    cancelPolicy(id)
      .then(() => { setMsg({ type: "success", text: "Policy cancelled." }); load(page); })
      .catch(() => setMsg({ type: "error", text: "Failed to cancel." }));
  };

  const columns = [
    { key: "policyId",     label: "ID"       },
    { key: "policyNumber", label: "Policy #"  },
    { key: "startDate",    label: "Start"     },
    { key: "endDate",      label: "End"       },
    { key: "status", label: "Status",
      render: (r) => (
        <span className={`badge badge-${r.status === "ACTIVE" ? "success" : r.status === "CANCELLED" ? "danger" : "info"}`}>
          {r.status}
        </span>
      )
    },
    { key: "actions", label: "Actions",
      render: (r) => r.status === "ACTIVE" && (
        <button className="btn btn-danger btn-sm" onClick={() => handleCancel(r.policyId)}>Cancel</button>
      )
    },
  ];

  return (
    <Layout role="CUSTOMER" user={user} title="My Policies" subtitle="Manage your active insurance policies">
      {msg.text && <div className={`alert alert-${msg.type}`}>{msg.text}</div>}
      <div className="glass-card">
        <div className="page-header"><h3 style={{ fontSize: 16 }}>My Policies</h3></div>
        <DataTable columns={columns} data={policies} loading={loading} emptyText="You have no policies yet. Browse plans to get started!" />
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </Layout>
  );
}
