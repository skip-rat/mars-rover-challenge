import { gameState, setGridSize } from "../src/game-state";
import { applyAlienMove, applyRoverCommand, canAlienMove, canRoverMove, checkForEndGame, copyPlayingPiece, createRover, removePlayingPiece } from "../src/game-utils";
import { PlayerType, Direction } from "../src/types";
import { setupTestPlayingPieces, testAliens, testCoordsForPlayingPieces, testRovers } from "./test-data";

describe("game-utils tests", () => {
    test("copyPlayingPiece", () => {
        testRovers.forEach(piece =>
            expect(copyPlayingPiece(piece)).toStrictEqual (piece)
        );
        testAliens.forEach(piece =>
            expect(copyPlayingPiece(piece)).toStrictEqual (piece)
        );
    });

    test("createRover", () => {
        // to test creating rovers, need to start with empty array as rover ID is based on array size
        gameState.roverArray = [];
        let piece;
        for(let i = 0; i < testCoordsForPlayingPieces.length && i < testRovers.length; i += 1) {
            piece = createRover(testCoordsForPlayingPieces[i]);
            expect(piece).toStrictEqual (testRovers[i]);
            gameState.roverArray.push(piece);
        }
    });

    test("applyRoverCommand", () => {
        setGridSize(40, 20);
        const rover = { type : PlayerType.Rover, id : 1, coords : { x : 0, y : 0, direction : Direction.North} };
        // starting top left, try to move off grid N and then W, and do similar for the other 3 corners
        expect(applyRoverCommand("M", rover.coords)).toBe(false);
        expect(applyRoverCommand("L", rover.coords)).toBe(true);
        expect(applyRoverCommand("M", rover.coords)).toBe(false);
        rover.coords.x = 39;
        expect(applyRoverCommand("R", rover.coords)).toBe(true);
        expect(applyRoverCommand("M", rover.coords)).toBe(false);
        expect(applyRoverCommand("R", rover.coords)).toBe(true);
        expect(applyRoverCommand("M", rover.coords)).toBe(false);
        rover.coords.y = 19;
        expect(applyRoverCommand("M", rover.coords)).toBe(false);
        expect(applyRoverCommand("R", rover.coords)).toBe(true);
        expect(applyRoverCommand("M", rover.coords)).toBe(false);
        rover.coords.x = 0;
        expect(applyRoverCommand("M", rover.coords)).toBe(false);
        expect(applyRoverCommand("R", rover.coords)).toBe(true);
        expect(applyRoverCommand("M", rover.coords)).toBe(false);
        // try moving in the middle of the grid, using each type of cmd
        rover.coords.x = 10;
        rover.coords.y = 4
        rover.coords.direction = Direction.South;
        expect(applyRoverCommand("M", rover.coords)).toBe(true);
        expect(applyRoverCommand("F", rover.coords)).toBe(true);
        expect(applyRoverCommand("M", rover.coords)).toBe(true);
        expect(applyRoverCommand("M", rover.coords)).toBe(true);
        expect(applyRoverCommand("M", rover.coords)).toBe(true);
        expect(applyRoverCommand("R", rover.coords)).toBe(true);
        expect(applyRoverCommand("M", rover.coords)).toBe(true);
        expect(applyRoverCommand("M", rover.coords)).toBe(true);
        expect(applyRoverCommand("L", rover.coords)).toBe(true);
        expect(applyRoverCommand("M", rover.coords)).toBe(true);
        expect(applyRoverCommand("M", rover.coords)).toBe(true);    // reached edge of grid
        expect(applyRoverCommand("M", rover.coords)).toBe(false);
    });

    test("applyAlienMove", () => {
        // alien movement is random, including randomly remaining the same cell for a turn, direction field is not used for aliens
        // this test uses a very small grid, alien starts top left,
        // the alien is moved a good number of times to see that it remains in bounds and visits all cells        
        setGridSize(3, 3);
        const maxCoord = 2;
        const set = new Set<string>();      // to test if all possible coords visited
        const alien = { type : PlayerType.Alien, id : 1, coords : { x : 0, y : 0, direction : Direction.North} };
        
        for(let i = 0; i < 200; i += 1) {
            applyAlienMove(alien);
            set.add(alien.coords.x + "," + alien.coords.y);
            // test coords not out of bounds
            expect(alien.coords.x).toBeGreaterThanOrEqual(0);
            expect(alien.coords.x).toBeLessThanOrEqual(maxCoord);
            expect(alien.coords.y).toBeGreaterThanOrEqual(0);
            expect(alien.coords.y).toBeLessThanOrEqual(maxCoord);
        }
        // test all coords visited
        for(let row = 0; row < 3; row += 1) {
            for(let col = 0; col < 3; col += 1) {
                expect(set).toContain(col + "," + row);
            }
        }
    });

    test("canRoverMove", () => {
        setupTestPlayingPieces(true);       // populate grid with test playing pieces
        setGridSize(20, 20);
        // first try an empty cell (see test-data.ts)
        const coords = { x : 1, y : 1, direction : Direction.North};
        expect(canRoverMove(coords)).toBe(true);
        coords.y = 2;       // rover in this cell
        expect(canRoverMove(coords)).toBe(false);
        coords.y = 5;       // alien in this cell
        expect(canRoverMove(coords)).toBe(true);
        // try some out of bounds cells
        coords.y = -1;
        expect(canRoverMove(coords)).toBe(false);
        coords.x = -1;
        coords.y = 1;
        expect(canRoverMove(coords)).toBe(false);
        coords.x = 5;
        coords.y = 30;
        expect(canRoverMove(coords)).toBe(false);
        coords.x = 30;
        coords.y = 5;
        expect(canRoverMove(coords)).toBe(false);
        coords.x = 19;
        coords.y = 19;      // these are inbounds
        expect(canRoverMove(coords)).toBe(true);
    });

    test("canAlienMove", () => {
        setupTestPlayingPieces(true);       // populate grid with test playing pieces
        setGridSize(20, 20);
        // first try an empty cell (see test-data.ts)
        const coords = { x : 1, y : 1, direction : Direction.North};
        expect(canAlienMove(coords)).toBe(true);
        coords.y = 2;       // rover in this cell
        expect(canAlienMove(coords)).toBe(true);
        coords.y = 5;       // alien in this cell
        expect(canAlienMove(coords)).toBe(false);
        // try some out of bounds cells
        coords.y = -1;
        expect(canAlienMove(coords)).toBe(false);
        coords.x = -1;
        coords.y = 1;
        expect(canAlienMove(coords)).toBe(false);
        coords.x = 5;
        coords.y = 30;
        expect(canAlienMove(coords)).toBe(false);
        coords.x = 30;
        coords.y = 5;
        expect(canAlienMove(coords)).toBe(false);
        coords.x = 19;
        coords.y = 19;      // these are inbounds
        expect(canAlienMove(coords)).toBe(true);
    });

    test("removePlayingPiece", () => {
        // test playing piece is removed, and that the current one is assigned to the next available one if it is removed
        setupTestPlayingPieces(true);
        gameState.currentRover = testRovers[0];
        const roverCount = testRovers.length; 

        // first a rover that does not exist
        const rover = { type : PlayerType.Rover, id : 100, coords : { x : 6, y : 8, direction : Direction.North} };
        expect(gameState.roverArray.length).toBe(roverCount);
        removePlayingPiece(rover);
        expect(gameState.roverArray.length).toBe(roverCount);
        expect(gameState.currentRover).toStrictEqual(testRovers[0]);

        // remove a middle rover
        removePlayingPiece({ type : PlayerType.Rover, id : 3, coords : { x : 5, y : 6, direction : Direction.East} });
        expect(gameState.roverArray.length).toBe(roverCount-1);
        expect(gameState.currentRover).toStrictEqual(testRovers[0]);       // current rover not changed
        
        // remove first (and current) rover
        removePlayingPiece(testRovers[0]);
        expect(gameState.roverArray.length).toBe(roverCount-2);
        expect(gameState.currentRover).toStrictEqual(testRovers[1]);       // current rover should now be 2nd one
    });

    test("checkForEndGame", () => {
        setupTestPlayingPieces(true);
        expect(checkForEndGame()).toBe(false);
        gameState.roverArray = [];
        expect(checkForEndGame()).toBe(true);

        setupTestPlayingPieces(true);
        expect(checkForEndGame()).toBe(false);
        gameState.alienArray = [];
        expect(checkForEndGame()).toBe(true);

        gameState.roverArray = [];
        expect(checkForEndGame()).toBe(true);
    });
});