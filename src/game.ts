/**
 * game.ts - responsible for running the game loop while the game is being played
 * 
 */

import { PlayingPiece } from './types';
import { gameState, getNextRoverCommand, setNewRoverCommand } from './game-state';
import { checkForEndGame, copyPlayingPiece, applyRoverCommand, applyAlienMove } from './game-utils';
import { getCurrentRover, getCurrentAlien, getNextAlien, getNextRover } from './current-player';
import { startSetup } from './setup';
import { refreshGUI, movePlayingPiece, resetPlayingPiece } from './gui';
import { promptForRoverMoveCommands, showEndGameMessage } from './input';

const MAX_ROVER_COMMANDS = 10;  // max number of rover comands that can be execute in one rover turn
const MOVE_PAUSE_MS = 50;       // delay after each move (rover or aliend) to allow changes to be seen onscreen

export function startGame(): void {
    startRoverMove();
}

function startRoverMove() {
    let rover = getCurrentRover();
    if(rover !== undefined) {
        // highlight current rover to move
        resetPlayingPiece(rover); 
        refreshGUI();       
    }
    
    promptForRoverMoveCommands(processPlayerMoveInput);
}

function startNextRoverMove() {
    // are there more commands for the current rover to execute?
    let cmd = getNextRoverCommand();
    if(cmd.length > 0) {
        startProcessRoverCommand(cmd);
    } else {        // current rover finsihed moving, so start next rover moving        
        let prevRover = getCurrentRover();
        let nextRover = getNextRover();
        gameState.currentRover = nextRover;

        if(prevRover !== undefined) {
            resetPlayingPiece(prevRover);  // unhighlight previous rover
        }

        refreshGUI();
        startRoverMove();
    }
}

function processPlayerMoveInput(input : string) {
    if(input !== undefined) {
        if(input.length > MAX_ROVER_COMMANDS) {
            input = input.substring(0, MAX_ROVER_COMMANDS);
        }
        setNewRoverCommand(input.toUpperCase());
        startProcessRoverCommand(getNextRoverCommand());
    } else {    // no input for this rover
        startAlienMove();
    }
}

function startProcessRoverCommand(command : string) {
    let rover = getCurrentRover();
    if(rover === undefined) {
        refreshGUI();
        return;
    }

    processRoverCommand(rover, command);
}

function processRoverCommand(rover : PlayingPiece, command : string) {
    let oldRover = copyPlayingPiece(rover);
    let canMove = applyRoverCommand(command, rover.coords);
    
    // update the GUI
    if(canMove) {
        movePlayingPiece(oldRover, rover)
        refreshGUI();
    }

    // pause before next move to allow rover movement to be seen
    setTimeout(() => { 
        if(canMove && checkForEndGame()) {
            showEndGameMessage(gameState.alienArray.length < 1, processEndGameInput);
            return;
        }
        startAlienMove();       // give the aliens a chance to move after running each rover command
        
    }, MOVE_PAUSE_MS);
}

function startAlienMove() {
    moveAlien();
}

function moveAlien() {
    const alien = getCurrentAlien();
    if(alien === undefined) {
        refreshGUI();
        return;
    }

    let oldAlien = copyPlayingPiece(alien);
    let canMove = applyAlienMove(alien);

    // update the GUI
    if(canMove) {
        movePlayingPiece(oldAlien, alien)
        refreshGUI();
    }

    // pause before moving next alien to allow movements to be seen on screen
    setTimeout(() => { 
        if(canMove && checkForEndGame()) {
            showEndGameMessage(gameState.alienArray.length < 1, processEndGameInput);
            return;
        }

        moveNextAlien();

    }, MOVE_PAUSE_MS);
}

function moveNextAlien() {
    let nextAlien = getNextAlien();
    if(nextAlien !== undefined) {
        gameState.currentAlien = nextAlien;
        moveAlien();
    } else {    // no more aliens to move, so reset back to first alien and go back to moving a rover
        gameState.currentAlien = gameState.alienArray[0];
        startNextRoverMove();
    }
}

function processEndGameInput(input : string) {
    if(input.length === 0) {
        startSetup();
    } else {
        process.exit();
    }
}



 