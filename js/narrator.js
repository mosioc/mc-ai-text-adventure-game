import { print } from './ui.js';
import { TEXTS, getRandomText } from './texts.js';

export function random(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

export async function narrator(game, action) {
    const ag = game.aggression;
    const k = game.knowledge;

    if (ag > 8) {
        return getRandomText(TEXTS.NARRATOR.SERIOUS);
    }

    if (k >= 60) {
        return getRandomText(TEXTS.NARRATOR.ENLIGHTENED);
    }

    if (k >= 30) {
        return getRandomText(TEXTS.NARRATOR.LEARNED);
    }

    // Default witty responses
    return getRandomText(TEXTS.NARRATOR.WITTY);
}

/**
 * Attempts to get a short narrator string from Groq API.
 * If Groq disabled, missing key, or request fails, falls back to local narrator.
 *
 */
export async function getGroqNarration(game, action) {
    // validation
    if (!game.groqEnabled || !game.groqApiKey || game.isLoadingGroq) {
        return narrator(game, action);
    }

    game.isLoadingGroq = true;

    try {
        const systemPrompt = TEXTS.GROQ.SYSTEM_PROMPT;

        const body = {
            model: game.groqModel || 'llama-3.1-8b-instant',
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: TEXTS.GROQ.USER_PROMPT.replace('{action}', action) }
            ],
            max_tokens: 60,
            temperature: 0.8
        };

        const resp = await fetch(game.groqEndpoint, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${game.groqApiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        if (!resp.ok) {
            // handle 401/403 explicitly
            if (resp.status === 401 || resp.status === 403) {
                // disable Groq to prevent loops and set UI state via game.toggleGroqAPI handler
                print(TEXTS.SYSTEM.AI_KEY_ERROR, { system: true });
                game.groqEnabled = false;
                // don't try to update DOM here; game.toggleGroqAPI handles UI text normally when toggled on/off
            }
            // fallback
            return narrator(game, action);
        }

        const data = await resp.json().catch(() => null);
        const narration = data?.choices?.[0]?.message?.content?.trim?.();
        if (narration) return narration;

        return narrator(game, action);
    } catch (err) {
        // Common causes: network failure, CORS in browser, endpoint down
        console.warn('Groq narration error:', err);
        return narrator(game, action);
    } finally {
        game.isLoadingGroq = false;
    }
}
