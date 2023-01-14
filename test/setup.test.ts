import { gameState } from '../src/game-state';
import { GameState, PlayingPiece } from '../src/types';

const testGameState : GameState = {
    maxX: 79,
    maxY: 19,
    roverArray: new Array<PlayingPiece>(),
    alienArray: new Array<PlayingPiece>(),
    currentRover: undefined,
    currentAlien: undefined,
    roverCommand: '',
    roverCommandIndex: 0
}

describe("setup tests", () => {
    test("", () => {
        expect(1).toBe(1);      // todo dummy test
    });
    /*test("gameData tests", () => {
        //expect(testGameDataUpate('hello')).toBe(undefined);
        expect(gameState).toMatchObject(testGameState);
    });*/
});