/**
 * validator.ts - validates user input etc
 */

import { gameState, getMaxAllowedPlayingPieces, getPlayingPieceByCoords } from "./game-state";
import { Coords } from "./types";
import { parseCoords } from "./utils";

/**
 * 
 * @param input either 2 numbers or empty string
 * @returns array with 2 numbers for custom grid size
 *          empty array to use default grid size
 *          undefined for invalid input
 */
export function checkGridSizeInput(input :string) : number[] | undefined {
    if(input.length === 0) {
        return [];
    }

    if(input.length > 0) {
        let vals = input.split(' ');
        if(vals.length > 1) {
            let w = parseInt(vals[0]);
            let h = parseInt(vals[1]);

            if(Number.isNaN(w) === false && Number.isNaN(h) === false) {
                return [w, h];
            }
        }
    }

    return undefined;
}

/**
 * 
 * @param input - number of playing pieces
 * @returns number 1..max for valid input, undefined for invalid input
 */
export function checkPlayingPieceCountIsValid(input : string) : number | undefined {    
    if(input.length > 0) {
        let count = parseInt(input);
        if(Number.isInteger(count)) {
            if(count > 0) {
                let max = getMaxAllowedPlayingPieces();
                if(count > max) count = max;

                return count;
            }
        }
    }     
    return undefined;
}

/**
 * 
 * @param input - x/y coords + direction eg "1 2 N"
 * @returns Coords object if input is valid, coords are in range and not in use,
 *          else undefined is returned
 */
export function checkStartCoordsAreValid(input : string) : Coords | undefined {
    let vals = input.split(' ');
    if(vals.length < 3) {
        return undefined;
    }

    let coords = parseCoords(vals);
    if(coords === undefined || checkCoordsAreValidAndUnique(coords) == false){
        return undefined;
    }
    
    return coords;
}

export function checkCoordsAreValidAndUnique(coords : Coords) : boolean {
    if(checkCoordsInBounds(coords) === false) {
        return false;
    }
    
    return getPlayingPieceByCoords(coords.x, coords.y) === undefined;
}


export function checkCoordsInBounds(coords : Coords) : boolean {
    return coords.x >= 0 && coords.x <= gameState.maxX && coords.y >= 0 && coords.y <= gameState.maxY;
}