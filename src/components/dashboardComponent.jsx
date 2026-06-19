import { useEffect, useState } from "react";
import { getAllCustomersApi } from "../api/customerApi";
import { getAllPoliciesApi } from "../api/policyApi";
import { getAllProductsApi } from "../api/productApi";
import "../styles/dashboard.css";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalPolicies: 0,
    totalProducts: 0,
    customers: [],
    policies: [],
    products: [],
  });

  const [selectedType, setSelectedType] = useState("");
  const [selectedList, setSelectedList] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadDashboardData = async () => {
    try {
      const [customersRes, policiesRes, productsRes] = await Promise.all([
        getAllCustomersApi(0, 100),
        getAllPoliciesApi(0, 100),
        getAllProductsApi(0, 100),
      ]);

      setStats({
        totalCustomers: customersRes.data.totalElements,
        totalPolicies: policiesRes.data.totalElements,
        totalProducts: productsRes.data.totalElements,
        customers: customersRes.data.content || [],
        policies: policiesRes.data.content || [],
        products: productsRes.data.content || [],
      });
    } catch (error) {
      console.error("Failed to load dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const showCustomers = () => {
    setSelectedType("Customers");
    setSelectedList(stats.customers);
  };

  const showPolicies = () => {
    setSelectedType("Policies");
    setSelectedList(stats.policies);
  };

  const showProducts = () => {
    setSelectedType("Products");
    setSelectedList(stats.products);
  };

  if (loading) {
    return <h2 className="loading">Loading...</h2>;
  }

  return (
    <div className="dashboard">
      <h1 className="title">Admin Dashboard</h1>

      <div className="card-container">
        <div className="card customers" onClick={showCustomers}>
          <h3>Total Customers</h3>
          <h1>{stats.totalCustomers}</h1>
        </div>

        <div className="card policies" onClick={showPolicies}>
          <h3>Total Policies</h3>
          <h1>{stats.totalPolicies}</h1>
        </div>

        <div className="card products" onClick={showProducts}>
          <h3>Total Products</h3>
          <h1>{stats.totalProducts}</h1>
        </div>
      </div>

      {selectedList.length > 0 && (
        <div className="details-section">
          <h2>{selectedType} List</h2>

          <ul className="details-list">
            {selectedType === "Customers" &&
              selectedList.map((customer) => (
                <li key={customer.customerId}>
                  {customer.fullName}
                </li>
              ))}

            {selectedType === "Policies" &&
              selectedList.map((policy) => (
                <li key={policy.policyId}>
                  {policy.policyNumber}
                </li>
              ))}

            {selectedType === "Products" &&
              selectedList.map((product) => (
                <li key={product.productId}>
                  {product.productName + " - " + product.productType + " - " + product.description}
                  
                  
                  {  "-" +product.active +"-"}
                  {product.createdDate}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dashboard;