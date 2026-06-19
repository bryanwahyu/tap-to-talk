"use client";

import { useState } from "react";
import { Tile, ColorKey, Category } from "@/lib/types";
import { COLOR_KEYS, COLOR_VALUES } from "@/lib/colors";

interface Props {
  initial: Tile | null; // null = creating a new tile
  categoryId: string;
  categories: Category[];
  onSave: (tile: Tile) => void;
  onDelete?: (id: string) => void;
  onClose: () => void;
}

export default function TileEditor({
  initial,
  categoryId,
  categories,
  onSave,
  onDelete,
  onClose,
}: Props) {
  const [label, setLabel] = useState(initial?.label ?? "");
  const [speak, setSpeak] = useState(initial?.speak ?? "");
  const [emoji, setEmoji] = useState(initial?.emoji ?? "🙂");
  const [color, setColor] = useState<ColorKey>(initial?.color ?? "blue");
  const [cat, setCat] = useState(initial?.categoryId ?? categoryId);

  const canSave = label.trim().length > 0 && emoji.trim().length > 0;

  function handleSave() {
    if (!canSave) return;
    onSave({
      id: initial?.id ?? `t-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      label: label.trim(),
      speak: speak.trim() || undefined,
      emoji: emoji.trim(),
      color,
      categoryId: cat,
    });
  }

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={initial ? "Edit button" : "Add button"}
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>{initial ? "Edit button" : "Add a button"}</h2>

        <div className="field">
          <label htmlFor="emoji">Picture (emoji)</label>
          <input
            id="emoji"
            value={emoji}
            onChange={(e) => setEmoji(e.target.value)}
            maxLength={4}
            style={{ fontSize: "2rem", textAlign: "center" }}
          />
        </div>

        <div className="field">
          <label htmlFor="label">Label (shown on the button)</label>
          <input
            id="label"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="e.g. Water"
          />
        </div>

        <div className="field">
          <label htmlFor="speak">Says out loud (optional)</label>
          <input
            id="speak"
            value={speak}
            onChange={(e) => setSpeak(e.target.value)}
            placeholder="Defaults to the label"
          />
        </div>

        <div className="field">
          <label htmlFor="cat">Category</label>
          <select id="cat" value={cat} onChange={(e) => setCat(e.target.value)}>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.emoji} {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label>Color</label>
          <div className="color-row">
            {COLOR_KEYS.map((c) => (
              <button
                key={c}
                className="swatch"
                aria-label={c}
                aria-pressed={color === c}
                style={{ background: COLOR_VALUES[c] }}
                onClick={() => setColor(c)}
              />
            ))}
          </div>
        </div>

        <div className="modal-actions">
          {initial && onDelete && (
            <button
              className="icon-btn danger"
              onClick={() => onDelete(initial.id)}
            >
              🗑 Delete
            </button>
          )}
          <button className="icon-btn" onClick={onClose}>
            Cancel
          </button>
          <button
            className="icon-btn primary"
            onClick={handleSave}
            disabled={!canSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
