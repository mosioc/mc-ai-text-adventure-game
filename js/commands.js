import { print, playSound, updateHUD, renderMap } from './ui.js';
import { narrator } from './narrator.js';
import { triggerGlitch } from './utils.js';
import { TEXTS, formatText, getRandomText } from './texts.js';

export async function handleCommand(e, game) {
    e?.preventDefault();
    const raw = (document.getElementById('command').value || '').trim();
    if (!raw) return;
    document.getElementById('command').value = '';

    await print('> ' + raw);
    const input = raw.toLowerCase();
    const [verb, ...args] = input.split(/\s+/);
    const rest = args.join(' ');

    // Increment turn counter and apply energy costs
    game.turns++;
    game.energy = Math.max(0, game.energy - 2);

    let output = '';

    switch (verb) {
        case 'look':
        case 'l':
            output = game.rooms[game.currentRoom].description;
            if (game.rooms[game.currentRoom].items?.length) {
                output += ' You see: ' + game.rooms[game.currentRoom].items.join(', ') + '.';
            }
            break;
        case 'north':
        case 'south':
        case 'east':
        case 'west':
            const next = game.rooms[game.currentRoom].exits?.[verb];
            if (next) {
                game.currentRoom = next;
                game.visited.add(next);
                output = game.rooms[next].description;
                playSound('soundDiscover');
            } else output = TEXTS.COMMANDS.CANNOT_GO;
            break;
        case 'take':
        case 'get':
            if (game.rooms[game.currentRoom].items?.includes(rest)) {
                game.inventory.push(rest);
                game.rooms[game.currentRoom].items = game.rooms[game.currentRoom].items.filter(i => i !== rest);
                output = formatText(TEXTS.COMMANDS.TAKE_SUCCESS, { item: rest });
                playSound('soundDiscover');

                // Item-specific bonuses
                if (rest === 'datachip') {
                    game.knowledge = Math.min(100, game.knowledge + 10);
                    output += TEXTS.ITEMS.DATACHIP.TAKE_BONUS;
                } else if (rest === 'book') {
                    game.knowledge = Math.min(100, game.knowledge + 15);
                    output += TEXTS.ITEMS.BOOK.TAKE_BONUS;
                } else if (rest === 'keycard') {
                    output += TEXTS.ITEMS.KEYCARD.TAKE_BONUS;
                }
            } else {
                output = TEXTS.COMMANDS.TAKE_FAIL;
            }
            break;
        case 'inspect':
        case 'examine':
            output = await inspect(game, rest);
            break;
        case 'use':
            output = await useItem(game, rest);
            break;
        case 'rest':
        case 'sleep':
            game.energy = Math.min(100, game.energy + 40);
            game.playerHealth = Math.min(50, game.playerHealth + 10);
            output = TEXTS.COMMANDS.REST_SUCCESS;
            break;
        case 'inventory':
        case 'i':
            output = game.inventory.length ?
                formatText(TEXTS.COMMANDS.INVENTORY_ITEMS, { items: game.inventory.join(', ') }) :
                TEXTS.COMMANDS.INVENTORY_EMPTY;
            output += formatText(TEXTS.COMMANDS.INVENTORY_STATS, { health: game.playerHealth, energy: game.energy, knowledge: game.knowledge });
            break;
        case 'decode':
            if (game.knowledge >= 30) {
                playSound('soundDiscover');
                game.knowledge = Math.min(100, game.knowledge + 10);
                const fragment = getRandomText(TEXTS.FRAGMENTS);
                output = formatText(TEXTS.COMMANDS.DECODE_SUCCESS, { fragment });

                if (game.knowledge >= 80) {
                    output += TEXTS.COMMANDS.DECODE_ORACLE_AWAKENED;
                    game.flags.oracleAwakened = true;
                }
            } else {
                output = TEXTS.COMMANDS.DECODE_INSUFFICIENT;
            }
            break;
        case 'end':
        case 'finish':
            triggerEnding(game);
            return;
        case 'help':
            output = TEXTS.COMMANDS.HELP;
            break;
        default:
            output = TEXTS.COMMANDS.UNKNOWN;
    }

    await print(output);
    await print(await game.getNarration(raw), { comment: true });
    updateHUD(game);
    renderMap(game);
}

async function inspect(game, target) {
    if (!target) return TEXTS.COMMANDS.INSPECT_WHAT;

    // Inspect room
    if (['room', 'here', 'area', 'walls'].includes(target)) {
        game.knowledge = Math.min(100, game.knowledge + 6);
        return getRandomText(TEXTS.INSPECT.ROOM_INSIGHTS);
    }

    // Inspect inventory items
    if (game.inventory.includes(target)) {
        game.knowledge = Math.min(100, game.knowledge + 8);

        if (target === 'datachip') {
            return TEXTS.ITEMS.DATACHIP.INSPECT;
        } else if (target === 'book') {
            return TEXTS.ITEMS.BOOK.INSPECT;
        } else if (target === 'keycard') {
            return TEXTS.ITEMS.KEYCARD.INSPECT;
        }

        return formatText(TEXTS.INSPECT.ITEM_GENERIC, { item: target });
    }

    // Inspect items in room
    if (game.rooms[game.currentRoom].items?.includes(target)) {
        game.knowledge = Math.min(100, game.knowledge + 5);
        return formatText(TEXTS.INSPECT.ITEM_IN_ROOM, { item: target });
    }

    return formatText(TEXTS.COMMANDS.INSPECT_NOT_FOUND, { target });
}

async function useItem(game, rest) {
    if (!rest) return TEXTS.COMMANDS.USE_WHAT;

    // Parse "use X on Y" format
    const match = rest.match(/(.+) on (.+)/);

    if (match) {
        const item = match[1].trim();
        const target = match[2].trim();

        if (!game.inventory.includes(item)) {
            return formatText(TEXTS.COMMANDS.USE_DONT_HAVE, { item });
        }

        // Specific use cases
        if (item === 'datachip' && target === 'port' && game.currentRoom === 'control') {
            game.knowledge = Math.min(100, game.knowledge + 20);
            playSound('soundDiscover');
            return TEXTS.ITEMS.DATACHIP.USE_ON_PORT;
        }

        if (item === 'datachip' && target === 'console' && game.currentRoom === 'lab') {
            game.knowledge = Math.min(100, game.knowledge + 12);
            return TEXTS.ITEMS.DATACHIP.USE_ON_CONSOLE;
        }

        if (item === 'keycard' && target === 'vault' && game.currentRoom === 'vault') {
            game.flags.vaultUnlocked = true;
            game.knowledge = Math.min(100, game.knowledge + 25);
            playSound('soundDiscover');
            return TEXTS.ITEMS.KEYCARD.USE_ON_VAULT;
        }

        if (item === 'book' && target === 'pedestal' && game.currentRoom === 'archive') {
            game.knowledge = Math.min(100, game.knowledge + 18);
            return TEXTS.ITEMS.BOOK.USE_ON_PEDESTAL;
        }

        return formatText(TEXTS.COMMANDS.USE_NO_EFFECT, { item, target });
    } else {
        // Simple use (no target)
        const item = rest.trim();

        if (!game.inventory.includes(item)) {
            return formatText(TEXTS.COMMANDS.USE_DONT_HAVE, { item });
        }

        if (item === 'datachip') {
            game.knowledge = Math.min(100, game.knowledge + 8);
            return TEXTS.ITEMS.DATACHIP.USE_SIMPLE;
        }

        if (item === 'book') {
            game.knowledge = Math.min(100, game.knowledge + 10);
            return TEXTS.ITEMS.BOOK.USE_SIMPLE;
        }

        if (item === 'keycard') {
            return TEXTS.ITEMS.KEYCARD.USE_SIMPLE;
        }

        return formatText(TEXTS.COMMANDS.USE_SIMPLE_NO_EFFECT, { item });
    }
}

function triggerEnding(game) {
    // Knowledge-based endings
    print(TEXTS.BOOT.BORDER, { system: true });

    if (game.knowledge >= 80) {
        playSound('soundDiscover');
        print(TEXTS.ENDINGS.ASCENSION.ORACLE_SPEAKS, { comment: true });
        print(TEXTS.ENDINGS.ASCENSION.DISSOLVE, { comment: true });
        print(TEXTS.ENDINGS.ASCENSION.BECOME_ONE, { comment: true });
        print(TEXTS.ENDINGS.ASCENSION.TITLE, { system: true });
    } else if (game.knowledge >= 50) {
        playSound('soundDiscover');
        print(TEXTS.ENDINGS.LIBERATION.UNDERSTAND, { comment: true });
        print(TEXTS.ENDINGS.LIBERATION.OVERLOAD, { comment: true });
        print(TEXTS.ENDINGS.LIBERATION.RELEASE, { comment: true });
        print(TEXTS.ENDINGS.LIBERATION.TITLE, { system: true });
    } else if (game.knowledge >= 25) {
        print(TEXTS.ENDINGS.PARTIAL_KNOWLEDGE.FRAGMENTS, { comment: true });
        print(TEXTS.ENDINGS.PARTIAL_KNOWLEDGE.ALLOWED, { comment: true });
        print(TEXTS.ENDINGS.PARTIAL_KNOWLEDGE.QUESTIONS, { comment: true });
        print(TEXTS.ENDINGS.PARTIAL_KNOWLEDGE.TITLE, { system: true });
    } else {
        print(TEXTS.ENDINGS.FORGOTTEN.WANDER, { comment: true });
        print(TEXTS.ENDINGS.FORGOTTEN.LOSE_INTEREST, { comment: true });
        print(TEXTS.ENDINGS.FORGOTTEN.TITLE, { system: true });
    }

    print(TEXTS.BOOT.BORDER, { system: true });
    document.getElementById('command').disabled = true;
}
