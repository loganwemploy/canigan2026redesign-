"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { Calendar, Check, Clock, Hourglass, Video } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { ZoomMeeting } from "@/lib/home-types";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * The Zoom call-to-action opens this modal rather than jumping straight to Zoom,
 * so people see what the session actually is and can either join the live link
 * or reserve a seat. RSVPs land in Payload (Zoom → Zoom RSVPs).
 *
 * Skin: the dark ink header, paper body, kit buttons and form fields are all
 * styled in app/sections.css (`.zoom-dialog-*` and the `data-slot` rules).
 */
export function ZoomInviteDialog({
  meeting,
  children,
}: {
  meeting?: ZoomMeeting | null;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [guests, setGuests] = useState("1");
  const [notes, setNotes] = useState("");
  const [reminder, setReminder] = useState(true);

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) {
      // Reset so the next visitor starts at the choice screen.
      setShowForm(false);
      setStatus("idle");
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/zoom-rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          guests: Number(guests) || 1,
          notes,
          reminder,
          meetingId: meeting?.id ?? null,
          meetingTitle: meeting?.title,
          meetingDate: meeting?.date,
        }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  const details = meeting
    ? [
        { icon: Calendar, label: "Date", value: meeting.date },
        { icon: Clock, label: "Time", value: meeting.time },
        ...(meeting.zoomLength
          ? [{ icon: Hourglass, label: "Length", value: meeting.zoomLength }]
          : []),
      ]
    : [];

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <div className="zoom-dialog-head">
          <span className="eyebrow">Join Candy live on Zoom</span>
          <DialogTitle className="zoom-dialog-title">
            {meeting?.title ?? "Live wellness & business sessions with Candy"}
          </DialogTitle>
          <DialogDescription className="zoom-dialog-lede">
            {meeting
              ? "Free to attend, no obligation. Join the live link or reserve a seat and Candy will send the details."
              : "A new session is being scheduled. Reserve a seat and Candy will email you the invite as soon as it's set."}
          </DialogDescription>
        </div>

        <div className="zoom-dialog-body">
          {details.length ? (
            <dl className="zoom-dialog-facts">
              {details.map(({ icon: Icon, label, value }) => (
                <div key={label} className="zoom-dialog-fact">
                  <Icon aria-hidden />
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          ) : null}

          {status === "sent" ? (
            <div role="status" className="zoom-dialog-sent">
              <span className="zoom-dialog-check">
                <Check aria-hidden />
              </span>
              <p>
                Your seat is reserved — Candy will be in touch with the details before the call.
              </p>
              {meeting?.link ? (
                <Button asChild size="lg">
                  <a href={meeting.link} target="_blank" rel="noreferrer">
                    <Video aria-hidden />
                    Join the Zoom now
                  </a>
                </Button>
              ) : null}
              <DialogClose asChild>
                <button type="button" className="text-link">
                  Close
                </button>
              </DialogClose>
            </div>
          ) : showForm ? (
            <form onSubmit={handleSubmit} className="zoom-dialog-form">
              <div className="zoom-dialog-grid">
                <div className="field">
                  <Label htmlFor="rsvp-name">Name</Label>
                  <Input
                    id="rsvp-name"
                    required
                    autoComplete="name"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="field">
                  <Label htmlFor="rsvp-email">Email</Label>
                  <Input
                    id="rsvp-email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="field">
                  <Label htmlFor="rsvp-phone">
                    Phone{" "}
                    <span className="field-opt">(optional)</span>
                  </Label>
                  <Input
                    id="rsvp-phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="(000) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="field">
                  <Label htmlFor="rsvp-guests">Seats</Label>
                  <Input
                    id="rsvp-guests"
                    type="number"
                    min={1}
                    max={20}
                    inputMode="numeric"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                  />
                </div>
              </div>

              <div className="field">
                <Label htmlFor="rsvp-notes">
                  Anything you&apos;d like Candy to cover?{" "}
                  <span className="field-opt">(optional)</span>
                </Label>
                <Textarea
                  id="rsvp-notes"
                  rows={3}
                  placeholder="A question or health goal you'd like addressed…"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-[104px]"
                />
              </div>

              <div className="zoom-dialog-remind">
                <Checkbox
                  id="rsvp-reminder"
                  checked={reminder}
                  onCheckedChange={(checked) => setReminder(checked === true)}
                />
                <Label htmlFor="rsvp-reminder" className="cursor-pointer font-normal">
                  Send me a reminder before the call
                </Label>
              </div>

              <div className="zoom-dialog-actions">
                <Button type="submit" size="lg" disabled={status === "sending"}>
                  {status === "sending" ? "Reserving…" : "Reserve my seat"}
                </Button>
                <button type="button" onClick={() => setShowForm(false)} className="text-link">
                  Back
                </button>
              </div>

              {status === "error" ? (
                <p role="alert" className="contact-error">
                  Something went wrong — please call or email Candy directly.
                </p>
              ) : null}
            </form>
          ) : (
            <div className="zoom-dialog-choice">
              {meeting?.link ? (
                <Button asChild size="lg" className="w-full">
                  <a href={meeting.link} target="_blank" rel="noreferrer">
                    <Video aria-hidden />
                    Join the Zoom now
                  </a>
                </Button>
              ) : null}

              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => setShowForm(true)}
                className="w-full"
              >
                RSVP & save my seat
              </Button>

              <p className="zoom-dialog-note">
                Can&apos;t make it live? RSVP anyway and Candy will follow up with a recap.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
