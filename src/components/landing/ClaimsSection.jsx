import { Link } from "react-router-dom";

const claimSteps = [
  { emoji: "📋", n: "STEP 01", title: "Submit Claim",     desc: "Log in to your portal and fill out the claim form with incident details and policy number." },
  { emoji: "📁", n: "STEP 02", title: "Upload Documents", desc: "Attach required documents like bills, prescriptions, FIR copy, or repair estimates."       },
  { emoji: "🔍", n: "STEP 03", title: "Verification",     desc: "Our dedicated team verifies your claim documents and contacts you if additional info is needed." },
  { emoji: "💸", n: "STEP 04", title: "Settlement",       desc: "Approved claim amount is transferred directly to your bank account within 7 working days."  },
];

export default function ClaimsSection() {
  return (
    <section id="claims" className="ca-section-alt">
      <div className="ca-container">
        <div className="ca-section-center">
          <div className="ca-section-label">Claim Process</div>
          <h2 className="ca-heading">Filing a Claim is <span className="gold">Simple & Fast</span></h2>
          <p className="ca-subheading">
            Our streamlined digital claim process ensures quick, transparent, and hassle-free settlements.
          </p>
        </div>

        <div className="ca-claim-timeline">
          {claimSteps.map((s) => (
            <div key={s.title} className="ca-claim-step">
              <div className="ca-claim-icon">
                <span className="ci-emoji">{s.emoji}</span>
                <span className="ci-step">{s.n}</span>
              </div>
              <div className="ca-claim-title">{s.title}</div>
              <div className="ca-claim-desc">{s.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 56 }}>
          <Link to="/login" className="ca-btn ca-btn-gold" style={{ padding: "15px 38px", fontSize: "15px" }}>
            File a Claim Now →
          </Link>
        </div>
      </div>
    </section>
  );
}
