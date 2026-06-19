export interface Tile {
  id: string;
  label: string;
  /** What gets spoken. Falls back to label if empty. */
  speak?: string;
  /** Emoji or short symbol shown big on the tile. */
  emoji: string;
  /** Tailwind-ish color key, mapped in the UI. */
  color: ColorKey;
  categoryId: string;
}

export interface Category {
  id: string;
  name: string;
  emoji: string;
}

export type ColorKey =
  | "yellow"
  | "green"
  | "blue"
  | "pink"
  | "orange"
  | "purple"
  | "red"
  | "teal";

export interface BoardState {
  categories: Category[];
  tiles: Tile[];
  /** schema version, lets us migrate localStorage safely later */
  version: number;
}

export interface Settings {
  rate: number; // 0.5 - 2
  pitch: number; // 0 - 2
  voiceURI: string | null;
  editMode: boolean;
}
