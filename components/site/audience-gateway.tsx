"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, X } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { AUDIENCE_KEYS, AUDIENCES, type AudienceKey } from "@/lib/audiences";

gsap.registerPlugin(useGSAP);

type GatewayPhase = "booting" | "intro" | "choosing" | "exiting" | "closed";

const STORAGE_KEY = "canigan-audience-v1";

function validStoredAudience(value: string | null): value is AudienceKey {
  return value !== null && AUDIENCE_KEYS.includes(value as AudienceKey);
}

export function AudienceGateway({ phone }: { phone: string }) {
  const scope = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<GatewayPhase>("booting");
  const [selected, setSelected] = useState<AudienceKey | "all" | "none">("none");
  const telHref = `tel:${phone.replace(/[^\d+]/g, "")}`;

  useEffect(() => {
    const forceChooser = new URLSearchParams(window.location.search).get("choose") === "1";
    const stored = window.sessionStorage.getItem(STORAGE_KEY);

    if (!forceChooser && validStoredAudience(stored)) {
      window.location.replace(`/for/${stored}`);
      return;
    }

    if (!forceChooser && stored === "all") {
      window.setTimeout(() => setPhase("closed"), 0);
      return;
    }

    window.setTimeout(() => setPhase("intro"), 0);
  }, []);

  useEffect(() => {
    if (phase !== "choosing") return;
    const focusable = scope.current?.querySelector<HTMLElement>("[data-choice]");
    focusable?.focus({ preventScroll: true });
  }, [phase]);

  useEffect(() => {
    if (phase === "closed" || phase === "booting") return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [phase]);

  useGSAP(
    () => {
      if (phase !== "intro" || !scope.current) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        gsap.set("[data-gateway-panel], [data-gateway-copy], [data-choice], [data-skip]", { opacity: 1, y: 0, scale: 1 });
        setPhase("choosing");
        return;
      }

      const timeline = gsap.timeline({ defaults: { ease: "power3.out" }, onComplete: () => setPhase("choosing") });
      timeline
        .fromTo("[data-gateway-botanical]", { scale: 1.06, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.65 })
        .to("[data-gateway-botanical]", { opacity: 1, scale: 1.015, duration: 0.3, delay: 0.12 })
        .fromTo("[data-gateway-panel]", { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35 }, "-=0.2")
        .fromTo("[data-gateway-copy]", { y: 8, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3 }, "-=0.25")
        .fromTo("[data-choice]", { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, stagger: 0.04 }, "-=0.16")
        .fromTo("[data-skip]", { opacity: 0 }, { opacity: 1, duration: 0.2 }, "-=0.1");
    },
    { scope, dependencies: [phase] },
  );

  function closeGateway() {
    if (phase === "exiting" || phase === "closed") return;
    window.sessionStorage.setItem(STORAGE_KEY, "all");
    setSelected("all");
    setPhase("exiting");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.to(scope.current, {
      opacity: 0,
      duration: reduce ? 0 : 0.35,
      ease: "power2.inOut",
      onComplete: () => setPhase("closed"),
    });
  }

  function rememberAudience(key: AudienceKey) {
    setSelected(key);
    window.sessionStorage.setItem(STORAGE_KEY, key);
    setPhase("exiting");
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeGateway();
      return;
    }
    if (event.key !== "Tab" || !scope.current) return;

    const items = Array.from(
      scope.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
    ).filter((item) => item.offsetParent !== null);
    if (items.length === 0) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  if (phase === "closed") return null;

  return (
    <div
      ref={scope}
      role="dialog"
      aria-modal="true"
      aria-labelledby="audience-gateway-title"
      aria-describedby="audience-gateway-description"
      data-audience-gateway
      data-phase={phase}
      data-selected={selected}
      onKeyDown={handleKeyDown}
      className="gw"
    >
      <div data-gateway-botanical className="gw-wreath" aria-hidden>
        <div className="gw-wreath-img" />
      </div>
      <div className="gw-grain" aria-hidden />

      <div className="gw-shell">
        <div className="gw-top">
          <button data-skip type="button" onClick={closeGateway} className="btn ghost gw-skip">
            Skip and show the full site
          </button>
          <button
            type="button"
            onClick={closeGateway}
            className="btn ghost icon gw-close"
            aria-label="Close this question and show the full site"
          >
            <X aria-hidden />
          </button>
        </div>

        <div className="gw-main">
          <div data-gateway-panel className="gw-panel">
            <div data-gateway-copy className="gw-copy">
              <p className="eyebrow">Choose what you would like help with</p>
              <h2 id="audience-gateway-title" className="gw-title">
                Which best <em>describes you?</em>
              </h2>
              <p id="audience-gateway-description" className="gw-lede">
                Choose one option. We will show the information that is most useful to you. You can change this later.
              </p>
            </div>

            <div className="gw-grid" data-choice-grid>
              {AUDIENCE_KEYS.map((key, index) => {
                const profile = AUDIENCES[key];
                return (
                  <a
                    key={key}
                    href={`/for/${key}`}
                    data-choice
                    data-audience-choice={key}
                    data-active={selected === key ? "true" : "false"}
                    onMouseEnter={() => setSelected(key)}
                    onMouseLeave={() => setSelected("none")}
                    onFocus={() => setSelected(key)}
                    onBlur={() => setSelected("none")}
                    onClick={() => rememberAudience(key)}
                    className="gw-choice"
                  >
                    <span className="gw-num" aria-hidden>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="gw-choice-title">{profile.chooserTitle}</span>
                    <span className="gw-choice-body">{profile.chooserBody}</span>
                    <span className="gw-go" aria-hidden>
                      <ArrowRight />
                    </span>
                  </a>
                );
              })}
            </div>

            <a href={telHref} className="gw-call">
              Not sure? Call Candy at <span className="gw-tel">{phone}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
