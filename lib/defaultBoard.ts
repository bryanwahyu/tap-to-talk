import { BoardState } from "./types";

/**
 * Sensible starter board so a first-time user (or reviewer) can communicate
 * immediately, with no setup. Covers the highest-frequency core vocabulary
 * used in AAC: basic needs, feelings, people, and quick social phrases.
 */
export const DEFAULT_BOARD: BoardState = {
  version: 1,
  categories: [
    { id: "core", name: "Core", emoji: "⭐" },
    { id: "needs", name: "Needs", emoji: "🙋" },
    { id: "feelings", name: "Feelings", emoji: "❤️" },
    { id: "people", name: "People", emoji: "👪" },
    { id: "places", name: "Places", emoji: "📍" },
  ],
  tiles: [
    // Core — the words used most often
    { id: "t-yes", label: "Yes", emoji: "👍", color: "green", categoryId: "core" },
    { id: "t-no", label: "No", emoji: "👎", color: "red", categoryId: "core" },
    { id: "t-i-want", label: "I want", emoji: "🤲", color: "blue", categoryId: "core" },
    { id: "t-stop", label: "Stop", emoji: "✋", color: "red", categoryId: "core" },
    { id: "t-more", label: "More", emoji: "➕", color: "green", categoryId: "core" },
    { id: "t-help", label: "Help", emoji: "🆘", color: "orange", categoryId: "core" },
    { id: "t-please", label: "Please", emoji: "🙏", color: "purple", categoryId: "core" },
    { id: "t-thanks", label: "Thank you", emoji: "💛", color: "yellow", categoryId: "core" },

    // Needs
    { id: "t-eat", label: "Eat", speak: "I am hungry", emoji: "🍎", color: "green", categoryId: "needs" },
    { id: "t-drink", label: "Drink", speak: "I am thirsty", emoji: "🥤", color: "blue", categoryId: "needs" },
    { id: "t-toilet", label: "Toilet", speak: "I need the toilet", emoji: "🚽", color: "teal", categoryId: "needs" },
    { id: "t-rest", label: "Rest", speak: "I want to rest", emoji: "🛌", color: "purple", categoryId: "needs" },
    { id: "t-pain", label: "Hurt", speak: "I am hurting", emoji: "🤕", color: "red", categoryId: "needs" },
    { id: "t-cold", label: "Cold", speak: "I am cold", emoji: "🥶", color: "blue", categoryId: "needs" },
    { id: "t-hot", label: "Hot", speak: "I am hot", emoji: "🥵", color: "orange", categoryId: "needs" },
    { id: "t-medicine", label: "Medicine", speak: "I need my medicine", emoji: "💊", color: "pink", categoryId: "needs" },

    // Feelings
    { id: "t-happy", label: "Happy", speak: "I feel happy", emoji: "😊", color: "yellow", categoryId: "feelings" },
    { id: "t-sad", label: "Sad", speak: "I feel sad", emoji: "😢", color: "blue", categoryId: "feelings" },
    { id: "t-angry", label: "Angry", speak: "I feel angry", emoji: "😠", color: "red", categoryId: "feelings" },
    { id: "t-scared", label: "Scared", speak: "I feel scared", emoji: "😨", color: "purple", categoryId: "feelings" },
    { id: "t-tired", label: "Tired", speak: "I feel tired", emoji: "😴", color: "teal", categoryId: "feelings" },
    { id: "t-sick", label: "Sick", speak: "I feel sick", emoji: "🤢", color: "green", categoryId: "feelings" },
    { id: "t-love", label: "Love you", speak: "I love you", emoji: "🥰", color: "pink", categoryId: "feelings" },
    { id: "t-ok", label: "I'm okay", speak: "I am okay", emoji: "🙂", color: "green", categoryId: "feelings" },

    // People
    { id: "t-mum", label: "Mum", emoji: "👩", color: "pink", categoryId: "people" },
    { id: "t-dad", label: "Dad", emoji: "👨", color: "blue", categoryId: "people" },
    { id: "t-me", label: "Me", emoji: "🙂", color: "yellow", categoryId: "people" },
    { id: "t-you", label: "You", emoji: "👉", color: "orange", categoryId: "people" },
    { id: "t-friend", label: "Friend", emoji: "🧑‍🤝‍🧑", color: "green", categoryId: "people" },
    { id: "t-nurse", label: "Nurse", emoji: "🧑‍⚕️", color: "teal", categoryId: "people" },
    { id: "t-teacher", label: "Teacher", emoji: "🧑‍🏫", color: "purple", categoryId: "people" },

    // Places
    { id: "t-home", label: "Home", speak: "I want to go home", emoji: "🏠", color: "orange", categoryId: "places" },
    { id: "t-outside", label: "Outside", speak: "I want to go outside", emoji: "🌳", color: "green", categoryId: "places" },
    { id: "t-school", label: "School", emoji: "🏫", color: "blue", categoryId: "places" },
    { id: "t-shop", label: "Shop", emoji: "🛒", color: "yellow", categoryId: "places" },
    { id: "t-bed", label: "Bed", emoji: "🛏️", color: "purple", categoryId: "places" },
  ],
};
