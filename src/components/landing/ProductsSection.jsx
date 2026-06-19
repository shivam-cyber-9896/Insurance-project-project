import { Link } from "react-router-dom";

const products = [
  { icon: "🏥", name: "Health Insurance",   desc: "Comprehensive coverage with cashless hospitalization at 5000+ network hospitals nationwide." },
  { icon: "🛡️", name: "Life Insurance",     desc: "Secure your family's financial future with high-coverage term plans at affordable premiums." },
  { icon: "🚗", name: "Vehicle Insurance",  desc: "Protect your car, bike or commercial vehicle against accidents, theft, and third-party damages." },
  { icon: "✈️", name: "Travel Insurance",   desc: "Travel worry-free with global medical coverage, trip cancellation, and lost luggage protection." },
  { icon: "🏠", name: "Property Insurance", desc: "Safeguard your home and assets against fire, natural disasters, theft, and structural damage." },
  { icon: "💼", name: "Business Insurance", desc: "Tailored policies for liability, employee benefits, assets, and operational risk management." },
];

export default function ProductsSection() {
  return (
    <section id="products" className="ca-section-alt">
      <div className="ca-container">
        <div className="ca-section-center">
          <div className="ca-section-label">Our Solutions</div>
          <h2 className="ca-heading">Comprehensive <span className="gold">Insurance Products</span></h2>
          <p className="ca-subheading">
            From personal health to enterprise risk, we offer tailored coverage for every need.
          </p>
        </div>

        <div className="ca-products-grid">
          {products.map((p) => (
            <div key={p.name} className="ca-product-card">
              <div className="ca-product-icon">{p.icon}</div>
              <div className="ca-product-name">{p.name}</div>
              <div className="ca-product-desc">{p.desc}</div>
              <Link to="/register" className="ca-product-link">Learn More →</Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
