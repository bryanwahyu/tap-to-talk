import { Settings } from "./types";

/**
 * Thin wrapper around the browser SpeechSynthesis API.
 * No network, no API keys — works offline once the page is loaded,
 * which matters for an AAC tool people rely on day to day.
 */

export function speechSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export function getVoices(): SpeechSynthesisVoice[] {
  if (!speechSupported()) return [];
  return window.speechSynthesis.getVoices();
}

/**
 * Voice list loads asynchronously in most browsers. This resolves once
 * voices are available (or after a short timeout, returning whatever we have).
 */
export function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    if (!speechSupported()) return resolve([]);
    const existing = window.speechSynthesis.getVoices();
    if (existing.length > 0) return resolve(existing);

    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      resolve(window.speechSynthesis.getVoices());
    };
    window.speechSynthesis.onvoiceschanged = finish;
    // Fallback in case the event never fires (some browsers).
    setTimeout(finish, 1000);
  });
}

export function speak(text: string, settings: Settings): void {
  if (!speechSupported() || !text.trim()) return;

  // Cancel anything queued so taps feel immediate rather than stacking up.
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = settings.rate;
  utterance.pitch = settings.pitch;

  if (settings.voiceURI) {
    const voice = getVoices().find((v) => v.voiceURI === settings.voiceURI);
    if (voice) utterance.voice = voice;
  }

  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking(): void {
  if (speechSupported()) window.speechSynthesis.cancel();
}
