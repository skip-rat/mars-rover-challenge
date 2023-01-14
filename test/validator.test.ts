import { setGridSize } from "../src/game-state";
import { Direction } from "../src/types";
import { checkCoordsAreValidAndUnique, checkCoordsInBounds, checkGridSizeInput, checkPlayingPieceCountIsValid, checkStartCoordsAreValid } from "../src/validator";
import { setupTestPlayingPieces } from "./test-data";

describe("validator tests", () => {
    setGridSize(40, 20);     // set some initial state

    test("checkGridSizeInput", () => {
        expect(checkGridSizeInput("")).toStrictEqual([]);
        expect(checkGridSizeInput("10 20")).toStrictEqual([10, 20]);
        expect(checkGridSizeInput("10 20 30")).toStrictEqual([10, 20]);
    });
    test("checkGridSizeInput", () => {
        expect(checkGridSizeInput("one")).toBe(undefined);
        expect(checkGridSizeInput("one two")).toBe(undefined);
        expect(checkGridSizeInput("10 two")).toBe(undefined);
    });

    test("checkPlayingPieceCountIsValid", () => {        
        // getMaxAllowedPlayingPieces() should return 54 for 40x20 grid
        expect(checkPlayingPieceCountIsValid("")).toBe(undefined);
        expect(checkPlayingPieceCountIsValid("one")).toBe(undefined);
        expect(checkPlayingPieceCountIsValid("-1")).toBe(undefined);
        expect(checkPlayingPieceCountIsValid("0")).toBe(undefined);
        expect(checkPlayingPieceCountIsValid("1")).toBe(1);
        expect(checkPlayingPieceCountIsValid("2")).toBe(2);
        expect(checkPlayingPieceCountIsValid("53")).toBe(53);
        expect(checkPlayingPieceCountIsValid("54")).toBe(54);
        expect(checkPlayingPieceCountIsValid("55")).toBe(54);
        expect(checkPlayingPieceCountIsValid("100")).toBe(54);
    });
});

describe("more validator tests", () => {
    setGridSize(40, 20);
    setupTestPlayingPieces(true);       // ensure full set of test data

    test("checkStartCoordsAreValid coords out of bounds", () => {
        expect(checkStartCoordsAreValid("1 -1")).toBe(undefined);
        expect(checkStartCoordsAreValid("40 10")).toBe(undefined);
    });

    test("checkStartCoordsAreValid playing piece exists", () => {
        expect(checkStartCoordsAreValid("1 2 N")).toBe(undefined );
        expect(checkStartCoordsAreValid("9 10 W")).toBe(undefined);
        expect(checkStartCoordsAreValid("1 5 N")).toBe(undefined);
        expect(checkStartCoordsAreValid("3 7 N")).toBe(undefined);
    });

    test("checkStartCoordsAreValid coords in bounds and not in use", () => {
        expect(checkStartCoordsAreValid("0 0 N")).toStrictEqual({ x : 0, y : 0, direction : Direction.North});
        expect(checkStartCoordsAreValid("4 3 N")).toStrictEqual({ x : 4, y : 3, direction : Direction.North});
        expect(checkStartCoordsAreValid("12 9 N")).toStrictEqual({ x : 12, y :9, direction : Direction.North});
        expect(checkStartCoordsAreValid("39 19 N")).toStrictEqual({ x : 39, y : 19, direction : Direction.North});
    });

    test("checkCoordsAreValidAndUnique coords out of bounds", () => {
        expect(checkCoordsAreValidAndUnique( { x : 1, y : -1, direction : Direction.North} )).toBe(false);
        expect(checkCoordsAreValidAndUnique( { x : 40, y :10, direction : Direction.North} )).toBe(false);
    });

    test("checkCoordsAreValidAndUnique playing piece exists", () => {
        expect(checkCoordsAreValidAndUnique( { x : 1, y : 2, direction : Direction.North} )).toBe(false);
        expect(checkCoordsAreValidAndUnique( { x : 9, y : 10, direction : Direction.West} )).toBe(false);
        expect(checkCoordsAreValidAndUnique( { x : 1, y : 5, direction : Direction.North} )).toBe(false);
        expect(checkCoordsAreValidAndUnique( { x : 3, y : 7, direction : Direction.North} )).toBe(false);
    });

    test("checkCoordsAreValidAndUnique coords in bounds and not in use", () => {
        expect(checkCoordsAreValidAndUnique( { x : 0, y : 0, direction : Direction.North} )).toBe(true);
        expect(checkCoordsAreValidAndUnique( { x : 4, y : 3, direction : Direction.North} )).toBe(true);
        expect(checkCoordsAreValidAndUnique( { x : 12, y :9, direction : Direction.North} )).toBe(true);
        expect(checkCoordsAreValidAndUnique( { x : 39, y : 19, direction : Direction.North} )).toBe(true);
    });

    test("checkCoordsInBounds", () => {
        // using 40x20 grid set at the top
        expect(checkCoordsInBounds({ x : -1, y : 0, direction : Direction.North})).toBe(false);
        expect(checkCoordsInBounds({ x : 0, y : -1, direction : Direction.North})).toBe(false);
        expect(checkCoordsInBounds({ x : 39, y : 20, direction : Direction.North})).toBe(false);
        expect(checkCoordsInBounds({ x : 40, y : 19, direction : Direction.North})).toBe(false);
        expect(checkCoordsInBounds({ x : 124, y : 75, direction : Direction.North})).toBe(false);

        expect(checkCoordsInBounds({ x : 0, y : 0, direction : Direction.North})).toBe(true);
        expect(checkCoordsInBounds({ x : 1, y : 0, direction : Direction.North})).toBe(true);
        expect(checkCoordsInBounds({ x : 0, y : 1, direction : Direction.North})).toBe(true);
        expect(checkCoordsInBounds({ x : 1, y : 1, direction : Direction.North})).toBe(true);
        expect(checkCoordsInBounds({ x : 10, y : 10, direction : Direction.North})).toBe(true);
        expect(checkCoordsInBounds({ x : 39, y : 19, direction : Direction.North})).toBe(true);
    });
});