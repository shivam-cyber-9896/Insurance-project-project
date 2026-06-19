import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Pagination from "../../components/Pagination";
import Modal from "../../components/Modal";
import { getUser } from "../../services/AuthService";
import { getAllPlans } from "../../services/planService";
import { purchasePolicy } from "../../services/policyService";

export default function CustomerPlans() {
  const user = getUser();
  const [plans, setPlans]       = useState([]);
  const [page, setPage]         = useState(0);
  const [totalPages, setTotal]  = useState(0);
  const [loading, setLoading]   = useState(true);
  const [modal, setModal]       = useState(false);
  const [selected, setSelected] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [submitting, setSub]    = useState(false);
  const [msg, setMsg]           = useState({});

  const load = (p = 0) => {
    setLoading(true);
    getAllPlans(p, 9)
      .then((d) => { setPlans(d.content || []); setTotal(d.totalPages || 1); })
      .catch(console.error).finally(() => setLoading(false));
  };
  useEffect(() => { load(page); }, [page]);

  const openPurchase = (plan) => { setSelected(plan); setStartDate(""); setModal(true); };

  const handlePurchase = async () => {
    if (!startDate) return;
    setSub(true); setMsg({});
    try {
      await purchasePolicy({ planId: selected.planId, startDate });
      setMsg({ type: "success", text: `🎉 Policy purchased for ${selected.planName}!` });
      setModal(false);
    } catch { setMsg({ type: "error", text: "Purchase failed. Make sure your profile is set up." }); }
    finally { setSub(false); }
  };

  return (
    <Layout role="CUSTOMER" user={user} title="Browse Plans" subtitle="Explore insurance plans and purchase coverage">
      {msg.text && <div className={`alert alert-${msg.type}`}>{msg.text}</div>}

      {loading ? (
        <div className="spinner-overlay"><div className="spinner" /></div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20, marginBottom: 24 }}>
          {plans.filter((p) => p.active).map((plan) => (
            <div key={plan.planId} className="glass-card" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <h3 style={{ fontSize: 15, fontWeight: 700 }}>{plan.planName}</h3>
                <span className="badge badge-purple">{plan.premiumType}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                  <span style={{ color: "var(--text-muted)" }}>Coverage</span>
                  <span style={{ fontWeight: 600, color: "var(--accent-light)" }}>₹{Number(plan.coverageAmount).toLocaleString("en-IN")}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                  <span style={{ color: "var(--text-muted)" }}>Premium</span>
                  <span style={{ fontWeight: 600, color: "#34d399" }}>₹{Number(plan.premiumAmount).toLocaleString("en-IN")}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                  <span style={{ color: "var(--text-muted)" }}>Duration</span>
                  <span>{plan.duration} years</span>
                </div>
              </div>
              {plan.termsAndConditions && (
                <p style={{ fontSize: 12, color: "var(--text-muted)", borderTop: "1px solid var(--glass-border)", paddingTop: 10 }}>
                  {plan.termsAndConditions}
                </p>
              )}
              <button className="btn btn-primary" style={{ marginTop: "auto" }} onClick={() => openPurchase(plan)}>
                Purchase Plan
              </button>
            </div>
          ))}
        </div>
      )}
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />

      <Modal open={modal} title={`Purchase — ${selected?.planName}`} onClose={() => setModal(false)}
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setModal(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={handlePurchase} disabled={submitting || !startDate}>{submitting ? "Processing…" : "Confirm Purchase"}</button>
          </>
        }
      >
        {selected && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
              {[["Coverage", `₹${Number(selected.coverageAmount).toLocaleString("en-IN")}`], ["Premium", `₹${Number(selected.premiumAmount).toLocaleString("en-IN")}`], ["Duration", `${selected.duration} years`], ["Type", selected.premiumType]].map(([l, v]) => (
                <div key={l} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 8, padding: "10px 12px" }}>
                  <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 2, textTransform: "uppercase" }}>{l}</div>
                  <div style={{ fontWeight: 600 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="form-group">
          <label className="form-label">Policy Start Date</label>
          <input className="form-input" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>
      </Modal>
    </Layout>
  );
}
