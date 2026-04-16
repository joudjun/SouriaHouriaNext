"use client";

import { useEffect, useRef } from "react";

export default function SyriaMapHero() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        let cancelled = false;
        const timers: ReturnType<typeof setTimeout>[] = [];

        fetch("/syria-map-hero.svg")
            .then((r) => r.text())
            .then((svgText) => {
                if (cancelled) return;
                el.innerHTML = svgText;
                const svg = el.querySelector("svg");
                if (!svg) return;
                svg.style.width = "100%";
                svg.style.height = "100%";

                const paths = svg.querySelectorAll<SVGPathElement>(".gov");
                if (paths.length === 0) return;

                // Each governorate glows independently on its own random schedule
                paths.forEach((path) => {
                    function scheduleGlow() {
                        if (cancelled) return;
                        // Random delay before next glow: 0.5s – 8s (wide range)
                        const delay = 500 + Math.random() * 7500;
                        const timer = setTimeout(() => {
                            if (cancelled) return;
                            // Random blink speed: 0.2s – 1.2s
                            const blinkSpeed = 0.2 + Math.random() * 1.0;
                            path.style.transition =
                                `fill ${blinkSpeed}s ease-in-out, stroke ${blinkSpeed}s ease-in-out`;
                            path.style.fill = "rgba(227,1,58,0.15)";
                            path.style.stroke = "rgba(255,255,255,0.3)";

                            // Stay lit for 0.2–1s then fade out
                            const offTimer = setTimeout(() => {
                                if (cancelled) return;
                                path.style.fill = "rgba(255,255,255,0)";
                                path.style.stroke = "rgba(255,255,255,0.1)";
                                scheduleGlow();
                            }, 200 + Math.random() * 800);
                            timers.push(offTimer);
                        }, delay);
                        timers.push(timer);
                    }

                    // Stagger initial start: 0–3s
                    const initDelay = Math.random() * 3000;
                    const initTimer = setTimeout(() => {
                        if (cancelled) return;
                        scheduleGlow();
                    }, initDelay);
                    timers.push(initTimer);
                });
            });

        return () => {
            cancelled = true;
            timers.forEach(clearTimeout);
        };
    }, []);

    return <div ref={containerRef} className="hero-map" />;
}
