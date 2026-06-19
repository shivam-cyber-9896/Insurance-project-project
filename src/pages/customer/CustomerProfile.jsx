import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Modal from "../../components/Modal";
import { getUser } from "../../services/AuthService";
import { getMyProfile, updateCustomer } from "../../services/customerService";

export default function CustomerProfile() {
  const user = getUser();
  const [profile, setProfile]   = useState(null);
  const [loading, setLoading]   = useState(true);
  const [modal, setModal]       = useState(false);
  const [form, setForm]         = useState({});
  const [submitting, setSub]    = useState(false);
  const [msg, setMsg]           = useState({});

  const load = () => {
    setLoading(true);
    getMyProfile().then((d) => { setProfile(d); setForm(d); }).catch(console.error).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const handleSave = async () => {
    setSub(true); setMsg({});
    try {
      await updateCustomer(profile.customerId, form);
      setMsg({ type: "success", text: "Profile updated!" }); setModal(false); load();
    } catch { setMsg({ type: "error", text: "Update failed." }); }
    finally { setSub(false); }
  };

  const fields = [
    { key: "dateOfBirth",      label: "Date of Birth",  type: "date"   },
    { key: "address",          label: "Address",        type: "text"   },
    { key: "city",             label: "City",           type: "text"   },
    { key: "state",            label: "State",          type: "text"   },
    { key: "pinCode",          label: "Pin Code",       type: "text"   },
    { key: "nomineeName",      label: "Nominee Name",   type: "text"   },
    { key: "nomineeRelation",  label: "Nominee Relation", type: "text" },
  ];

  return (
    <Layout role="CUSTOMER" user={user} title="My Profile" subtitle="View and update your profile details">
      {msg.text && <div className={`alert alert-${msg.type}`}>{msg.text}</div>}

      {loading ? (
        <div className="spinner-overlay"><div className="spinner" /></div>
      ) : profile ? (
        <div className="glass-card">
          <div className="page-header" style={{ marginBottom: 24 }}>
            <h3 style={{ fontSize: 16 }}>Profile Details</h3>
            <button className="btn btn-primary" onClick={() => setModal(true)}>Edit Profile</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 14 }}>
            {fields.map((f) => (
              <div key={f.key} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 8, padding: "12px 16px" }}>
                <div style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 4 }}>{f.label}</div>
                <div style={{ fontSize: 14, color: "var(--text-primary)", fontWeight: 500 }}>{profile[f.key] || "—"}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="glass-card">
          <div className="empty-state"><div className="empty-icon">👤</div><p>No profile found.</p></div>
        </div>
      )}

      <Modal open={modal} title="Edit Profile" onClose={() => setModal(false)}
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setModal(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={handleSave} disabled={submitting}>{submitting ? "Saving…" : "Save"}</button>
          </>
        }
      >
        {fields.map((f) => (
          <div className="form-group" key={f.key}>
            <label className="form-label">{f.label}</label>
            <input className="form-input" type={f.type} value={form[f.key] || ""} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} />
          </div>
        ))}
      </Modal>
    </Layout>
  );
}
