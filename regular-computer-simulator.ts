`
Regular Computer Simulator

This is a simulator of a regular computer. Written in TypeScript due to clearer type syntax than Python.

Computer - *computer* comes from word *compute* (to count something)
and *er* (a person or thing that does something). So computer is
a thing that counts something. In this case it counts bits.

Author:  Kacper Walczak
Created at:  02/01/2024
Updated at: 29/04/2024 - refactored to QUAK.COM.PL version
`

type Bit = 0 | 1;
type Word = Bit[];
 
interface CPU {
    memory: (Word | number)[];
    registers: Word[];
    instructionPointer: number;
    halted: boolean;
}
 
class CPU {
    constructor() {
        this.memory = [];
        this.registers = [];
        this.instructionPointer = 0;
        this.halted = false;
    }
}
 
interface Instruction {
    name: string;
    operandsCount: number;
    execute: (cpu: CPU, operands: Word[]) => void;
}
 
const Opcode = {
    ADD: 0b0000
}
 
const instructions: Record<number, Instruction> = {
    [Opcode.ADD]: {
        name: "ADD",
        operandsCount: 2,
        execute: (cpu, operands) => {
            const [a, b] = operands;
            const result = add(a, b);
            cpu.registers[0] = result;
        },
    },
    // ...
};
 
function add(a: Word, b: Word): Word {
    if (a.length !== b.length) {
        throw new Error("Words must have the same length");
    }
 
    const result: Word = [];
    let carry = 0;
 
    for (let i = 0; i < a.length; i++) {
        const sum = a[i] + b[i] + carry;
        const bit = sum % 2 as Bit;
        carry = sum > 1 ? 1 : 0;
        result.push(bit);
    }
 
    return result;
}
 
const cpu = new CPU();
 
cpu.memory = [
    Opcode.ADD, // +
    [0,0,0,1],  // 1
    [0,0,1,0],  // 2
];
 
while (!cpu.halted) {
    const instruction = instructions[cpu.memory[cpu.instructionPointer] as number];
    const operands = cpu.memory.slice(
        cpu.instructionPointer + 1,
        cpu.instructionPointer + 1 + instruction.operandsCount
    ) as Word[];
 
    instruction.execute(cpu, operands);
    cpu.instructionPointer += instruction.operandsCount + 1;
 
    if (cpu.instructionPointer >= cpu.memory.length) {
        cpu.halted = true;
    }
}
 
console.log(cpu.registers[0]); // result stored in the first register = 3 = [0011]
