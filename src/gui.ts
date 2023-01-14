/**
 * gui.ts - functions to output the game GUI to the screen,
 *          makes us of a screen buffer to build the GUI before drawing it to the screen
 */

import { clearScreen, print } from './console';
import { PlayingPiece } from './types';
import { gameState } from './game-state';
import { initialiseScreenBuffer, screenState } from './screen-state';
import { getPlayingPieceSymbol, colourizePlayingPieces, formatPlayerCounts, EDGE_V, getPathTakenSymbol } from './screen-utils';

export function initialiseGUI() : void{
    initialiseScreenBuffer(gameState.maxX + 1, gameState.maxY + 1);
}

/**
 * plot a playing piece at a new coordinate in the screen buffer, and optionally remove it from it's old coordinate
 * @param oldPiece 
 * @param newPiece 
 * @param type 
 */
export function movePlayingPiece(oldPiece : PlayingPiece | undefined, newPiece : PlayingPiece): void {
    if(oldPiece !== undefined) {
        movePlayingPieceOnGrid(oldPiece);
    }
    resetPlayingPiece(newPiece);
}

export function movePlayingPieceOnGrid(oldPiece : PlayingPiece | undefined) : void {
    if(oldPiece !== undefined) {
        screenState.mapGrid[oldPiece.coords.y+1][oldPiece.coords.x+1] = getPathTakenSymbol();
    }
}

/**
 * resets a PlayingPiece symbol on screen, eg a rover back to the default rover symbol after
 *        the move rover symbol has been shown
 * @param piece 
 */
export function resetPlayingPiece(piece : PlayingPiece) {
    screenState.mapGrid[piece.coords.y+1][piece.coords.x+1] = getPlayingPieceSymbol(piece);
}

/**
 * redraw the entire GUI to the screen (gets drawn to the console)
 */
export function refreshGUI() {
    drawGUI(gameState.roverArray.length, gameState.alienArray.length);
}

export function drawGUI(roverCount : number, alienCount : number) {
    clearScreen();
    drawMapGrid();
    drawScoreBoard(roverCount, alienCount);
}

function drawMapGrid() {
    let line : string;
    for(let row = 0; row < screenState.mapGrid.length; row = row + 1) {
        line = screenState.mapGrid[row].join('');
        line = colourizePlayingPieces(line);
        print(line);
    }
}

function drawScoreBoard(roverCount : number, alienCount : number) {
    let line : string;
    for(let row = 0; row < screenState.statsBoard.length; row = row + 1) {
        if(row === 2) {
            let line = formatPlayerCounts(roverCount, alienCount);
            while(line.length < screenState.statsBoard[0].length+17) {
                line = line.concat(' ');
            }
            line = line.concat(EDGE_V);
            print(line);
        } else {
            line = screenState.statsBoard[row].join('');
            print(line);
        }
    }
}

