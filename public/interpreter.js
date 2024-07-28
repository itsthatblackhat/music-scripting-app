import * as Tone from 'tone';

export function interpretCommands(commands) {
    const tune = parseFloat(document.getElementById('tune-knob').value) / 100; // assuming a range of 0 to 100
    const glide = parseFloat(document.getElementById('glide-knob').value) / 100; // assuming a range of 0 to 100
    const modulationMix = parseFloat(document.getElementById('modulation-mix-knob').value) / 100; // assuming a range of 0 to 100
    const osc1Waveform = document.getElementById('osc1-waveform').value;
    const osc2Waveform = document.getElementById('osc2-waveform').value;
    const osc3Waveform = document.getElementById('osc3-waveform').value;
    const volume = parseFloat(document.getElementById('vol-knob').value) / 100; // assuming a range of 0 to 100
    const mixOsc1 = parseFloat(document.getElementById('mix-osc1-knob').value) / 100; // assuming a range of 0 to 100
    const mixOsc2 = parseFloat(document.getElementById('mix-osc2-knob').value) / 100; // assuming a range of 0 to 100
    const mixOsc3 = parseFloat(document.getElementById('mix-osc3-knob').value) / 100; // assuming a range of 0 to 100
    const cutoff = parseFloat(document.getElementById('cutoff-knob').value) / 100; // assuming a range of 0 to 100
    const attack = parseFloat(document.getElementById('attack-knob').value) / 100; // assuming a range of 0 to 100
    const decay = parseFloat(document.getElementById('decay-knob').value) / 100; // assuming a range of 0 to 100
    const emphasis = parseFloat(document.getElementById('emphasis-knob').value) / 100; // assuming a range of 0 to 100
    const filterModulation = document.getElementById('filter-modulation').checked;
    const amountContour = parseFloat(document.getElementById('amount-contour-knob').value) / 100; // assuming a range of 0 to 100
    const sustain = parseFloat(document.getElementById('sustain-knob').value) / 100; // range should be 0 to 1

    const synth = new Tone.Synth({
        oscillator: {
            type: osc1Waveform,
        },
        envelope: {
            attack: attack,
            decay: decay,
            sustain: sustain,
            release: 1 // Release is set to a default value of 1
        },
        volume: volume
    }).toDestination();

    let time = Tone.now();

    commands.forEach(command => {
        if (command[0] === 'tempo') {
            const tempo = parseInt(command[1]);
            Tone.Transport.bpm.value = tempo;
        } else if (command[0] === 'note') {
            const note = command[1];
            const duration = command[2];
            synth.triggerAttackRelease(note, duration, time);
            time += Tone.Time(duration).toSeconds();
        }
    });
}
