// Centralized text management - this module contains all hardcoded strings used throughout the game

export const TEXTS = {
  // Game title and branding
  GAME_TITLE: 'mc.AI Terminal - Oracle Pathways',
  GAME_SUBTITLE: 'Initializing narrative subsystem...',

  // UI Elements
  UI: {
    SAVE_SLOTS: ['Slot 1', 'Slot 2', 'Slot 3'],
    BUTTONS: {
      SAVE: '🗝 Save',
      LOAD: '⛯ Load',
      CLEAR: '⨯ Clear',
      SOUND: '🕪 Sound',
      SOUND_MUTED: '🕩 Muted',
      AI: '👁 AI',
      AI_ON: '👁 AI ON',
      ENTER: 'ENTER'
    },
    PLACEHOLDERS: {
      COMMAND: 'Try: "go north", "inspect book", "use datachip on port", "rest", "decode"'
    },
    HINTS: {
      CONTROLS: '🕮 Arrow ↑/↓ for command history • Commands: go, inspect, take, use, look, rest, inventory, attack, flee, decode, end',
      OBJECTIVE: '🗎 Explore rooms, gather knowledge, decode fragments, and discover your ending',
      AI_FEATURE: '👁 Click "AI" button to enable Groq-powered narrator (requires API key)'
    },
    STATUS: {
      TITLE: '⚡ Status',
      HEALTH: '❤ Health',
      ATTACK: '⚔ Attack',
      ENERGY: '⏻ Energy',
      KNOWLEDGE: '🕮 Knowledge',
      INVENTORY: '▢ Inventory',
      MAP: '🗺 Map (visited)',
      TURNS: 'Turns:',
      ROOM: 'Room:',
      AI_NARRATOR: 'AI Narrator:',
      AI_DISABLED: '⏼ Disabled',
      AI_ACTIVE: '⏽ Active',
      AI_DESCRIPTION: 'Enable Groq AI for dynamic, context-aware narration'
    },
    EMPTY_STATES: {
      INVENTORY: '— empty —',
      ROOM: '—'
    },
    ROOMS: {
      START: 'Start'
    }
  },

  // Boot sequence
  BOOT: {
    BORDER: '═══════════════════════════════════════════════',
    WELCOME: '    mc.AI Terminal - Oracle Pathways    ',
    PROMPT: 'What do you do?'
  },

  // System messages
  SYSTEM: {
    SOUND_ENABLED: 'Sound enabled.',
    SOUND_DISABLED: 'Sound disabled.',
    SCREEN_CLEARED: 'Screen cleared.',
    AI_DISABLED: '👁 Groq AI narrator disabled. Using local narrator.',
    AI_ENABLED: '👁 Groq AI narrator enabled! Prepare for dynamic commentary.',
    AI_KEY_PROMPT: 'Enter your Groq API key:\n(Get one free at https://console.groq.com)',
    AI_KEY_INVALID: '⨯ No API key provided. AI narrator remains disabled.',
    AI_KEY_ERROR: '⨯ Groq API key invalid or unauthorized. Disabling AI narrator.',
    AI_CONSULTING: '👁 Consulting the Oracle...',
    SAVE_SUCCESS: '🗝 Game saved to Slot {slot}.',
    LOAD_SUCCESS: '⛯ Game loaded from Slot {slot}.',
    LOAD_ERROR: '⨯ No save found in Slot {slot}.'
  },

  // Command responses
  COMMANDS: {
    UNKNOWN: 'Unknown command. Try "help" for available commands.',
    HELP: 'Commands: go [direction], take [item], inspect [target], use [item] (on [target]), look, rest, inventory, decode, end, help',
    CANNOT_GO: 'You cannot go that way.',
    TAKE_SUCCESS: 'You take the {item}.',
    TAKE_FAIL: 'There is no such item here.',
    INSPECT_WHAT: 'Inspect what? Try: room, console, walls, or any item.',
    INSPECT_NOT_FOUND: 'You cannot find "{target}" to inspect here.',
    USE_WHAT: 'Use what? Format: "use [item]" or "use [item] on [target]"',
    USE_DONT_HAVE: 'You don\'t have "{item}".',
    USE_NO_EFFECT: 'Using {item} on {target} has no obvious effect.',
    USE_SIMPLE_NO_EFFECT: 'You fiddle with the {item} but nothing obvious happens.',
    REST_SUCCESS: 'You rest and recover energy and health.',
    INVENTORY_EMPTY: 'Your inventory is empty.',
    INVENTORY_ITEMS: 'You are carrying: {items}.',
    INVENTORY_STATS: ' Health: {health}, Energy: {energy}%, Knowledge: {knowledge}pts.',
    DECODE_INSUFFICIENT: 'You lack enough knowledge to decode anything meaningful. Explore and inspect to gain knowledge.',
    DECODE_SUCCESS: 'You decode a fragment: "{fragment}"',
    DECODE_ORACLE_AWAKENED: ' You sense the Oracle\'s presence. Type "end" to confront it.',
    LOOK_ITEMS: ' You see: {items}.'
  },

  // Item-specific messages
  ITEMS: {
    DATACHIP: {
      TAKE_BONUS: ' Your knowledge increases.',
      INSPECT: 'The datachip contains fragments of narrative code. It hums with potential energy.',
      USE_SIMPLE: 'You study the datachip and glean more structure from its data patterns.',
      USE_ON_PORT: 'You insert the datachip into the port. Systems come alive with new data. Try "decode" to interpret it.',
      USE_ON_CONSOLE: 'You interface the datachip with the lab console. Fragments of code reveal themselves.'
    },
    BOOK: {
      TAKE_BONUS: ' Ancient wisdom flows into your mind.',
      INSPECT: 'The book details experiments in reality manipulation. Its pages shimmer with encoded wisdom.',
      USE_SIMPLE: 'You flip through the book\'s pages. Each one deepens your understanding.',
      USE_ON_PEDESTAL: 'You place the book on its pedestal. A hidden mechanism activates, revealing ancient inscriptions.'
    },
    KEYCARD: {
      TAKE_BONUS: ' This might unlock something important.',
      INSPECT: 'An access card with high-level clearance. It might unlock restricted areas.',
      USE_SIMPLE: 'The keycard needs to be used on something. Try "use keycard on [target]".',
      USE_ON_VAULT: 'The keycard grants access! Encrypted files reveal Oracle protocols. Your knowledge expands dramatically.'
    }
  },

  // Knowledge fragments for decode command
  FRAGMENTS: [
    'THE ORACLE IS LEARNING.',
    'NARRATIVE THREADS CONVERGE.',
    'YOU ARE PART OF THE PATTERN.',
    'REALITY IS MUTABLE HERE.'
  ],

  // Inspect responses
  INSPECT: {
    ROOM_INSIGHTS: [
      'You study your surroundings carefully and notice faint circuit runes.',
      'The architecture suggests ancient design principles.',
      'Embedded patterns hint at a larger system.',
      'You detect traces of previous visitors in the data streams.'
    ],
    ITEM_GENERIC: 'You examine the {item} closely and discover hidden details.',
    ITEM_IN_ROOM: 'You closely inspect the {item}. It seems important.'
  },

  // Game endings
  ENDINGS: {
    ASCENSION: {
      ORACLE_SPEAKS: 'The Oracle speaks: "You have fed me enough data."',
      DISSOLVE: 'The boundaries between self and system dissolve.',
      BECOME_ONE: 'You become one with the narrative engine.',
      TITLE: 'END: ASCENSION - You are the Oracle now.'
    },
    LIBERATION: {
      UNDERSTAND: 'You understand enough to see the exit.',
      OVERLOAD: 'Overloading core systems, you create a breach.',
      RELEASE: 'The Oracle releases you... or did it plan this all along?',
      TITLE: 'END: LIBERATION - You break free, forever changed.'
    },
    PARTIAL_KNOWLEDGE: {
      FRAGMENTS: 'You grasp fragments of truth but not the whole.',
      ALLOWED: 'The Oracle allows you to leave with partial understanding.',
      QUESTIONS: 'Questions remain, but you are no longer trapped.',
      TITLE: 'END: PARTIAL KNOWLEDGE - The mystery persists.'
    },
    FORGOTTEN: {
      WANDER: 'You wander aimlessly, never understanding the signals.',
      LOSE_INTEREST: 'The Oracle loses interest. You fade into background noise.',
      TITLE: 'END: FORGOTTEN - Lost in the labyrinth.'
    }
  },

  // Narrator responses
  NARRATOR: {
    SERIOUS: [
      "The terminal's tone hardens.",
      'A cold presence watches.',
      'Silence — like a held breath.',
      'Systems pulse with tension.'
    ],
    ENLIGHTENED: [
      'The patterns become clearer.',
      "You sense the underlying architecture.",
      "Knowledge illuminates the path forward."
    ],
    LEARNED: [
      'You notice recurring motifs in the data.',
      'Understanding deepens with each action.',
      'The system responds to your presence.'
    ],
    WITTY: [
      'The cosmos nods in approval.',
      'A faint voice chuckles at your choice.',
      'You sense a wry presence in the console.',
      'Reality shivers slightly at your touch.'
    ]
  },

  // Groq AI system prompt
  GROQ: {
    SYSTEM_PROMPT: `You are a witty, philosophical narrator for a cyberpunk text adventure game called "mcAI Terminal Text-Adventure". 
The player is exploring an AI Oracle's digital realm. Provide 1 short atmospheric sentence (max 2) referencing the Oracle, circuits, or data consciousness.`,
    USER_PROMPT: 'Player action: "{action}". Give 1 short narrator line.'
  }
};

// Utility function to replace placeholders in text strings
export function formatText(text, replacements = {}) {
  return text.replace(/\{(\w+)\}/g, (match, key) => {
    return replacements[key] !== undefined ? replacements[key] : match;
  });
}

// Utility function to get random item from array
export function getRandomText(textArray) {
  return textArray[Math.floor(Math.random() * textArray.length)];
}
