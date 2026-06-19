import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import DataTable from "../../components/DataTable";
import Pagination from "../../components/Pagination";
import { getUser } from "../../services/AuthService";
import { getAllCustomers } from "../../services/customerService";

export default function AgentCustomers() {
  const user = getUser();
  const [customers, setCustomers] = useState([]);
  const [page, setPage]           = useState(0);
  const [totalPages, setTotal]    = useState(0);
  const [loading, setLoading]     = useState(true);

  const load = (p = 0) => {
    setLoading(true);
    getAllCustomers(p, 10)
      .then((d) => { setCustomers(d.content || []); setTotal(d.totalPages || 1); })
      .catch(console.error).finally(() => setLoading(false));
  };
  useEffect(() => { load(page); }, [page]);

  const columns = [
    { key: "customerId",       label: "ID"       },
    { key: "fullName",         label: "Name"     },
    { key: "email",            label: "Email"    },
    { key: "phoneNumber",      label: "Phone"    },
    { key: "city",             label: "City"     },
    { key: "state",            label: "State"    },
    { key: "nomineeName",      label: "Nominee"  },
    { key: "nomineeRelation",  label: "Relation" },
  ];

  return (
    <Layout role="AGENT" user={user} title="Customers" subtitle="Browse all registered customers">
      <div className="glass-card">
        <div className="page-header"><h3 style={{ fontSize: 16 }}>All Customers</h3></div>
        <DataTable columns={columns} data={customers} loading={loading} emptyText="No customers found." />
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </Layout>
  );
}
