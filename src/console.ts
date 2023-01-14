/**
 * console.ts - low level access to the console for input/output
 */

import readline from 'readline';

export function print(str: string): void {
	console.log(str);
}

export function clearScreen(): void {
	console.clear();
}

// NOTE: this "createInterface" function is built into node and is referring to the console interface - NOT a TypeScript interface!
const reader = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

/**
 * prompt for user input and call the callback function with the result
 * @param question
 * @param callback 
 */
export function promptForInput(question: string, callback: (arg: string) => void) {
	reader.question(`❓ ${question} 👉 `, callback);
}
