"use strict";
`
Regular Computer Simulator

This is a simulator of a regular computer. Written in TypeScript due to clearer type syntax than Python.

Constraints:
- base on 0 and 1 (binary system)
- only whole numbers are allowed (no floating point numbers)
- only positive numbers are allowed (no negative numbers, can be implemented easily with first bit as a sign bit)

Computer - *computer* comes from word *compute* (to count something)
and *er* (a person or thing that does something). So computer is
a thing that counts something. In this case it counts bits.

Author:  Kacper Walczak
Created at:  02/01/2024
`;
const WORD_LENGTH = 8; // specifies how many bits are in a word
function wordFactory(opts) {
    const defaults = { length: WORD_LENGTH, bitVal: 0 };
    const wordDefault = Object.assign(defaults, opts);
    return Array(wordDefault.length).fill(wordDefault.bitVal);
}
function positiveIntegerToWord(integerToMap) {
    // 83 / 2 = 41, remainder 1
    // 41 / 2 = 20, remainder 1
    // 20 / 2 = 10, remainder 0
    // 10 / 2 = 5,  remainder 0
    // 5 / 2 = 2,   remainder 1
    // 2 / 2 = 1,   remainder 0
    // 1 / 2 = 0,   remainder 1
    // result = 1010011 = 83
    return wordFactory().map((_, index) => {
        const bitValue = 2 ** (WORD_LENGTH - index - 1); // 2 ** (8 - 0 - 1) = 2 ** 7 = 128
        const bit = integerToMap >= bitValue ? 1 : 0;
        integerToMap -= bit * bitValue;
        return bit;
    });
}
function wordToPositiveInteger(word) {
    return word.reduce((accumulator, currentValue, index) => {
        const bitValue = 2 ** (WORD_LENGTH - index - 1);
        return accumulator + currentValue * bitValue;
    }, 0);
}
const computer = {
    add(word1, word2) {
        return wordFactory().map((_, index) => {
            const bit1 = word1[index];
            const bit2 = word2[index];
            return bit1 + bit2 >= 1 ? 1 : 0;
        });
    },
    subtract(word1, word2) {
        return wordFactory().map((_, index) => {
            const bit1 = word1[index];
            const bit2 = word2[index];
            return bit1 - bit2 >= 0 ? 1 : 0;
        });
    },
    multiply(word1, word2) {
        return wordFactory().map((_, index) => {
            const bit1 = word1[index];
            const bit2 = word2[index];
            return bit1 * bit2 >= 1 ? 1 : 0;
        });
    },
    divide(word1, word2) {
        return wordFactory().map((_, index) => {
            const bit1 = word1[index];
            const bit2 = word2[index];
            return bit1 / bit2 >= 1 ? 1 : 0;
        });
    },
    shiftBitsLeft(word) {
        // 1 0 1 0 0 1 1 0
        // 0 1 0 0 1 1 0 0
        return wordFactory().map((_, index) => {
            const bit = word[index];
            const nextBit = word[index + 1];
            return nextBit ? nextBit : bit;
        });
    },
    shiftBitsRight(word) {
        // 1 0 1 0 0 1 1 0
        // 0 1 0 1 0 0 1 1
        return wordFactory().map((_, index) => {
            const bit = word[index];
            const previousBit = word[index - 1];
            return previousBit ? previousBit : bit;
        });
    },
    compare(word1, word2) {
        return wordFactory().map((_, index) => {
            const bit1 = word1[index];
            const bit2 = word2[index];
            return bit1 === bit2 ? 1 : 0;
        });
    },
    and(word1, word2) {
        return wordFactory().map((_, index) => {
            const bit1 = word1[index];
            const bit2 = word2[index];
            return bit1 && bit2 ? 1 : 0;
        });
    },
    or(word1, word2) {
        return wordFactory().map((_, index) => {
            const bit1 = word1[index];
            const bit2 = word2[index];
            return bit1 || bit2 ? 1 : 0;
        });
    },
    xor(word1, word2) {
        return wordFactory().map((_, index) => {
            const bit1 = word1[index];
            const bit2 = word2[index];
            return bit1 !== bit2 ? 1 : 0;
        });
    },
    not(word) {
        return wordFactory().map((_, index) => {
            const bit = word[index];
            return bit ? 0 : 1;
        });
    },
    increment(word) {
        return this.add(word, positiveIntegerToWord(1));
    },
    decrement(word) {
        return this.subtract(word, positiveIntegerToWord(1));
    },
    isZero(word) {
        return this.compare(word, wordFactory());
    },
    isNotZero(word) {
        return this.not(this.isZero(word));
    },
    isLessThan(word1, word2) {
        return this.compare(word1, word2);
    },
    isGreaterThan(word1, word2) {
        return this.compare(word2, word1);
    },
    isLessThanOrEqual(word1, word2) {
        return this.or(this.isLessThan(word1, word2), this.isZero(word1));
    },
    isGreaterThanOrEqual(word1, word2) {
        return this.or(this.isGreaterThan(word1, word2), this.isZero(word1));
    }
};
console.warn(`
    ✅ values:       [128, 64, 32, 16, 8, 4, 2, 1]
    123          = ${positiveIntegerToWord(123)}
    0            = ${positiveIntegerToWord(0)}
    1            = ${positiveIntegerToWord(1)}
    2            = ${positiveIntegerToWord(2)}
    4            = ${positiveIntegerToWord(4)}
    8            = ${positiveIntegerToWord(8)}
    16           = ${positiveIntegerToWord(16)}
    32           = ${positiveIntegerToWord(32)}
    64           = ${positiveIntegerToWord(64)}
    128          = ${positiveIntegerToWord(128)}
    256          = ${positiveIntegerToWord(256)}
    
    12 + 34      = ${positiveIntegerToWord(12 + 34)}
    123 + 1      = ${positiveIntegerToWord(123 + 1)}

    ✅ shifting bits:
    1 >> 0     = ${positiveIntegerToWord(1 >> 0)} ${1 >> 0}
    123 >> 0   = ${positiveIntegerToWord(123 >> 0)} ${123 >> 0}
    123 >> 1   = ${positiveIntegerToWord(123 >> 1)} ${123 >> 1}
    123 >> 2   = ${positiveIntegerToWord(123 >> 2)} ${123 >> 2}
    123 >> 3   = ${positiveIntegerToWord(123 >> 3)} ${123 >> 3}
    
    ✅ computer.add(positiveIntegerToWord(12), positiveIntegerToWord(34)) = ${computer.add(positiveIntegerToWord(12), positiveIntegerToWord(34))}
    ✅ wordToPositiveInteger(computer.add(positiveIntegerToWord(12), positiveIntegerToWord(34))) = ${wordToPositiveInteger(computer.add(positiveIntegerToWord(12), positiveIntegerToWord(34)))}
`);
