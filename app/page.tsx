"use client";

import { useEffect, useMemo, useState } from "react";
import { BoardState, Settings, Tile } from "@/lib/types";
import { COLOR_VALUES } from "@/lib/colors";
import {
  DEFAULT_SETTINGS,
  loadBoard,
  loadSettings,
  resetBoard,
  saveBoard,
  saveSettings,
} from "@/lib/storage";
import { loadVoices, speak, speechSupported, stopSpeaking } from "@/lib/speech";
import TileEditor from "@/components/TileEditor";
import SettingsModal from "@/components/SettingsModal";

export default function Page() {
  const [board, setBoard] = useState<BoardState | null>(null);
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [activeCat, setActiveCat] = useState<string>("core");
  const [sentence, setSentence] = useState<Tile[]>([]);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [editing, setEditing] = useState<Tile | null | "new">(null);
  const [showSettings, setShowSettings] = useState(false);
  const [supported, setSupported] = useState(true);

  // Load persisted state on mount (client only).
  useEffect(() => {
    setBoard(loadBoard());
    setSettings(loadSettings());
    setSupported(speechSupported());
    loadVoices().then(setVoices);
  }, []);

  // Persist whenever board/settings change.
  useEffect(() => {
    if (board) saveBoard(board);
  }, [board]);
  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  const tilesInCat = useMemo(
    () => (board ? board.tiles.filter((t) => t.categoryId === activeCat) : []),
    [board, activeCat]
  );

  if (!board) {
    return (
      <div className="app">
        <p className="hint">Loading your board…</p>
      </div>
    );
  }

  function textFor(tile: Tile) {
    return tile.speak && tile.speak.trim() ? tile.speak : tile.label;
  }

  function handleTileTap(tile: Tile) {
    if (settings.editMode) {
      setEditing(tile);
      return;
    }
    // Speak the single tile right away (immediate feedback), and add to the sentence.
    speak(textFor(tile), settings);
    setSentence((s) => [...s, tile]);
  }

  function speakSentence() {
    if (sentence.length === 0) return;
    const text = sentence.map(textFor).join(" ");
    speak(text, settings);
  }

  function upsertTile(tile: Tile) {
    setBoard((b) => {
      if (!b) return b;
      const exists = b.tiles.some((t) => t.id === tile.id);
      return {
        ...b,
        tiles: exists
          ? b.tiles.map((t) => (t.id === tile.id ? tile : t))
          : [...b.tiles, tile],
      };
    });
    setEditing(null);
  }

  function deleteTile(id: string) {
    setBoard((b) =>
      b ? { ...b, tiles: b.tiles.filter((t) => t.id !== id) } : b
    );
    setEditing(null);
  }

  return (
    <div className="app">
      {!supported && (
        <div className="warn" role="alert">
          This browser can’t speak out loud. Try Chrome, Edge, or Safari for the
          talking feature. You can still build sentences.
        </div>
      )}

      {/* Header */}
      <div className="header">
        <div className="brand">
          <span aria-hidden>🗣️</span> Tap to Talk
        </div>
        <div className="header-actions">
          <button
            className={`icon-btn ${settings.editMode ? "active" : ""}`}
            aria-pressed={settings.editMode}
            onClick={() =>
              setSettings((s) => ({ ...s, editMode: !s.editMode }))
            }
          >
            {settings.editMode ? "✓ Done editing" : "✏️ Edit"}
          </button>
          <button
            className="icon-btn"
            onClick={() => setShowSettings(true)}
            aria-label="Settings"
          >
            ⚙️
          </button>
        </div>
      </div>

      {/* Sentence bar */}
      <div className="sentence-bar">
        <div className="sentence" aria-live="polite">
          {sentence.length === 0 ? (
            <span className="placeholder">Tap pictures to build a sentence…</span>
          ) : (
            sentence.map((t, i) => (
              <span className="chip" key={`${t.id}-${i}`}>
                <span aria-hidden>{t.emoji}</span> {t.label}
              </span>
            ))
          )}
        </div>
        <button
          className="bar-btn back"
          onClick={() => setSentence((s) => s.slice(0, -1))}
          disabled={sentence.length === 0}
          aria-label="Remove last word"
        >
          ⌫
        </button>
        <button
          className="bar-btn clear"
          onClick={() => {
            stopSpeaking();
            setSentence([]);
          }}
          disabled={sentence.length === 0}
          aria-label="Clear sentence"
        >
          Clear
        </button>
        <button
          className="bar-btn speak"
          onClick={speakSentence}
          disabled={sentence.length === 0}
        >
          ▶ Speak
        </button>
      </div>

      {/* Category tabs */}
      <div className="tabs" role="tablist" aria-label="Categories">
        {board.categories.map((c) => (
          <button
            key={c.id}
            role="tab"
            aria-selected={activeCat === c.id}
            className="tab"
            onClick={() => setActiveCat(c.id)}
          >
            <span aria-hidden>{c.emoji}</span> {c.name}
          </button>
        ))}
      </div>

      {/* Tile grid */}
      <div className="grid" role="list">
        {tilesInCat.map((tile) => (
          <button
            key={tile.id}
            className="tile"
            role="listitem"
            style={{ background: COLOR_VALUES[tile.color] }}
            onClick={() => handleTileTap(tile)}
            aria-label={textFor(tile)}
          >
            <span className="emoji" aria-hidden>
              {tile.emoji}
            </span>
            <span className="label">{tile.label}</span>
            {settings.editMode && (
              <span className="tile-edit-controls" aria-hidden>
                <span className="mini-btn">✏️</span>
              </span>
            )}
          </button>
        ))}

        {settings.editMode && (
          <button
            className="tile add"
            onClick={() => setEditing("new")}
            aria-label="Add a new button"
          >
            <span className="emoji" aria-hidden>
              ➕
            </span>
            <span className="label">Add button</span>
          </button>
        )}
      </div>

      {settings.editMode && (
        <p className="hint">
          Editing on — tap any button to change it, or “Add button” to make a new
          one. Changes save automatically on this device.
        </p>
      )}

      {/* Modals */}
      {editing !== null && (
        <TileEditor
          initial={editing === "new" ? null : editing}
          categoryId={activeCat}
          categories={board.categories}
          onSave={upsertTile}
          onDelete={editing === "new" ? undefined : deleteTile}
          onClose={() => setEditing(null)}
        />
      )}

      {showSettings && (
        <SettingsModal
          settings={settings}
          voices={voices}
          onChange={setSettings}
          onResetBoard={() => {
            setBoard(resetBoard());
            setActiveCat("core");
            setSentence([]);
            setShowSettings(false);
          }}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
}
