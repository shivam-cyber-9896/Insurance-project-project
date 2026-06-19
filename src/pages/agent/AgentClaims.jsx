import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import DataTable from "../../components/DataTable";
import Pagination from "../../components/Pagination";
import Modal from "../../components/Modal";
import { getUser } from "../../services/AuthService";
import { getAllClaims, reviewClaim } from "../../services/claimService";

export default function AgentClaims() {
  const user = getUser();
  const [claims, setClaims]     = useState([]);
  const [page, setPage]         = useState(0);
  const [totalPages, setTotal]  = useState(0);
  const [loading, setLoading]   = useState(true);
  const [modal, setModal]       = useState(false);
  const [selected, setSelected] = useState(null);
  const [form, setForm]         = useState({ recommendedStatus: "RECOMMENDED", remarks: "" });
  const [submitting, setSub]    = useState(false);
  const [msg, setMsg]           = useState({});

  const load = (p = 0) => {
    setLoading(true);
    getAllClaims(p, 10)
      .then((d) => { setClaims(d.content || []); setTotal(d.totalPages || 1); })
      .catch(console.error).finally(() => setLoading(false));
  };
  useEffect(() => { load(page); }, [page]);

  const openReview = (claim) => {
    setSelected(claim);
    setForm({ recommendedStatus: "RECOMMENDED", remarks: "" });
    setModal(true);
  };

  const handleReview = async () => {
    setSub(true); setMsg({});
    try {
      await reviewClaim(selected.claimId, form);
      setMsg({ type: "success", text: "Review submitted!" }); setModal(false); load(page);
    } catch { setMsg({ type: "error", text: "Failed to submit review." }); }
    finally { setSub(false); }
  };

  const columns = [
    { key: "claimId",      label: "ID"       },
    { key: "policyId",     label: "Policy"   },
    { key: "claimAmount",  label: "Amount",  render: (r) => `₹${Number(r.claimAmount).toLocaleString("en-IN")}` },
    { key: "claimReason",  label: "Reason",  render: (r) => <span style={{ maxWidth: 180, display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.claimReason}</span> },
    { key: "incidentDate", label: "Incident" },
    { key: "status",       label: "Status",
      render: (r) => <span className={`badge badge-${r.status === "APPROVED" ? "success" : r.status === "REJECTED" ? "danger" : r.status === "RECOMMENDED" ? "info" : "warning"}`}>{r.status}</span>
    },
    { key: "actions", label: "Actions",
      render: (r) => r.status === "PENDING" && (
        <button className="btn btn-primary btn-sm" onClick={() => openReview(r)}>Review</button>
      )
    },
  ];

  return (
    <Layout role="AGENT" user={user} title="Claims Review" subtitle="Review and recommend on customer claims">
      {msg.text && <div className={`alert alert-${msg.type}`}>{msg.text}</div>}
      <div className="glass-card">
        <div className="page-header"><h3 style={{ fontSize: 16 }}>All Claims</h3></div>
        <DataTable columns={columns} data={claims} loading={loading} />
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>

      <Modal open={modal} title={`Review Claim #${selected?.claimId}`} onClose={() => setModal(false)}
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setModal(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={handleReview} disabled={submitting}>{submitting ? "Submitting…" : "Submit Review"}</button>
          </>
        }
      >
        {selected && (
          <div className="alert alert-info" style={{ marginBottom: 16 }}>
            Amount: <strong>₹{Number(selected.claimAmount).toLocaleString("en-IN")}</strong> — {selected.claimReason}
          </div>
        )}
        <div className="form-group">
          <label className="form-label">Recommendation</label>
          <select className="form-select" value={form.recommendedStatus} onChange={(e) => setForm({ ...form, recommendedStatus: e.target.value })}>
            <option>RECOMMENDED</option>
            <option>NOT_RECOMMENDED</option>
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
