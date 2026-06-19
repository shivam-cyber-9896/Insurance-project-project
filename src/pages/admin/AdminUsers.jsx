import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import DataTable from "../../components/DataTable";
import Pagination from "../../components/Pagination";
import Modal from "../../components/Modal";
import { getUser } from "../../services/AuthService";
import { getAllUsers, activateUser, deactivateUser, createAgent } from "../../services/userService";

const EMPTY_AGENT = { fullName: "", email: "", password: "", phoneNumber: "" };

export default function AdminUsers() {
  const user = getUser();
  const [users, setUsers]     = useState([]);
  const [page, setPage]       = useState(0);
  const [totalPages, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [modal, setModal]     = useState(false);
  const [form, setForm]       = useState(EMPTY_AGENT);
  const [submitting, setSub]  = useState(false);
  const [error, setError]     = useState("");
  const [success, setSuccess] = useState("");

  const load = (p = 0) => {
    setLoading(true);
    getAllUsers(p, 10)
      .then((d) => { setUsers(d.content || []); setTotal(d.totalPages || 1); })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(page); }, [page]);

  const handleActivate   = (id) => activateUser(id, "Activated by admin").then(() => load(page));
  const handleDeactivate = (id) => deactivateUser(id, "Deactivated by admin").then(() => load(page));

  const handleCreateAgent = async () => {
    setSub(true); setError("");
    try {
      await createAgent({ ...form, role: "AGENT" });
      setSuccess("Agent created successfully!");
      setModal(false); setForm(EMPTY_AGENT);
      load(page);
    } catch { setError("Failed to create agent. Check details."); }
    finally { setSub(false); }
  };

  const columns = [
    { key: "userId",      label: "ID"    },
    { key: "fullName",    label: "Name"  },
    { key: "email",       label: "Email" },
    { key: "phoneNumber", label: "Phone" },
    { key: "role",  label: "Role",
      render: (r) => <span className={`badge badge-${r.role === "ADMIN" ? "purple" : r.role === "AGENT" ? "info" : "success"}`}>{r.role}</span>
    },
    { key: "active", label: "Status",
      render: (r) => <span className={`badge badge-${r.active ? "success" : "danger"}`}>{r.active ? "Active" : "Inactive"}</span>
    },
    { key: "actions", label: "Actions",
      render: (r) => (
        <div style={{ display: "flex", gap: 6 }}>
          {!r.active
            ? <button className="btn btn-success btn-sm" onClick={() => handleActivate(r.userId)}>Activate</button>
            : <button className="btn btn-danger btn-sm" onClick={() => handleDeactivate(r.userId)}>Deactivate</button>
          }
        </div>
      )
    },
  ];

  return (
    <Layout role="ADMIN" user={user} title="Manage Users" subtitle="View and manage all platform users">
      {error   && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="glass-card">
        <div className="page-header">
          <div><h3 style={{ fontSize: 16 }}>All Users</h3></div>
          <button className="btn btn-primary" onClick={() => setModal(true)}>+ Create Agent</button>
        </div>
        <DataTable columns={columns} data={users} loading={loading} />
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>

      <Modal
        open={modal}
        title="Create Agent Account"
        onClose={() => setModal(false)}
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setModal(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={handleCreateAgent} disabled={submitting}>
              {submitting ? "Creating…" : "Create Agent"}
            </button>
          </>
        }
      >
        {[
          { key: "fullName",    label: "Full Name",    type: "text"     },
          { key: "email",       label: "Email",        type: "email"    },
          { key: "password",    label: "Password",     type: "password" },
          { key: "phoneNumber", label: "Phone Number", type: "text"     },
        ].map((f) => (
          <div className="form-group" key={f.key}>
            <label className="form-label">{f.label}</label>
            <input
              className="form-input" type={f.type}
              value={form[f.key]}
              onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
            />
          </div>
        ))}
      </Modal>
    </Layout>
  );
}
