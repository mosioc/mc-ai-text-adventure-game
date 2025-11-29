export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export function triggerGlitch() {
    const terminal = document.querySelector('.terminal');
    if (!terminal) return;
    terminal.classList.add('glitch');
    setTimeout(() => terminal.classList.remove('glitch'), 900);
}
