import Link from "next/link";

export default function NotFound() {
  return (
    <section className="error-page">
      <div className="container">
        <div className="error-content">
          <div className="error-code">404</div>
          <h1 className="error-title">Page introuvable</h1>
          <p className="error-message">
            Désolé, la page que vous recherchez n&apos;existe pas ou a été
            déplacée.
          </p>
          <div className="error-actions">
            <Link href="/" className="btn btn-primary">
              Retour à l&apos;accueil
            </Link>
            <Link href="/contact" className="btn btn-outline">
              Contactez-nous
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
