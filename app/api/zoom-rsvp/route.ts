import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

interface RsvpPayload {
  name?: string;
  email?: string;
  phone?: string;
  guests?: number;
  notes?: string;
  reminder?: boolean;
  meetingId?: number | string | null;
  meetingTitle?: string;
  meetingDate?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: RsvpPayload;
  try {
    body = (await request.json()) as RsvpPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";

  if (!name || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "A name and a valid email are required." }, { status: 400 });
  }

  const seats = Number(body.guests);
  const guests = Number.isFinite(seats) ? Math.min(Math.max(Math.trunc(seats), 1), 20) : 1;

  const meetingId = Number(body.meetingId);

  try {
    const payload = await getPayload({ config });
    await payload.create({
      collection: "zoom-rsvps",
      data: {
        name,
        email,
        phone: body.phone?.trim() || undefined,
        guests,
        notes: body.notes?.trim() || undefined,
        reminder: body.reminder !== false,
        meeting: Number.isFinite(meetingId) && meetingId > 0 ? meetingId : undefined,
        meetingTitle: body.meetingTitle?.trim() || undefined,
        meetingDate: body.meetingDate?.trim() || undefined,
      },
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[canigan] Zoom RSVP failed:", error);
    return NextResponse.json({ error: "Could not save your RSVP." }, { status: 500 });
  }
}
