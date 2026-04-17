"use client";

import { useEffect, useRef } from "react";

export default function SyriaMapHero() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        let cancelled = false;
        const timers: ReturnType<typeof setTimeout>[] = [];
        const rafs: number[] = [];

        fetch("/syria-map-hero.svg")
            .then((r) => r.text())
            .then((svgText) => {
                if (cancelled) return;
                el.innerHTML = svgText;
                const svgEl = el.querySelector("svg");
                if (!svgEl) return;
                const svg = svgEl;
                svg.style.width = "100%";
                svg.style.height = "100%";
                svg.style.overflow = "visible";

                const NS = "http://www.w3.org/2000/svg";
                let defs = svg.querySelector("defs");
                if (!defs) {
                    defs = document.createElementNS(NS, "defs");
                    svg.prepend(defs);
                }

                const paths = svg.querySelectorAll<SVGPathElement>(".gov");
                if (paths.length === 0) return;

                // ══════════════════════════════════════
                // BLINKING SWEEP (existing)
                // ══════════════════════════════════════
                paths.forEach((path, i) => {
                    path.style.fill = "";
                    path.removeAttribute("style");
                    path.setAttribute("stroke", "rgba(255,255,255,0.1)");
                    path.setAttribute("stroke-width", "0.5");

                    const gradId = `glow-${i}`;
                    const grad = document.createElementNS(NS, "linearGradient");
                    grad.setAttribute("id", gradId);
                    grad.setAttribute("gradientUnits", "objectBoundingBox");

                    const stop1 = document.createElementNS(NS, "stop");
                    stop1.setAttribute("offset", "0%");
                    stop1.setAttribute("stop-color", "rgba(227,1,58,0.2)");
                    stop1.setAttribute("stop-opacity", "0");

                    const stop2 = document.createElementNS(NS, "stop");
                    stop2.setAttribute("offset", "50%");
                    stop2.setAttribute("stop-color", "rgba(227,1,58,0.2)");
                    stop2.setAttribute("stop-opacity", "0");

                    const stop3 = document.createElementNS(NS, "stop");
                    stop3.setAttribute("offset", "100%");
                    stop3.setAttribute("stop-color", "rgba(227,1,58,0.2)");
                    stop3.setAttribute("stop-opacity", "0");

                    grad.append(stop1, stop2, stop3);
                    defs!.append(grad);
                    path.setAttribute("fill", `url(#${gradId})`);

                    let angle = Math.random() * Math.PI * 2;

                    function animateSweep(duration: number, onDone: () => void) {
                        angle += (Math.random() - 0.5) * (Math.PI / 3);
                        const x1 = 50 + Math.cos(angle) * 50;
                        const y1 = 50 + Math.sin(angle) * 50;
                        const x2 = 50 - Math.cos(angle) * 50;
                        const y2 = 50 - Math.sin(angle) * 50;
                        grad.setAttribute("x1", `${x1}%`);
                        grad.setAttribute("y1", `${y1}%`);
                        grad.setAttribute("x2", `${x2}%`);
                        grad.setAttribute("y2", `${y2}%`);

                        const startTime = performance.now();

                        function tick(now: number) {
                            if (cancelled) return;
                            const progress = Math.min((now - startTime) / duration, 1);
                            const center = -20 + progress * 140;
                            const bandWidth = 40;
                            const leading = Math.max(0, Math.min(100, center - bandWidth));
                            const mid = Math.max(0, Math.min(100, center));
                            const trailing = Math.max(0, Math.min(100, center + bandWidth));
                            const intensity = progress < 0.5
                                ? progress / 0.5
                                : (1 - progress) / 0.5;

                            stop1.setAttribute("offset", `${leading}%`);
                            stop1.setAttribute("stop-opacity", "0");
                            stop2.setAttribute("offset", `${mid}%`);
                            stop2.setAttribute("stop-opacity", String(intensity));
                            stop3.setAttribute("offset", `${trailing}%`);
                            stop3.setAttribute("stop-opacity", "0");

                            if (progress < 1) {
                                rafs.push(requestAnimationFrame(tick));
                            } else {
                                stop1.setAttribute("stop-opacity", "0");
                                stop2.setAttribute("stop-opacity", "0");
                                stop3.setAttribute("stop-opacity", "0");
                                onDone();
                            }
                        }
                        rafs.push(requestAnimationFrame(tick));
                    }

                    function scheduleGlow() {
                        if (cancelled) return;
                        const delay = 500 + Math.random() * 7500;
                        const timer = setTimeout(() => {
                            if (cancelled) return;
                            animateSweep(600 + Math.random() * 1400, () => scheduleGlow());
                        }, delay);
                        timers.push(timer);
                    }

                    const initTimer = setTimeout(() => {
                        if (cancelled) return;
                        scheduleGlow();
                    }, Math.random() * 3000);
                    timers.push(initTimer);
                });

            });

        return () => {
            cancelled = true;
            timers.forEach(clearTimeout);
            rafs.forEach(cancelAnimationFrame);
        };
    }, []);

    return <div ref={containerRef} className="hero-map" />;
}
