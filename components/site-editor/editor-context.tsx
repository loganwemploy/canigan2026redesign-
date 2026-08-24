"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { setByPath } from "@/lib/editor-fields";
import type { HomeData, ZoomMeeting } from "@/lib/home-types";

export type SaveStatus = "idle" | "saving" | "saved" | "error";

type EditorContextValue = {
  enabled: boolean;
  home: HomeData;
  meeting: ZoomMeeting | null;
  saveStatus: SaveStatus;
  updateHome: (path: string, value: string) => void;
  updateMeeting: (path: string, value: string) => void;
};

const EditorContext = createContext<EditorContextValue | null>(null);

export function useSiteEditor() {
  const ctx = useContext(EditorContext);
  if (!ctx) {
    return {
      enabled: false,
      home: {} as HomeData,
      meeting: null,
      saveStatus: "idle" as SaveStatus,
      updateHome: () => undefined,
      updateMeeting: () => undefined,
    };
  }
  return ctx;
}

function deepClone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

export function SiteEditorProvider({
  initialHome,
  initialMeeting,
  children,
}: {
  initialHome: HomeData;
  initialMeeting: ZoomMeeting | null;
  children: ReactNode;
}) {
  const [home, setHome] = useState(initialHome);
  const [meeting, setMeeting] = useState(initialMeeting);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingSave = useRef<{ kind: "home" | "zoom"; payload: unknown } | null>(null);

  const flushSave = useCallback(async () => {
    const job = pendingSave.current;
    if (!job) return;
    pendingSave.current = null;
    setSaveStatus("saving");
    try {
      if (job.kind === "home") {
        const res = await fetch("/api/globals/home", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(job.payload),
        });
        if (!res.ok) throw new Error("Save failed");
      } else {
        const { id, patch } = job.payload as { id: number; patch: Record<string, unknown> };
        const res = await fetch(`/api/zooms/${id}`, {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(patch),
        });
        if (!res.ok) throw new Error("Zoom save failed");
      }
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2000);
    } catch {
      setSaveStatus("error");
    }
  }, []);

  const scheduleSave = useCallback(
    (kind: "home" | "zoom", payload: unknown) => {
      pendingSave.current = { kind, payload };
      if (saveTimer.current) clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(() => {
        void flushSave();
      }, 600);
    },
    [flushSave],
  );

  const updateHome = useCallback(
    (path: string, value: string) => {
      setHome((prev) => {
        const next = deepClone(prev) as unknown as Record<string, unknown>;
        setByPath(next, path, value);
        scheduleSave("home", next);
        return next as unknown as HomeData;
      });
    },
    [scheduleSave],
  );

  const updateMeeting = useCallback(
    (path: string, value: string) => {
      setMeeting((prev) => {
        if (!prev?.id) return prev;
        const next = deepClone(prev) as unknown as Record<string, unknown>;
        setByPath(next, path, value);
        scheduleSave("zoom", { id: prev.id, patch: { [path]: value } });
        return next as unknown as ZoomMeeting;
      });
    },
    [scheduleSave],
  );

  const value = useMemo(
    () => ({
      enabled: true,
      home,
      meeting,
      saveStatus,
      updateHome,
      updateMeeting,
    }),
    [home, meeting, saveStatus, updateHome, updateMeeting],
  );

  return <EditorContext.Provider value={value}>{children}</EditorContext.Provider>;
}
