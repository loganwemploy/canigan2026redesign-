"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, Save, ExternalLink, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SiteEditorProvider, useSiteEditor } from "@/components/site-editor/editor-context";
import { Editable } from "@/components/site-editor/editable";
import { SiteHeader, SiteFooter } from "@/components/sections/chrome";
import { Hero } from "@/components/sections/hero";
import { Zoom } from "@/components/sections/zoom";
import { Heritage } from "@/components/sections/heritage";
import { Challenge } from "@/components/sections/challenge";
import { Science } from "@/components/sections/science";
import { Nutrition } from "@/components/sections/nutrition";
import { Opportunity } from "@/components/sections/opportunity";
import { Benchmarks } from "@/components/sections/benchmarks";
import { Business } from "@/components/sections/business";
import { GetStarted } from "@/components/sections/get-started";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { ASSESSMENT_URL, FALLBACK_IMAGES } from "@/cms/content";
import {
  HOME_EDITOR_FIELDS,
  ZOOM_EDITOR_FIELDS,
  getByPath,
  setByPath,
  type EditorTarget,
} from "@/lib/editor-fields";
import type { HomeData, ZoomMeeting } from "@/lib/home-types";

type Status = "idle" | "saving" | "saved" | "error";

function deepClone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function EditPanel({
  home,
  meeting,
  onHomeChange,
  onMeetingChange,
}: {
  home: HomeData;
  meeting: ZoomMeeting | null;
  onHomeChange: (next: HomeData) => void;
  onMeetingChange: (next: ZoomMeeting) => void;
}) {
  const { selected, clear, select } = useSiteEditor();
  const [status, setStatus] = useState<Status>("idle");
  const [draft, setDraft] = useState("");
  const [driveUrl, setDriveUrl] = useState("");

  useEffect(() => {
    if (!selected) return;
    if (selected.type === "image" && selected.kind === "home") {
      const slot = getByPath(home, selected.path) as { driveUrl?: string } | undefined;
      setDriveUrl(slot?.driveUrl ?? "");
      setDraft("");
      return;
    }
    if (selected.kind === "home") {
      const value = getByPath(home, selected.path);
      setDraft(typeof value === "string" ? value : "");
    } else if (meeting) {
      const value = getByPath(meeting, selected.path);
      setDraft(typeof value === "string" || typeof value === "boolean" ? String(value) : "");
    }
    setStatus("idle");
  }, [selected, home, meeting]);

  async function save() {
    if (!selected) return;
    setStatus("saving");
    try {
      if (selected.kind === "home") {
        const next = deepClone(home) as unknown as Record<string, unknown>;
        if (selected.type === "image") {
          setByPath(next, `${selected.path}.driveUrl`, driveUrl);
        } else {
          setByPath(next, selected.path, draft);
        }
        const res = await fetch("/api/globals/home", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(next),
        });
        if (!res.ok) throw new Error("Save failed");
        onHomeChange(next as unknown as HomeData);
      } else {
        if (!meeting?.id) throw new Error("No Zoom meeting to update");
        const next = deepClone(meeting) as unknown as Record<string, unknown>;
        const value = selected.type === "checkbox" ? draft === "true" : draft;
        setByPath(next, selected.path, value);
        const res = await fetch(`/api/zooms/${meeting.id}`, {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ [selected.path]: value }),
        });
        if (!res.ok) throw new Error("Zoom save failed");
        onMeetingChange(next as unknown as ZoomMeeting);
      }
      setStatus("saved");
    } catch {
      setStatus("error");
    }
  }

  return (
    <aside className="flex h-full w-full flex-col border-l border-[var(--hairline-soft)] bg-cream2 md:w-[380px]">
      <div className="flex items-center justify-between border-b border-[var(--hairline-soft)] px-4 py-3">
        <div>
          <p className="label-caps text-[0.55rem] text-terra">Visual site editor</p>
          <p className="mt-1 text-[0.85rem] font-bold text-ink">
            {selected ? selected.label : "Click any highlighted block"}
          </p>
        </div>
        {selected ? (
          <button
            type="button"
            onClick={clear}
            className="grid size-8 place-items-center rounded-full border border-[var(--hairline)]"
            aria-label="Close editor panel"
          >
            <X className="size-4" />
          </button>
        ) : null}
      </div>

      <div className="flex-1 space-y-5 overflow-y-auto p-4">
        {!selected ? (
          <>
            <p className="text-[0.78rem] leading-[1.7] text-petrol">
              This is a 1:1 replica of the live site. Click a marked block on the left, or pick a
              field below. Everything saves into Payload CMS (including Zoom meetings and photos).
            </p>
            <div>
              <p className="label-caps mb-2 text-[0.55rem] text-inksoft">Zoom meeting</p>
              <div className="space-y-1">
                {ZOOM_EDITOR_FIELDS.map((field) => (
                  <button
                    key={field.path}
                    type="button"
                    onClick={() => select(field)}
                    className="flex w-full items-center gap-2 rounded-[6px] px-3 py-2 text-left text-[0.78rem] text-ink hover:bg-parch"
                  >
                    <Video className="size-3.5 text-terra" />
                    {field.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="label-caps mb-2 text-[0.55rem] text-inksoft">Page fields</p>
              <div className="max-h-[40vh] space-y-1 overflow-y-auto">
                {HOME_EDITOR_FIELDS.map((field) => (
                  <button
                    key={`${field.path}-${field.label}`}
                    type="button"
                    onClick={() => select(field)}
                    className="block w-full rounded-[6px] px-3 py-2 text-left text-[0.78rem] text-ink hover:bg-parch"
                  >
                    {field.label}
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : selected.type === "image" ? (
          <div className="space-y-3">
            <Label className="label-caps text-[0.55rem] text-petrol">Google Drive share link</Label>
            <Input
              value={driveUrl}
              onChange={(e) => setDriveUrl(e.target.value)}
              placeholder="https://drive.google.com/file/d/…/view"
              className="bg-cream"
            />
            <p className="text-[0.72rem] leading-[1.6] text-inksoft">
              Paste a public Drive link, or upload files in Payload Admin → Media and attach them
              under Globals → Home.
            </p>
          </div>
        ) : selected.type === "checkbox" ? (
          <div className="space-y-3">
            <Label className="label-caps text-[0.55rem] text-petrol">{selected.label}</Label>
            <select
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              className="h-11 w-full rounded-[6px] border border-[var(--hairline)] bg-cream px-3 text-[0.85rem]"
            >
              <option value="true">Active / shown</option>
              <option value="false">Inactive / hidden</option>
            </select>
          </div>
        ) : selected.type === "textarea" ? (
          <div className="space-y-3">
            <Label className="label-caps text-[0.55rem] text-petrol">{selected.label}</Label>
            <Textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              rows={8}
              className="bg-cream leading-[1.7]"
            />
            <p className="text-[0.7rem] text-inksoft">Use line breaks for multi-line headlines.</p>
          </div>
        ) : (
          <div className="space-y-3">
            <Label className="label-caps text-[0.55rem] text-petrol">{selected.label}</Label>
            <Input value={draft} onChange={(e) => setDraft(e.target.value)} className="bg-cream" />
          </div>
        )}
      </div>

      {selected ? (
        <div className="space-y-2 border-t border-[var(--hairline-soft)] p-4">
          <Button
            type="button"
            onClick={save}
            disabled={status === "saving"}
            className="h-11 w-full rounded-full bg-terra text-[0.68rem] font-bold tracking-[0.16em] uppercase text-paper hover:bg-terradeep"
          >
            <Save className="mr-2 size-4" />
            {status === "saving" ? "Saving…" : "Save to Payload"}
          </Button>
          {status === "saved" ? (
            <p className="text-center text-[0.72rem] text-pine">Saved — live site will use this.</p>
          ) : null}
          {status === "error" ? (
            <p className="text-center text-[0.72rem] text-destructive">
              Could not save. Make sure you are logged into /admin.
            </p>
          ) : null}
        </div>
      ) : null}
    </aside>
  );
}

function EditorCanvas({
  home,
  meeting,
}: {
  home: HomeData;
  meeting: ZoomMeeting | null;
}) {
  return (
    <div className="min-h-screen bg-cream">
      <SiteHeader logo={FALLBACK_IMAGES.logo} />
      <main>
        <Editable
          target={{ kind: "home", path: "hero.title", label: "Hero headline", type: "textarea" }}
        >
          <Hero data={home.hero} meeting={meeting} />
        </Editable>
        <Editable target={{ kind: "zoom", path: "title", label: "Zoom title", type: "text" }}>
          <Zoom zoomSection={home.zoomSection} meeting={meeting} />
        </Editable>
        <Editable
          target={{ kind: "home", path: "heritage.image", label: "Heritage timeline", type: "image" }}
        >
          <Heritage data={home.heritage} />
        </Editable>
        <Editable
          target={{
            kind: "home",
            path: "challenge.heading",
            label: "Challenge heading",
            type: "textarea",
          }}
        >
          <Challenge data={home.challenge} />
        </Editable>
        <Editable
          target={{
            kind: "home",
            path: "science.heading",
            label: "Science heading",
            type: "textarea",
          }}
        >
          <Science data={home.science} />
        </Editable>
        <Editable
          target={{ kind: "home", path: "nutrition.image", label: "Nutrition photo", type: "image" }}
        >
          <Nutrition data={home.nutrition} />
        </Editable>
        <Editable
          target={{
            kind: "home",
            path: "opportunity.heading",
            label: "Opportunity heading",
            type: "textarea",
          }}
        >
          <Opportunity data={home.opportunity} />
        </Editable>
        <Editable
          target={{
            kind: "home",
            path: "benchmarks.heading",
            label: "Benchmarks heading",
            type: "textarea",
          }}
        >
          <Benchmarks data={home.benchmarks} />
        </Editable>
        <Editable
          target={{
            kind: "home",
            path: "business.heading",
            label: "Business heading",
            type: "textarea",
          }}
        >
          <Business data={home.business} />
        </Editable>
        <Editable
          target={{
            kind: "home",
            path: "getStarted.heading",
            label: "Get started heading",
            type: "textarea",
          }}
        >
          <GetStarted data={home.getStarted} />
        </Editable>
        <Editable
          target={{ kind: "home", path: "about.image", label: "Photo of Candy", type: "image" }}
        >
          <About about={home.about} />
        </Editable>
        <Editable
          target={{
            kind: "home",
            path: "contact.heading",
            label: "Contact heading",
            type: "textarea",
          }}
        >
          <Contact data={home.contact} />
        </Editable>
        <SiteFooter
          logo={FALLBACK_IMAGES.logo}
          tagline={home.footer.tagline}
          incomeDisclaimer={home.footer.incomeDisclaimer}
          healthDisclaimer={home.footer.healthDisclaimer}
          phone={home.about.phone}
          email={home.about.email}
          assessmentUrl={ASSESSMENT_URL}
        />
      </main>
    </div>
  );
}

export function SiteEditorShell({
  initialHome,
  initialMeeting,
}: {
  initialHome: HomeData;
  initialMeeting: ZoomMeeting | null;
}) {
  const [home, setHome] = useState(initialHome);
  const [meeting, setMeeting] = useState(initialMeeting);

  return (
    <SiteEditorProvider enabled>
      <div className="flex h-screen flex-col bg-parch">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--hairline-soft)] bg-cream2 px-4 py-3">
          <div>
            <p className="label-caps text-[0.55rem] text-terra">Canigan · Payload visual editor</p>
            <h1 className="font-display text-[1.2rem] text-ink">1:1 site editor</h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button asChild variant="outline" className="h-9 rounded-full text-[0.65rem] uppercase">
              <Link href="/admin/collections/zooms" target="_blank">
                <Video className="mr-1.5 size-3.5" />
                Zoom meetings
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-9 rounded-full text-[0.65rem] uppercase">
              <Link href="/admin/globals/home" target="_blank">
                <ExternalLink className="mr-1.5 size-3.5" />
                Payload admin
              </Link>
            </Button>
            <Button asChild className="h-9 rounded-full bg-pine text-[0.65rem] uppercase text-paper">
              <Link href="/">View live site</Link>
            </Button>
          </div>
        </header>

        <div className="flex min-h-0 flex-1 flex-col md:flex-row">
          <div className="min-h-0 flex-1 overflow-y-auto">
            <EditorCanvas home={home} meeting={meeting} />
          </div>
          <div className="h-[42vh] shrink-0 md:h-auto">
            <EditPanel
              home={home}
              meeting={meeting}
              onHomeChange={setHome}
              onMeetingChange={setMeeting}
            />
          </div>
        </div>
      </div>
    </SiteEditorProvider>
  );
}
