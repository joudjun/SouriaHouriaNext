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

                // Spark glow filter
                const sparkFilter = document.createElementNS(NS, "filter");
                sparkFilter.setAttribute("id", "spark");
                sparkFilter.setAttribute("x", "-100%");
                sparkFilter.setAttribute("y", "-100%");
                sparkFilter.setAttribute("width", "300%");
                sparkFilter.setAttribute("height", "300%");
                const sparkBlur = document.createElementNS(NS, "feGaussianBlur");
                sparkBlur.setAttribute("stdDeviation", "1.5");
                sparkBlur.setAttribute("result", "blur");
                const sparkMerge = document.createElementNS(NS, "feMerge");
                const smn1 = document.createElementNS(NS, "feMergeNode");
                smn1.setAttribute("in", "blur");
                const smn2 = document.createElementNS(NS, "feMergeNode");
                smn2.setAttribute("in", "SourceGraphic");
                sparkMerge.append(smn1, smn2);
                sparkFilter.append(sparkBlur, sparkMerge);
                defs!.append(sparkFilter);

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

                // ══════════════════════════════════════
                // FIREWORKS
                // ══════════════════════════════════════
                const GRAVITY = 0.04;
                const sparkColors = [
                    "#e3013a", "#ff5050", "#ffa03c", "#ffdc64",
                    "#ffffff", "#ff6b9d", "#ffd700",
                ];

                interface Spark {
                    el: SVGCircleElement;
                    trail: SVGCircleElement[];
                    x: number; y: number;
                    vx: number; vy: number;
                    life: number; maxLife: number;
                    r: number;
                }
                interface Rocket {
                    el: SVGCircleElement;
                    trail: SVGCircleElement[];
                    x: number; y: number;
                    vy: number;
                    targetY: number;
                }

                const sparks: Spark[] = [];
                const rockets: Rocket[] = [];

                function getCenter(p: SVGPathElement) {
                    const b = p.getBBox();
                    return { x: b.x + b.width / 2, y: b.y + b.height / 2 };
                }

                function explode(x: number, y: number) {
                    const count = 16 + Math.floor(Math.random() * 12);
                    const baseColor = sparkColors[Math.floor(Math.random() * sparkColors.length)];
                    const palette = [baseColor, baseColor, "#ffffff", "#ffd700"];

                    for (let j = 0; j < count; j++) {
                        // Spread evenly in a sphere, with slight randomness
                        const angle = (Math.PI * 2 * j) / count + (Math.random() - 0.5) * 0.4;
                        const speed = 1.0 + Math.random() * 2.5;

                        const circle = document.createElementNS(NS, "circle");
                        const r = 0.5 + Math.random() * 1.0;
                        const color = palette[Math.floor(Math.random() * palette.length)];
                        circle.setAttribute("r", String(r));
                        circle.setAttribute("fill", color);
                        circle.setAttribute("filter", "url(#spark)");
                        circle.setAttribute("cx", String(x));
                        circle.setAttribute("cy", String(y));
                        svg.appendChild(circle);

                        sparks.push({
                            el: circle, trail: [],
                            x, y,
                            vx: Math.cos(angle) * speed,
                            vy: Math.sin(angle) * speed - 0.8,
                            life: 0,
                            maxLife: 50 + Math.random() * 40,
                            r,
                        });
                    }
                }

                function launchRocket(pathIdx: number) {
                    const center = getCenter(paths[pathIdx]);
                    const x = center.x + (Math.random() - 0.5) * 15;

                    const rocketEl = document.createElementNS(NS, "circle");
                    rocketEl.setAttribute("r", "1");
                    rocketEl.setAttribute("fill", "#ffffff");
                    rocketEl.setAttribute("filter", "url(#spark)");
                    rocketEl.setAttribute("cx", String(x));
                    rocketEl.setAttribute("cy", String(center.y));
                    svg.appendChild(rocketEl);

                    rockets.push({
                        el: rocketEl, trail: [],
                        x, y: center.y,
                        vy: -(2.5 + Math.random() * 2.5),
                        targetY: center.y - 50 - Math.random() * 70,
                    });
                }

                function tickFireworks() {
                    if (cancelled) return;

                    // Rockets
                    for (let i = rockets.length - 1; i >= 0; i--) {
                        const r = rockets[i];

                        // Trail
                        const dot = document.createElementNS(NS, "circle");
                        dot.setAttribute("r", "0.5");
                        dot.setAttribute("fill", "rgba(255,220,100,0.5)");
                        dot.setAttribute("cx", String(r.x));
                        dot.setAttribute("cy", String(r.y));
                        svg.appendChild(dot);
                        r.trail.push(dot);
                        if (r.trail.length > 10) {
                            r.trail.shift()!.remove();
                        }
                        for (let t = 0; t < r.trail.length; t++) {
                            r.trail[t].setAttribute("opacity",
                                String((t + 1) / r.trail.length * 0.4));
                        }

                        r.y += r.vy;
                        r.x += (Math.random() - 0.5) * 0.4;
                        r.vy *= 0.99;
                        r.el.setAttribute("cx", String(r.x));
                        r.el.setAttribute("cy", String(r.y));

                        if (r.y <= r.targetY) {
                            r.el.remove();
                            r.trail.forEach(t => t.remove());
                            explode(r.x, r.y);
                            rockets.splice(i, 1);
                        }
                    }

                    // Sparks
                    for (let i = sparks.length - 1; i >= 0; i--) {
                        const s = sparks[i];
                        s.life++;
                        const progress = s.life / s.maxLife;

                        s.vy += GRAVITY;
                        s.vx *= 0.98;
                        s.vy *= 0.98;
                        s.x += s.vx;
                        s.y += s.vy;

                        // Trail dots
                        if (s.life % 3 === 0 && progress < 0.6) {
                            const dot = document.createElementNS(NS, "circle");
                            dot.setAttribute("r", String(s.r * 0.3));
                            dot.setAttribute("fill", s.el.getAttribute("fill")!);
                            dot.setAttribute("opacity", String((1 - progress) * 0.25));
                            dot.setAttribute("cx", String(s.x));
                            dot.setAttribute("cy", String(s.y));
                            svg.appendChild(dot);
                            s.trail.push(dot);
                            if (s.trail.length > 3) {
                                s.trail.shift()!.remove();
                            }
                        }

                        const opacity = Math.max(0, 1 - progress);
                        const scale = 1 - progress * 0.5;
                        s.el.setAttribute("cx", String(s.x));
                        s.el.setAttribute("cy", String(s.y));
                        s.el.setAttribute("r", String(s.r * scale));
                        s.el.setAttribute("opacity", String(opacity));

                        if (s.life >= s.maxLife) {
                            s.el.remove();
                            s.trail.forEach(t => t.remove());
                            sparks.splice(i, 1);
                        }
                    }

                    rafs.push(requestAnimationFrame(tickFireworks));
                }
                rafs.push(requestAnimationFrame(tickFireworks));

                // Schedule firework launches
                function scheduleFirework() {
                    if (cancelled) return;
                    const delay = 1500 + Math.random() * 3000;
                    const timer = setTimeout(() => {
                        if (cancelled) return;
                        launchRocket(Math.floor(Math.random() * paths.length));
                        // Sometimes a second one right after
                        if (Math.random() > 0.5) {
                            const t2 = setTimeout(() => {
                                if (cancelled) return;
                                launchRocket(Math.floor(Math.random() * paths.length));
                            }, 200 + Math.random() * 500);
                            timers.push(t2);
                        }
                        scheduleFirework();
                    }, delay);
                    timers.push(timer);
                }

                // Initial burst
                for (let k = 0; k < 2; k++) {
                    const t = setTimeout(() => {
                        if (cancelled) return;
                        launchRocket(Math.floor(Math.random() * paths.length));
                    }, 800 + k * 1000);
                    timers.push(t);
                }
                scheduleFirework();
            });

        return () => {
            cancelled = true;
            timers.forEach(clearTimeout);
            rafs.forEach(cancelAnimationFrame);
        };
    }, []);

    return <div ref={containerRef} className="hero-map" />;
}
