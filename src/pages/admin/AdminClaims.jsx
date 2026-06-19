import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import DataTable from "../../components/DataTable";
import Pagination from "../../components/Pagination";
import Modal from "../../components/Modal";
import { getUser } from "../../services/AuthService";
import { getAllClaims, claimDecision } from "../../services/claimService";

export default function AdminClaims() {
  const user = getUser();
  const [claims, setClaims]     = useState([]);
  const [page, setPage]         = useState(0);
  const [totalPages, setTotal]  = useState(0);
  const [loading, setLoading]   = useState(true);
  const [modal, setModal]       = useState(null);
  const [selected, setSelected] = useState(null);
  const [form, setForm]         = useState({ finalDecisionStatus: "APPROVED", remarks: "" });
  const [submitting, setSub]    = useState(false);
  const [msg, setMsg]           = useState({});

  const load = (p = 0) => {
    setLoading(true);
    getAllClaims(p, 10)
      .then((d) => { setClaims(d.content || []); setTotal(d.totalPages || 1); })
      .catch(console.error).finally(() => setLoading(false));
  };
  useEffect(() => { load(page); }, [page]);

  const openDecision = (claim) => {
    setSelected(claim);
    setForm({ finalDecisionStatus: "APPROVED", remarks: "" });
    setModal("decision");
  };

  const handleDecision = async () => {
    setSub(true); setMsg({});
    try {
      await claimDecision(selected.claimId, form);
      setMsg({ type: "success", text: "Decision recorded!" }); setModal(null); load(page);
    } catch { setMsg({ type: "error", text: "Failed to submit decision." }); }
    finally { setSub(false); }
  };

  const statusBadge = (s) => (
    <span className={`badge badge-${
      s === "APPROVED" ? "success" : s === "REJECTED" ? "danger" : s === "RECOMMENDED" ? "info" : "warning"
    }`}>{s}</span>
  );

  const columns = [
    { key: "claimId",      label: "ID"          },
    { key: "policyId",     label: "Policy ID"   },
    { key: "claimAmount",  label: "Amount",
      render: (r) => `₹${Number(r.claimAmount).toLocaleString("en-IN")}`
    },
    { key: "claimReason",  label: "Reason",
      render: (r) => <span style={{ maxWidth: 180, display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.claimReason}</span>
    },
    { key: "incidentDate", label: "Incident Date" },
    { key: "status",       label: "Status", render: (r) => statusBadge(r.status) },
    { key: "actions",      label: "Actions",
      render: (r) => (r.status === "PENDING" || r.status === "RECOMMENDED") && (
        <button className="btn btn-primary btn-sm" onClick={() => openDecision(r)}>Decide</button>
      )
    },
  ];

  return (
    <Layout role="ADMIN" user={user} title="Claims" subtitle="Review and decide on all insurance claims">
      {msg.text && <div className={`alert alert-${msg.type}`}>{msg.text}</div>}
      <div className="glass-card">
        <div className="page-header"><h3 style={{ fontSize: 16 }}>All Claims</h3></div>
        <DataTable columns={columns} data={claims} loading={loading} />
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>

      <Modal
        open={modal === "decision"}
        title={`Claim Decision — #${selected?.claimId}`}
        onClose={() => setModal(null)}
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setModal(null)}>Cancel</button>
            <button className="btn btn-primary" onClick={handleDecision} disabled={submitting}>{submitting ? "Submitting…" : "Submit Decision"}</button>
          </>
        }
      >
        {selected && (
          <div className="alert alert-info" style={{ marginBottom: 16 }}>
            Claim Amount: <strong>₹{Number(selected.claimAmount).toLocaleString("en-IN")}</strong> — {selected.claimReason}
          </div>
        )}
        <div className="form-group">
          <label className="form-label">Decision</label>
          <select className="form-select" value={form.finalDecisionStatus} onChange={(e) => setForm({ ...form, finalDecisionStatus: e.target.value })}>
            <option>APPROVED</option>
            <option>REJECTED</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Remarks</label>
          <textarea className="form-textarea" value={form.remarks} onChange={(e) => setForm({ ...form, remarks: e.target.value })} />
        </div>
      </Modal>
    </Layout>
  );
}
