export const rooms = {
    start: {
        name: 'Neon Chamber',
        x: 2, y: 2,
        description:
            'You wake in a neon-lit chamber. Circuit patterns pulse on the walls. Doors lead north (hallway) and east (lab).',
        exits: { north: 'hallway', east: 'lab' },
        items: []
    },
    hallway: {
        name: 'Hallway',
        x: 2, y: 1,
        description:
            'A corridor with flickering lights. The air hums with electricity. Doors: south (chamber), east (control), west (archive).',
        exits: { south: 'start', east: 'control', west: 'archive' },
        items: []
    },
    lab: {
        name: 'Data Lab',
        x: 3, y: 2,
        description:
            'A lab full of broken consoles and scattered datachips. One glints on a console.',
        exits: { west: 'start', north: 'vault' },
        items: ['datachip']
    },
    control: {
        name: 'Control Room',
        x: 3, y: 1,
        description:
            'Control room humming with server racks. A port awaits data input. Exit west to hallway.',
        exits: { west: 'hallway' },
        items: []
    },
    archive: {
        name: 'Archive',
        x: 1, y: 1,
        description:
            'Dusty archives with old terminals. A mysterious book rests on a pedestal.',
        exits: { east: 'hallway', south: 'sanctum' },
        items: ['book'],
        enemies: [{ name: 'sentinel', health: 30, attack: 6 }]
    },
    vault: {
        name: 'Vault',
        x: 3, y: 0,
        description:
            'A secure vault with encrypted terminals. The air is cold and still.',
        exits: { south: 'lab' },
        items: ['keycard']
    },
    sanctum: {
        name: 'Oracle Sanctum',
        x: 1, y: 2,
        description:
            "The Oracle's inner sanctum. Ancient code scrolls across holographic displays.",
        exits: { north: 'archive' },
        items: []
    }
};
