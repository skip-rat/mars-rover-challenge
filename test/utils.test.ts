//const sum = require('./sum');
import { Direction, PlayerType, PlayingPiece, Coords } from '../src/types';
import {
    parseDirection,
    coordsToString,
    sameCoords,
    rotateDirection,
    moveCoordsToNeighbour,
    copyCoords,
    generateRandomCoords,
    parseCoords,
    numberToDirection,
    getRandomInt
} from '../src/utils';
import { testCoords } from './test-data';

const playingPiece : PlayingPiece = { type : PlayerType.Rover, id : 1, coords : { x: 0, y: 0, direction: Direction.North } };

describe("utils tests", () => {
    test("parsing a Coord from an string", () => {
        expect(parseCoords([])).toBe(undefined);
        expect(parseCoords([""])).toBe(undefined);
        expect(parseCoords(["",""])).toBe(undefined);
        expect(parseCoords(["1","a"])).toBe(undefined);
        expect(parseCoords(["1","2.5"])).toMatchObject({ x : 1, y : 2, direction : Direction.North});
        expect(parseCoords(["1","2"])).toMatchObject({ x : 1, y : 2, direction : Direction.North});
    });
    test("parsing a direction from an string", () => {
        expect(parseDirection("")).toBe(Direction.North);
        expect(parseDirection("N")).toBe(Direction.North);
        expect(parseDirection("n")).toBe(Direction.North);
        expect(parseDirection("S")).toBe(Direction.South);
        expect(parseDirection("s")).toBe(Direction.South);
        expect(parseDirection("E")).toBe(Direction.East);
        expect(parseDirection("e")).toBe(Direction.East);
        expect(parseDirection("W")).toBe(Direction.West);
        expect(parseDirection("w")).toBe(Direction.West);
        expect(parseDirection("x")).toBe(Direction.North);
        expect(parseDirection("2")).toBe(Direction.North);
    });
    test("rotate a Direction value (left or right)", () => {
        expect(rotateDirection(true, Direction.North)).toBe(Direction.West);
        expect(rotateDirection(false, Direction.North)).toBe(Direction.East);
        expect(rotateDirection(true, Direction.South)).toBe(Direction.East);
        expect(rotateDirection(false, Direction.South)).toBe(Direction.West);
        expect(rotateDirection(true, Direction.East)).toBe(Direction.North);
        expect(rotateDirection(false, Direction.East)).toBe(Direction.South);
        expect(rotateDirection(true, Direction.West)).toBe(Direction.South);
        expect(rotateDirection(false, Direction.West)).toBe(Direction.North);
    });
    test("number to Direction)", () => {
        expect(numberToDirection(0)).toBe(Direction.North);
        expect(numberToDirection(1)).toBe(Direction.North);
        expect(numberToDirection(2)).toBe(Direction.East);
        expect(numberToDirection(3)).toBe(Direction.South);
        expect(numberToDirection(4)).toBe(Direction.West);
        expect(numberToDirection(27)).toBe(Direction.North);
    });
    test("coords to string (direction field is ignored)", () => {
        expect(coordsToString(undefined)).toBe("");
        expect(coordsToString({ x: 0, y: 0, direction: Direction.North })).toBe("0,0");
        expect(coordsToString({ x: 12, y: 58, direction: Direction.North })).toBe("12,58");
        expect(coordsToString({ x: 209, y: 385, direction: Direction.North })).toBe("209,385");
    });
    test("comparing coords (direction field is ignored)", () => {
        expect(sameCoords({ x: 0, y: 0, direction: Direction.North }, { x: 0, y: 0, direction: Direction.North })).toBe(true);
        expect(sameCoords({ x: 0, y: 0, direction: Direction.North }, { x: 0, y: 0, direction: Direction.South })).toBe(true);
        expect(sameCoords({ x: 0, y: 0, direction: Direction.North }, { x: 10, y: 0, direction: Direction.North })).toBe(false);
        expect(sameCoords({ x: 12, y: 41, direction: Direction.North }, { x: 12, y: 41, direction: Direction.North })).toBe(true);
        expect(sameCoords({ x: 12, y: 41, direction: Direction.North }, { x: 1, y: 41, direction: Direction.North })).toBe(false);
    });
    test("move coords to neighbour", () => {
        testCoords.forEach(arr => {
            expect(moveCoordsToNeighbour(arr[0])).toBe(undefined);
            expect(arr[0]).toMatchObject(arr[1]);       // the function arg is updated
        });
    });
    test("copy coords", () => {
        testCoords.forEach(arr => {
            expect(copyCoords(arr[0])).toMatchObject(arr[0]); 
        });
    });
    test("generateRandomCoords", () => {
        // generates random coords upto maxX/maxY that are not already in use,
        // it is passed a func to test if coords are in use or not,
        // mock function here will return an object for all but 1 set of coords,
        // so the test is to see if the generate func can find the 1 set of free coords
        expect(generateRandomCoords(10, 10, (x, y) => {
            if(x === 5 && y === 7) {
                return undefined;
            } else {
                playingPiece.coords.x = x;
                playingPiece.coords.y = y;
                return playingPiece;
            }
        } )).toMatchObject({ x : 5, y : 7, direction : Direction.North});
    });
    test("get random int", () => {
        // generate random ints from 0...max and check we get at least one of each
        const maxNum = 4;
        const nums = new Set();        
        for(let i = 0; i < 100; i++) {
            nums.add(getRandomInt(maxNum));
        }
        for(let i = 0; i < maxNum; i++) {
            expect(nums).toContain(i);
        }
    });
});