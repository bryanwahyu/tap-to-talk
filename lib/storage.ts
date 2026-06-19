import { BoardState, Settings } from "./types";
import { DEFAULT_BOARD } from "./defaultBoard";

const BOARD_KEY = "tap-to-talk:board:v1";
const SETTINGS_KEY = "tap-to-talk:settings:v1";

export const DEFAULT_SETTINGS: Settings = {
  rate: 1,
  pitch: 1,
  voiceURI: null,
  editMode: false,
};

export function loadBoard(): BoardState {
  if (typeof window === "undefined") return DEFAULT_BOARD;
  try {
    const raw = window.localStorage.getItem(BOARD_KEY);
    if (!raw) return DEFAULT_BOARD;
    const parsed = JSON.parse(raw) as BoardState;
    if (!parsed.tiles || !parsed.categories) return DEFAULT_BOARD;
    return parsed;
  } catch {
    return DEFAULT_BOARD;
  }
}

export function saveBoard(board: BoardState): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(BOARD_KEY, JSON.stringify(board));
  } catch {
    // Storage full or blocked (private mode) — fail quietly, app still works in-session.
  }
}

export function loadSettings(): Settings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const raw = window.localStorage.getItem(SETTINGS_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: Settings): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch {
    /* ignore */
  }
}

export function resetBoard(): BoardState {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(BOARD_KEY);
  }
  return DEFAULT_BOARD;
}
