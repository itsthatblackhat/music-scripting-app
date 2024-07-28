import { parseScript } from '../public/parser.js';

test('parses script into commands', () => {
    const script = `
    tempo 120
    instrument piano
    track melody
    note C4 1/4
    note D4 1/4
    `;

    const expected = [
        ['tempo', '120'],
        ['instrument', 'piano'],
        ['track', 'melody'],
        ['note', 'C4', '1/4'],
        ['note', 'D4', '1/4']
    ];

    expect(parseScript(script)).toEqual(expected);
});
