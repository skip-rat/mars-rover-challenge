/**
 * game-state.ts - holds the global game state object and provides functions to access it
 * 
 */

import { PlayingPiece, GameState, GridSizes, CoordsChecker } from './types';

export const MAX_PIECES_PER_PLAYER = 100;

/**
 * constraints for the map grid size
 */
export const gridSizes : GridSizes = {
    minGridWidth : 10,
    minGridHeight : 10,
    maxGridWidth : 100,
    maxGridHeight : 40,
    defaultGridWidth : 80,
    defaultGridHeight : 20
};

/**
 * the games state while it is playing
 */ 
export const gameState : GameState = {
    maxX : gridSizes.defaultGridWidth - 1,
    maxY : gridSizes.defaultGridHeight - 1,
    roverArray : new Array<PlayingPiece>(),
    alienArray : new Array<PlayingPiece>(),
    currentRover : undefined,
    currentAlien : undefined,
    roverCommand : "",
    roverCommandIndex : 0
}

/**
 * initialise the default map grid size etc
 */
export function initGameData() {
    gameState.maxX = gridSizes.defaultGridWidth - 1;
    gameState.maxY = gridSizes.defaultGridHeight - 1;
    gameState.roverArray = new Array<PlayingPiece>();
    gameState.alienArray = new Array<PlayingPiece>();
    gameState.currentRover = undefined;
    gameState.currentAlien = undefined;
    gameState.roverCommand = "";
    gameState.roverCommandIndex = 0;
}

/**
 * 
 * @returns a CoordsChecker function to check and return if a PlayingPiece is at some given coords
 */
export function getCoordsChecker() : CoordsChecker {
    return (x : number, y : number) => {
        return getPlayingPieceByCoords(x, y);
    }
};

export function setGridSize(w : number, h : number) {
    gameState.maxX = w-1;
    gameState.maxY = h-1; 
}

export function getPlayingPieceByCoords(x : number, y : number) : PlayingPiece | undefined {
    let piece = getPlayingPieceByCoordsFromArray(gameState.roverArray, x, y);
    if(piece !== undefined) {
        return piece;
    }

    return getPlayingPieceByCoordsFromArray(gameState.alienArray, x, y);
}

function getPlayingPieceByCoordsFromArray(array : Array<PlayingPiece>, x : number, y : number) : PlayingPiece | undefined {
    let arr = array.filter(piece => piece.coords.x === x && piece.coords.y === y);
    if(arr !== null && arr.length > 0) {
        return arr[0];
    }
    return undefined;
}

export function deleteRover(id : number) {
    deletePlayingPiece(gameState.roverArray, id);
}

export function deleteAlien(id : number) {
    deletePlayingPiece(gameState.alienArray, id);
}

function deletePlayingPiece(array : Array<PlayingPiece>, id : number) {
    let piece;
    for(let i = 0; i < array.length; i = i + 1) {
        piece = array[i];
        if(piece.id === id) {
            array.splice(i, 1);
        }
    }
}

/**
 * 
 * @returns max number or rovers or aliens based on grid size
 */
export function getMaxAllowedPlayingPieces() : number {
    let area = (gameState.maxX + 1) * (gameState.maxY + 1);
    let max = Math.ceil(area / 15);
    return max <= MAX_PIECES_PER_PLAYER ? max : MAX_PIECES_PER_PLAYER;
}

/**
 * set a new rover command squence, returning the first command from the sequence or empty string if none
 * @param commandSequence 
 * @returns 
 */
export function setNewRoverCommand(commandSequence : string) : void {
    gameState.roverCommand = commandSequence;
    gameState.roverCommandIndex = 0;
}

/**
 * 
 * @returns the next command to execute, each call will advance to the next command,
 *          or empty string is returned if no more commands
 */
export function getNextRoverCommand() : string {
    if(gameState.roverCommandIndex >= 0 && gameState.roverCommandIndex < gameState.roverCommand.length) {
        let cmd = gameState.roverCommand.charAt(gameState.roverCommandIndex);
        gameState.roverCommandIndex++;
        return cmd;
    }
    return "";
}
