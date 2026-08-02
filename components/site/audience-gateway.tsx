"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
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
        .to("[data-gateway-botanical]", { opacity: 0.24, scale: 1.015, duration: 0.3, delay: 0.12 })
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
      className="fixed inset-0 z-[100] overflow-y-auto bg-gateway-paper text-ink data-[phase=booting]:pointer-events-none data-[phase=booting]:opacity-0 data-[phase=exiting]:pointer-events-none"
    >
      <div data-gateway-botanical className="pointer-events-none fixed inset-0 opacity-0" aria-hidden>
        <Image src="/images/botanical-swoosh.png" alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,hsl(48_24%_97%/0.04),hsl(48_24%_97%/0.36))]" />
      </div>

      <div className="relative mx-auto flex min-h-full w-full max-w-[1320px] flex-col px-5 py-8 sm:px-9 lg:px-12">
        <button
          type="button"
          onClick={closeGateway}
          className="ml-auto grid size-11 place-items-center rounded-full border border-forest/25 bg-white/80 text-forest backdrop-blur hover:bg-white"
          aria-label="Close this question and show the full site"
        >
          <X className="size-4" aria-hidden />
        </button>

        <div className="mx-auto flex w-full max-w-[1120px] flex-1 flex-col items-center justify-end py-8 text-center sm:justify-center sm:pt-[20vh]">
          <div data-gateway-panel className="w-full rounded-[28px] border border-forest/15 bg-[hsl(48_28%_99%/0.93)] p-5 opacity-0 shadow-[0_34px_90px_-55px_hsl(150_44%_18%/0.6)] backdrop-blur-xl sm:p-8">
          <div data-gateway-copy className="opacity-0">
            <p className="label-caps text-forest">Choose what you would like help with</p>
            <h2 id="audience-gateway-title" className="mt-4 text-[clamp(2rem,4.2vw,3.8rem)] font-bold leading-[1.06] tracking-[-0.03em]">
              Which best describes you?
            </h2>
            <p id="audience-gateway-description" className="mx-auto mt-4 max-w-[58ch] text-lg leading-8 text-inksoft">
              Choose one option. We will show the information that is most useful to you. You can change this later.
            </p>
          </div>

          <div className="mt-8 grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-3" data-choice-grid>
            {AUDIENCE_KEYS.map((key) => {
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
                  className="group flex min-h-[172px] cursor-pointer flex-col rounded-[18px] border-2 border-forest/25 bg-white/90 p-5 text-left opacity-0 shadow-[0_20px_55px_-42px_hsl(147_42%_16%/0.5)] backdrop-blur-sm transition-[border-color,background-color] duration-200 hover:border-forest hover:bg-white focus-visible:border-forest data-[active=true]:border-forest data-[active=true]:bg-white"
                >
                  <span className="text-lg font-bold leading-7 text-ink">{profile.chooserTitle}</span>
                  <span className="mt-2 text-base leading-7 text-inksoft">{profile.chooserBody}</span>
                  <ArrowRight className="mt-auto size-5 text-forest" aria-hidden />
                </a>
              );
            })}
          </div>

          <button data-skip type="button" onClick={closeGateway} className="mt-6 min-h-12 cursor-pointer text-base font-bold text-forest underline decoration-forest/35 underline-offset-4 opacity-0 hover:decoration-forest">
            Skip this question and show the full site
          </button>
          <a href={telHref} className="mt-2 inline-flex min-h-12 items-center text-base font-bold text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink">
            Not sure? Call Candy at {phone}
          </a>
          </div>
        </div>
      </div>
    </div>
  );
}
