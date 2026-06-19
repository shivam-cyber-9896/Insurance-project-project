import { Outlet, useLocation } from "react-router-dom";
import CrownNavbar from "../components/landing/CrownNavbar";
import CrownFooter from "../components/landing/CrownFooter";
import "../components/landing/landing.css"; // Ensure global theme variables are loaded

export default function PublicLayout() {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  return (
    <div className="ca-page">
      <CrownNavbar showSmoothLinks={isLandingPage} />
      <main style={{ paddingTop: isLandingPage ? "0" : "80px", minHeight: "calc(100vh - 400px)" }}>
        <Outlet />
      </main>
      <CrownFooter />
    </div>
  );
}
