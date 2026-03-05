"use client";

import { useState, useEffect, useCallback } from "react";

interface LightboxProps {
    images: string[];
    initialIndex?: number;
    onClose: () => void;
}

export default function Lightbox({
    images,
    initialIndex = 0,
    onClose,
}: LightboxProps) {
    const [index, setIndex] = useState(initialIndex);

    const next = useCallback(() => {
        setIndex((i) => (i + 1) % images.length);
    }, [images.length]);

    const prev = useCallback(() => {
        setIndex((i) => (i - 1 + images.length) % images.length);
    }, [images.length]);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowRight") next();
            if (e.key === "ArrowLeft") prev();
        };
        document.addEventListener("keydown", handleKey);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", handleKey);
            document.body.style.overflow = "";
        };
    }, [onClose, next, prev]);

    return (
        <div
            className="lightbox active"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <button className="lightbox-close" onClick={onClose}>
                ✕
            </button>
            <button className="lightbox-prev" onClick={prev}>
                ‹
            </button>
            <img className="lightbox-img" src={images[index]} alt="" />
            <button className="lightbox-next" onClick={next}>
                ›
            </button>
            <div className="lightbox-counter">
                {index + 1} / {images.length}
            </div>
        </div>
    );
}
