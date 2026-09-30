//your code here
class OutOfRangeError extends Error {
    constructor(arg) {
        super(`Expression should only consist of integers and +-/* characters and not ${arg}`);
        this.name = 'OutOfRangeError';
    }
}

class InvalidExprError extends Error {
    constructor() {
        super('Expression should not have an invalid combination of expression');
        this.name = 'InvalidExprError';
    }
}

function evalString(expression) {
    try {
        // 1. invalid character
        const bad = expression.match(/[^0-9+\-*\/\s]/);
        if (bad) throw new OutOfRangeError(bad[0]);

        const s = expression.replace(/\s+/g, '');

        // 2. start / end checks
        if (/^[+*\/]/.test(s))
            throw new SyntaxError('Expression should not start with invalid operator');
        if (/[+\-*\/]$/.test(s))
            throw new SyntaxError('Expression should not end with invalid operator');

        // 3. bad operator combos (op followed by +,*,/ or three ops in a row)
        if (/[+\-*\/][+*\/]/.test(s) || /[+\-*\/]{3,}/.test(s))
            throw new InvalidExprError();

        // space out negative signs after operators: 5--3 -> 5- -3
        const safe = s.replace(/([+\-*\/])-(\d)/g, '$1 -$2');
        return Function('"use strict"; return (' + safe + ')')();
    } catch (e) {
        console.error(e.name + ': ' + e.message);
        throw e;
    }
}