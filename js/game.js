import { rooms } from './rooms.js';
import { sleep, triggerGlitch } from './utils.js';
import { print, updateHUD, renderMap, playSound, pauseSound, clearOutput } from './ui.js';
import { handleCommand } from './commands.js';
import { saveGame, loadGame } from './storage.js';
import { narrator, getGroqNarration } from './narrator.js';
import { TEXTS, formatText } from './texts.js';

export class TextAdventure {
  constructor() {
    // Game state
    this.rooms = rooms;
    this.currentRoom = 'start';
    this.inventory = [];
    this.playerHealth = 50;
    this.playerAttack = 10;
    this.energy = 100;
    this.knowledge = 0;
    this.turns = 0;
    this.visited = new Set([this.currentRoom]);
    this.flags = { powerOut: false, oracleAwakened: false, vaultUnlocked: false };
    this.aggression = 0;

    // sound + audio
    this.soundEnabled = true;

    // Groq API / AI narrator
    this.groqEnabled = false;
    this.groqApiKey = null;
    this.groqModel = 'llama-3.1-8b-instant';
    this.groqEndpoint = 'https://api.groq.com/openai/v1/chat/completions';
    this.isLoadingGroq = false;

    // bind UI
    this.bindUI();
    // start
    this.bootSequence();
  }

  bindUI() {
    const form = document.getElementById('commandForm');
    if (form) form.addEventListener('submit', (e) => handleCommand(e, this));

    const saveBtn = document.getElementById('saveBtn');
    if (saveBtn) saveBtn.addEventListener('click', () => saveGame(this));

    const loadBtn = document.getElementById('loadBtn');
    if (loadBtn) loadBtn.addEventListener('click', () => loadGame(this));

    const clearBtn = document.getElementById('clearBtn');
    if (clearBtn) clearBtn.addEventListener('click', () => clearOutput());

    const soundBtn = document.getElementById('soundBtn');
    if (soundBtn) soundBtn.addEventListener('click', () => this.toggleSound());

    const apiBtn = document.getElementById('apiBtn');
    if (apiBtn) apiBtn.addEventListener('click', () => this.toggleGroqAPI());

    // focus behavior
    const outputEl = document.getElementById('output');
    const inputEl = document.getElementById('command');
    if (outputEl && inputEl) {
      outputEl.addEventListener('click', () => inputEl.focus());
    }

    // keyboard shortcuts for focusing input
    window.addEventListener('keydown', (ev) => {
      if ((ev.ctrlKey || ev.metaKey) && ev.key.toLowerCase() === 'k') {
        ev.preventDefault();
        const inEl = document.getElementById('command');
        if (inEl) inEl.focus();
      }
    });
  }

  async bootSequence() {
    const boot = document.getElementById('boot');
    const progress = document.getElementById('bootProgress');

    for (let i = 0; i <= 100; i += 4) {
      if (progress) progress.style.width = i + '%';
      await sleep(30 + Math.random() * 40);
    }

    if (boot) boot.style.display = 'none';

    await print(TEXTS.BOOT.BORDER, { system: true });
    await print(TEXTS.BOOT.WELCOME, { system: true });
    await print(TEXTS.BOOT.BORDER, { system: true });
    await sleep(200);
    await print(this.rooms[this.currentRoom].description, { typing: true });
    await print(TEXTS.BOOT.PROMPT);

    updateHUD(this);
    renderMap(this);

    // play ambient if allowed
    const ambient = document.getElementById('soundAmbient');
    if (this.soundEnabled && ambient) {
      try {
        ambient.volume = 0.15;
        await ambient.play().catch(() => {});
      } catch (e) {}
    }
  }

  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    const btn = document.getElementById('soundBtn');
    if (btn) btn.textContent = this.soundEnabled ? TEXTS.UI.BUTTONS.SOUND : TEXTS.UI.BUTTONS.SOUND_MUTED;

    const ambient = document.getElementById('soundAmbient');
    if (this.soundEnabled) {
      if (ambient) ambient.play().catch(() => {});
      playSound('soundDiscover'); // small audio feedback
    } else {
      if (ambient) try { ambient.pause(); } catch (e) {}
    }

    print(this.soundEnabled ? TEXTS.SYSTEM.SOUND_ENABLED : TEXTS.SYSTEM.SOUND_DISABLED, { system: true });
  }

  toggleGroqAPI() {
    // If currently enabled -> disable
    const apiBtn = document.getElementById('apiBtn');
    const aiStatus = document.getElementById('aiStatus');

    if (this.groqEnabled) {
      this.groqEnabled = false;
      this.groqApiKey = null;
      if (apiBtn) apiBtn.textContent = TEXTS.UI.BUTTONS.AI;
      if (aiStatus) {
        aiStatus.textContent = TEXTS.UI.STATUS.AI_DISABLED;
        aiStatus.style.color = '#ff6a6a';
      }
      print(TEXTS.SYSTEM.AI_DISABLED, { system: true });
      return;
    }

    // else prompt for key
    const key = prompt(TEXTS.SYSTEM.AI_KEY_PROMPT);
    if (!key || !key.trim()) {
      print(TEXTS.SYSTEM.AI_KEY_INVALID, { system: true });
      return;
    }

    this.groqApiKey = key.trim();
    this.groqEnabled = true;
    if (apiBtn) apiBtn.textContent = TEXTS.UI.BUTTONS.AI_ON;
    if (aiStatus) {
      aiStatus.textContent = TEXTS.UI.STATUS.AI_ACTIVE;
      aiStatus.style.color = '#4dff99';
    }
    print(TEXTS.SYSTEM.AI_ENABLED, { system: true });
  }

  /**
   * Returns narration string: tries Groq if enabled, otherwise local.
   * The commands module calls this after the action.
   */
  async getNarration(action) {
    if (this.groqEnabled) {
      // Show a small temporary system line while waiting
      await print(TEXTS.SYSTEM.AI_CONSULTING, { system: true });
      const narr = await getGroqNarration(this, action);
      // remove last "Consulting" line (best-effort)
      const out = document.getElementById('output');
      if (out && out.lastChild && out.lastChild.textContent?.includes('Consulting')) {
        try { out.removeChild(out.lastChild); } catch (e) {}
      }
      return narr;
    } else {
      return narrator(this, action);
    }
  }

  // small helper for external modules
  triggerGlitch() {
    try { triggerGlitch(); } catch (e) {}
  }
}
