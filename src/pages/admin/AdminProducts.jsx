import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import DataTable from "../../components/DataTable";
import Pagination from "../../components/Pagination";
import Modal from "../../components/Modal";
import { getUser } from "../../services/AuthService";
import { getAllProducts, createProduct, updateProduct, deactivateProduct } from "../../services/productService";

const EMPTY = { productName: "", productType: "LIFE", description: "", active: true };

export default function AdminProducts() {
  const user = getUser();
  const [products, setProducts] = useState([]);
  const [page, setPage]         = useState(0);
  const [totalPages, setTotal]  = useState(0);
  const [loading, setLoading]   = useState(true);
  const [modal, setModal]       = useState(null); // null | 'create' | 'edit'
  const [form, setForm]         = useState(EMPTY);
  const [editId, setEditId]     = useState(null);
  const [submitting, setSub]    = useState(false);
  const [msg, setMsg]           = useState({ type: "", text: "" });

  const load = (p = 0) => {
    setLoading(true);
    getAllProducts(p, 10)
      .then((d) => { setProducts(d.content || []); setTotal(d.totalPages || 1); })
      .catch(console.error).finally(() => setLoading(false));
  };
  useEffect(() => { load(page); }, [page]);

  const openCreate = () => { setForm(EMPTY); setEditId(null); setModal("create"); };
  const openEdit   = (p) => { setForm({ productName: p.productName, productType: p.productType, description: p.description, active: p.active }); setEditId(p.productId); setModal("edit"); };

  const handleSubmit = async () => {
    setSub(true); setMsg({});
    try {
      if (modal === "edit") await updateProduct(editId, form);
      else await createProduct(form);
      setMsg({ type: "success", text: `Product ${modal === "edit" ? "updated" : "created"}!` });
      setModal(null); load(page);
    } catch { setMsg({ type: "error", text: "Operation failed. Try again." }); }
    finally { setSub(false); }
  };

  const handleDeactivate = (id) =>
    deactivateProduct(id).then(() => load(page)).catch(console.error);

  const columns = [
    { key: "productId",   label: "ID"          },
    { key: "productName", label: "Product Name" },
    { key: "productType", label: "Type",
      render: (r) => <span className="badge badge-info">{r.productType}</span>
    },
    { key: "description", label: "Description",
      render: (r) => <span style={{ maxWidth: 200, display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.description}</span>
    },
    { key: "active", label: "Status",
      render: (r) => <span className={`badge badge-${r.active ? "success" : "danger"}`}>{r.active ? "Active" : "Inactive"}</span>
    },
    { key: "actions", label: "Actions",
      render: (r) => (
        <div style={{ display: "flex", gap: 6 }}>
          <button className="btn btn-secondary btn-sm" onClick={() => openEdit(r)}>Edit</button>
          {r.active && <button className="btn btn-danger btn-sm" onClick={() => handleDeactivate(r.productId)}>Deactivate</button>}
        </div>
      )
    },
  ];

  return (
    <Layout role="ADMIN" user={user} title="Products" subtitle="Manage insurance product categories">
      {msg.text && <div className={`alert alert-${msg.type}`}>{msg.text}</div>}
      <div className="glass-card">
        <div className="page-header">
          <h3 style={{ fontSize: 16 }}>All Products</h3>
          <button className="btn btn-primary" onClick={openCreate}>+ Add Product</button>
        </div>
        <DataTable columns={columns} data={products} loading={loading} />
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>

      <Modal
        open={!!modal}
        title={modal === "edit" ? "Edit Product" : "Create Product"}
        onClose={() => setModal(null)}
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setModal(null)}>Cancel</button>
            <button className="btn btn-primary" onClick={handleSubmit} disabled={submitting}>
              {submitting ? "Saving…" : "Save"}
            </button>
          </>
        }
      >
        <div className="form-group">
          <label className="form-label">Product Name</label>
          <input className="form-input" value={form.productName} onChange={(e) => setForm({ ...form, productName: e.target.value })} />
        </div>
        <div className="form-group">
          <label className="form-label">Type</label>
          <select className="form-select" value={form.productType} onChange={(e) => setForm({ ...form, productType: e.target.value })}>
            {["LIFE", "HEALTH", "VEHICLE", "PROPERTY", "TRAVEL"].map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea className="form-textarea" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </div>
        <div className="form-group" style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <input type="checkbox" id="active" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} />
          <label htmlFor="active" className="form-label" style={{ margin: 0 }}>Active</label>
        </div>
      </Modal>
    </Layout>
  );
}
