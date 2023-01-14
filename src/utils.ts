/**
 * utils.ts - some basic utility functions used by the game
 * 
 */

import { Direction, Coords, CoordsChecker } from './types';

/**
 * parse an array of strings containing 3 values (x, y, direction)
 * @param arr 
 * @returns Coords object if the 2 x/y args are valid numbers, else returns undefined
 */
export function parseCoords(arr : string[]) : Coords | undefined {
    let xx = parseInt(arr[0]);
    let yy = parseInt(arr[1]);
    if(Number.isNaN(xx) || Number.isNaN(yy)) {
        return undefined;
    }
    // parseDirection defaults to North if needed
    return { x : xx, y : yy, direction : parseDirection(arr[2]) };
}

/**
 * convert a string to a Direction, defaulting to Direction "N" if string is not a valid direction
 * @param str 
 * @returns 
 */
export function parseDirection(str: string | undefined): Direction {
    if(str === undefined) return Direction.North;

    str = str.toLowerCase();
	if(str === 'e') return Direction.East;
    if(str === 's') return Direction.South;
    if(str === 'w') return Direction.West;
    
    return Direction.North;
}

export function rotateDirection(left : boolean, direction : Direction) : Direction {
    if(left) {
        if(direction === Direction.South) return Direction.East;
        if(direction === Direction.West) return Direction.South;
        if(direction === Direction.North) return Direction.West;
    } else {
        if(direction === Direction.South) return Direction.West;
        if(direction === Direction.East) return Direction.South;
        if(direction === Direction.North) return Direction.East;
    }

    return Direction.North;
}

/**
 * maps a number to a Direction, 1..4 -> N,S,E,W
 * defaults to North if direction arg is not 1..4
 * @param coords 
 * @param direction
 * @returns 
 */
export function numberToDirection(direction : number) : Direction {
    return  direction === 2 ? Direction.East : 
        (direction === 3 ? Direction.South : 
        (direction === 4 ? Direction.West : Direction.North));
}

/**
 * convert the coordinates in a Coords object to a comma separated string "x,y"
 * @param coords 
 * @returns 
 */
export function coordsToString(coords : Coords | undefined) : string {
    if(coords === undefined) return "";

    return coords.x + "," + coords.y;
}

export function sameCoords(pos1 : Coords, pos2 : Coords) : boolean {
    return pos1.x === pos2.x && pos1.y === pos2.y;
}

/**
 * moves the coords to one of it's 4 neighbouring cells based on the direction field
 * NOTE: does not check for out of bounds
 * @param coords 
 */
export function moveCoordsToNeighbour(coords : Coords): void {
    if(coords.direction === Direction.East) {
        coords.x = coords.x + 1;
    } else if(coords.direction === Direction.South) {
        coords.y = coords.y + 1;
    } else if(coords.direction === Direction.West) {
        coords.x = coords.x - 1;
    } else {        // North
        coords.y = coords.y - 1;
    }
}

export function copyCoords(coords : Coords) : Coords {
    return { x : coords.x, y : coords.y, direction : coords.direction };
}

/**
 * generates a random coordinate between 0,0 and maxX,maxY inclusive,
 * and ensures the coordinates are free (not in use) by calling CoordsChecker
 * 
 * NOTE: this function will not return if there are no more free coordinates for it to choose from,
 *       i.e. CoordsChecker returns an existing object for all coords tried,
 *       caller should check the grid is not full before calling
 * 
 * @param maxX 
 * @param maxY 
 * @param checkCoordsAreFree 
 * @returns 
 */
export function generateRandomCoords(maxX : number, maxY : number, coordChecker: CoordsChecker) : Coords {
    let x = 0;
    let y = 0;
    do {
        x = getRandomInt(maxX);
        y = getRandomInt(maxY);
    } while(coordChecker(x, y) !== undefined);

    return { x : x, y : y, direction : Direction.North };
}

/**
 * 
 * @param max 
 * @returns a random integer between 0 and max
 */
export function getRandomInt(max : number) : number {
    // random returns float from 0 (inclusive) to 1 (EXCLUSIVE)
    return Math.floor(Math.random() * (max + 1));
}
