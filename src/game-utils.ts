/**
 * game-utils.ts - functions used when the game is running
 * 
 */

import { getNextRover, getNextAlien } from "./current-player";
import { getPlayingPieceByCoords, gameState, deleteRover, deleteAlien } from "./game-state";
import { Coords, PlayerType, PlayingPiece } from "./types";
import { copyCoords, getRandomInt, moveCoordsToNeighbour, numberToDirection, rotateDirection } from "./utils";
import { checkCoordsInBounds } from "./validator";

const CMD_ROTATE_LEFT = "L";
const CMD_ROTATE_RIGHT = "R";
const CMD_FLIP = "F";
const CMD_MOVE = "M";

export function copyPlayingPiece(piece : PlayingPiece) : PlayingPiece {
    return { type : piece.type, id : piece.id, coords :
        { x : piece.coords.x, y : piece.coords.y, direction : piece.coords.direction }};
}

export function createRover(coords : Coords) : PlayingPiece {
    return { type : PlayerType.Rover, id : gameState.roverArray.length + 1,
        coords : { x : coords.x, y : coords.y, direction : coords.direction }};
}

/**
 * apply a single rover command to update the rovers location
 * @param cmd - a single command like 'R' for rotate right
 * @param coords - current rover coords
 * @returns true if rover is able to execute the command
 */
export function applyRoverCommand(cmd : string, coords : Coords) : boolean {
    let canMove = true;

    if(cmd === CMD_ROTATE_LEFT) {
        coords.direction = rotateDirection(true, coords.direction);
    } else if(cmd === CMD_ROTATE_RIGHT) {
        coords.direction = rotateDirection(false, coords.direction);
    } else if(cmd === CMD_FLIP) {
        coords.direction = rotateDirection(true, coords.direction);
        coords.direction = rotateDirection(true, coords.direction);
    } else if(cmd === CMD_MOVE) {
        let newCoords = copyCoords(coords);
        moveCoordsToNeighbour(newCoords);
        if(canRoverMove(newCoords) == false) {
            canMove = false; 
        } else {        // ok to move
            coords.x = newCoords.x;
            coords.y = newCoords.y;
        }
    }

    return canMove;
}

/**
 * randomly move an alien to one of it's 4 neighbour cells, or possibly stay put
 * @param alien 
 * @returns 
 */
export function applyAlienMove(alien : PlayingPiece) : boolean {
    let rand = getRandomInt(4);
    if(rand === 0) {
        return false;       // stay put
    }

    let newCoords = copyCoords(alien.coords);
    newCoords.direction = numberToDirection(rand);
    moveCoordsToNeighbour(newCoords);

    let canMove = true;
    if(canAlienMove(newCoords) == false) {
        canMove = false;
    } else {        // ok to move
        alien.coords.x = newCoords.x;
        alien.coords.y = newCoords.y;
    }
    return canMove;
}

export function canRoverMove(pos : Coords) : boolean {
    if(checkCoordsInBounds(pos) == false) {
        return false;   // out of bounds
    }    
    let piece = getPlayingPieceByCoords(pos.x, pos.y);
    if(piece === undefined) {
        return true;    // empty cell
    }
    if(piece.type === PlayerType.Rover) {    // rover cannot move onto rover cell
        return false;
    }
    if(piece.type === PlayerType.Alien) {    // rover takes alien
        removePlayingPiece(piece);
        return true;
    }

    return false;
}

export function canAlienMove(pos : Coords) : boolean {
    if(checkCoordsInBounds(pos) == false) {
        return false;   // out of bounds
    }
    let piece = getPlayingPieceByCoords(pos.x, pos.y);
    if(piece === undefined) {
        return true;    // empty cell
    }
    if(piece.type === PlayerType.Alien) {    // alien cannot move onto alien cell
        return false;
    }
    if(piece.type === PlayerType.Rover) {    // alien takes rover
        removePlayingPiece(piece);
        return true;
    }

    return false;
}

export function removePlayingPiece(piece : PlayingPiece) {
    if(piece === undefined) {
        return;
    }

    // if piece being removed is the current one (ie the next one to move)
    // update current to the next available
    if(piece.type === PlayerType.Rover) {
        if(gameState.currentRover?.id === piece.id) {
            gameState.currentRover = getNextRover();
        }
        deleteRover(piece.id);
    } else if(piece.type === PlayerType.Alien) {
        if(gameState.currentAlien?.id === piece.id) {
            gameState.currentAlien = getNextAlien();
        }
        deleteAlien(piece.id);
    }
}

export function checkForEndGame() : boolean {
    if(gameState.roverArray.length == 0 || gameState.alienArray.length == 0)  {
        return true;
    }
    return false;
}