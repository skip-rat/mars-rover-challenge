/**
 * current-player.ts - provides access to the current playing piece
 * 
 */

import { PlayingPiece } from './types';
import { gameState } from './game-state';

export function selectFirstRover() {
    if(gameState.currentRover === undefined && gameState.roverArray.length > 0) {
        gameState.currentRover = gameState.roverArray[0];
    }
}

export function getCurrentRover() : PlayingPiece | undefined {
    return gameState.currentRover;
}

export function getCurrentAlien() : PlayingPiece | undefined {
    return gameState.currentAlien;
}

/**
 * 
 * @returns the next rover to be moved after the current one, wrapping back around to the first rover
 *          if the current rover is the last one
 */
export function getNextRover() : PlayingPiece | undefined {
    return getNextPlayingPiece(gameState.roverArray, gameState.currentRover, true);
}

/**
 * 
 * @returns the next alien to be moved after the current one, or undefined if current is the last alien
 */
export function getNextAlien() : PlayingPiece | undefined {
    return getNextPlayingPiece(gameState.alienArray, gameState.currentAlien, false);
}

/**
 * 
 * @param arr 
 * @param currentPiece - will return the PlayingPice after this one
 * @param wrapToFirst - if current piece is last, will return the first one
 * @returns 
 */
function getNextPlayingPiece(arr : Array<PlayingPiece>, currentPiece : PlayingPiece | undefined, wrapToFirst : boolean) : PlayingPiece | undefined {
    if(arr === undefined || arr.length === 0) {
        return undefined;
    }

    let piece;
    for(let i = 0; i < arr.length; i = i + 1) {
        piece = arr[i];
        if(piece.id === currentPiece?.id) {
            if(i < arr.length-1) {
                return arr[i+1];
            }
            if(wrapToFirst) {
                return arr[0];
            }
        }
    }

    return undefined;
}
