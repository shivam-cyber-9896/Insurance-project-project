import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import DataTable from "../../components/DataTable";
import Pagination from "../../components/Pagination";
import Modal from "../../components/Modal";
import { getUser } from "../../services/AuthService";
import { getAllPolicies, issuePolicy, cancelPolicy } from "../../services/policyService";

const EMPTY_ISSUE = { customerId: "", planId: "", startDate: "" };

export default function AdminPolicies() {
  const user = getUser();
  const [policies, setPolicies] = useState([]);
  const [page, setPage]         = useState(0);
  const [totalPages, setTotal]  = useState(0);
  const [loading, setLoading]   = useState(true);
  const [modal, setModal]       = useState(false);
  const [form, setForm]         = useState(EMPTY_ISSUE);
  const [submitting, setSub]    = useState(false);
  const [msg, setMsg]           = useState({});

  const load = (p = 0) => {
    setLoading(true);
    getAllPolicies(p, 10)
      .then((d) => { setPolicies(d.content || []); setTotal(d.totalPages || 1); })
      .catch(console.error).finally(() => setLoading(false));
  };
  useEffect(() => { load(page); }, [page]);

  const handleIssue = async () => {
    setSub(true); setMsg({});
    try {
      await issuePolicy({ ...form, customerId: Number(form.customerId), planId: Number(form.planId) });
      setMsg({ type: "success", text: "Policy issued!" }); setModal(false); setForm(EMPTY_ISSUE); load(page);
    } catch { setMsg({ type: "error", text: "Failed to issue policy." }); }
    finally { setSub(false); }
  };

  const handleCancel = (id) =>
    cancelPolicy(id).then(() => load(page)).catch(() => setMsg({ type: "error", text: "Failed to cancel." }));

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
    <Layout role="ADMIN" user={user} title="Policies" subtitle="View and manage all insurance policies">
      {msg.text && <div className={`alert alert-${msg.type}`}>{msg.text}</div>}
      <div className="glass-card">
        <div className="page-header">
          <h3 style={{ fontSize: 16 }}>All Policies</h3>
          <button className="btn btn-primary" onClick={() => setModal(true)}>+ Issue Policy</button>
        </div>
        <DataTable columns={columns} data={policies} loading={loading} />
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>

      <Modal
        open={modal}
        title="Issue Policy"
        onClose={() => setModal(false)}
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setModal(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={handleIssue} disabled={submitting}>{submitting ? "Issuing…" : "Issue"}</button>
          </>
        }
      >
        {[
          { key: "customerId", label: "Customer ID", type: "number" },
          { key: "planId",     label: "Plan ID",     type: "number" },
          { key: "startDate",  label: "Start Date",  type: "date"   },
        ].map((f) => (
          <div className="form-group" key={f.key}>
            <label className="form-label">{f.label}</label>
            <input className="form-input" type={f.type} value={form[f.key]} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} />
          </div>
        ))}
      </Modal>
    </Layout>
  );
}
