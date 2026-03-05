import type { Metadata } from "next";
import Card from "@/components/Card";
import Breadcrumbs from "@/components/Breadcrumbs";
import FilterBar from "@/components/FilterBar";

export const metadata: Metadata = {
    title: "Évènements — Souria Houria",
};

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
    {
        image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400&h=250&fit=crop",
        category: "Cinéma",
        title: "Projection : Eau argentée, Syrie autoportrait",
        excerpt:
            "Projection suivie d'un débat avec le réalisateur Ossama Mohammed.",
        dateBadge: { day: "15", month: "Juin" },
        location: "📍 Marseille, France",
    },
    {
        image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=400&h=250&fit=crop",
        category: "Exposition",
        title: "Art syrien contemporain : regards croisés",
        excerpt:
            "Exposition collective de cinq artistes syriens de la diaspora.",
        dateBadge: { day: "22", month: "Juin" },
        location: "📍 Paris, France",
    },
    {
        image: "https://images.unsplash.com/photo-1559223607-180d0c3a4d58?w=400&h=250&fit=crop",
        category: "Conférence",
        title: "Bazar de Noël solidaire pour la Syrie",
        excerpt: "Vente d'objets artisanaux syriens au profit des réfugiés.",
        dateBadge: { day: "10", month: "Juil" },
        location: "📍 Paris, France",
    },
];

export default function EventsPage() {
    return (
        <section className="section">
            <div className="container">
                <Breadcrumbs
                    items={[
                        { label: "Accueil", href: "/" },
                        { label: "Évènements" },
                    ]}
                />

                <h1 className="mb-6">Évènements</h1>

                <FilterBar filters={["À venir", "Passés"]} />

                <div className="card-grid">
                    {events.map((e, i) => (
                        <Card
                            key={i}
                            href={`/events/${encodeURIComponent(e.title.toLowerCase().replace(/\s+/g, "-").slice(0, 40))}`}
                            image={e.image}
                            category={e.category}
                            title={e.title}
                            excerpt={e.excerpt}
                            date={e.location}
                            dateBadge={e.dateBadge}
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
