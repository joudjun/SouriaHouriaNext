"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";
import { localePath, t, formatDate } from "@/libs/locale";
import type { StrapiArticle, StrapiEvent, StrapiPressRelease } from "@/types";

interface Results {
    articles: StrapiArticle[];
    events: StrapiEvent[];
    pressReleases: StrapiPressRelease[];
}

const EMPTY: Results = { articles: [], events: [], pressReleases: [] };

export default function SearchBox() {
    const { locale } = useTheme();
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Results>(EMPTY);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const abortRef = useRef<AbortController | null>(null);

    // Close on navigation
    useEffect(() => {
        setOpen(false);
        setQuery("");
        setResults(EMPTY);
    }, [pathname]);

    // Focus input when opened
    useEffect(() => {
        if (open) inputRef.current?.focus();
    }, [open]);

    // Close on Escape or click outside
    useEffect(() => {
        if (!open) return;
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        const handleClick = (e: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target as Node)
            ) {
                setOpen(false);
            }
        };
        document.addEventListener("keydown", handleKey);
        document.addEventListener("mousedown", handleClick);
        return () => {
            document.removeEventListener("keydown", handleKey);
            document.removeEventListener("mousedown", handleClick);
        };
    }, [open]);

    // Debounced search
    const fetchResults = useCallback(
        (q: string) => {
            abortRef.current?.abort();
            if (q.length < 2) {
                setResults(EMPTY);
                setLoading(false);
                return;
            }
            setLoading(true);
            const controller = new AbortController();
            abortRef.current = controller;
            fetch(
                `/api/search?q=${encodeURIComponent(q)}&locale=${locale}`,
                { signal: controller.signal },
            )
                .then((r) => r.json())
                .then((data: Results) => {
                    setResults(data);
                    setLoading(false);
                })
                .catch((err) => {
                    if (err.name !== "AbortError") setLoading(false);
                });
        },
        [locale],
    );

    useEffect(() => {
        const timer = setTimeout(() => fetchResults(query), 300);
        return () => clearTimeout(timer);
    }, [query, fetchResults]);

    const hasResults =
        results.articles.length > 0 ||
        results.events.length > 0 ||
        results.pressReleases.length > 0;

    const showDropdown = open && query.length >= 2;

    return (
        <div className="search-container" ref={containerRef}>
            {!open ? (
                <button
                    className="toggle-btn"
                    onClick={() => setOpen(true)}
                    aria-label={t(locale, "search")}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                </button>
            ) : (
                <div className="search-input-wrapper">
                    <input
                        ref={inputRef}
                        type="text"
                        className="search-input"
                        placeholder={t(locale, "searchPlaceholder")}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && query.length >= 2) {
                                setOpen(false);
                                window.location.href = localePath(
                                    locale,
                                    `/search?q=${encodeURIComponent(query)}`,
                                );
                            }
                        }}
                    />
                    <button
                        className="search-close"
                        onClick={() => setOpen(false)}
                        aria-label="Close"
                    >
                        ✕
                    </button>
                </div>
            )}

            {showDropdown && (
                <div className="search-dropdown">
                    {loading && (
                        <div className="search-loading">
                            <span className="search-spinner" />
                        </div>
                    )}

                    {!loading && !hasResults && (
                        <div className="search-empty">
                            {t(locale, "noResults")}
                        </div>
                    )}

                    {!loading && hasResults && (
                        <>
                            {results.pressReleases.length > 0 && (
                                <SearchSection
                                    label={t(locale, "pressReleases")}
                                    items={results.pressReleases.map((pr) => ({
                                        href: localePath(
                                            locale,
                                            `/press-releases/${pr.slug}`,
                                        ),
                                        title: pr.title,
                                        date: formatDate(pr.createdAt, locale),
                                    }))}
                                />
                            )}
                            {results.events.length > 0 && (
                                <SearchSection
                                    label={t(locale, "events")}
                                    items={results.events.map((ev) => ({
                                        href: localePath(
                                            locale,
                                            `/events/${ev.slug}`,
                                        ),
                                        title: ev.title,
                                        date: ev.dateStart
                                            ? formatDate(ev.dateStart, locale)
                                            : formatDate(ev.createdAt, locale),
                                    }))}
                                />
                            )}
                            {results.articles.length > 0 && (
                                <SearchSection
                                    label={t(locale, "articles")}
                                    items={results.articles.map((a) => ({
                                        href: localePath(
                                            locale,
                                            `/articles/${a.slug}`,
                                        ),
                                        title: a.title,
                                        date: formatDate(a.createdAt, locale),
                                    }))}
                                />
                            )}
                            <Link
                                href={localePath(
                                    locale,
                                    `/search?q=${encodeURIComponent(query)}`,
                                )}
                                className="search-see-all"
                            >
                                {t(locale, "seeAllResults")}
                            </Link>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

function SearchSection({
    label,
    items,
}: {
    label: string;
    items: { href: string; title: string; date: string }[];
}) {
    return (
        <div className="search-section">
            <div className="search-section-label">{label}</div>
            {items.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className="search-result"
                >
                    <span className="search-result-title">{item.title}</span>
                    <span className="search-result-date">{item.date}</span>
                </Link>
            ))}
        </div>
    );
}
