const features = [
  { icon: "⚡", title: "Fast Claim Settlement",    desc: "Claims processed within 7 working days with a dedicated support team." },
  { icon: "📞", title: "24/7 Customer Support",    desc: "Round-the-clock assistance via call, chat, and email for all queries." },
  { icon: "🔒", title: "Secure Digital Services",  desc: "Bank-grade encryption and secure digital onboarding for peace of mind." },
  { icon: "💰", title: "Affordable Premium Plans", desc: "Flexible payment options and competitive pricing for every budget." },
  { icon: "🤝", title: "Trusted Advisors",          desc: "150+ certified insurance experts to guide you through every decision." },
];

export default function WhyChooseSection() {
  return (
    <section id="why-us" className="ca-section">
      <div className="ca-container">
        <div className="ca-section-center">
          <div className="ca-section-label">Our Advantage</div>
          <h2 className="ca-heading">Why Choose <span className="gold">Crown Assurance?</span></h2>
          <p className="ca-subheading">
            We combine cutting-edge technology with human expertise to deliver insurance that truly protects.
          </p>
        </div>

        <div className="ca-features-grid">
          {features.map((f) => (
            <div key={f.title} className="ca-feature-card">
              <span className="ca-feature-icon">{f.icon}</span>
              <div className="ca-feature-title">{f.title}</div>
              <div className="ca-feature-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
