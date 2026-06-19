import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import DataTable from "../../components/DataTable";
import Pagination from "../../components/Pagination";
import { getUser } from "../../services/AuthService";
import { getMyPayments } from "../../services/paymentService";

export default function CustomerPayments() {
  const user = getUser();
  const [payments, setPayments] = useState([]);
  const [page, setPage]         = useState(0);
  const [totalPages, setTotal]  = useState(0);
  const [loading, setLoading]   = useState(true);

  const load = (p = 0) => {
    setLoading(true);
    getMyPayments(p, 10)
      .then((d) => { setPayments(d.content || []); setTotal(d.totalPages || 1); })
      .catch(console.error).finally(() => setLoading(false));
  };
  useEffect(() => { load(page); }, [page]);

  const columns = [
    { key: "paymentId",           label: "ID"        },
    { key: "policyId",            label: "Policy ID"  },
    { key: "amount",              label: "Amount",
      render: (r) => `₹${Number(r.amount).toLocaleString("en-IN")}`
    },
    { key: "paymentMode",         label: "Mode",
      render: (r) => <span className="badge badge-info">{r.paymentMode}</span>
    },
    { key: "transactionReference",label: "Txn Ref"   },
    { key: "paymentStatus",       label: "Status",
      render: (r) => (
        <span className={`badge badge-${r.paymentStatus === "SUCCESS" ? "success" : r.paymentStatus === "FAILED" ? "danger" : "warning"}`}>
          {r.paymentStatus}
        </span>
      )
    },
    { key: "paymentDate",         label: "Date"      },
  ];

  return (
    <Layout role="CUSTOMER" user={user} title="My Payments" subtitle="Your payment history">
      <div className="glass-card">
        <div className="page-header"><h3 style={{ fontSize: 16 }}>Payment History</h3></div>
        <DataTable columns={columns} data={payments} loading={loading} emptyText="No payment records found." />
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </Layout>
  );
}
