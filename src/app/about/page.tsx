import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Qui sommes-nous — Souria Houria",
};

const team = [
  { name: "Mazen Adi", role: "Président" },
  { name: "Nadia Khoury", role: "Vice-présidente" },
  { name: "Omar Darwish", role: "Secrétaire général" },
  { name: "Layla Hasan", role: "Trésorière" },
  { name: "Sami Barakat", role: "Responsable communication" },
  { name: "Rima Saleh", role: "Responsable événements" },
];

const missions = [
  {
    icon: "🕊️",
    title: "Défense des droits",
    text: "Nous défendons les droits fondamentaux du peuple syrien et documentons les violations des droits humains en Syrie depuis 2011.",
  },
  {
    icon: "🤝",
    title: "Soutien aux réfugiés",
    text: "Nous accompagnons les réfugiés syriens en France dans leurs démarches administratives, juridiques et d'intégration sociale.",
  },
  {
    icon: "📢",
    title: "Plaidoyer international",
    text: "Nous portons la voix de la société civile syrienne auprès des institutions européennes et internationales.",
  },
  {
    icon: "🎭",
    title: "Culture et mémoire",
    text: "Nous organisons des événements culturels pour faire vivre la culture syrienne et préserver la mémoire collective.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero banner */}
      <section
        className="hero"
        style={{
          minHeight: 340,
          backgroundImage:
            "linear-gradient(rgba(27,58,92,0.7), rgba(27,58,92,0.85)), url('https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1400&h=500&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div
            className="breadcrumbs"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            <Link href="/" style={{ color: "rgba(255,255,255,0.7)" }}>
              Accueil
            </Link>
            <span
              className="separator"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              ›
            </span>
            <span style={{ color: "#fff" }}>Qui sommes-nous</span>
          </div>
          <h1 style={{ color: "#fff", marginTop: "var(--space-4)" }}>
            Qui sommes-nous
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.85)",
              fontSize: "1.125rem",
              maxWidth: 640,
              marginTop: "var(--space-3)",
            }}
          >
            Souria Houria — Syrie Liberté — œuvre pour la défense des droits du
            peuple syrien et le soutien de la société civile.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="section">
        <div className="container">
          <h2 className="section-header">Notre mission</h2>
          <div className="about-mission-grid">
            {missions.map((m, i) => (
              <div key={i} className="about-mission-card">
                <div className="about-mission-icon">{m.icon}</div>
                <h3>{m.title}</h3>
                <p>{m.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* President quote */}
      <section className="section section-alt">
        <div className="container">
          <div className="president-quote">
            <div className="president-photo">
              <div
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: "50%",
                  background: "var(--neutral-200)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "4rem",
                  color: "var(--neutral-400)",
                }}
              >
                👤
              </div>
            </div>
            <div className="president-text">
              <blockquote>
                <p>
                  «&nbsp;Souria Houria est née de l&apos;urgence d&apos;agir
                  face à la tragédie syrienne. Depuis plus de dix ans, nous
                  portons la voix d&apos;un peuple qui aspire à la liberté et à
                  la dignité. Notre combat est celui de la justice, de la vérité
                  et de la solidarité.&nbsp;»
                </p>
              </blockquote>
              <div className="president-name">
                <strong>Mazen Adi</strong>
                <span>Président de Souria Houria</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="section">
        <div className="container" style={{ maxWidth: 820 }}>
          <h2 className="section-header">Notre histoire</h2>
          <div className="article-body">
            <p>
              Fondée en 2011, l&apos;association Souria Houria —
              «&nbsp;Syrie Liberté&nbsp;» en arabe — a été créée en réponse au
              soulèvement populaire syrien. Dès les premiers jours de la
              révolution, un groupe de Syriens et d&apos;amis de la Syrie vivant
              en France s&apos;est mobilisé pour soutenir les aspirations
              démocratiques du peuple syrien.
            </p>
            <p>
              Au fil des années, l&apos;association a élargi son champ
              d&apos;action&nbsp;: de l&apos;aide humanitaire d&apos;urgence au
              soutien aux réfugiés, du plaidoyer politique à l&apos;action
              culturelle. Aujourd&apos;hui, Souria Houria est une voix reconnue
              de la société civile syrienne en France et en Europe.
            </p>
            <p>
              Nos principaux champs d&apos;action comprennent&nbsp;:
            </p>
            <ul>
              <li>La documentation des violations des droits humains</li>
              <li>
                L&apos;accompagnement juridique et social des réfugiés
              </li>
              <li>
                L&apos;organisation d&apos;événements culturels et de
                sensibilisation
              </li>
              <li>
                Le plaidoyer auprès des institutions françaises et européennes
              </li>
              <li>
                La publication d&apos;articles et de rapports d&apos;analyse
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section section-alt">
        <div className="container">
          <h2 className="section-header">Notre équipe</h2>
          <div className="team-grid">
            {team.map((t, i) => (
              <div key={i} className="team-member">
                <div
                  className="team-photo"
                  style={{
                    background: "var(--neutral-200)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "2.5rem",
                    color: "var(--neutral-400)",
                  }}
                >
                  👤
                </div>
                <h4>{t.name}</h4>
                <span>{t.role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="section">
        <div className="container">
          <h2 className="section-header">Nos partenaires</h2>
          <div className="partner-logos">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="partner-logo">
                <div
                  style={{
                    width: 120,
                    height: 70,
                    background: "var(--neutral-100)",
                    borderRadius: "var(--radius-md)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--neutral-400)",
                    fontSize: "0.75rem",
                    textAlign: "center",
                    padding: "var(--space-2)",
                  }}
                >
                  Partenaire {i + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-band">
        <div className="container" style={{ textAlign: "center" }}>
          <h2>Rejoignez-nous</h2>
          <p
            style={{
              maxWidth: 600,
              margin: "var(--space-3) auto var(--space-6)",
              opacity: 0.9,
            }}
          >
            Soutenez notre action en devenant membre ou en faisant un don.
          </p>
          <div
            style={{
              display: "flex",
              gap: "var(--space-4)",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link href="#" className="btn btn-white-outline">
              Devenir membre
            </Link>
            <Link
              href="#"
              className="btn"
              style={{ background: "#fff", color: "var(--primary)" }}
            >
              Faire un don
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
