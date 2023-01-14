/**
 * input.ts provides user input functions
 *          these prompt for user input from the console and call a callback func with
 *          the text the user enters
 * 
 */

import { clearScreen, print, promptForInput } from './console';
import { GridSizes } from './types';
import { refreshGUI } from './gui';
import { getMaxAllowedPlayingPieces } from './game-state';

const WINNING_ICON = "😀";
const LOSING_ICON = "🙁";

/**
 * show game welcome screen and collect first user input to start a new game
 */
export function showWelcomeScreen(gridSizes : GridSizes, fn : (arg: string) => void) {
    clearScreen();
    print('');
    print('This game is best played with the console enlarged to fill the full screen height');
    print('');
	print('-------------------------------');
	print('| Welcome to Aliens vs Rovers |');
	print('-------------------------------');
    print('');
    print('The aim of the game is to move your rovers to capture the aliens');
    print(' before the aliens destroy all the rovers.');
    print('');
    print('Your rovers are controlled by a command squence, a rover will execute');
    print(' a single command then each alien will get a chance to move, then');
    print(' the rover will execute the next command from the sequence.');
    print('');
    print('The game ends when there are no more rovers or no more aliens left.');
    print('');
    print(`The default game grid size is ${gridSizes.defaultGridWidth} x ${gridSizes.defaultGridHeight}`);
    print(`You can enter a new grid size (from ${gridSizes.minGridWidth} x ${gridSizes.minGridHeight}` + 
        ` to ${gridSizes.maxGridWidth} x ${gridSizes.maxGridHeight})`);
    print('');
	promptForInput(`Press enter to proceed or enter a custom grid size (w h)`, fn);
}

export function promptForRovers(fn: (arg: string) => void) {
    refreshGUI();
    print('');
    promptForInput(`Enter number of rovers (1 to ${getMaxAllowedPlayingPieces()})`, fn);
}

export function promptForRoverData(showFullPrompt : boolean, roverNumber : number, roverCount : number, fn : (arg: string) => void) {
    refreshGUI();
    if(showFullPrompt) {
        print('');
        print('Each rover needs a start position (x y) and a direction to face (N, S, E or W),');
        print(' Enter each rovers position and direction then press enter');
        print(" You can press enter on it's own at any time to have the current rover and all");
        print(" remaining rovers assigned a random position and direction");
    }
    print('');
    promptForInput(`Enter start position and directon for rover ${roverNumber}\n   or press enter to set automatically`, fn);
}

export function showRoverDataError(fn : (arg: string) => void) {
    refreshGUI();
    print('');
    print('Rover data error.');
    print(' Please try again or just press enter on the next screen to automatically');
    print(' place the rovers');
    print('');
    promptForInput('Press enter to continue', fn);
}

export function promptForAliens(fn : (arg: string) => void) {
    refreshGUI();
    print('');
    promptForInput(`Enter number of aliens (1 to ${getMaxAllowedPlayingPieces()})`, fn);
}

export function showRoverCommands(fn : (arg: string) => void) {
    clearScreen();
    print('');
    print('Moving a Rover');
    print(` The current rover to move is marked with an arrow to show the direction it is facing.`);
    print(` You can enter a sequence of commands (eg RMRMMLMMM) to move the rover to capture aliens.`);
    print('');
    print('Command:');
    print(`   L = Rotate left`);
    print(`   R = Rotate right`);
    print(`   F = Flip (Rotate 180 degrees to face the other direction)`);
    print(`   M = Move forward 1 cell`);
    print('');
    print(` You can enter up to a maximum of 10 commands at a time (case-insensitive)`);
    print(` or just press enter to skip moving the current rover`);
    print('');
    promptForInput(`Press enter to continue`, fn);
}

export function promptForRoverMoveCommands(fn : (arg: string) => void) {
    print('');
    print(`Move Rover (L = Rotate left, R = Rotate right, F = Flip 180, M = Move 1 cell)`);
    print('');
    promptForInput(`Enter command sequence (eg RMRMMLMMM) and press enter`, fn);
}

export function showEndGameMessage(roversWon : boolean, fn : (arg: string) => void) {
    refreshGUI(); 
    print('');
    print('Game Over');

    if(roversWon) {
        print(` ${WINNING_ICON} Congratulations, your rovers have won `);
    } else {
        print(` ${LOSING_ICON} Bad luck, the aliens have destroyed all your rovers `);
    }

    print('');
    promptForInput(`Press enter to play again, or any other key + enter to exit the game`, fn);
}

export function showCriticalError(msg : string) {
    clearScreen();
    console.error(msg);
    process.exit();
}