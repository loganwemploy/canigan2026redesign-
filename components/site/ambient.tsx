"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * The Emberleaf atmosphere, in Canigan greens: a grain overlay, a fixed leaf
 * wreath that fades as you scroll, falling leaves, a cursor glow and a reading
 * progress bar. It also drives two pointer behaviours for the whole site, via
 * event delegation, so individual components only have to opt in with a data
 * attribute:
 *   [data-tilt]    3D card tilt
 *   [data-magnet]  buttons that lean toward the cursor
 *
 * Everything here is decorative (aria-hidden, pointer-events: none) and the
 * motion is skipped under prefers-reduced-motion.
 */

/** Small seeded PRNG so server and client render the exact same leaves. */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const KINDS = ["maple", "birch", "oval", "maple", "birch"] as const;
const COLORS = ["#2f7d4f", "#8cc24a", "#22533a", "#5aa469", "#a8c94a", "#3d8a5a", "#6fae4f"];
const LEAF_COUNT = 16;

const LEAVES = (() => {
  const rnd = mulberry32(2026);
  return Array.from({ length: LEAF_COUNT }, (_, i) => ({
    kind: KINDS[i % KINDS.length],
    color: COLORS[i % COLORS.length],
    left: +(rnd() * 100).toFixed(1),
    size: 18 + Math.round(rnd() * 26),
    duration: +(14 + rnd() * 14).toFixed(1),
    delay: -+(rnd() * 20).toFixed(1),
  }));
})();

type Mover = { x: (v: number) => void; y: (v: number) => void };
type Tilter = { rx: (v: number) => void; ry: (v: number) => void };

export function EmberAmbient() {
  const bar = useRef<HTMLDivElement>(null);
  const bg = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canHover = window.matchMedia("(hover: hover)").matches;

    /* ── Scroll: reading progress + wreath fade/zoom ── */
    let ticking = false;
    const update = () => {
      ticking = false;
      const y = window.scrollY || 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar.current) {
        bar.current.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
      }
      if (bg.current) {
        const t = Math.min(1, y / 360);
        bg.current.style.setProperty("--fo", (1 - (1 - 0.24) * t).toFixed(3));
        bg.current.style.setProperty("--sc", (1 + Math.min(0.14, y / 9000)).toFixed(4));
      }
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    const cleanups: Array<() => void> = [
      () => window.removeEventListener("scroll", onScroll),
      () => window.removeEventListener("resize", onScroll),
    ];

    /* ── Pointer: glow, card tilt, magnetic buttons ── */
    if (canHover && !reduce) {
      const el = glow.current;
      const gx = el ? gsap.quickTo(el, "x", { duration: 0.8, ease: "power3" }) : null;
      const gy = el ? gsap.quickTo(el, "y", { duration: 0.8, ease: "power3" }) : null;

      const movers = new WeakMap<HTMLElement, Mover>();
      const tilters = new WeakMap<HTMLElement, Tilter>();
      let activeTilt: HTMLElement | null = null;
      let activeMagnet: HTMLElement | null = null;

      const magnetFor = (node: HTMLElement): Mover => {
        let m = movers.get(node);
        if (!m) {
          m = {
            x: gsap.quickTo(node, "x", { duration: 0.5, ease: "power3" }),
            y: gsap.quickTo(node, "y", { duration: 0.5, ease: "power3" }),
          };
          movers.set(node, m);
        }
        return m;
      };
      const tiltFor = (node: HTMLElement): Tilter => {
        let t = tilters.get(node);
        if (!t) {
          gsap.set(node, { transformPerspective: 900 });
          t = {
            rx: gsap.quickTo(node, "rotationX", { duration: 0.5, ease: "power3" }),
            ry: gsap.quickTo(node, "rotationY", { duration: 0.5, ease: "power3" }),
          };
          tilters.set(node, t);
        }
        return t;
      };

      const releaseTilt = () => {
        if (!activeTilt) return;
        const t = tiltFor(activeTilt);
        t.rx(0);
        t.ry(0);
        activeTilt = null;
      };
      const releaseMagnet = () => {
        if (!activeMagnet) return;
        const m = magnetFor(activeMagnet);
        m.x(0);
        m.y(0);
        activeMagnet = null;
      };

      const onPointerMove = (event: PointerEvent) => {
        if (el && gx && gy) {
          el.style.opacity = "1";
          gx(event.clientX);
          gy(event.clientY);
        }
        const target = event.target instanceof Element ? event.target : null;

        const tiltNode = target?.closest<HTMLElement>("[data-tilt]") ?? null;
        if (tiltNode !== activeTilt) releaseTilt();
        if (tiltNode) {
          activeTilt = tiltNode;
          const rect = tiltNode.getBoundingClientRect();
          const t = tiltFor(tiltNode);
          t.ry(((event.clientX - rect.left) / rect.width - 0.5) * 8);
          t.rx(-((event.clientY - rect.top) / rect.height - 0.5) * 8);
        }

        const magnetNode = target?.closest<HTMLElement>("[data-magnet]") ?? null;
        if (magnetNode !== activeMagnet) releaseMagnet();
        if (magnetNode) {
          activeMagnet = magnetNode;
          const rect = magnetNode.getBoundingClientRect();
          const m = magnetFor(magnetNode);
          m.x((event.clientX - rect.left - rect.width / 2) * 0.28);
          m.y((event.clientY - rect.top - rect.height / 2) * 0.4);
        }
      };
      const onLeave = () => {
        releaseTilt();
        releaseMagnet();
      };

      window.addEventListener("pointermove", onPointerMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
      cleanups.push(() => {
        window.removeEventListener("pointermove", onPointerMove);
        document.documentElement.removeEventListener("pointerleave", onLeave);
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <>
      {/* Leaf + icon sprite shared by every component via <use href="#…"> */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden focusable="false">
        <defs>
          <symbol id="l-oval" viewBox="0 0 100 100">
            <path fill="currentColor" d="M50 3C84 26 88 68 50 97 12 68 16 26 50 3Z" />
            <path
              d="M50 12V98M50 40 33 28M50 40 67 28M50 60 30 47M50 60 70 47M50 78 36 67M50 78 64 67"
              stroke="rgba(10,40,20,.35)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </symbol>
          <symbol id="l-maple" viewBox="0 0 100 100">
            <path
              fill="currentColor"
              d="M50 2 58 21 75 12 70 35 93 32 80 51 97 64 72 66 75 85 56 77 52 99H48L44 77 25 85 28 66 3 64 20 51 7 32 30 35 25 12 42 21Z"
            />
            <path
              d="M50 98V30M50 62 22 40M50 62 78 40M50 68 18 63M50 68 82 63"
              stroke="rgba(10,40,20,.35)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </symbol>
          <symbol id="l-birch" viewBox="0 0 100 100">
            <path
              fill="currentColor"
              d="M50 5C72 10 92 34 85 62 79 86 61 96 50 98 39 96 21 86 15 62 8 34 28 10 50 5Z"
            />
            <path
              d="M50 12V100M50 36 30 24M50 36 70 24M50 56 24 42M50 56 76 42M50 76 32 64M50 76 68 64"
              stroke="rgba(10,40,20,.35)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </symbol>
        </defs>
      </svg>

      <div ref={bar} className="progress" aria-hidden />
      <div ref={glow} className="glow" aria-hidden />
      <div className="grain" aria-hidden />
      <div className="frame" aria-hidden>
        <div ref={bg} className="bg" />
      </div>
      <div className="leaves" aria-hidden>
        {LEAVES.map((leaf, index) => (
          <span
            key={index}
            className="leaf"
            style={
              {
                left: `${leaf.left}%`,
                "--s": `${leaf.size}px`,
                "--c": leaf.color,
                "--d": `${leaf.duration}s`,
                "--delay": `${leaf.delay}s`,
              } as React.CSSProperties
            }
          >
            <svg viewBox="0 0 100 100" aria-hidden>
              <use href={`#l-${leaf.kind}`} />
            </svg>
          </span>
        ))}
      </div>
    </>
  );
}
