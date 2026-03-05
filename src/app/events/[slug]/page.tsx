"use client";

import type { Metadata } from "next";
import { useState } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Card from "@/components/Card";
import Lightbox from "@/components/Lightbox";

const galleryImages = [
  "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1559223607-180d0c3a4d58?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&h=600&fit=crop",
];

const galleryThumbs = galleryImages.map((url) =>
  url.replace("w=800&h=600", "w=400&h=300")
);

const relatedEvents = [
  {
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop",
    category: "Conférence",
    title: "Construire des ponts pour l'avenir de la Syrie",
    dateBadge: { day: "12", month: "Mar" },
    location: "📍 Paris, France",
  },
  {
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400&h=250&fit=crop",
    category: "Cinéma",
    title: "Projection : Eau argentée, Syrie autoportrait",
    dateBadge: { day: "15", month: "Juin" },
    location: "📍 Marseille, France",
  },
  {
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=400&h=250&fit=crop",
    category: "Exposition",
    title: "Art syrien contemporain : regards croisés",
    dateBadge: { day: "22", month: "Juin" },
    location: "📍 Paris, France",
  },
];

export default function EventDetailPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      {/* Breadcrumbs */}
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="container">
          <Breadcrumbs
            items={[
              { label: "Accueil", href: "/" },
              { label: "Évènements", href: "/events" },
              { label: "Festival Syrien N'est Fait #5" },
            ]}
          />
        </div>
      </section>

      {/* Event header */}
      <section className="section event-detail-header">
        <div className="container">
          <div className="event-detail-meta">
            <div className="event-date-block">
              <span className="event-date-block-day">25</span>
              <span className="event-date-block-month">Avr 2026</span>
            </div>
            <div className="event-detail-info">
              <span className="card-category">Festival</span>
              <h1>Festival Syrien N&apos;est Fait #5</h1>
              <div className="event-info-row">
                <span>🕐 18h00 — 23h00</span>
                <span>📍 Espace culturel, Paris</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero image */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div
            className="article-hero-img"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&h=500&fit=crop')",
              height: 400,
              borderRadius: "var(--radius-lg)",
            }}
          />
        </div>
      </section>

      {/* Event body */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <div className="article-body">
            <p className="lead">
              Souria Houria est fière de présenter la cinquième édition du
              Festival «&nbsp;Syrien N&apos;est Fait&nbsp;», un événement
              pluridisciplinaire célébrant la richesse de la culture syrienne et
              la créativité de sa diaspora.
            </p>

            <h2>Programme</h2>
            <p>
              Pendant cinq jours, le festival réunira des artistes, des
              cinéastes, des musiciens et des intellectuels de la communauté
              syrienne en France et en Europe. Au programme&nbsp;:
            </p>
            <ul>
              <li>
                <strong>Musique live</strong> — Concerts de oud et chants
                traditionnels revisités
              </li>
              <li>
                <strong>Projections cinéma</strong> — Sélection de documentaires
                et courts métrages syriens
              </li>
              <li>
                <strong>Théâtre</strong> — Deux pièces mises en scène par des
                artistes de la diaspora
              </li>
              <li>
                <strong>Tables rondes</strong> — Débats sur la culture comme
                vecteur de résilience
              </li>
              <li>
                <strong>Expositions</strong> — Peinture, photographie et
                installations
              </li>
              <li>
                <strong>Gastronomie</strong> — Stands de cuisine syrienne
                traditionnelle
              </li>
            </ul>

            <blockquote>
              <p>
                «&nbsp;La culture est un pont qui relie les peuples au-delà des
                frontières et des conflits. Ce festival est une fenêtre ouverte
                sur la Syrie que nous aimons.&nbsp;»
              </p>
            </blockquote>

            <h2>Informations pratiques</h2>
            <p>
              L&apos;événement est ouvert à toutes et à tous. L&apos;entrée est
              libre pour les conférences et les expositions. Des billets sont
              disponibles pour les concerts et les spectacles.
            </p>
            <p>
              L&apos;accès est possible en transports en commun&nbsp;: Métro
              ligne 7, station Place Monge. Un parking public est disponible à
              proximité.
            </p>

            <h2>Partenaires</h2>
            <p>
              Ce festival est organisé avec le soutien de la Mairie de Paris, de
              l&apos;Institut du Monde Arabe et de plusieurs associations de la
              société civile syrienne.
            </p>
          </div>

          {/* Map placeholder */}
          <div className="event-location" style={{ marginTop: "var(--space-8)" }}>
            <h3 style={{ marginBottom: "var(--space-4)" }}>📍 Lieu de l&apos;événement</h3>
            <div
              style={{
                background: "var(--neutral-100)",
                borderRadius: "var(--radius-lg)",
                height: 280,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--neutral-400)",
                fontSize: "1rem",
              }}
            >
              Carte interactive — Espace Culturel, 14 Rue de la Montagne
              Sainte-Geneviève, 75005 Paris
            </div>
          </div>

          {/* Share */}
          <div className="share-bar" style={{ marginTop: "var(--space-8)" }}>
            <span className="share-label">Partager :</span>
            <a href="#" className="share-link">Facebook</a>
            <a href="#" className="share-link">𝕏 (Twitter)</a>
            <a href="#" className="share-link">WhatsApp</a>
            <a href="#" className="share-link">Copier le lien</a>
          </div>
        </div>
      </section>

      {/* Photo gallery */}
      <section className="section section-alt">
        <div className="container">
          <h2 className="section-header">Galerie Photos</h2>
          <p
            style={{
              color: "var(--neutral-500)",
              marginBottom: "var(--space-6)",
              textAlign: "center",
            }}
          >
            Édition précédente — Festival Syrien N&apos;est Fait #4
          </p>
          <div className="gallery-grid">
            {galleryThumbs.map((src, i) => (
              <div
                key={i}
                className="gallery-item"
                onClick={() => setLightboxIndex(i)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setLightboxIndex(i)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`Gallery photo ${i + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={galleryImages}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}

      {/* Related events */}
      <section className="section">
        <div className="container">
          <h2 className="section-header">Autres évènements</h2>
          <div className="card-grid">
            {relatedEvents.map((e, i) => (
              <Card
                key={i}
                href="/events/example"
                image={e.image}
                category={e.category}
                title={e.title}
                date={e.location}
                dateBadge={e.dateBadge}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
