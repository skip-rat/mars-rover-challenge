import { deleteAlien, deleteRover, gameState, getCoordsChecker, getMaxAllowedPlayingPieces, getNextRoverCommand, getPlayingPieceByCoords, setGridSize, setNewRoverCommand } from "../src/game-state";
import { Direction, PlayerType, PlayingPiece } from "../src/types";
import { setupTestPlayingPieces, testAliens, testRovers } from "./test-data";

describe("validator tests", () => {

    test("getCoordsChecker", () => {
        let piece = { type : PlayerType.Rover, id : 1, coords : { x : 1, y : 1, direction : Direction.North} };
        let fn = (x : number, y : number) : PlayingPiece => { return piece };
        let coordChecker = getCoordsChecker();
        expect(typeof coordChecker).toBe("function");
        // TODO how to test returned function is of type CoordChecker, need to match it's shape
    });

    test("setMaxGridSize", () => {
        setGridSize(30, 15);
        expect(gameState.maxX).toBe(29);
        expect(gameState.maxY).toBe(14);
    });  

    test("getPlayingPieceByCoords", () => {
        setupTestPlayingPieces();       // add some test data to gameState (will no re-add if already done in another test)
        expect(getPlayingPieceByCoords(0, 0)).toEqual(undefined);
        expect(getPlayingPieceByCoords(1, 4)).toEqual(undefined);
        expect(getPlayingPieceByCoords(1, 2)).toEqual(testRovers[0]);
        expect(getPlayingPieceByCoords(9, 10)).toEqual(testRovers[4]);
        expect(getPlayingPieceByCoords(1, 5)).toEqual(testAliens[0]);
        expect(getPlayingPieceByCoords(3, 7)).toEqual(testAliens[2]);
    });

    test("deleteRover", () => {
        setupTestPlayingPieces(true);       // ensure full set of test data
        expect(gameState.roverArray.length).toBe(testRovers.length);
        deleteRover(-1);        // invalid
        expect(gameState.roverArray.length).toBe(testRovers.length);
        deleteRover(1);
        expect(gameState.roverArray.length).toBe(testRovers.length-1);
        deleteRover(5);
        expect(gameState.roverArray.length).toBe(testRovers.length-2);
        deleteRover(20);        // invalid
        expect(gameState.roverArray.length).toBe(testRovers.length-2);
    });

    test("deleteAlien", () => {
        setupTestPlayingPieces(true);       // ensure full set of test data
        expect(gameState.alienArray.length).toBe(testAliens.length);
        deleteAlien(-1);        // invalid
        expect(gameState.alienArray.length).toBe(testAliens.length);
        deleteAlien(10);
        expect(gameState.alienArray.length).toBe(testAliens.length-1);
        deleteAlien(12);
        expect(gameState.alienArray.length).toBe(testAliens.length-2);
        deleteAlien(30);        // invalid
        expect(gameState.alienArray.length).toBe(testAliens.length-2);
    });

    test("getMaxAllowedPlayingPieces", () => {
        // formula is Math.ceil((w x h) / 15)
        setGridSize(10, 10);
        expect(getMaxAllowedPlayingPieces()).toBe(7);
        setGridSize(40, 20);
        expect(getMaxAllowedPlayingPieces()).toBe(54);
        setGridSize(60, 20);
        expect(getMaxAllowedPlayingPieces()).toBe(80);
        setGridSize(80, 20);     // should be 107 but max is 100
        expect(getMaxAllowedPlayingPieces()).toBe(100);
    }); 

    test("setNewRoverCommand and getNextRoverCommand", () => {
        let cmd = "MMRMLMM";
        setNewRoverCommand(cmd);
        expect(gameState.roverCommand).toBe(cmd);
        expect(getNextRoverCommand()).toBe("M");
        expect(getNextRoverCommand()).toBe("M");
        expect(getNextRoverCommand()).toBe("R");
        expect(getNextRoverCommand()).toBe("M");
        expect(getNextRoverCommand()).toBe("L");
        expect(getNextRoverCommand()).toBe("M");
        expect(getNextRoverCommand()).toBe("M");
        expect(getNextRoverCommand()).toBe("");
    }); 
}); 