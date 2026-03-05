import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Contact — Souria Houria",
};

export default function ContactPage() {
  return (
    <>
      <section className="section">
        <div className="container">
          <Breadcrumbs items={[{ label: "Accueil", href: "/" }, { label: "Contact" }]} />

          <h1 className="mb-6">Contactez-nous</h1>
          <p
            style={{
              color: "var(--neutral-500)",
              maxWidth: 640,
              marginBottom: "var(--space-8)",
            }}
          >
            Vous avez une question, une suggestion ou souhaitez collaborer avec
            nous ? N&apos;hésitez pas à nous écrire. Nous vous répondrons dans
            les meilleurs délais.
          </p>

          <div className="contact-grid">
            {/* Contact form */}
            <div className="contact-form-wrapper">
              <form className="contact-form">
                <div className="form-group">
                  <label className="form-label" htmlFor="name">
                    Nom complet *
                  </label>
                  <input
                    className="form-input"
                    type="text"
                    id="name"
                    placeholder="Votre nom"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="email">
                    Email *
                  </label>
                  <input
                    className="form-input"
                    type="email"
                    id="email"
                    placeholder="votre@email.com"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="subject">
                    Sujet *
                  </label>
                  <select className="form-select" id="subject" defaultValue="">
                    <option value="" disabled>
                      Choisir un sujet
                    </option>
                    <option>Question générale</option>
                    <option>Devenir membre</option>
                    <option>Proposition de partenariat</option>
                    <option>Presse / Médias</option>
                    <option>Signaler un problème</option>
                    <option>Autre</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="message">
                    Message *
                  </label>
                  <textarea
                    className="form-textarea"
                    id="message"
                    rows={6}
                    placeholder="Votre message..."
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Envoyer le message
                </button>
              </form>
            </div>

            {/* Contact info sidebar */}
            <div className="contact-info-sidebar">
              <div className="contact-info-item">
                <div className="contact-info-icon">📧</div>
                <div>
                  <h4>Email</h4>
                  <a href="mailto:contact@souriahouria.com">
                    contact@souriahouria.com
                  </a>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="contact-info-icon">📍</div>
                <div>
                  <h4>Adresse</h4>
                  <p>
                    Souria Houria
                    <br />
                    Paris, France
                  </p>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="contact-info-icon">📱</div>
                <div>
                  <h4>Réseaux sociaux</h4>
                  <div
                    style={{
                      display: "flex",
                      gap: "var(--space-3)",
                      marginTop: "var(--space-2)",
                    }}
                  >
                    <a href="#" style={{ color: "var(--secondary)" }}>
                      Facebook
                    </a>
                    <a href="#" style={{ color: "var(--secondary)" }}>
                      Twitter
                    </a>
                    <a href="#" style={{ color: "var(--secondary)" }}>
                      YouTube
                    </a>
                  </div>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="contact-info-icon">🕐</div>
                <div>
                  <h4>Horaires</h4>
                  <p>
                    Lundi — Vendredi
                    <br />
                    10h00 — 18h00
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="section section-alt">
        <div className="container">
          <div
            style={{
              background: "var(--neutral-200)",
              borderRadius: "var(--radius-lg)",
              height: 320,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--neutral-400)",
              fontSize: "1rem",
            }}
          >
            Carte interactive — Paris, France
          </div>
        </div>
      </section>
    </>
  );
}
