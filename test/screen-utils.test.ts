import { gameState } from '../src/game-state';
import { 
    ALIEN_SYMBOL,
    EDGE_CORNER_BL, 
    EDGE_CORNER_BR, 
    EDGE_CORNER_L, 
    EDGE_CORNER_R, 
    EDGE_CORNER_TL, 
    EDGE_CORNER_TR, 
    EDGE_H, EDGE_V, 
    EMPTY_CELL_SYMBOL, 
    getGridCellSymbol, 
    getPlayingPieceSymbol, 
    getRoverDirectionSymbol, 

    ROVER_DIRECTION_SYMBOL, 
    ROVER_SYMBOL
} from '../src/screen-utils';
import { Direction } from '../src/types';
import { testAliens, testRovers, setupTestPlayingPieces } from './test-data';

describe("screen-utils tests", () => {
    // todo 
    // formatPlayerCounts
    // colourizePlayingPieces
    test("get a grid cell symbol", () => {
        expect(getGridCellSymbol(0, 0, 10, 10)).toBe(EDGE_CORNER_TL);
        expect(getGridCellSymbol(10, 0, 10, 10)).toBe(EDGE_CORNER_TR);
        expect(getGridCellSymbol(0, 10, 10, 10)).toBe(EDGE_CORNER_BL);
        expect(getGridCellSymbol(10,10, 10, 10)).toBe(EDGE_CORNER_BR);

        expect(getGridCellSymbol(0, 5, 10, 10)).toBe(EDGE_V);
        expect(getGridCellSymbol(10, 5, 10, 10)).toBe(EDGE_V);
        expect(getGridCellSymbol(5, 0, 10, 10)).toBe(EDGE_H);
        expect(getGridCellSymbol(5, 10, 10, 10)).toBe(EDGE_H);

        expect(getGridCellSymbol(1, 1, 10, 10)).toBe(EMPTY_CELL_SYMBOL);
        expect(getGridCellSymbol(1, 5, 10, 10)).toBe(EMPTY_CELL_SYMBOL);
        expect(getGridCellSymbol(7, 3, 10, 10)).toBe(EMPTY_CELL_SYMBOL);
        expect(getGridCellSymbol(9, 9, 10, 10)).toBe(EMPTY_CELL_SYMBOL);
    });

    test("get playing piece symbol", () => {
        setupTestPlayingPieces();
        // 4 possible directions for current rover
        gameState.currentRover = testRovers[1];
        expect(getPlayingPieceSymbol(testRovers[1])).toBe(ROVER_DIRECTION_SYMBOL[0]);
        gameState.currentRover = testRovers[2];
        expect(getPlayingPieceSymbol(testRovers[2])).toBe(ROVER_DIRECTION_SYMBOL[1]);
        gameState.currentRover = testRovers[3];
        expect(getPlayingPieceSymbol(testRovers[3])).toBe(ROVER_DIRECTION_SYMBOL[2]);
        gameState.currentRover = testRovers[4];
        expect(getPlayingPieceSymbol(testRovers[4])).toBe(ROVER_DIRECTION_SYMBOL[3]);
        // this one is not the current rover
        expect(getPlayingPieceSymbol(testRovers[0])).toBe(ROVER_SYMBOL);
        expect(getPlayingPieceSymbol(testAliens[0])).toBe(ALIEN_SYMBOL);
    });
    test("get playing piece symbol", () => {
        expect(getRoverDirectionSymbol(Direction.North)).toBe(ROVER_DIRECTION_SYMBOL[0]);
        expect(getRoverDirectionSymbol(Direction.East)).toBe(ROVER_DIRECTION_SYMBOL[1]);
        expect(getRoverDirectionSymbol(Direction.South)).toBe(ROVER_DIRECTION_SYMBOL[2]);
        expect(getRoverDirectionSymbol(Direction.West)).toBe(ROVER_DIRECTION_SYMBOL[3]);
    });
});
