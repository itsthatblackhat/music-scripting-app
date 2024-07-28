export function parseScript(script) {
    const lines = script.split('\n');
    const commands = [];
    for (const line of lines) {
        if (line.trim() !== '') {
            commands.push(line.trim().split(' '));
        }
    }
    return commands;
}
