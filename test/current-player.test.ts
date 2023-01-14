import { getCurrentAlien, getCurrentRover, getNextAlien, getNextRover, selectFirstRover } from "../src/current-player";
import { gameState, initGameData } from "../src/game-state";
import { testAliens, testRovers, setupTestPlayingPieces } from "./test-data";


describe("current-player tests", () => {
    setupTestPlayingPieces(true);       // ensure full set of test data
    test("select first rover", () => {
        expect(gameState.currentRover).toBe(undefined);
        selectFirstRover();
        expect(gameState.currentRover).toMatchObject(testRovers[0]);
    });
    test("get current rover and get next rover", () => {
        // this is based on state after previous tests
        expect(getCurrentRover()).toEqual(testRovers[0]);
        expect(getNextRover()).toMatchObject(testRovers[1]);
        let rover = getNextRover();     // will be index 1 again
        gameState.currentRover = rover;
        expect(getNextRover()).toMatchObject(testRovers[2]);
    });
    test("get current alien and get next alien", () => {
        // this is based on state after previous tests
        gameState.currentAlien = testAliens[0];
        expect(getCurrentAlien()).toEqual(testAliens[0]);
        expect(getNextAlien()).toMatchObject(testAliens[1]);
        let alien = getNextAlien();     // will be index 1 again
        gameState.currentAlien = alien;
        expect(getNextAlien()).toMatchObject(testAliens[2]);
    });
});

