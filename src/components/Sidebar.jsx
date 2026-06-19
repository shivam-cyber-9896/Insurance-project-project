import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { logout } from "../services/AuthService";
import "./Sidebar.css";

const navConfig = {
  ADMIN: [
    { to: "/admin/dashboard",  icon: "📊", label: "Dashboard"  },
    { to: "/admin/users",      icon: "👥", label: "Users"      },
    { to: "/admin/products",   icon: "📦", label: "Products"   },
    { to: "/admin/plans",      icon: "📋", label: "Plans"      },
    { to: "/admin/policies",   icon: "📄", label: "Policies"   },
    { to: "/admin/payments",   icon: "💳", label: "Payments"   },
    { to: "/admin/claims",     icon: "🏥", label: "Claims"     },
  ],
  AGENT: [
    { to: "/agent/dashboard",  icon: "📊", label: "Dashboard"  },
    { to: "/agent/customers",  icon: "👤", label: "Customers"  },
    { to: "/agent/policies",   icon: "📄", label: "Policies"   },
    { to: "/agent/claims",     icon: "🏥", label: "Claims"     },
  ],
  CUSTOMER: [
    { to: "/customer/dashboard", icon: "📊", label: "Dashboard" },
    { to: "/customer/profile",   icon: "👤", label: "My Profile" },
    { to: "/customer/plans",     icon: "📋", label: "Browse Plans" },
    { to: "/customer/policies",  icon: "📄", label: "My Policies"  },
    { to: "/customer/payments",  icon: "💳", label: "My Payments"  },
    { to: "/customer/claims",    icon: "🏥", label: "My Claims"    },
  ],
};

const roleColors = {
  ADMIN:    { bg: "var(--accent-subtle)", color: "var(--accent)", label: "Admin"    },
  AGENT:    { bg: "rgba(240,208,96,0.12)",  color: "var(--accent-light)", label: "Agent"    },
  CUSTOMER: { bg: "var(--accent-subtle)", color: "var(--accent)", label: "Customer" },
};

export default function Sidebar({ role, user }) {
  const navigate = useNavigate();
  const { logout: ctxLogout } = useContext(AuthContext);

  const links = navConfig[role] || [];
  const rc = roleColors[role] || roleColors.CUSTOMER;

  const handleLogout = () => {
    logout();
    ctxLogout();
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      {/* Brand */}
      <div className="sidebar-brand">
        <div className="sidebar-logo">👑</div>
        <div>
          <div className="sidebar-brand-name">Crown Assurance</div>
          <div className="sidebar-brand-sub">Management Portal</div>
        </div>
      </div>

      {/* Role badge */}
      <div className="sidebar-role" style={{ background: rc.bg, color: rc.color }}>
        {rc.label} Portal
      </div>

      {/* Nav links */}
      <nav className="sidebar-nav">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `sidebar-link${isActive ? " active" : ""}`
            }
          >
            <span className="sidebar-icon">{link.icon}</span>
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* User + Logout */}
      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="sidebar-avatar">
            {(user?.sub || user?.email || "U")[0].toUpperCase()}
          </div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">
              {user?.sub || user?.email || "User"}
            </div>
            <div className="sidebar-user-role" style={{ color: rc.color }}>
              {rc.label}
            </div>
          </div>
        </div>
        <button className="btn btn-danger btn-sm sidebar-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </aside>
  );
}
