import { useState } from "react";

const faqs = [
  {
    q: "How do I buy an insurance policy?",
    a: "You can buy a policy online in minutes. Simply create an account, browse our plans, choose the one that suits you, fill your details, make payment, and receive your policy instantly via email.",
  },
  {
    q: "How do I file a claim?",
    a: "Log into your Crown Assurance portal, navigate to 'My Claims', click 'File Claim', fill in the incident details, upload required documents, and submit. Our team will contact you within 24 hours.",
  },
  {
    q: "What documents are required to file a claim?",
    a: "Documents depend on the type of claim. Generally you'll need: policy document, ID proof, claim form, bills/receipts, medical reports (for health claims), FIR copy (for vehicle theft), or repair estimates.",
  },
  {
    q: "How long does claim settlement take?",
    a: "We aim to settle 95% of claims within 7 working days. Complex cases may take up to 30 days. You'll receive regular SMS/email updates throughout the process.",
  },
  {
    q: "Can I cancel my policy and get a refund?",
    a: "Yes, you can cancel within the free-look period (15 days from policy issuance) for a full refund. Post that, a pro-rated refund applies based on unused policy period.",
  },
];

export default function FaqSection() {
  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (i) => setOpenFaq(openFaq === i ? null : i);

  return (
    <section className="ca-section-alt">
      <div className="ca-container">
        <div className="ca-section-center">
          <div className="ca-section-label">FAQ</div>
          <h2 className="ca-heading">Frequently Asked <span className="gold">Questions</span></h2>
          <p className="ca-subheading">
            Everything you need to know about Crown Assurance policies and the claims process.
          </p>
        </div>

        <div className="ca-faq-list">
          {faqs.map((faq, i) => (
            <div key={i} className={`ca-faq-item${openFaq === i ? " open" : ""}`}>
              <button className="ca-faq-question" onClick={() => toggleFaq(i)}>
                <span className="ca-faq-q-text">{faq.q}</span>
                <span className="ca-faq-icon">+</span>
              </button>
              <div className="ca-faq-answer">
                <div className="ca-faq-answer-inner">{faq.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
