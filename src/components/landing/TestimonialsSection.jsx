const testimonials = [
  {
    initial: "R",
    name:    "Rahul Mehta",
    role:    "Business Owner, Mumbai",
    stars:   5,
    text:    "Crown Assurance made the entire process seamless. Filed a claim for my vehicle and got settled within 5 days. Exceptional service and truly professional team!",
  },
  {
    initial: "P",
    name:    "Priya Sharma",
    role:    "Software Engineer, Bengaluru",
    stars:   5,
    text:    "The Family Protect plan is a game changer. Maternity coverage, critical illness — all under one plan at a very reasonable price. Highly recommend Crown Assurance.",
  },
  {
    initial: "A",
    name:    "Arjun Patel",
    role:    "CA & Financial Advisor, Ahmedabad",
    stars:   5,
    text:    "As a financial advisor, I recommend Crown Assurance to all my clients. The Premium Elite plan offers unmatched coverage and their advisors are extremely knowledgeable.",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="ca-section">
      <div className="ca-container">
        <div className="ca-section-center">
          <div className="ca-section-label">Customer Stories</div>
          <h2 className="ca-heading">Trusted by <span className="gold">50,000+ Customers</span></h2>
          <p className="ca-subheading">
            Don't just take our word for it — hear from real customers who chose Crown Assurance.
          </p>
        </div>

        <div className="ca-testimonials-grid">
          {testimonials.map((t) => (
            <div key={t.name} className="ca-testimonial-card">
              <div className="ca-testimonial-quote">"</div>
              <p className="ca-testimonial-text">{t.text}</p>
              <div className="ca-testimonial-stars">{"★".repeat(t.stars)}</div>
              <div className="ca-testimonial-author">
                <div className="ca-author-avatar">{t.initial}</div>
                <div>
                  <div className="ca-author-name">{t.name}</div>
                  <div className="ca-author-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
