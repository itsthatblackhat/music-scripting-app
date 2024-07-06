export function interpretCommands(commands) {
    const tune = parseFloat(document.getElementById('tune').value);
    const glide = parseFloat(document.getElementById('glide').value);
    const modulationMix = parseFloat(document.getElementById('modulation-mix').value);
    const osc1Range = parseFloat(document.getElementById('osc1-range').value);
    const osc1Waveform = document.getElementById('osc1-waveform').value;
    const osc2Range = parseFloat(document.getElementById('osc2-range').value);
    const osc2Waveform = document.getElementById('osc2-waveform').value;
    const osc3Range = parseFloat(document.getElementById('osc3-range').value);
    const osc3Waveform = document.getElementById('osc3-waveform').value;
    const volume = parseFloat(document.getElementById('vol').value);
    const mixOsc1 = parseFloat(document.getElementById('mix-osc1').value);
    const mixOsc2 = parseFloat(document.getElementById('mix-osc2').value);
    const mixOsc3 = parseFloat(document.getElementById('mix-osc3').value);
    const cutoff = parseFloat(document.getElementById('cutoff').value);
    const attack = parseFloat(document.getElementById('attack').value);
    const decay = parseFloat(document.getElementById('decay').value);
    const emphasis = parseFloat(document.getElementById('emphasis').value);
    const filterModulation = document.getElementById('filter-modulation').checked;
    const amountContour = parseFloat(document.getElementById('amount-contour').value);
    const sustain = parseFloat(document.getElementById('sustain').value);

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
        if (command[0] === 'note') {
            const note = command[1];
            const duration = command[2];
            synth.triggerAttackRelease(note, duration, time);
            time += Tone.Time(duration).toSeconds();
        }
    });
}
