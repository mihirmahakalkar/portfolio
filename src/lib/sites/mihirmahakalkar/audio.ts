type ToneLayer = {
  kind: "tone";
  waveform: OscillatorType;
  frequency: number;
  attack: number;
  decay: number;
  peak: number;
  offset?: number;
  detune?: number;
  glideTo?: number;
  glideTime?: number;
};

type Shimmer = {
  delay: number;
  feedback: number;
  wet: number;
  lowpass: number;
};

type Preset = {
  masterGain: number;
  layers: ToneLayer[];
  shimmer?: Shimmer;
};

const PRESETS = {
  success: {
    masterGain: 0.5,
    layers: [
      {
        kind: "tone",
        waveform: "sine",
        frequency: 880,
        attack: 0.004,
        decay: 0.09,
        peak: 0.06,
      },
      {
        kind: "tone",
        waveform: "sine",
        frequency: 1108.73,
        offset: 0.06,
        attack: 0.004,
        decay: 0.1,
        peak: 0.06,
      },
      {
        kind: "tone",
        waveform: "sine",
        frequency: 1318.51,
        offset: 0.12,
        attack: 0.004,
        decay: 0.18,
        peak: 0.07,
      },
    ],
    shimmer: { delay: 0.1, feedback: 0.22, wet: 0.16, lowpass: 4500 },
  },
} satisfies Record<string, Preset>;

type PresetName = keyof typeof PRESETS;

const MIN_GAIN = 0.0001;

let ctx: AudioContext | null = null;

function audioContext(): AudioContext | null {
  if (ctx) return ctx;
  if (typeof window === "undefined") return null;
  const Ctor =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!Ctor) return null;
  try {
    ctx = new Ctor();
  } catch {
    return null;
  }
  return ctx;
}

function buildShimmer(
  ac: AudioContext,
  input: AudioNode,
  output: AudioNode,
  opts: Shimmer,
): AudioNode[] {
  const delay = ac.createDelay(1);
  delay.delayTime.value = opts.delay;
  const lowpass = ac.createBiquadFilter();
  lowpass.type = "lowpass";
  lowpass.frequency.value = opts.lowpass;
  const feedback = ac.createGain();
  feedback.gain.value = opts.feedback;
  const wet = ac.createGain();
  wet.gain.value = opts.wet;

  input.connect(delay);
  delay.connect(lowpass);
  lowpass.connect(feedback);
  feedback.connect(delay);
  lowpass.connect(wet);
  wet.connect(output);

  return [delay, lowpass, feedback, wet];
}

/** How long the feedback loop keeps ringing after the last layer stops. */
function shimmerTail(opts?: Shimmer): number {
  if (!opts || opts.feedback <= 0) return 0;
  if (opts.feedback >= 1) return opts.delay;
  return opts.delay * (1 + Math.ceil(Math.log(0.001) / Math.log(opts.feedback)));
}

function render(ac: AudioContext, preset: Preset): void {
  const now = ac.currentTime;
  const master = ac.createGain();
  master.gain.value = preset.masterGain;
  master.connect(ac.destination);

  const shimmer = preset.shimmer
    ? buildShimmer(ac, master, ac.destination, preset.shimmer)
    : [];

  for (const layer of preset.layers) {
    const start = now + (layer.offset ?? 0);
    const osc = ac.createOscillator();
    osc.type = layer.waveform;
    osc.frequency.setValueAtTime(layer.frequency, start);
    if (layer.detune) osc.detune.value = layer.detune;
    if (layer.glideTo !== undefined) {
      const glide = layer.glideTime ?? layer.attack + layer.decay;
      osc.frequency.exponentialRampToValueAtTime(layer.glideTo, start + glide);
    }
    const env = ac.createGain();
    env.gain.setValueAtTime(MIN_GAIN, start);
    env.gain.exponentialRampToValueAtTime(layer.peak, start + layer.attack);
    env.gain.exponentialRampToValueAtTime(
      MIN_GAIN,
      start + layer.attack + layer.decay,
    );
    osc.connect(env).connect(master);
    osc.start(start);
    osc.stop(start + layer.attack + layer.decay + 0.05);
  }

  const span =
    Math.max(
      ...preset.layers.map((l) => (l.offset ?? 0) + l.attack + l.decay + 0.05),
    ) +
    shimmerTail(preset.shimmer) +
    0.05;

  setTimeout(() => {
    master.disconnect();
    for (const node of shimmer) node.disconnect();
  }, span * 1000);
}

/** Short melodic confirmation chime, played on a successful copy. */
export function playChime(name: PresetName = "success"): void {
  const preset = PRESETS[name];
  if (!preset) return;
  const ac = audioContext();
  if (!ac) return;
  if (ac.state === "running") {
    render(ac, preset);
    return;
  }
  try {
    ac.resume().then(
      () => {
        if (ac.state === "running") render(ac, preset);
      },
      () => {},
    );
  } catch {
    // An AudioContext that refuses to resume just stays silent.
  }
}

/** Dry mechanical tick, played when an outbound link is activated. */
export function playTick(): void {
  const ac = audioContext();
  if (!ac) return;

  const emit = () => {
    const now = ac.currentTime;
    const master = ac.createGain();
    master.gain.value = 0.35;
    master.connect(ac.destination);

    const length = Math.ceil(0.067 * ac.sampleRate);
    const buffer = ac.createBuffer(1, length, ac.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;

    const noise = ac.createBufferSource();
    noise.buffer = buffer;
    const band = ac.createBiquadFilter();
    band.type = "bandpass";
    band.frequency.value = 3000;
    band.Q.value = 1.5;
    const noiseEnv = ac.createGain();
    noiseEnv.gain.setValueAtTime(MIN_GAIN, now);
    noiseEnv.gain.exponentialRampToValueAtTime(0.12, now + 0.001);
    noiseEnv.gain.exponentialRampToValueAtTime(MIN_GAIN, now + 0.017);
    noise.connect(band).connect(noiseEnv).connect(master);
    noise.start(now);
    noise.stop(now + 0.067);

    const osc = ac.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(1800, now);
    const oscEnv = ac.createGain();
    oscEnv.gain.setValueAtTime(MIN_GAIN, now);
    oscEnv.gain.exponentialRampToValueAtTime(0.014, now + 0.001);
    oscEnv.gain.exponentialRampToValueAtTime(MIN_GAIN, now + 0.015);
    osc.connect(oscEnv).connect(master);
    osc.start(now);
    osc.stop(now + 0.067);

    setTimeout(() => master.disconnect(), 117);
  };

  if (ac.state === "running") {
    emit();
    return;
  }
  try {
    ac.resume().then(() => {
      if (ac.state === "running") emit();
    }, () => {});
  } catch {
    // Same as above: silence rather than throwing on a blocked context.
  }
}
