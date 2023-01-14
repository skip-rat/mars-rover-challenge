/**
 * setup.ts - sets up the game by prompting the user for the initial conditions,
 *            then starts the game playing
 * 
 */

import { showWelcomeScreen, promptForRovers, promptForRoverData, promptForAliens, showRoverDataError, showRoverCommands } from './input';
import { PlayerType } from './types';
import { gridSizes, gameState, initGameData, getCoordsChecker, setGridSize } from './game-state';
import { selectFirstRover } from './current-player';
import { randomlySetupRovers, generateRandomPlayingPieces, plotPlayingPieces } from './initialise';
import { startGame } from './game';
import { initialiseGUI } from './gui';
import { createRover } from './game-utils';
import { checkGridSizeInput, checkPlayingPieceCountIsValid, checkStartCoordsAreValid } from './validator';
    
// temp vars for game setup
let roverCount : number;

export function startSetup(): void {    
    showWelcomeScreen(gridSizes, processMaxGridCoordsInput);
}

/**
 * 
 * @param input - valid input is 2 numbers for custom grid or empty string to use default grid size
 * @returns 
 */
function processMaxGridCoordsInput(input : string) {
    let arr = checkGridSizeInput(input);
    if(arr === undefined) {     // input error
        showWelcomeScreen(gridSizes, processMaxGridCoordsInput);
    } else if(arr.length == 2) {
            initGameData();
            setGridSize(arr[0], arr[1]);  
            initialiseGUI();
    } else { 
        initGameData();     // use default grid size
        initialiseGUI();
    }

    showRoverCommands(processShowRoverCommands);
}

function processShowRoverCommands(input : string) {
    promptForRovers(processRoverInput);
}

/**
 * 
 * @param input - valid input is a number
 */
function processRoverInput(input : string) {
    let count = checkPlayingPieceCountIsValid(input);
    if(count === undefined) {       // input error
        promptForRovers(processRoverInput);
    } else {        
        roverCount = count;
        promptForRoverData(true, gameState.roverArray.length + 1, roverCount, processRoverDataInput);
    }
}

function rePromptForRoverData() {
    promptForRoverData(true, gameState.roverArray.length + 1, roverCount, processRoverDataInput);
}

/**
 * 
 * @param input - valid input is coords + direction eg "x y N" or empty string to set automatically
 */
function processRoverDataInput(input : string) {
    if(input.length === 0) {
        randomlySetupRovers(roverCount);
        selectFirstRover();
        startPromptForAliens();
    } else {
        let coords = checkStartCoordsAreValid(input);
        if(coords === undefined) {
            showRoverDataError(rePromptForRoverData);
        } else {
            let roverData = createRover(coords);
            gameState.roverArray.push(roverData);
            selectFirstRover();

            if(gameState.roverArray.length < roverCount) {
                promptForRoverData(false, gameState.roverArray.length + 1, roverCount, processRoverDataInput);
            } else {
                startPromptForAliens();
            }
        }
    }
}

function startPromptForAliens() {
    plotPlayingPieces(gameState.roverArray);
    promptForAliens(processAlienInput);
}

/**
 * 
 * @param input - valid input is a number
 */
function processAlienInput(input : string) {
    let count = checkPlayingPieceCountIsValid(input);
    if(count === undefined) {       // input error
        startPromptForAliens();
    } else {        
        generateRandomPlayingPieces(gameState.alienArray, count, PlayerType.Alien, 1, gameState.maxX, gameState.maxY, getCoordsChecker());   
        gameState.currentAlien = gameState.alienArray[0];  
        plotPlayingPieces(gameState.alienArray);
        startGame();
    }
}

