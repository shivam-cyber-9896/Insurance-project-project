import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function Layout({ role, user, title, subtitle, children }) {
  return (
    <div className="app-layout">
      <Sidebar role={role} user={user} />
      <div className="app-content">
        <Topbar title={title} subtitle={subtitle} />
        <main className="page-main">{children}</main>
      </div>
    </div>
  );
}
