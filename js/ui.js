import { TEXTS } from './texts.js';

export async function print(text, opts = {}) {
    const outputEl = document.getElementById('output');
    const p = document.createElement('div');
    p.className = 'line';

    if (opts.comment) p.classList.add('comment');
    if (opts.system) p.classList.add('system');

    if (opts.typing) {
        const span = document.createElement('span');
        span.className = 'typing';
        p.appendChild(span);
        outputEl.appendChild(p);
        outputEl.scrollTop = outputEl.scrollHeight;
        let i = 0;
        const speed = Math.max(6, 28 - Math.min(20, text.length / 6));
        return new Promise((resolve) => {
            const tick = () => {
                i++;
                span.textContent = text.slice(0, i);
                outputEl.scrollTop = outputEl.scrollHeight;
                if (i >= text.length) {
                    span.classList.remove('typing');
                    resolve();
                } else setTimeout(tick, speed + Math.random() * 12);
            };
            setTimeout(tick, 60);
        });
    } else {
        p.textContent = text;
        outputEl.appendChild(p);
        outputEl.scrollTop = outputEl.scrollHeight;
    }
}

export function clearOutput() {
    const outputEl = document.getElementById('output');
    outputEl.innerHTML = '';
    print(TEXTS.SYSTEM.SCREEN_CLEARED, { system: true });
}

export function playSound(id) {
    const sound = document.getElementById(id);
    if (!sound) return;
    sound.currentTime = 0;
    sound.volume = 0.3;
    sound.play().catch(() => { });
}

export function pauseSound(id) {
    const sound = document.getElementById(id);
    if (!sound) return;
    try { sound.pause(); } catch (e) { }
}

export function updateHUD(game) {
    const healthEl = document.getElementById('health');
    if (healthEl) healthEl.textContent = game.playerHealth;

    const attackEl = document.getElementById('attack');
    if (attackEl) attackEl.textContent = game.playerAttack;

    const inventoryEl = document.getElementById('inventory');
    if (inventoryEl) {
        inventoryEl.textContent = game.inventory.length ? game.inventory.join(', ') : TEXTS.UI.EMPTY_STATES.INVENTORY;
    }

    const energyBarEl = document.getElementById('energyBar');
    if (energyBarEl) energyBarEl.style.width = Math.max(0, game.energy) + '%';

    const knowledgeBarEl = document.getElementById('knowledgeBar');
    if (knowledgeBarEl) knowledgeBarEl.style.width = Math.min(100, game.knowledge) + '%';

    const turnsEl = document.getElementById('turns');
    if (turnsEl) turnsEl.textContent = game.turns;

    const roomNameEl = document.getElementById('roomName');
    if (roomNameEl) {
        roomNameEl.textContent = (game.rooms[game.currentRoom] && game.rooms[game.currentRoom].name) || TEXTS.UI.EMPTY_STATES.ROOM;
    }
}

export function renderMap(game) {
    const size = 5;
    let output = '';
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            const roomKey = Object.keys(game.rooms).find(
                (k) => game.rooms[k].x === x && game.rooms[k].y === y
            );
            if (roomKey && game.visited.has(roomKey))
                output += roomKey === game.currentRoom ? '[X]' : '[•]';
            else output += '[ ]';
        }
        output += '\n';
    }
    const mapEl = document.getElementById('map');
    if (mapEl) mapEl.textContent = output;
}
