/**
 * screen-utils.ts - provides the ascii/unicode characters etc for the GUI
 * 
 */

import { Direction, PlayerType, PlayingPiece } from "./types";
import { getCurrentRover } from './current-player';

// border for the map grid and score board
export const EDGE_CORNER_TL = '┌';
export const EDGE_CORNER_TR = '┐';
export const EDGE_CORNER_BL = '└';
export const EDGE_CORNER_BR = '┘';
export const EDGE_CORNER_L = '├';
export const EDGE_CORNER_R = '┤';
export const EDGE_H = '─';
export const EDGE_V = '│';

// chars to show the playing pieces on the map
export const ROVER_DIRECTION_SYMBOL = ['^', '>', 'v', '<'];
//export const ROVER_SYMBOL = '🚜';     // NOTE unicode chars take 2 char spaces, so grid would need to double in width if used
//export const ALIEN_SYMBOL = '👾';     // ie would need 2 chars per map grid cell
export const ROVER_SYMBOL = 'R';
export const ALIEN_SYMBOL = 'A';
export const EMPTY_CELL_SYMBOL = ' ';
export const PATH_TAKEN_SYMBOL = ' ';      // can be set to a diff char to show the path a piece is taking (eg '.') for debugging

// to colourise the GUI
export const CONSOLE_COLOURS = {
    black :   '\u001b[30m',
    red :     '\u001b[31m',
    green :   '\u001b[32m',
    yellow :  '\u001b[33m',
    blue :    '\u001b[34m',
    magenta : '\u001b[35m',
    cyan :    '\u001b[36m',
    white :   '\u001b[37m',
    reset :   '\u001b[0m'
};

export const DEFAULT_BG_COLOUR = CONSOLE_COLOURS.black;     // colour work best on a dark themed console
export const DEFAULT_FG_COLOUR = CONSOLE_COLOURS.white;
export const ROVER_COLOUR = CONSOLE_COLOURS.blue;
export const ALIEN_COLOUR = CONSOLE_COLOURS.magenta;
export const CURRENT_ROVER_COLOUR = CONSOLE_COLOURS.white;
export const BORDER_COLOUR = DEFAULT_FG_COLOUR;
export const RESET_COLOUR = CONSOLE_COLOURS.reset;

/**
 * 
 * @returns the character to show where a playing piece has moved from
 *          this would normally be a space char, but could be set to some other char to
 *          show a playing pieces path on the map for debugging
 */
export function getPathTakenSymbol() {
    return PATH_TAKEN_SYMBOL;
}

/**
 * 
 * @param col 
 * @param row 
 * @param maxX 
 * @param maxY 
 * @returns either a border symbol or empty cell symbol depending on the coords
 */
export function getGridCellSymbol(col : number, row : number, maxX : number, maxY : number) : string {
    if(col === 0 && row === 0) return EDGE_CORNER_TL;
    if (col === 0 && row === maxY) return EDGE_CORNER_BL;
    if (col === maxX && row === 0) return EDGE_CORNER_TR;
    if (col === maxX && row === maxY) return EDGE_CORNER_BR;
    
    if(col === 0 || col === maxX) return EDGE_V;
    if(row === 0 || row === maxY) return EDGE_H;
    return  EMPTY_CELL_SYMBOL;
}

/**
 * 
 * @param roverCount 
 * @param alienCount 
 * @returns colour formatting string showing number of playing pieces left in the game
 */
export function formatPlayerCounts(roverCount : number, alienCount : number) : string {
    return `${EDGE_V}  ${ROVER_COLOUR}(${ROVER_SYMBOL}) Rovers:${RESET_COLOUR} ${roverCount}` + 
    `   ${ALIEN_COLOUR}(${ALIEN_SYMBOL}) Aliens:${RESET_COLOUR} ${alienCount}`;
}

/**
 * 
 * @param line - one line of screen output, if not a top or bottom 'border' line it will be a line
 *               that possibly contains playing pieces, the playing piece chars will be colourised
 * @returns 
 */
export function colourizePlayingPieces(line : string) : string {
    line = line.replaceAll(ROVER_SYMBOL, `${ROVER_COLOUR}${ROVER_SYMBOL}`);
    ROVER_DIRECTION_SYMBOL.forEach(symbol => line = line.replaceAll(symbol, `${CURRENT_ROVER_COLOUR}${symbol}`));
    line = line.replaceAll(ALIEN_SYMBOL, `${ALIEN_COLOUR}${ALIEN_SYMBOL}`);
    line = line.replaceAll(EDGE_V, `${RESET_COLOUR}${EDGE_V}`);
    return line;
}

export function getPlayingPieceSymbol(piece : PlayingPiece) : string{
    if(piece.type === PlayerType.Alien) return ALIEN_SYMBOL;
    if(piece.type === PlayerType.Rover) return getRoverSymbol(piece);
    return '?';
}

function getRoverSymbol(piece : PlayingPiece) : string {
    if(piece.type === PlayerType.Rover) {
        let roverData = getCurrentRover();       
        if(roverData !== undefined && roverData.id === piece.id) {
            return getRoverDirectionSymbol(roverData.coords.direction);
        }
    }
    return ROVER_SYMBOL;
}

export function getRoverDirectionSymbol(d : Direction) : string{
    if(d === Direction.East) return ROVER_DIRECTION_SYMBOL[1];
    if(d === Direction.South) return ROVER_DIRECTION_SYMBOL[2];
    if(d === Direction.West) return ROVER_DIRECTION_SYMBOL[3];
    return ROVER_DIRECTION_SYMBOL[0];
}
