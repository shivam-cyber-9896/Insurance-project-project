const steps = [
  { n:"01", title:"Choose a Plan",     desc:"Browse our curated insurance products and select the plan that fits your needs and budget."   },
  { n:"02", title:"Get Instant Quote", desc:"Fill in your details and receive a personalised quote in seconds, with no hidden charges."      },
  { n:"03", title:"Complete Payment",  desc:"Pay securely through multiple payment modes — UPI, net banking, cards, or EMI options."        },
  { n:"04", title:"Get Coverage",      desc:"Your policy is active instantly. Download your certificate and you are fully covered."         },
];

export default function HowItWorksSection() {
  return (
    <section className="ca-section-alt">
      <div className="ca-container">
        <div className="ca-section-center">
          <div className="ca-section-label">Simple Process</div>
          <h2 className="ca-heading">Get Covered in <span className="gold">4 Easy Steps</span></h2>
          <p className="ca-subheading">
            From choosing a plan to getting full coverage — the entire journey takes just minutes.
          </p>
        </div>

        <div className="ca-steps-grid">
          {steps.map((s) => (
            <div key={s.n} className="ca-step">
              <div className="ca-step-number"><span>{s.n}</span></div>
              <div className="ca-step-title">{s.title}</div>
              <div className="ca-step-desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
