import { useState } from "react";

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", type: "", message: "" });

  const handleFormChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! We'll get back to you within 24 hours.");
    setFormData({ name: "", email: "", phone: "", type: "", message: "" });
  };

  return (
    <section id="contact" className="ca-section">
      <div className="ca-container">
        <div className="ca-section-center">
          <div className="ca-section-label">Get In Touch</div>
          <h2 className="ca-heading">We're Here to <span className="gold">Help You</span></h2>
        </div>

        <div className="ca-contact-grid">
          {/* Info Side */}
          <div>
            <div className="ca-contact-info-title">Talk to Our Experts</div>
            <p className="ca-contact-info-sub">
              Our team of 150+ certified insurance advisors is available 24/7 to answer your questions,
              assist with claims, or help you find the perfect coverage plan.
            </p>

            <div className="ca-contact-items">
              {[
                { icon: "📧", label: "Email Us",     value: "support@crownassurance.in"     },
                { icon: "📞", label: "Call Us",      value: "+91 1800-123-4567 (Toll Free)" },
                { icon: "📍", label: "Visit Us",     value: "14th Floor, Crown Tower, BKC, Mumbai — 400051" },
                { icon: "🕐", label: "Working Hours", value: "Mon – Sat: 9:00 AM – 8:00 PM IST" },
              ].map((item) => (
                <div key={item.label} className="ca-contact-item">
                  <div className="ca-contact-item-icon">{item.icon}</div>
                  <div>
                    <div className="ca-contact-item-label">{item.label}</div>
                    <div className="ca-contact-item-value">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Side */}
          <div className="ca-contact-form">
            <div className="ca-form-title">Send Us a Message</div>
            <form onSubmit={handleFormSubmit}>
              <div className="ca-form-row">
                <div className="ca-form-group">
                  <label className="ca-form-label">Full Name</label>
                  <input
                    className="ca-form-input" type="text" name="name"
                    placeholder="Rahul Mehta" value={formData.name}
                    onChange={handleFormChange} required
                  />
                </div>
                <div className="ca-form-group">
                  <label className="ca-form-label">Email Address</label>
                  <input
                    className="ca-form-input" type="email" name="email"
                    placeholder="rahul@email.com" value={formData.email}
                    onChange={handleFormChange} required
                  />
                </div>
              </div>
              <div className="ca-form-row">
                <div className="ca-form-group">
                  <label className="ca-form-label">Phone Number</label>
                  <input
                    className="ca-form-input" type="tel" name="phone"
                    placeholder="+91 98765 43210" value={formData.phone}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="ca-form-group">
                  <label className="ca-form-label">Insurance Type</label>
                  <select className="ca-form-select" name="type" value={formData.type} onChange={handleFormChange}>
                    <option value="">Select a plan...</option>
                    <option>Health Insurance</option>
                    <option>Life Insurance</option>
                    <option>Vehicle Insurance</option>
                    <option>Travel Insurance</option>
                    <option>Property Insurance</option>
                    <option>Business Insurance</option>
                  </select>
                </div>
              </div>
              <div className="ca-form-group">
                <label className="ca-form-label">Message</label>
                <textarea
                  className="ca-form-textarea" name="message"
                  placeholder="Tell us how we can help you..."
                  value={formData.message}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <button type="submit" className="ca-btn ca-btn-gold ca-form-submit">
                Send Message ✦
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
