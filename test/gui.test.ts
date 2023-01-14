import { gameState } from "../src/game-state";
import { initialiseGUI, movePlayingPiece } from "../src/gui";
import { PlayerType, Direction } from "../src/types";


describe("screen tests", () => {
    gameState.maxX = 40;
    gameState.maxY = 20;
    initialiseGUI();                  // setup offscreen buffer
    test("movePlayingPiece", () => {
        let rover = { type : PlayerType.Rover, id : 1, coords : { x : 1, y : 2, direction : Direction.North} };
        expect(movePlayingPiece(undefined, rover)).toBe(undefined);
    });
    //todo test not finished

    //todo
    // movePlayingPiece
    // movePlayingPieceOnGrid
    // resetPlayingPiece
    // drawGUI
    // 
});