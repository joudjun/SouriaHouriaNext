import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import Card from "@/components/Card";

export const metadata: Metadata = {
    title: "Le retour des dimanches de Souria Houria — Souria Houria",
};

const relatedArticles = [
    {
        image: "https://images.unsplash.com/photo-1529070538774-1530d6923d0c?w=400&h=250&fit=crop",
        category: "Culture",
        title: "L'art contemporain syrien : une révolution visuelle",
        excerpt:
            "Comment les artistes utilisent leur art comme outil de résistance.",
        date: "25 Février 2026",
    },
    {
        image: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=400&h=250&fit=crop",
        category: "Droits humains",
        title: "Chronique de la révolte syrienne",
        excerpt: "Retour sur les lieux emblématiques de la révolution.",
        date: "20 Février 2026",
    },
    {
        image: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=400&h=250&fit=crop",
        category: "Solidarité",
        title: "Les enjeux de la reconstruction en Syrie",
        excerpt: "Analyse des défis liés à la reconstruction du pays.",
        date: "15 Février 2026",
    },
];

export default function ArticleDetailPage() {
    return (
        <>
            <section className="section">
                <div className="container">
                    <Breadcrumbs
                        items={[
                            { label: "Accueil", href: "/" },
                            { label: "Articles", href: "/articles" },
                            {
                                label: "Le retour des dimanches de Souria Houria",
                            },
                        ]}
                    />

                    {/* Article meta */}
                    <div className="article-meta">
                        <span className="card-category">Analyse</span>
                        <span className="dot" />
                        <span
                            className="card-date"
                            style={{ fontSize: "0.875rem" }}
                        >
                            28 Février 2026
                        </span>
                    </div>

                    {/* Title */}
                    <h1
                        style={{
                            marginBottom: "var(--space-6)",
                            maxWidth: 800,
                        }}
                    >
                        Le retour des dimanches de Souria Houria : construire
                        des ponts pour l&apos;avenir
                    </h1>

                    {/* Featured image */}
                    <div
                        className="article-hero-img"
                        style={{
                            background:
                                "var(--bg-surface-alt) url('https://images.unsplash.com/photo-1504711434969-e33886168d6c?w=1200&h=520&fit=crop') center/cover",
                        }}
                    />

                    {/* Body */}
                    <div className="article-body">
                        <p>
                            Depuis sa création en 2011, l&apos;association
                            Souria Houria (Syrie Liberté) s&apos;est toujours
                            engagée à faire entendre la voix du peuple syrien en
                            France et en Europe. Les «&nbsp;Dimanches de Souria
                            Houria&nbsp;» sont un format emblématique de cet
                            engagement.
                        </p>

                        <p>
                            Ces rencontres dominicales, organisées régulièrement
                            depuis plusieurs années, réunissent des
                            intellectuels, journalistes, universitaires et
                            militants pour des échanges approfondis sur la
                            situation en Syrie et les perspectives d&apos;avenir
                            pour le pays.
                        </p>

                        <blockquote>
                            «&nbsp;Notre objectif est de créer des espaces de
                            dialogue où les voix syriennes peuvent
                            s&apos;exprimer librement, loin du fracas des armes
                            et des manœuvres géopolitiques.&nbsp;»
                        </blockquote>

                        <h2
                            style={{
                                color: "var(--primary-500)",
                                fontSize: "1.5rem",
                                margin: "var(--space-8) 0 var(--space-4)",
                            }}
                        >
                            Un format renouvelé
                        </h2>

                        <p>
                            Pour cette nouvelle saison, les Dimanches de Souria
                            Houria adoptent un format renouvelé, avec une
                            alternance entre conférences-débats, projections de
                            documentaires et rencontres avec des auteurs.
                            L&apos;objectif est d&apos;élargir le public et de
                            toucher aussi bien la diaspora syrienne que le grand
                            public français.
                        </p>

                        <p>
                            Les thèmes abordés couvrent un large spectre&nbsp;:
                            de l&apos;actualité politique syrienne aux questions
                            de droits humains, en passant par la culture,
                            l&apos;art et la littérature syriennes
                            contemporaines. Chaque événement est pensé comme un
                            pont entre les cultures et les communautés.
                        </p>

                        <h2
                            style={{
                                color: "var(--primary-500)",
                                fontSize: "1.5rem",
                                margin: "var(--space-8) 0 var(--space-4)",
                            }}
                        >
                            Construire des ponts
                        </h2>

                        <p>
                            La métaphore du pont est centrale dans la démarche
                            de Souria Houria. Il s&apos;agit de construire des
                            ponts entre le passé et l&apos;avenir, entre la
                            Syrie et la France, entre les générations. Les
                            jeunes Syriens de France, nés ou arrivés pendant le
                            conflit, sont particulièrement au cœur de cette
                            initiative.
                        </p>

                        <p>
                            Des partenariats avec des institutions culturelles
                            françaises permettent d&apos;amplifier la portée de
                            ces événements. La collaboration avec des médias
                            comme Libération, Mediapart et France Culture
                            garantit une couverture médiatique de qualité.
                        </p>

                        {/* Source */}
                        <div className="source-block">
                            <strong>Source :</strong>{" "}
                            <a href="#">Souria Houria — Communiqué de presse</a>
                        </div>

                        {/* Share */}
                        <div className="share-bar">
                            <span>Partager :</span>
                            <button className="share-btn" title="Facebook">
                                f
                            </button>
                            <button className="share-btn" title="X / Twitter">
                                𝕏
                            </button>
                            <button className="share-btn" title="WhatsApp">
                                w
                            </button>
                            <button
                                className="share-btn"
                                title="Copier le lien"
                            >
                                🔗
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Articles */}
            <section className="section section-alt">
                <div className="container">
                    <div className="section-header">
                        <h2>Articles liés</h2>
                    </div>
                    <div className="card-grid">
                        {relatedArticles.map((a, i) => (
                            <Card
                                key={i}
                                href="/articles/example"
                                image={a.image}
                                category={a.category}
                                title={a.title}
                                excerpt={a.excerpt}
                                date={a.date}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
