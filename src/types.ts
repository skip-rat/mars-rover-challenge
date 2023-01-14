/**
 * types.ts - the custom datatypes for the game
 * 
 */

export enum Direction {
    North,
    East,
    South,
    West
};

export enum PlayerType {
    None,
    Rover,
    Alien
};

/**
 * defines the location for a playing piece (rover or alien),
 * and for a rover the direction it is pointing in
 */
export interface Coords {
    x : number;
    y : number;
    direction : Direction;
};

/**
 * contains all the data about a single playing piece (rover or alien)
 */
export interface PlayingPiece {
    type : PlayerType;
    id : number;
    coords : Coords;
};

/**
 * default sizes for the map grid
 */
export interface GridSizes {
    minGridWidth : number;
    minGridHeight : number;
    maxGridWidth : number;
    maxGridHeight : number;
    defaultGridWidth : number;
    defaultGridHeight : number;
};

/**
 * all the data needed to run a game
 */
export interface GameState {
    maxX : number;                              // max grid coords
    maxY : number;
    roverArray : Array<PlayingPiece>;           // represents the rovers and aliens
    alienArray : Array<PlayingPiece>;
    currentRover : PlayingPiece | undefined;    // reference to current playing piece being moved
    currentAlien : PlayingPiece | undefined;
    roverCommand : string;                      // strores current list of rover commands being executed
    roverCommandIndex : number;                 // which rover command to execute next (0..n)
};

/**
 * returns the PlayingPiece at the given coords or undefined if the cell is empty
 */
export type CoordsChecker = (x: number, y : number) => PlayingPiece | undefined;


