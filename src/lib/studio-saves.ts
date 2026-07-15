import type { StudioState } from "@/types/studio";

export interface SavedComposition {
  id: string;
  state: StudioState;
  createdAt: number;
}

const KEY = "gradientcraft:saves";
const MAX = 50;

export function loadSaves(): SavedComposition[] {
  try {
    const raw = localStorage.getItem(KEY);
    const list = raw ? (JSON.parse(raw) as unknown) : [];
    return Array.isArray(list) ? (list as SavedComposition[]) : [];
  } catch {
    return [];
  }
}

function persist(list: SavedComposition[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    /* storage full or unavailable — ignore */
  }
}

// Prepend a snapshot of the current state; newest first, capped at MAX.
export function addSave(state: StudioState): SavedComposition[] {
  const id =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : String(Date.now());
  const item: SavedComposition = { id, state, createdAt: Date.now() };
  const next = [item, ...loadSaves()].slice(0, MAX);
  persist(next);
  return next;
}

export function deleteSave(id: string): SavedComposition[] {
  const next = loadSaves().filter((s) => s.id !== id);
  persist(next);
  return next;
}
