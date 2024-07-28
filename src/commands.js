import * as Tone from 'tone';

async function playNote(url) {
    try {
        const buffer = await new Tone.Buffer(url).load();
        const player = new Tone.Player(buffer).toDestination();
        player.start();
    } catch (error) {
        console.error('Error loading or playing sound:', error);
    }
}

export async function playMusic() {
    try {
        await Tone.start();
        console.log('Audio is ready');
        const notes = [
            'https://sergemoulinier.com/soundfont/acoustic_grand_piano-mp3/E0.mp3',
            'https://sergemoulinier.com/soundfont/acoustic_grand_piano-mp3/D0.mp3',
            'https://sergemoulinier.com/soundfont/acoustic_grand_piano-mp3/F0.mp3',
            // Add other notes as needed
        ];

        for (const note of notes) {
            await playNote(note);
        }
    } catch (error) {
        console.error('Error playing music:', error);
    }
}
