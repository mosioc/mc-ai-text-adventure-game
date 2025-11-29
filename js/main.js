import { TextAdventure } from './game.js';
import { TEXTS } from './texts.js';

// Initialize UI with centralized texts
function initializeUI() {
    // Update title
    const title = document.getElementById('gameTitle');
    if (title) title.textContent = TEXTS.GAME_TITLE;
    
    const terminalTitle = document.getElementById('terminalTitle');
    if (terminalTitle) terminalTitle.textContent = TEXTS.GAME_TITLE;
    
    // Update boot screen
    const bootTitle = document.querySelector('[data-text="bootTitle"]');
    if (bootTitle) bootTitle.textContent = TEXTS.GAME_TITLE;
    
    const bootSubtitle = document.querySelector('[data-text="bootSubtitle"]');
    if (bootSubtitle) bootSubtitle.textContent = TEXTS.GAME_SUBTITLE;
    
    // Update save slots
    TEXTS.UI.SAVE_SLOTS.forEach((text, index) => {
        const option = document.querySelector(`[data-text="slot${index + 1}"]`);
        if (option) option.textContent = text;
    });
    
    // Update buttons
    const saveBtn = document.querySelector('[data-text="save"]');
    if (saveBtn) saveBtn.textContent = TEXTS.UI.BUTTONS.SAVE;
    
    const loadBtn = document.querySelector('[data-text="load"]');
    if (loadBtn) loadBtn.textContent = TEXTS.UI.BUTTONS.LOAD;
    
    const clearBtn = document.querySelector('[data-text="clear"]');
    if (clearBtn) clearBtn.textContent = TEXTS.UI.BUTTONS.CLEAR;
    
    const soundBtn = document.querySelector('[data-text="sound"]');
    if (soundBtn) soundBtn.textContent = TEXTS.UI.BUTTONS.SOUND;
    
    const aiBtn = document.querySelector('[data-text="ai"]');
    if (aiBtn) aiBtn.textContent = TEXTS.UI.BUTTONS.AI;
    
    const enterBtn = document.querySelector('[data-text="enter"]');
    if (enterBtn) enterBtn.textContent = TEXTS.UI.BUTTONS.ENTER;
    
    // Update placeholder
    const commandInput = document.querySelector('[data-text="commandPlaceholder"]');
    if (commandInput) commandInput.placeholder = TEXTS.UI.PLACEHOLDERS.COMMAND;
    
    // Update hints
    const hintControls = document.querySelector('[data-text="hintControls"]');
    if (hintControls) hintControls.textContent = TEXTS.UI.HINTS.CONTROLS;
    
    const hintObjective = document.querySelector('[data-text="hintObjective"]');
    if (hintObjective) hintObjective.textContent = TEXTS.UI.HINTS.OBJECTIVE;
    
    const hintAI = document.querySelector('[data-text="hintAI"]');
    if (hintAI) hintAI.textContent = TEXTS.UI.HINTS.AI_FEATURE;
    
    // Update status labels
    const statusTitle = document.querySelector('[data-text="statusTitle"]');
    if (statusTitle) statusTitle.textContent = '⚡ Status';
    
    const healthLabel = document.querySelector('[data-text="health"]');
    if (healthLabel) healthLabel.textContent = TEXTS.UI.STATUS.HEALTH;
    
    const attackLabel = document.querySelector('[data-text="attack"]');
    if (attackLabel) attackLabel.textContent = TEXTS.UI.STATUS.ATTACK;
    
    const energyLabel = document.querySelector('[data-text="energy"]');
    if (energyLabel) energyLabel.textContent = TEXTS.UI.STATUS.ENERGY;
    
    const knowledgeLabel = document.querySelector('[data-text="knowledge"]');
    if (knowledgeLabel) knowledgeLabel.textContent = TEXTS.UI.STATUS.KNOWLEDGE;
    
    const aiNarratorLabel = document.querySelector('[data-text="aiNarrator"]');
    if (aiNarratorLabel) aiNarratorLabel.textContent = TEXTS.UI.STATUS.AI_NARRATOR;
    
    const aiDisabledLabel = document.querySelector('[data-text="aiDisabled"]');
    if (aiDisabledLabel) aiDisabledLabel.textContent = TEXTS.UI.STATUS.AI_DISABLED;
    
    const aiDescription = document.querySelector('[data-text="aiDescription"]');
    if (aiDescription) aiDescription.textContent = TEXTS.UI.STATUS.AI_DESCRIPTION;
    
    const inventoryLabel = document.querySelector('[data-text="inventory"]');
    if (inventoryLabel) inventoryLabel.textContent = TEXTS.UI.STATUS.INVENTORY;
    
    const mapLabel = document.querySelector('[data-text="map"]');
    if (mapLabel) mapLabel.textContent = TEXTS.UI.STATUS.MAP;
    
    const turnsLabel = document.querySelector('[data-text="turns"]');
    if (turnsLabel) turnsLabel.textContent = TEXTS.UI.STATUS.TURNS;
    
    const roomLabel = document.querySelector('[data-text="room"]');
    if (roomLabel) roomLabel.textContent = TEXTS.UI.STATUS.ROOM;
    
    const startRoomLabel = document.querySelector('[data-text="startRoom"]');
    if (startRoomLabel) startRoomLabel.textContent = TEXTS.UI.ROOMS.START;
    
    const emptyInventory = document.querySelector('[data-text="emptyInventory"]');
    if (emptyInventory) emptyInventory.textContent = TEXTS.UI.EMPTY_STATES.INVENTORY;
}

window.addEventListener('DOMContentLoaded', () => {
    initializeUI();
    window.game = new TextAdventure();
});
