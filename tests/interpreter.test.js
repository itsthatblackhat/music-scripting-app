import { interpretCommands } from '../public/interpreter.js';
import * as Tone from 'tone';

jest.mock('tone');

test('interprets commands and plays notes', () => {
    const commands = [
        ['note', 'C4', '1/4'],
        ['note', 'D4', '1/4']
    ];

    interpretCommands(commands);

    expect(Tone.Synth).toHaveBeenCalled();
    const synthInstance = Tone.Synth.mock.instances[0];
    expect(synthInstance.triggerAttackRelease).toHaveBeenCalledWith('C4', '1/4', expect.any(Number));
    expect(synthInstance.triggerAttackRelease).toHaveBeenCalledWith('D4', '1/4', expect.any(Number));
});
