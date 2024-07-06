import { parseScript } from './parser.js';
import { interpretCommands } from './interpreter.js';

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('play-btn').addEventListener('click', async () => {
        await Tone.start();
        console.log("Audio is ready");
        const script = document.getElementById('script-editor').value;
        const tempo = document.getElementById('tempo-input').value;
        playMusic(script, tempo);
    });

    document.getElementById('pause-btn').addEventListener('click', () => {
        Tone.Transport.pause();
    });

    document.getElementById('stop-btn').addEventListener('click', () => {
        Tone.Transport.stop();
        Tone.Transport.cancel();
    });

    document.getElementById('save-config').addEventListener('click', saveConfig);
    document.getElementById('load-config').addEventListener('click', loadConfig);
});

function playMusic(script, tempo) {
    const commands = parseScript(script);
    Tone.Transport.bpm.value = tempo;
    interpretCommands(commands);
}

function saveConfig() {
    const config = {
        tune: document.getElementById('tune').value,
        glide: document.getElementById('glide').value,
        modulationMix: document.getElementById('modulation-mix').value,
        osc1Range: document.getElementById('osc1-range').value,
        osc1Waveform: document.getElementById('osc1-waveform').value,
        osc2Range: document.getElementById('osc2-range').value,
        osc2Waveform: document.getElementById('osc2-waveform').value,
        osc3Range: document.getElementById('osc3-range').value,
        osc3Waveform: document.getElementById('osc3-waveform').value,
        volume: document.getElementById('vol').value,
        mixOsc1: document.getElementById('mix-osc1').value,
        mixOsc2: document.getElementById('mix-osc2').value,
        mixOsc3: document.getElementById('mix-osc3').value,
        cutoff: document.getElementById('cutoff').value,
        attack: document.getElementById('attack').value,
        decay: document.getElementById('decay').value,
        emphasis: document.getElementById('emphasis').value,
        filterModulation: document.getElementById('filter-modulation').checked,
        amountContour: document.getElementById('amount-contour').value,
        sustain: document.getElementById('sustain').value
    };
    localStorage.setItem('synthConfig', JSON.stringify(config));
    alert('Configuration saved!');
}

function loadConfig() {
    const config = JSON.parse(localStorage.getItem('synthConfig'));
    if (config) {
        document.getElementById('tune').value = config.tune;
        document.getElementById('glide').value = config.glide;
        document.getElementById('modulation-mix').value = config.modulationMix;
        document.getElementById('osc1-range').value = config.osc1Range;
        document.getElementById('osc1-waveform').value = config.osc1Waveform;
        document.getElementById('osc2-range').value = config.osc2Range;
        document.getElementById('osc2-waveform').value = config.osc2Waveform;
        document.getElementById('osc3-range').value = config.osc3Range;
        document.getElementById('osc3-waveform').value = config.osc3Waveform;
        document.getElementById('vol').value = config.volume;
        document.getElementById('mix-osc1').value = config.mixOsc1;
        document.getElementById('mix-osc2').value = config.mixOsc2;
        document.getElementById('mix-osc3').value = config.mixOsc3;
        document.getElementById('cutoff').value = config.cutoff;
        document.getElementById('attack').value = config.attack;
        document.getElementById('decay').value = config.decay;
        document.getElementById('emphasis').value = config.emphasis;
        document.getElementById('filter-modulation').checked = config.filterModulation;
        document.getElementById('amount-contour').value = config.amountContour;
        document.getElementById('sustain').value = config.sustain;
        alert('Configuration loaded!');
    } else {
        alert('No configuration found!');
    }
}
