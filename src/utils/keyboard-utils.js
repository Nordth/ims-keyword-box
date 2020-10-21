export function getCharacterFromKeyboardEvent(event){
    if (!event.key || event.altKey || event.ctrlKey || event.metaKey) return null;
    else if (event.key === 'Spacebar') return ' ';
    else if(event.key.length === 1 || (event.key.length > 1 && /[^a-zA-Z0-9]/.test(event.key))) {
        return event.key;
    }
    else return null;
}

export function getCodeFromKeyboardEvent(event){
    if (event.code !== undefined) return event.code;
    const code_map = {
        65: 'KeyA',
        67: 'KeyC',
        86: 'KeyV',
        88: 'KeyX',
        89: 'KeyY',
        90: 'KeyZ'
    }
    return code_map.hasOwnProperty(event.which) ? code_map[event.which] : null;
}
