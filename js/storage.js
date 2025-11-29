// js/storage.js
import { print, playSound, updateHUD, renderMap } from './ui.js';
import { TEXTS, formatText } from './texts.js';

export function saveGame(game) {
    const slot = document.getElementById('saveSlot').value;
    const key = `mcAITerminal_slot${slot}`;
    const state = {
        currentRoom: game.currentRoom,
        inventory: game.inventory,
        playerHealth: game.playerHealth,
        playerAttack: game.playerAttack,
        energy: game.energy,
        knowledge: game.knowledge,
        turns: game.turns,
        visited: Array.from(game.visited),
        rooms: game.rooms,
        flags: game.flags,
        aggression: game.aggression
    };
    localStorage.setItem(key, JSON.stringify(state));
    print(formatText(TEXTS.SYSTEM.SAVE_SUCCESS, { slot }), { system: true });
    playSound('soundDiscover');
}

export function loadGame(game) {
    const slot = document.getElementById('saveSlot').value;
    const key = `mcAITerminal_slot${slot}`;
    const data = localStorage.getItem(key);
    if (!data) {
        print(formatText(TEXTS.SYSTEM.LOAD_ERROR, { slot }), { system: true });
        return;
    }
    const s = JSON.parse(data);
    Object.assign(game, s);
    game.visited = new Set(s.visited);
    print(formatText(TEXTS.SYSTEM.LOAD_SUCCESS, { slot }), { system: true });
    print(game.rooms[game.currentRoom].description);
    playSound('soundDiscover');
    updateHUD(game);
    renderMap(game);
}
