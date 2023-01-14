import { buildMap, initialiseScreenBuffer, screenState, SCREEN_BORDER, STATS_BOARD_H } from "../src/screen-state";


describe("screen-state tests", () => {
    test("initialiseScreenBuffer", () => {
        expect(screenState.mapGrid.length).toBe(0);
        expect(screenState.statsBoard.length).toBe(0);
        expect(initialiseScreenBuffer(20, 20)).toBe(undefined);
        expect(screenState.mapGrid.length).toBe(20 + SCREEN_BORDER + SCREEN_BORDER);
        expect(screenState.statsBoard.length).toBe(STATS_BOARD_H + SCREEN_BORDER + SCREEN_BORDER);
        // the above also tests buildMap and buildStatsBoard
    });
    test("buildMap", () => {
        expect(buildMap(60, 40)).toBe(undefined);
        expect(screenState.mapGrid.length).toBe(40 + SCREEN_BORDER + SCREEN_BORDER);
    });
});