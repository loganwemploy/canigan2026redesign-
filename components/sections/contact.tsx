"use client";

import { useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { PlateLabel, DotLeader, Plate, Display, Section } from "@/components/site/atoms";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { HomeData } from "@/lib/home-types";

type Status = "idle" | "sending" | "sent" | "error";

const FIELD =
  "rounded-[6px] border-[var(--hairline)] bg-cream2 text-[0.85rem] text-ink shadow-none focus-visible:border-terra focus-visible:ring-terra placeholder:text-inksoft/60";

const FIELD_LABEL = "label-caps text-[0.58rem] text-petrol";

function slugify(value: string) {
  return (
    "persona-" +
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
  );
}

export function Contact({ data }: { data: HomeData["contact"] }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [personas, setPersonas] = useState<string[]>([]);
  const [status, setStatus] = useState<Status>("idle");

  function togglePersona(label: string, checked: boolean) {
    setPersonas((prev) =>
      checked ? (prev.includes(label) ? prev : [...prev, label]) : prev.filter((p) => p !== label),
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, personas, message }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <Section id="contact">
      <Plate inner={false} className="dot-grid px-7 py-10 sm:px-10 sm:py-12">
        <div className="grid gap-10 md:grid-cols-[0.85fr_1fr] md:gap-14">
          {/* ——— left: the plate caption ——— */}
          <Reveal variant="left">
            <PlateLabel label={data.label} plate={data.plate} />
            <Display as="h2" className="mt-7 text-[clamp(1.65rem,2.8vw,2.2rem)] text-ink">
              {data.heading}
            </Display>
            <p className="mt-6 text-[0.95rem] leading-[1.95] text-petrol">
              {data.blurb.split("\n").map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </p>
            <DotLeader count={10} className="mt-6 block" />
          </Reveal>

          {/* ——— right: the form ——— */}
          <Reveal variant="right">
            {status === "sent" ? (
              <div
                role="status"
                className="flex flex-col items-center justify-center gap-3 rounded-[8px] border border-[var(--hairline-soft)] bg-parch p-8 text-center"
              >
                <Check className="size-5 text-pine" />
                <p className="max-w-[38ch] text-[0.9rem] leading-[1.7] text-ink">
                  {data.successMessage.split("\n").map((line, i) => (
                    <span key={i} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <Label htmlFor="contact-name" className={FIELD_LABEL}>
                    Name
                  </Label>
                  <Input
                    id="contact-name"
                    name="name"
                    required
                    autoComplete="name"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={cn(FIELD, "h-11")}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="contact-email" className={FIELD_LABEL}>
                    Email
                  </Label>
                  <Input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={cn(FIELD, "h-11")}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="contact-phone" className={FIELD_LABEL}>
                    Phone <span className="font-normal tracking-normal normal-case">(optional)</span>
                  </Label>
                  <Input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="(000) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={cn(FIELD, "h-11")}
                  />
                </div>

                <fieldset className="space-y-3">
                  <Label asChild className={FIELD_LABEL}>
                    <legend>How would you describe yourself?</legend>
                  </Label>
                  <div className="flex flex-wrap gap-x-6 gap-y-3">
                    {data.personas.map((p) => {
                      const id = slugify(p.label);
                      return (
                        <div key={p.label} className="flex items-center gap-2">
                          <Checkbox
                            id={id}
                            checked={personas.includes(p.label)}
                            onCheckedChange={(checked) => togglePersona(p.label, checked === true)}
                            className="border-[var(--hairline)] bg-cream2 data-[state=checked]:border-terra data-[state=checked]:bg-terra data-[state=checked]:text-paper"
                          />
                          <Label
                            htmlFor={id}
                            className="cursor-pointer text-[0.78rem] font-normal text-ink"
                          >
                            {p.label}
                          </Label>
                        </div>
                      );
                    })}
                  </div>
                </fieldset>

                <div className="space-y-1.5">
                  <Label htmlFor="contact-message" className={FIELD_LABEL}>
                    Message
                  </Label>
                  <Textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    placeholder="Tell Candy a little about what you're looking for…"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={cn(FIELD, "min-h-[6.5rem] py-2.5 leading-[1.7]")}
                  />
                </div>

                <div className="space-y-3 pt-1">
                  <Button
                    type="submit"
                    disabled={status === "sending"}
                    className="h-11 rounded-full bg-terra px-8 text-[0.68rem] font-bold tracking-[0.18em] uppercase text-paper hover:bg-terradeep"
                  >
                    {status === "sending" ? "Sending…" : "Send to Candy"}
                  </Button>
                  {status === "error" ? (
                    <p role="alert" className="text-[0.78rem] text-destructive">
                      Something went wrong — please call or email Candy directly.
                    </p>
                  ) : null}
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </Plate>
    </Section>
  );
}
