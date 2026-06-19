import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import DataTable from "../../components/DataTable";
import Pagination from "../../components/Pagination";
import Modal from "../../components/Modal";
import { getUser } from "../../services/AuthService";
import { getAllPlans, createPlan, updatePlan, deactivatePlan } from "../../services/planService";

const EMPTY = { productId: "", planName: "", coverageAmount: "", premiumAmount: "", premiumType: "ANNUAL", duration: "", termsAndConditions: "", active: true };

export default function AdminPlans() {
  const user = getUser();
  const [plans, setPlans]       = useState([]);
  const [page, setPage]         = useState(0);
  const [totalPages, setTotal]  = useState(0);
  const [loading, setLoading]   = useState(true);
  const [modal, setModal]       = useState(null);
  const [form, setForm]         = useState(EMPTY);
  const [editId, setEditId]     = useState(null);
  const [submitting, setSub]    = useState(false);
  const [msg, setMsg]           = useState({});

  const load = (p = 0) => {
    setLoading(true);
    getAllPlans(p, 10)
      .then((d) => { setPlans(d.content || []); setTotal(d.totalPages || 1); })
      .catch(console.error).finally(() => setLoading(false));
  };
  useEffect(() => { load(page); }, [page]);

  const openCreate = () => { setForm(EMPTY); setEditId(null); setModal("create"); };
  const openEdit = (p) => {
    setForm({ productId: p.productId, planName: p.planName, coverageAmount: p.coverageAmount, premiumAmount: p.premiumAmount, premiumType: p.premiumType, duration: p.duration, termsAndConditions: p.termsAndConditions, active: p.active });
    setEditId(p.planId); setModal("edit");
  };

  const handleSubmit = async () => {
    setSub(true); setMsg({});
    try {
      const payload = { ...form, coverageAmount: Number(form.coverageAmount), premiumAmount: Number(form.premiumAmount), duration: Number(form.duration), productId: Number(form.productId) };
      if (modal === "edit") await updatePlan(editId, payload);
      else await createPlan(payload);
      setMsg({ type: "success", text: "Plan saved!" }); setModal(null); load(page);
    } catch { setMsg({ type: "error", text: "Failed to save plan." }); }
    finally { setSub(false); }
  };

  const handleDeactivate = (id) => deactivatePlan(id).then(() => load(page)).catch(console.error);

  const columns = [
    { key: "planId",         label: "ID"            },
    { key: "planName",       label: "Plan Name"     },
    { key: "premiumType",    label: "Premium Type",
      render: (r) => <span className="badge badge-purple">{r.premiumType}</span>
    },
    { key: "coverageAmount", label: "Coverage",
      render: (r) => `₹${Number(r.coverageAmount).toLocaleString("en-IN")}`
    },
    { key: "premiumAmount",  label: "Premium",
      render: (r) => `₹${Number(r.premiumAmount).toLocaleString("en-IN")}`
    },
    { key: "duration",       label: "Duration (yrs)" },
    { key: "active", label: "Status",
      render: (r) => <span className={`badge badge-${r.active ? "success" : "danger"}`}>{r.active ? "Active" : "Inactive"}</span>
    },
    { key: "actions", label: "Actions",
      render: (r) => (
        <div style={{ display: "flex", gap: 6 }}>
          <button className="btn btn-secondary btn-sm" onClick={() => openEdit(r)}>Edit</button>
          {r.active && <button className="btn btn-danger btn-sm" onClick={() => handleDeactivate(r.planId)}>Deactivate</button>}
        </div>
      )
    },
  ];

  const formFields = [
    { key: "productId",         label: "Product ID",        type: "number" },
    { key: "planName",          label: "Plan Name",         type: "text"   },
    { key: "coverageAmount",    label: "Coverage Amount",   type: "number" },
    { key: "premiumAmount",     label: "Premium Amount",    type: "number" },
    { key: "duration",          label: "Duration (years)",  type: "number" },
    { key: "termsAndConditions",label: "Terms & Conditions",type: "textarea"},
  ];

  return (
    <Layout role="ADMIN" user={user} title="Plans" subtitle="Manage insurance plans and pricing">
      {msg.text && <div className={`alert alert-${msg.type}`}>{msg.text}</div>}
      <div className="glass-card">
        <div className="page-header">
          <h3 style={{ fontSize: 16 }}>All Plans</h3>
          <button className="btn btn-primary" onClick={openCreate}>+ Add Plan</button>
        </div>
        <DataTable columns={columns} data={plans} loading={loading} />
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>

      <Modal
        open={!!modal}
        title={modal === "edit" ? "Edit Plan" : "Create Plan"}
        onClose={() => setModal(null)}
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setModal(null)}>Cancel</button>
            <button className="btn btn-primary" onClick={handleSubmit} disabled={submitting}>{submitting ? "Saving…" : "Save"}</button>
          </>
        }
      >
        {formFields.map((f) => (
          <div className="form-group" key={f.key}>
            <label className="form-label">{f.label}</label>
            {f.type === "textarea"
              ? <textarea className="form-textarea" value={form[f.key]} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} />
              : <input className="form-input" type={f.type} value={form[f.key]} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} />
            }
          </div>
        ))}
        <div className="form-group">
          <label className="form-label">Premium Type</label>
          <select className="form-select" value={form.premiumType} onChange={(e) => setForm({ ...form, premiumType: e.target.value })}>
            {["ANNUAL", "SEMI_ANNUAL", "QUARTERLY", "MONTHLY"].map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>
      </Modal>
    </Layout>
  );
}
