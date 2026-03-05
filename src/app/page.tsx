import Link from "next/link";
import Card from "@/components/Card";

const articles = [
    {
        image: "https://images.unsplash.com/photo-1504711434969-e33886168d6c?w=400&h=250&fit=crop",
        category: "Analyse",
        title: "Le retour des dimanches de Souria Houria : construire des ponts",
        excerpt:
            "Un regard approfondi sur les initiatives communautaires qui rapprochent les communautés syriennes en France.",
        date: "28 Février 2026",
    },
    {
        image: "https://images.unsplash.com/photo-1529070538774-1530d6923d0c?w=400&h=250&fit=crop",
        category: "Culture",
        title: "L'art contemporain syrien : une histoire de révolution visuelle",
        excerpt:
            "Comment les artistes syriens utilisent leur art comme outil de résistance et d'expression.",
        date: "25 Février 2026",
    },
    {
        image: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=400&h=250&fit=crop",
        category: "Droits humains",
        title: "Chronique de la révolte syrienne : des lieux et des hommes",
        excerpt:
            "Retour sur les lieux emblématiques de la révolution et les histoires des personnes qui les ont marqués.",
        date: "20 Février 2026",
    },
    {
        image: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=400&h=250&fit=crop",
        category: "Société",
        title: "L'intégration des réfugiés syriens : défis et réussites",
        excerpt:
            "Parcours de familles syriennes en France et les programmes qui facilitent leur intégration.",
        date: "18 Février 2026",
    },
    {
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=250&fit=crop",
        category: "Éducation",
        title: "Bourses Souria Houria : donner une chance à la jeunesse syrienne",
        excerpt:
            "Comment notre programme de bourses aide les étudiants syriens à accéder à l'enseignement supérieur.",
        date: "14 Février 2026",
    },
    {
        image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=400&h=250&fit=crop",
        category: "Plaidoyer",
        title: "Syrie au Conseil des droits de l'homme : bilan et perspectives",
        excerpt:
            "Analyse de la dernière session du Conseil des droits de l'homme sur la situation en Syrie.",
        date: "10 Février 2026",
    },
];

const events = [
    {
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop",
        category: "Conférence",
        title: "Construire des ponts pour l'avenir de la Syrie",
        excerpt:
            "Conférence sur les perspectives d'avenir et le rôle de la diaspora syrienne.",
        dateBadge: { day: "12", month: "Mar" },
        location: "📍 Paris, France",
    },
    {
        image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=250&fit=crop",
        category: "Festival",
        title: "Festival Syrien N'est Fait #5",
        excerpt:
            "Cinq jours de musique, cinéma, théâtre et débats autour de la culture syrienne.",
        dateBadge: { day: "25", month: "Avr" },
        location: "📍 Paris, France",
    },
    {
        image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=400&h=250&fit=crop",
        category: "Table ronde",
        title: "Droits humains et justice transitionnelle",
        excerpt:
            "Discussion avec des experts sur le processus de justice transitionnelle.",
        dateBadge: { day: "08", month: "Mai" },
        location: "📍 Lyon, France",
    },
];

export default function HomePage() {
    return (
        <>
            {/* Hero */}
            <section
                className="hero"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1573164574572-cb89e39749b4?w=1440&h=480&fit=crop')",
                }}
            >
                <div className="hero-content">
                    <h1>Toujours aux côtés du peuple syrien</h1>
                    <p>
                        Souria Houria œuvre pour la liberté, la dignité et les
                        droits du peuple syrien depuis 2011.
                    </p>
                    <Link href="/articles" className="btn btn-white-outline">
                        Découvrir nos actions
                    </Link>
                </div>
                <div className="hero-dots">
                    <button className="hero-dot active" />
                    <button className="hero-dot" />
                    <button className="hero-dot" />
                    <button className="hero-dot" />
                </div>
            </section>

            {/* Dernières publications */}
            <section className="section">
                <div className="container">
                    <div className="section-header">
                        <h2>Dernières publications</h2>
                        <Link href="/articles" className="see-all">
                            Voir tous les articles →
                        </Link>
                    </div>
                    <div className="card-grid">
                        {articles.map((a, i) => (
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

            {/* Évènements */}
            <section className="section section-alt">
                <div className="container">
                    <div className="section-header">
                        <h2>Évènements à venir</h2>
                        <Link href="/events" className="see-all">
                            Voir tous les évènements →
                        </Link>
                    </div>
                    <div className="card-grid">
                        {events.map((e, i) => (
                            <Card
                                key={i}
                                href="/events/example"
                                image={e.image}
                                category={e.category}
                                title={e.title}
                                excerpt={e.excerpt}
                                date={e.location}
                                dateBadge={e.dateBadge}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* About preview */}
            <section className="section">
                <div className="container">
                    <div className="section-header">
                        <h2>Qui sommes-nous</h2>
                    </div>
                    <p style={{ maxWidth: 720 }}>
                        Souria Houria — «&nbsp;Syrie Liberté&nbsp;» — est une
                        association française fondée en 2011 pour défendre les
                        droits du peuple syrien, soutenir les réfugiés et
                        promouvoir la culture syrienne. Nous sommes présents à
                        Paris et dans plusieurs villes de France.
                    </p>
                    <Link
                        href="/about"
                        className="btn btn-outline"
                        style={{ marginTop: "var(--space-5)" }}
                    >
                        En savoir plus
                    </Link>
                </div>
            </section>

            {/* CTA */}
            <section className="cta-band">
                <div className="container" style={{ textAlign: "center" }}>
                    <h2>Soutenez notre action</h2>
                    <p
                        style={{
                            maxWidth: 600,
                            margin: "var(--space-3) auto var(--space-6)",
                            opacity: 0.9,
                        }}
                    >
                        Chaque don compte. Aidez-nous à poursuivre notre mission
                        auprès du peuple syrien.
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
                            Faire un don
                        </Link>
                        <Link
                            href="/contact"
                            className="btn"
                            style={{
                                background: "#fff",
                                color: "var(--primary-500)",
                            }}
                        >
                            Nous contacter
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
