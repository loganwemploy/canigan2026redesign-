import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

interface ContactPayload {
  name?: string;
  email?: string;
  phone?: string;
  personas?: string[];
  message?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";

  if (!name || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "A name and a valid email are required." }, { status: 400 });
  }

  try {
    const payload = await getPayload({ config });
    await payload.create({
      collection: "contact-submissions",
      data: {
        name,
        email,
        phone: body.phone?.trim() || undefined,
        personas: body.personas?.length ? body.personas.join(", ") : undefined,
        message: body.message?.trim() || undefined,
      },
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[canigan] Contact submission failed:", error);
    return NextResponse.json({ error: "Could not save your message." }, { status: 500 });
  }
}
