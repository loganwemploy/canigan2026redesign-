"use client";

import { useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { DotLeader, Plate, Section } from "@/components/site/atoms";
import { CmsDisplay, CmsPlateLabel, CmsText } from "@/components/site-editor/inline-edit";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { HomeData } from "@/lib/home-types";

type Status = "idle" | "sending" | "sent" | "error";

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
    <Section id="contact" className="contact">
      <Plate inner={false} className="contact-plate">
        <div className="contact-grid">
          {/* ——— left: the plate caption ——— */}
          <Reveal variant="left" className="contact-intro">
            <CmsPlateLabel kind="home" path="contact.label" label={data.label} />
            <CmsDisplay as="h2" kind="home" path="contact.heading" className="contact-title">
              {data.heading}
            </CmsDisplay>
            <CmsText kind="home" path="contact.blurb" multiline as="p" className="lead contact-blurb">
              {data.blurb}
            </CmsText>
            <DotLeader count={10} className="contact-dots" />
          </Reveal>

          {/* ——— right: the form ——— */}
          <Reveal variant="right" className="contact-main">
            {status === "sent" ? (
              <div role="status" className="contact-sent">
                <span className="contact-sent-ico">
                  <Check aria-hidden />
                </span>
                <p>
                  {data.successMessage.split("\n").map((line, i) => (
                    <span key={i} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="form contact-form">
                <div className="field">
                  <Label htmlFor="contact-name">Name</Label>
                  <Input
                    id="contact-name"
                    name="name"
                    required
                    autoComplete="name"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="field">
                  <Label htmlFor="contact-email">Email</Label>
                  <Input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="field">
                  <Label htmlFor="contact-phone">
                    Phone <span className="field-opt">(optional)</span>
                  </Label>
                  <Input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="(000) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <fieldset className="field persona-set">
                  <Label asChild>
                    <legend>How would you describe yourself?</legend>
                  </Label>
                  <div className="persona-grid">
                    {data.personas.map((p) => {
                      const id = slugify(p.label);
                      return (
                        <div key={p.label} className="persona">
                          <Checkbox
                            id={id}
                            checked={personas.includes(p.label)}
                            onCheckedChange={(checked) => togglePersona(p.label, checked === true)}
                          />
                          <Label htmlFor={id}>{p.label}</Label>
                        </div>
                      );
                    })}
                  </div>
                </fieldset>

                <div className="field">
                  <Label htmlFor="contact-message">Message</Label>
                  <Textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    placeholder="Tell Candy a little about what you're looking for…"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                <div className="contact-submit">
                  <Button type="submit" size="lg" disabled={status === "sending"}>
                    {status === "sending" ? "Sending…" : "Send to Candy"}
                  </Button>
                  {status === "error" ? (
                    <p role="alert" className="contact-error">
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
