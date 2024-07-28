import * as Tone from 'tone';
import { parseScript } from './parser.js';
import { interpretCommands } from './interpreter.js';

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('play-btn').addEventListener('click', async () => {
        await Tone.start();
        console.log("Audio is ready");
        const script = document.getElementById('script-editor').value;
        const tempo = parseFloat(document.getElementById('tempo-input').value);
        Tone.Transport.bpm.value = tempo;
        playMusic(script, tempo);
    });

    document.getElementById('pause-btn').addEventListener('click', () => {
        Tone.Transport.pause();
    });

    document.getElementById('stop-btn').addEventListener('click', () => {
        Tone.Transport.stop();
        Tone.Transport.cancel();
    });

    document.getElementById('speed-slider').addEventListener('input', (event) => {
        const speed = parseFloat(event.target.value) / 100;
        Tone.Transport.bpm.value = speed * Tone.Transport.bpm.value;
    });

    document.getElementById('volume-slider').addEventListener('input', (event) => {
        const volume = parseFloat(event.target.value) / 100;
        Tone.Destination.volume.value = volume * 100 - 50; // converting 0-100 to -50 to +50 dB
    });

    document.querySelectorAll('.key').forEach(key => {
        key.addEventListener('click', () => {
            const note = key.textContent + '4'; // Assuming the 4th octave for simplicity
            playNoteOnClick(note);
        });
    });

    document.getElementById('save-config').addEventListener('click', saveConfig);
    document.getElementById('load-config').addEventListener('click', loadConfig);
});

function playMusic(script, tempo) {
    console.log('Playing music with script:', script);
    console.log('Tempo:', tempo);
    const commands = parseScript(script);
    console.log('Parsed commands:', commands);
    Tone.Transport.bpm.value = tempo;
    interpretCommands(commands);
}

function playNoteOnClick(note) {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease(note, '8n');
}

function saveConfig() {
    const config = {
        tune: document.getElementById('tune-knob').value,
        glide: document.getElementById('glide-knob').value,
        modulationMix: document.getElementById('modulation-mix-knob').value,
        osc1Waveform: document.getElementById('osc1-waveform').value,
        osc2Waveform: document.getElementById('osc2-waveform').value,
        osc3Waveform: document.getElementById('osc3-waveform').value,
        vol: document.getElementById('vol-knob').value,
        mixOsc1: document.getElementById('mix-osc1-knob').value,
        mixOsc2: document.getElementById('mix-osc2-knob').value,
        mixOsc3: document.getElementById('mix-osc3-knob').value,
        cutoff: document.getElementById('cutoff-knob').value,
        attack: document.getElementById('attack-knob').value,
        decay: document.getElementById('decay-knob').value,
        emphasis: document.getElementById('emphasis-knob').value,
        filterModulation: document.getElementById('filter-modulation').checked,
        amountContour: document.getElementById('amount-contour-knob').value,
        sustain: document.getElementById('sustain-knob').value
    };
    localStorage.setItem('synthConfig', JSON.stringify(config));
    alert('Configuration saved!');
}

function loadConfig() {
    const config = JSON.parse(localStorage.getItem('synthConfig'));
    if (config) {
        document.getElementById('tune-knob').value = config.tune;
        document.getElementById('glide-knob').value = config.glide;
        document.getElementById('modulation-mix-knob').value = config.modulationMix;
        document.getElementById('osc1-waveform').value = config.osc1Waveform;
        document.getElementById('osc2-waveform').value = config.osc2Waveform;
        document.getElementById('osc3-waveform').value = config.osc3Waveform;
        document.getElementById('vol-knob').value = config.vol;
        document.getElementById('mix-osc1-knob').value = config.mixOsc1;
        document.getElementById('mix-osc2-knob').value = config.mixOsc2;
        document.getElementById('mix-osc3-knob').value = config.mixOsc3;
        document.getElementById('cutoff-knob').value = config.cutoff;
        document.getElementById('attack-knob').value = config.attack;
        document.getElementById('decay-knob').value = config.decay;
        document.getElementById('emphasis-knob').value = config.emphasis;
        document.getElementById('filter-modulation').checked = config.filterModulation;
        document.getElementById('amount-contour-knob').value = config.amountContour;
        document.getElementById('sustain-knob').value = config.sustain;
        alert('Configuration loaded!');
    } else {
        alert('No configuration found!');
    }
}
