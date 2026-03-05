import type { Metadata } from "next";
import Card from "@/components/Card";
import Breadcrumbs from "@/components/Breadcrumbs";
import FilterBar from "@/components/FilterBar";

export const metadata: Metadata = {
    title: "Articles — Souria Houria",
};

const articles = [
    {
        image: "https://images.unsplash.com/photo-1504711434969-e33886168d6c?w=400&h=250&fit=crop",
        category: "Analyse",
        title: "Le retour des dimanches de Souria Houria : construire des ponts",
        excerpt:
            "Un regard approfondi sur les initiatives communautaires qui rapprochent les communautés syriennes.",
        date: "28 Février 2026",
    },
    {
        image: "https://images.unsplash.com/photo-1529070538774-1530d6923d0c?w=400&h=250&fit=crop",
        category: "Culture",
        title: "L'art contemporain syrien : une histoire de révolution visuelle",
        excerpt:
            "Comment les artistes syriens utilisent leur art comme outil de résistance.",
        date: "25 Février 2026",
    },
    {
        image: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=400&h=250&fit=crop",
        category: "Droits humains",
        title: "Chronique de la révolte syrienne : des lieux et des hommes",
        excerpt:
            "Retour sur les lieux emblématiques de la révolution syrienne.",
        date: "20 Février 2026",
    },
    {
        image: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=400&h=250&fit=crop",
        category: "Solidarité",
        title: "Les enjeux de la reconstruction en Syrie",
        excerpt:
            "Analyse des défis politiques, économiques et sociaux liés à la reconstruction.",
        date: "15 Février 2026",
    },
    {
        image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=400&h=250&fit=crop",
        category: "Politique",
        title: "La Syrie dans le jeu des nations",
        excerpt:
            "Comprendre les dynamiques géopolitiques qui influencent le conflit syrien.",
        date: "10 Février 2026",
    },
    {
        image: "https://images.unsplash.com/photo-1569025690315-085de5e43048?w=400&h=250&fit=crop",
        category: "Témoignage",
        title: "Réunion de soutien au peuple syrien",
        excerpt:
            "Compte-rendu de la dernière réunion organisée pour le soutien citoyen.",
        date: "05 Février 2026",
    },
    {
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c476?w=400&h=250&fit=crop",
        category: "Cinéma",
        title: "Still Recording : le documentaire qui a bouleversé le monde",
        excerpt:
            "Un film puissant sur la vie quotidienne dans les zones assiégées.",
        date: "01 Février 2026",
    },
    {
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop",
        category: "Culture",
        title: "Le Hezbollah, force de résistance ou de réaction ?",
        excerpt: "Analyse du rôle du Hezbollah dans le conflit syrien.",
        date: "28 Janvier 2026",
    },
    {
        image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=250&fit=crop",
        category: "Solidarité",
        title: "Les adresses utiles pour aider les réfugiés syriens",
        excerpt:
            "Guide pratique pour accompagner les réfugiés dans leur intégration.",
        date: "20 Janvier 2026",
    },
];

const filters = [
    "Tous",
    "Français",
    "العربية",
    "Analyse",
    "Culture",
    "Droits humains",
    "Solidarité",
];

export default function ArticlesPage() {
    return (
        <section className="section">
            <div className="container">
                <Breadcrumbs
                    items={[
                        { label: "Accueil", href: "/" },
                        { label: "Articles" },
                    ]}
                />

                <h1 className="mb-6">Articles</h1>

                <FilterBar filters={filters} />

                <div className="card-grid">
                    {articles.map((a, i) => (
                        <Card
                            key={i}
                            href={`/articles/${encodeURIComponent(a.title.toLowerCase().replace(/\s+/g, "-").slice(0, 40))}`}
                            image={a.image}
                            category={a.category}
                            title={a.title}
                            excerpt={a.excerpt}
                            date={a.date}
                        />
                    ))}
                </div>

                {/* Pagination */}
                <div className="pagination">
                    <span className="prev">← Préc</span>
                    <span className="active">1</span>
                    <a href="#">2</a>
                    <a href="#">3</a>
                    <a href="#" className="next">
                        Suiv →
                    </a>
                </div>
            </div>
        </section>
    );
}
