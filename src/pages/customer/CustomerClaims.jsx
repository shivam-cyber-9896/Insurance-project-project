import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import DataTable from "../../components/DataTable";
import Pagination from "../../components/Pagination";
import Modal from "../../components/Modal";
import { getUser } from "../../services/AuthService";
import { getMyClaims, fileClaim } from "../../services/claimService";

const EMPTY = { policyId: "", claimAmount: "", claimReason: "", incidentDate: "" };

export default function CustomerClaims() {
  const user = getUser();
  const [claims, setClaims]     = useState([]);
  const [page, setPage]         = useState(0);
  const [totalPages, setTotal]  = useState(0);
  const [loading, setLoading]   = useState(true);
  const [modal, setModal]       = useState(false);
  const [form, setForm]         = useState(EMPTY);
  const [submitting, setSub]    = useState(false);
  const [msg, setMsg]           = useState({});

  const load = (p = 0) => {
    setLoading(true);
    getMyClaims(p, 10)
      .then((d) => { setClaims(d.content || []); setTotal(d.totalPages || 1); })
      .catch(console.error).finally(() => setLoading(false));
  };
  useEffect(() => { load(page); }, [page]);

  const handleFileClaim = async () => {
    setSub(true); setMsg({});
    try {
      await fileClaim({ ...form, policyId: Number(form.policyId), claimAmount: Number(form.claimAmount), documents: [] });
      setMsg({ type: "success", text: "Claim filed successfully!" });
      setModal(false); setForm(EMPTY); load(page);
    } catch { setMsg({ type: "error", text: "Failed to file claim. Ensure policy is active." }); }
    finally { setSub(false); }
  };

  const columns = [
    { key: "claimId",      label: "ID"       },
    { key: "policyId",     label: "Policy"   },
    { key: "claimAmount",  label: "Amount",  render: (r) => `₹${Number(r.claimAmount).toLocaleString("en-IN")}` },
    { key: "claimReason",  label: "Reason",  render: (r) => <span style={{ maxWidth: 180, display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.claimReason}</span> },
    { key: "incidentDate", label: "Incident" },
    { key: "status",       label: "Status",
      render: (r) => (
        <span className={`badge badge-${r.status === "APPROVED" ? "success" : r.status === "REJECTED" ? "danger" : r.status === "RECOMMENDED" ? "info" : "warning"}`}>
          {r.status}
        </span>
      )
    },
  ];

  return (
    <Layout role="CUSTOMER" user={user} title="My Claims" subtitle="File and track your insurance claims">
      {msg.text && <div className={`alert alert-${msg.type}`}>{msg.text}</div>}
      <div className="glass-card">
        <div className="page-header">
          <h3 style={{ fontSize: 16 }}>My Claims</h3>
          <button className="btn btn-primary" onClick={() => setModal(true)}>+ File Claim</button>
        </div>
        <DataTable columns={columns} data={claims} loading={loading} emptyText="No claims filed yet." />
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>

      <Modal open={modal} title="File a Claim" onClose={() => setModal(false)}
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setModal(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={handleFileClaim} disabled={submitting}>{submitting ? "Submitting…" : "File Claim"}</button>
          </>
        }
      >
        {[
          { key: "policyId",     label: "Policy ID",    type: "number" },
          { key: "claimAmount",  label: "Claim Amount", type: "number" },
          { key: "incidentDate", label: "Incident Date",type: "date"   },
        ].map((f) => (
          <div className="form-group" key={f.key}>
            <label className="form-label">{f.label}</label>
            <input className="form-input" type={f.type} value={form[f.key]} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} />
          </div>
        ))}
        <div className="form-group">
          <label className="form-label">Claim Reason</label>
          <textarea className="form-textarea" value={form.claimReason} onChange={(e) => setForm({ ...form, claimReason: e.target.value })} placeholder="Describe the reason for your claim..." />
        </div>
      </Modal>
    </Layout>
  );
}
