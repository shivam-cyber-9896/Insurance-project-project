import { Link } from "react-router-dom";

const plans = [
  {
    tier:     "STARTER",
    name:     "Basic Shield",
    amount:   "999",
    period:   "per year",
    coverage: "₹5 Lakh",
    featured: false,
    badge:    null,
    benefits: [
      "Accidental Death Cover",
      "Hospitalisation Benefits",
      "Cashless Treatment at 2000+ Hospitals",
      "24/7 Helpline",
      "Online Policy Management",
    ],
  },
  {
    tier:     "POPULAR",
    name:     "Family Protect",
    amount:   "2,499",
    period:   "per year",
    coverage: "₹25 Lakh",
    featured: true,
    badge:    "Most Popular",
    benefits: [
      "Everything in Basic Shield",
      "Covers Entire Family (4 Members)",
      "Critical Illness Cover",
      "Maternity & Newborn Benefits",
      "Cashless at 5000+ Hospitals",
      "Annual Health Check-up",
    ],
  },
  {
    tier:     "ELITE",
    name:     "Premium Elite",
    amount:   "5,999",
    period:   "per year",
    coverage: "₹1 Crore",
    featured: false,
    badge:    null,
    benefits: [
      "Everything in Family Protect",
      "International Coverage",
      "Personal Concierge Service",
      "Zero Waiting Period",
      "Unlimited Day-care Procedures",
      "Air Ambulance Cover",
    ],
  },
];

export default function PlansSection() {
  return (
    <section id="plans" className="ca-section">
      <div className="ca-container">
        <div className="ca-section-center">
          <div className="ca-section-label">Featured Plans</div>
          <h2 className="ca-heading">Choose Your <span className="gold">Coverage Plan</span></h2>
          <p className="ca-subheading">
            Transparent pricing with no hidden fees. Pick the plan that best suits your life.
          </p>
        </div>

        <div className="ca-plans-grid">
          {plans.map((plan) => (
            <div key={plan.name} className={`ca-plan-card${plan.featured ? " featured" : ""}`}>
              {plan.badge && <div className="ca-plan-badge">{plan.badge}</div>}
              <div className="ca-plan-tier">{plan.tier}</div>
              <div className="ca-plan-name">{plan.name}</div>

              <div className="ca-plan-price">
                <span className="ca-plan-currency">₹</span>
                <span className="ca-plan-amount">{plan.amount}</span>
              </div>
              <div className="ca-plan-period">{plan.period}</div>

              <div className="ca-plan-coverage">
                🛡️ Coverage up to <strong>{plan.coverage}</strong>
              </div>

              <div className="ca-plan-divider" />

              <ul className="ca-plan-benefits">
                {plan.benefits.map((b) => (
                  <li key={b}>
                    <span className="ca-plan-check">✓</span>
                    {b}
                  </li>
                ))}
              </ul>

              <Link to="/register" className={`ca-btn ca-plan-btn ${plan.featured ? "ca-btn-gold" : "ca-btn-outline"}`}>
                Buy Now — {plan.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
