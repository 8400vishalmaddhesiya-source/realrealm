let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctx) return null;
  if (!audioCtx) {
    audioCtx = new Ctx();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function playTimerChime(): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const frequencies = [587.33, 880, 1174.66]; // D5 -> A5 -> D6 warm bell triad

  frequencies.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now + idx * 0.16);

    gain.gain.setValueAtTime(0.001, now + idx * 0.16);
    gain.gain.exponentialRampToValueAtTime(0.16, now + idx * 0.16 + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.16 + 0.9);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now + idx * 0.16);
    osc.stop(now + idx * 0.16 + 0.95);
  });
}

export function speakText(text: string, langCode = 'en-IN'): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = langCode;
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  } catch {
    // Ignore speech synthesis failures on unsupported environments
  }
}

export function stopSpeaking(): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  try {
    window.speechSynthesis.cancel();
  } catch {
    // Ignore
  }
}
