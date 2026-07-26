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
import { cn } from "@/lib/utils";
import type { ZoomMeeting } from "@/lib/home-types";

type Status = "idle" | "sending" | "sent" | "error";

const FIELD =
  "rounded-[6px] border-[var(--hairline)] bg-parch text-[0.85rem] text-ink shadow-none focus-visible:border-terra focus-visible:ring-terra placeholder:text-inksoft/60";

const FIELD_LABEL = "label-caps text-[0.56rem] text-petrol";

/**
 * The Zoom call-to-action opens this modal rather than jumping straight to Zoom,
 * so people see what the session actually is and can either join the live link
 * or reserve a seat. RSVPs land in Payload (Zoom → Zoom RSVPs).
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
        <div className="border-b border-[var(--hairline-soft)] bg-pine px-6 py-6 text-paper sm:px-8">
          <span className="label-caps text-[0.56rem] text-terra">Join Candy live on Zoom</span>
          <DialogTitle className="mt-3 pr-10 text-[1.4rem] text-paper sm:text-[1.55rem]">
            {meeting?.title ?? "Live wellness & business sessions with Candy"}
          </DialogTitle>
          <DialogDescription className="mt-2 text-[0.84rem] text-[var(--paper-white)]/80">
            {meeting
              ? "Free to attend, no obligation. Join the live link or reserve a seat and Candy will send the details."
              : "A new session is being scheduled. Reserve a seat and Candy will email you the invite as soon as it's set."}
          </DialogDescription>
        </div>

        <div className="px-6 py-6 sm:px-8">
          {details.length ? (
            <dl className="mb-6 grid gap-2.5 rounded-[8px] border border-[var(--hairline-soft)] bg-parch px-4 py-4">
              {details.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-3 text-[0.88rem]">
                  <Icon className="size-4 shrink-0 text-terra" aria-hidden />
                  <dt className="label-caps w-[54px] shrink-0 text-[0.54rem] text-petrol">
                    {label}
                  </dt>
                  <dd className="font-semibold text-ink">{value}</dd>
                </div>
              ))}
            </dl>
          ) : null}

          {status === "sent" ? (
            <div
              role="status"
              className="flex flex-col items-center gap-3 rounded-[8px] border border-[var(--hairline-soft)] bg-parch p-6 text-center"
            >
              <Check className="size-5 text-pine" aria-hidden />
              <p className="max-w-[38ch] text-[0.9rem] leading-[1.7] text-ink">
                Your seat is reserved — Candy will be in touch with the details before the call.
              </p>
              {meeting?.link ? (
                <Button
                  asChild
                  className="mt-1 h-11 rounded-full bg-terra px-7 text-[0.66rem] font-bold tracking-[0.16em] uppercase text-paper hover:bg-terradeep"
                >
                  <a href={meeting.link} target="_blank" rel="noreferrer">
                    <Video className="mr-2 size-4" aria-hidden />
                    Join the Zoom now
                  </a>
                </Button>
              ) : null}
              <DialogClose asChild>
                <button
                  type="button"
                  className="text-[0.72rem] font-bold tracking-[0.1em] uppercase text-inksoft underline-offset-4 hover:text-ink hover:underline"
                >
                  Close
                </button>
              </DialogClose>
            </div>
          ) : showForm ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="rsvp-name" className={FIELD_LABEL}>
                    Name
                  </Label>
                  <Input
                    id="rsvp-name"
                    required
                    autoComplete="name"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={cn(FIELD, "h-11")}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="rsvp-email" className={FIELD_LABEL}>
                    Email
                  </Label>
                  <Input
                    id="rsvp-email"
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
                  <Label htmlFor="rsvp-phone" className={FIELD_LABEL}>
                    Phone{" "}
                    <span className="font-normal tracking-normal normal-case">(optional)</span>
                  </Label>
                  <Input
                    id="rsvp-phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="(000) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={cn(FIELD, "h-11")}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="rsvp-guests" className={FIELD_LABEL}>
                    Seats
                  </Label>
                  <Input
                    id="rsvp-guests"
                    type="number"
                    min={1}
                    max={20}
                    inputMode="numeric"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className={cn(FIELD, "h-11")}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="rsvp-notes" className={FIELD_LABEL}>
                  Anything you&apos;d like Candy to cover?{" "}
                  <span className="font-normal tracking-normal normal-case">(optional)</span>
                </Label>
                <Textarea
                  id="rsvp-notes"
                  rows={3}
                  placeholder="A question or health goal you'd like addressed…"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className={cn(FIELD, "min-h-[5rem] py-2.5 leading-[1.7]")}
                />
              </div>

              <div className="flex items-center gap-2.5">
                <Checkbox
                  id="rsvp-reminder"
                  checked={reminder}
                  onCheckedChange={(checked) => setReminder(checked === true)}
                  className="border-[var(--hairline)] bg-parch data-[state=checked]:border-terra data-[state=checked]:bg-terra data-[state=checked]:text-paper"
                />
                <Label
                  htmlFor="rsvp-reminder"
                  className="cursor-pointer text-[0.8rem] font-normal text-ink"
                >
                  Send me a reminder before the call
                </Label>
              </div>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-1">
                <Button
                  type="submit"
                  disabled={status === "sending"}
                  className="h-12 rounded-full bg-terra px-8 text-[0.68rem] font-bold tracking-[0.16em] uppercase text-paper hover:bg-terradeep"
                >
                  {status === "sending" ? "Reserving…" : "Reserve my seat"}
                </Button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="text-[0.72rem] font-bold tracking-[0.1em] uppercase text-inksoft underline-offset-4 hover:text-ink hover:underline"
                >
                  Back
                </button>
              </div>

              {status === "error" ? (
                <p role="alert" className="text-[0.78rem] text-destructive">
                  Something went wrong — please call or email Candy directly.
                </p>
              ) : null}
            </form>
          ) : (
            <div className="space-y-3">
              {meeting?.link ? (
                <Button
                  asChild
                  className="h-12 w-full rounded-full bg-terra px-7 text-[0.7rem] font-bold tracking-[0.16em] uppercase text-paper hover:bg-terradeep"
                >
                  <a href={meeting.link} target="_blank" rel="noreferrer">
                    <Video className="mr-2 size-4" aria-hidden />
                    Join the Zoom now
                  </a>
                </Button>
              ) : null}

              <Button
                type="button"
                variant="outline"
                onClick={() => setShowForm(true)}
                className="h-12 w-full rounded-full border-[var(--hairline)] bg-transparent px-7 text-[0.7rem] font-bold tracking-[0.16em] uppercase text-ink hover:bg-parch"
              >
                RSVP & save my seat
              </Button>

              <p className="pt-1 text-center text-[0.74rem] leading-[1.6] text-inksoft">
                Can&apos;t make it live? RSVP anyway and Candy will follow up with a recap.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
