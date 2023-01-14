/**
 * screen-state.ts - holds the offscreen buffers for drawing the GUI to the screen,
 *                   a 2D string array for the map grid
 *                   and a 2D string array for the stats board showing the scores
 * 
 */

import { getGridCellSymbol  } from "./screen-utils";

export const SCREEN_BORDER = 1;
export const STATS_BOARD_H = 3;
export const STATS_BOARD_MIN_W = 40;

export const screenState = {
    mapGrid : new Array<string[]>(),        // the game map grid
    statsBoard : new Array<string[]>()      // score board
}

export function initialiseScreenBuffer(gridW : number, gridH : number) {
    buildMap(gridW, gridH);
    buildStatsBoard(gridW);
}

export function buildMap(gridW : number, gridH : number) {
    if(gridW < 0 || gridH < 0) {
        return;
    }

    let mapW = gridW + SCREEN_BORDER + SCREEN_BORDER;
    let mapH = gridH + SCREEN_BORDER + SCREEN_BORDER;
    let maxX = mapW - 1;
    let maxY = mapH - 1;
    screenState.mapGrid = [];
    for (let row = 0; row < mapH; row = row + 1) {
        screenState.mapGrid[row] = [];
        for (let col = 0; col < mapW; col = col + 1) {
            screenState.mapGrid[row][col] = getGridCellSymbol(col, row, maxX, maxY);
        }
    }
}

function buildStatsBoard(gridW : number) {
    if(gridW < 0) {
        return;
    }

    let boardW = gridW + SCREEN_BORDER + SCREEN_BORDER;
    if(boardW < STATS_BOARD_MIN_W) boardW = STATS_BOARD_MIN_W;

    let boardH = STATS_BOARD_H + SCREEN_BORDER + SCREEN_BORDER;
    let maxX = boardW - 1;
    let maxY = boardH - 1;
    screenState.statsBoard = [];
    for (let row = 0; row < boardH; row = row + 1) {
        screenState.statsBoard[row] = [];
        for (let col = 0; col < boardW; col = col + 1) {
            screenState.statsBoard[row][col] = getGridCellSymbol(col, row, maxX, maxY);
        }
    }
}