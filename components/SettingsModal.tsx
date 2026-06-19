"use client";

import { Settings } from "@/lib/types";

interface Props {
  settings: Settings;
  voices: SpeechSynthesisVoice[];
  onChange: (next: Settings) => void;
  onResetBoard: () => void;
  onClose: () => void;
}

export default function SettingsModal({
  settings,
  voices,
  onChange,
  onResetBoard,
  onClose,
}: Props) {
  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Settings"
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Settings</h2>

        <div className="field">
          <label htmlFor="voice">Voice</label>
          <select
            id="voice"
            value={settings.voiceURI ?? ""}
            onChange={(e) =>
              onChange({ ...settings, voiceURI: e.target.value || null })
            }
          >
            <option value="">Default voice</option>
            {voices.map((v) => (
              <option key={v.voiceURI} value={v.voiceURI}>
                {v.name} ({v.lang})
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="rate">Speed: {settings.rate.toFixed(1)}x</label>
          <div className="range-row">
            <span aria-hidden>🐢</span>
            <input
              id="rate"
              type="range"
              min="0.5"
              max="1.6"
              step="0.1"
              value={settings.rate}
              onChange={(e) =>
                onChange({ ...settings, rate: Number(e.target.value) })
              }
            />
            <span aria-hidden>🐇</span>
          </div>
        </div>

        <div className="field">
          <label htmlFor="pitch">Pitch: {settings.pitch.toFixed(1)}</label>
          <div className="range-row">
            <span aria-hidden>🔉</span>
            <input
              id="pitch"
              type="range"
              min="0.5"
              max="1.8"
              step="0.1"
              value={settings.pitch}
              onChange={(e) =>
                onChange({ ...settings, pitch: Number(e.target.value) })
              }
            />
            <span aria-hidden>🔊</span>
          </div>
        </div>

        <div className="field">
          <label>Board</label>
          <button
            className="icon-btn danger"
            onClick={() => {
              if (
                confirm(
                  "Reset the board to the default buttons? Your custom buttons will be removed."
                )
              ) {
                onResetBoard();
              }
            }}
          >
            ↺ Reset board to default
          </button>
        </div>

        <div className="modal-actions">
          <button className="icon-btn primary" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
