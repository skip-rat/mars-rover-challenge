/**
 * initialise.ts - initialise the game state before a game can start
 * 
 */

import { Coords, PlayingPiece, PlayerType,  CoordsChecker } from './types';
import { generateRandomCoords } from './utils';
import { gameState, getCoordsChecker } from './game-state';
import { refreshGUI, movePlayingPiece } from './gui';

export function randomlySetupRovers(roverCount : number) : void {
    let count = roverCount - gameState.roverArray.length; 
    generateRandomPlayingPieces(gameState.roverArray, count, gameState.roverArray.length + 1, PlayerType.Rover, gameState.maxX, gameState.maxY, getCoordsChecker());
}

export function generateRandomPlayingPieces(pieceArray : Array<PlayingPiece>, count : number,
    type : PlayerType, firstID : number, 
    maxX : number, maxY : number, coordChecker : CoordsChecker) : void {
    let position : Coords;       
    for( let i = 0; i < count; i = i + 1) {
        position = generateRandomCoords(maxX, maxY, coordChecker);
        pieceArray.push({ type : type, id : firstID + i, coords : position });
    }
}

/**
 * plot the playing pieces so they show on the screen
 * @param pieceArray 
 * @param type 
 */
export function plotPlayingPieces(pieceArray : Array<PlayingPiece>): void {  
    pieceArray.forEach(piece => movePlayingPiece(undefined, piece));
    refreshGUI();
}