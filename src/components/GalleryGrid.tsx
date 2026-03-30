"use client";

import { useEffect, useState } from "react";

interface GalleryGridProps {
    images: { url: string; alt: string }[];
}

export default function GalleryGrid({ images }: GalleryGridProps) {
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    useEffect(() => {
        if (lightboxIndex === null) return;
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setLightboxIndex(null);
            if (e.key === "ArrowRight")
                setLightboxIndex((i) =>
                    i !== null ? (i + 1) % images.length : null,
                );
            if (e.key === "ArrowLeft")
                setLightboxIndex((i) =>
                    i !== null
                        ? (i - 1 + images.length) % images.length
                        : null,
                );
        };
        document.addEventListener("keydown", handleKey);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", handleKey);
            document.body.style.overflow = "";
        };
    }, [lightboxIndex, images.length]);

    return (
        <>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                    gap: "var(--space-4)",
                }}
            >
                {images.map((img, i) => (
                    <button
                        key={i}
                        onClick={() => setLightboxIndex(i)}
                        style={{
                            border: "none",
                            padding: 0,
                            cursor: "pointer",
                            borderRadius: "var(--radius-md)",
                            overflow: "hidden",
                            aspectRatio: "4/3",
                            background: "var(--neutral-100)",
                        }}
                    >
                        <img
                            src={img.url}
                            alt={img.alt}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                display: "block",
                            }}
                        />
                    </button>
                ))}
            </div>

            {lightboxIndex !== null && (
                <div
                    className="lightbox active"
                    onClick={(e) =>
                        e.target === e.currentTarget && setLightboxIndex(null)
                    }
                >
                    <button
                        className="lightbox-close"
                        onClick={() => setLightboxIndex(null)}
                    >
                        ✕
                    </button>
                    <button
                        className="lightbox-prev"
                        onClick={() =>
                            setLightboxIndex(
                                (lightboxIndex - 1 + images.length) %
                                    images.length,
                            )
                        }
                    >
                        ‹
                    </button>
                    <img
                        className="lightbox-img"
                        src={images[lightboxIndex].url}
                        alt={images[lightboxIndex].alt}
                    />
                    <button
                        className="lightbox-next"
                        onClick={() =>
                            setLightboxIndex(
                                (lightboxIndex + 1) % images.length,
                            )
                        }
                    >
                        ›
                    </button>
                    <div className="lightbox-counter">
                        {lightboxIndex + 1} / {images.length}
                    </div>
                </div>
            )}
        </>
    );
}
