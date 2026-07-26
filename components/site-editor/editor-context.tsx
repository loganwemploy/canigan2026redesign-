"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { EditorTarget } from "@/lib/editor-fields";

type EditorContextValue = {
  enabled: boolean;
  selected: EditorTarget | null;
  select: (target: EditorTarget) => void;
  clear: () => void;
};

const EditorContext = createContext<EditorContextValue>({
  enabled: false,
  selected: null,
  select: () => undefined,
  clear: () => undefined,
});

export function useSiteEditor() {
  return useContext(EditorContext);
}

export function SiteEditorProvider({
  enabled,
  children,
}: {
  enabled: boolean;
  children: ReactNode;
}) {
  const [selected, setSelected] = useState<EditorTarget | null>(null);
  const value = useMemo(
    () => ({
      enabled,
      selected,
      select: setSelected,
      clear: () => setSelected(null),
    }),
    [enabled, selected],
  );

  return <EditorContext.Provider value={value}>{children}</EditorContext.Provider>;
}
