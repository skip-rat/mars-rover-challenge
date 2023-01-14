/**
 * test-data.ts - provide tests data and functions to setup the game state etc with test data
 * 
 */

import { gameState } from '../src/game-state';
import { Coords, Direction, PlayerType, PlayingPiece } from '../src/types';

// pairs of Coords objects before and after their coords have been moved using the direction field
export const testCoords: Coords[][] = [
    [{ x: 0, y: 0, direction: Direction.North }, { x: 0, y: -1, direction: Direction.North }],
    [{ x: 0, y: 0, direction: Direction.South }, { x: 0, y: 1, direction: Direction.South }],
    [{ x: 0, y: 0, direction: Direction.East }, { x: 1, y: 0, direction: Direction.East }],
    [{ x: 0, y: 0, direction: Direction.West }, { x: -1, y: 0, direction: Direction.West }],

    [{ x: 10, y: 20, direction: Direction.North }, { x: 10, y: 19, direction: Direction.North }],
    [{ x: 10, y: 20, direction: Direction.South }, { x: 10, y: 21, direction: Direction.South }],
    [{ x: 10, y: 20, direction: Direction.East }, { x: 11, y: 20, direction: Direction.East }],
    [{ x: 10, y: 20, direction: Direction.West }, { x: 9, y: 20, direction: Direction.West }]
];

// Coords to create the PlayingPieces below
export const testCoordsForPlayingPieces : Coords[] = [
    { x : 1, y : 2, direction : Direction.North},
    { x : 3, y : 4, direction : Direction.North},
    { x : 5, y : 6, direction : Direction.East},
    { x : 7, y : 8, direction : Direction.South},
    { x : 9, y : 10, direction : Direction.West},
    { x : 1, y : 5, direction : Direction.North},
    { x : 2, y : 6, direction : Direction.North},
    { x : 3, y : 7, direction : Direction.North}
];

export const testRovers : PlayingPiece[] = [
    { type : PlayerType.Rover, id : 1, coords : { x : 1, y : 2, direction : Direction.North} },
    { type : PlayerType.Rover, id : 2, coords : { x : 3, y : 4, direction : Direction.North} },
    { type : PlayerType.Rover, id : 3, coords : { x : 5, y : 6, direction : Direction.East} },
    { type : PlayerType.Rover, id : 4, coords : { x : 7, y : 8, direction : Direction.South} },
    { type : PlayerType.Rover, id : 5, coords : { x : 9, y : 10, direction : Direction.West} },
];

export const testAliens : PlayingPiece[] = [
    { type : PlayerType.Alien, id : 10, coords : { x : 1, y : 5, direction : Direction.North} },
    { type : PlayerType.Alien, id : 11, coords : { x : 2, y : 6, direction : Direction.North} },
    { type : PlayerType.Alien, id : 12, coords : { x : 3, y : 7, direction : Direction.North} }
];


/**
 * adds the above rovers and aliens to the gameState object, if not already added
 * @param clearAndRebuild true will clear any existing pieces and re-add the test pieces from above
 */
export function setupTestPlayingPieces(clearAndRebuild : boolean = false) {
    if(clearAndRebuild) {
        gameState.roverArray = [];
        gameState.alienArray = [];
    }

    if(gameState.roverArray.length === 0) {
        testRovers.forEach(rover => gameState.roverArray.push(rover));
    }
    if(gameState.alienArray.length === 0) {
        testAliens.forEach(alien => gameState.alienArray.push(alien));
    }
}


