import Link from "next/link";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div>
                        <h3>Souria Houria</h3>
                        <ul>
                            <li>
                                <Link href="/about">Qui sommes-nous ?</Link>
                            </li>
                            <li>
                                <Link href="#">Devenir membre</Link>
                            </li>
                            <li>
                                <Link href="/contact">Contact</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3>Aide aux réfugiés</h3>
                        <ul>
                            <li>
                                <Link href="#">Adresses utiles</Link>
                            </li>
                            <li>
                                <Link href="#">Cours de français</Link>
                            </li>
                            <li>
                                <Link href="#">Aide juridique</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3>Nos médias</h3>
                        <ul>
                            <li>
                                <Link href="/articles">Articles</Link>
                            </li>
                            <li>
                                <Link href="/events">Évènements</Link>
                            </li>
                            <li>
                                <Link href="#">Vidéos</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3>Newsletter</h3>
                        <p
                            style={{
                                color: "rgba(255,255,255,0.7)",
                                fontSize: "0.875rem",
                            }}
                        >
                            Recevez nos dernières actualités.
                        </p>
                        <form
                            className="newsletter-form"
                            action="#"
                            style={{ marginTop: "var(--space-4)" }}
                        >
                            <input type="email" placeholder="Email" />
                            <button type="submit">OK</button>
                        </form>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>
                        © 2026 Souria Houria — Syrie Liberté. Tous droits
                        réservés.
                    </p>
                    <div className="footer-social">
                        <Link href="#">f</Link>
                        <Link href="#">𝕏</Link>
                        <Link href="#">▶</Link>
                        <Link href="#">◻</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
