import { Routes, Route, Navigate } from "react-router-dom";

// Public pages
import PublicLayout from "./layouts/PublicLayout";
import Login       from "./pages/Login";
import Register    from "./pages/Register";
import VerifyOtp   from "./pages/VerifyOtp";
import LandingPage from "./pages/LandingPage";

// Auth
import ProtectedRoute from "./auth/ProtectedRoute";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers     from "./pages/admin/AdminUsers";
import AdminProducts  from "./pages/admin/AdminProducts";
import AdminPlans     from "./pages/admin/AdminPlans";
import AdminPolicies  from "./pages/admin/AdminPolicies";
import AdminPayments  from "./pages/admin/AdminPayments";
import AdminClaims    from "./pages/admin/AdminClaims";

// Agent pages
import AgentDashboard  from "./pages/agent/AgentDashboard";
import AgentCustomers  from "./pages/agent/AgentCustomers";
import AgentPolicies   from "./pages/agent/AgentPolicies";
import AgentClaims     from "./pages/agent/AgentClaims";

// Customer pages
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import CustomerProfile   from "./pages/customer/CustomerProfile";
import CustomerPlans     from "./pages/customer/CustomerPlans";
import CustomerPolicies  from "./pages/customer/CustomerPolicies";
import CustomerPayments  from "./pages/customer/CustomerPayments";
import CustomerClaims    from "./pages/customer/CustomerClaims";

const AdminRoute   = ({ children }) => <ProtectedRoute allowedRoles={["ADMIN"]}>{children}</ProtectedRoute>;
const AgentRoute   = ({ children }) => <ProtectedRoute allowedRoles={["AGENT"]}>{children}</ProtectedRoute>;
const CustomerRoute = ({ children }) => <ProtectedRoute allowedRoles={["CUSTOMER"]}>{children}</ProtectedRoute>;

function App() {
  return (
    <Routes>
      {/* Public */}
      <Route element={<PublicLayout />}>
        <Route path="/"            element={<LandingPage />} />
        <Route path="/login"       element={<Login />}     />
        <Route path="/register"    element={<Register />}  />
        <Route path="/verify-otp"  element={<VerifyOtp />} />
      </Route>

      {/* Admin */}
      <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      <Route path="/admin/users"     element={<AdminRoute><AdminUsers /></AdminRoute>}     />
      <Route path="/admin/products"  element={<AdminRoute><AdminProducts /></AdminRoute>}  />
      <Route path="/admin/plans"     element={<AdminRoute><AdminPlans /></AdminRoute>}     />
      <Route path="/admin/policies"  element={<AdminRoute><AdminPolicies /></AdminRoute>}  />
      <Route path="/admin/payments"  element={<AdminRoute><AdminPayments /></AdminRoute>}  />
      <Route path="/admin/claims"    element={<AdminRoute><AdminClaims /></AdminRoute>}    />

      {/* Agent */}
      <Route path="/agent/dashboard" element={<AgentRoute><AgentDashboard /></AgentRoute>} />
      <Route path="/agent/customers" element={<AgentRoute><AgentCustomers /></AgentRoute>} />
      <Route path="/agent/policies"  element={<AgentRoute><AgentPolicies /></AgentRoute>}  />
      <Route path="/agent/claims"    element={<AgentRoute><AgentClaims /></AgentRoute>}    />

      {/* Customer */}
      <Route path="/customer/dashboard" element={<CustomerRoute><CustomerDashboard /></CustomerRoute>} />
      <Route path="/customer/profile"   element={<CustomerRoute><CustomerProfile /></CustomerRoute>}   />
      <Route path="/customer/plans"     element={<CustomerRoute><CustomerPlans /></CustomerRoute>}     />
      <Route path="/customer/policies"  element={<CustomerRoute><CustomerPolicies /></CustomerRoute>}  />
      <Route path="/customer/payments"  element={<CustomerRoute><CustomerPayments /></CustomerRoute>}  />
      <Route path="/customer/claims"    element={<CustomerRoute><CustomerClaims /></CustomerRoute>}    />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;