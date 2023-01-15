
# Source Files

start.ts                entry point to the game

types.ts                custom datatypes
utils.ts                general utility functions

console.ts              provides access to the console for I/O
gui.ts                  functions to update the screen with the game state
screen-state.ts         offscreen buffers for rendering game state to the screen
screen-utils.ts         helps to format and colourise screen output etc

input.ts                prompts user for input
validator.ts            check user input is valid

setup.ts                prompts user for initial game conditions
initialise.ts           initialises the game ready to play

game-state.ts           stores the game state
current-player.ts       provides access to the current player (rover or alien)
game-utils.ts           functions used while the game is running

game.ts                 controls the flow of the game as it is played


# Limitations

1. The game can be slow to play if there are lots of aliens (max is 100).
This is due to each alien having a (random) chance to move 1 cell after the current rover being
moved has executed a single command (rotate or move 1 cell)

Realistically the game is best played with a smaller number of rovers and aliens than the max. Also 
ensure you play in full screen mode i.e. terminal is full screen

2. Rover are shown as 'R' on the map and aliens as 'A'
The current rover being moved is show as an arrow to indicate the direction it is facing (<^v>)

During the aliens turn to move they can take out a number of rovers. If the current rover (marked
with an arrow) is taken out, the next available rover will now be marked. So during the aliens
turn, the arrow marking the current rover can move about the screen, as each previous current rover
is removed by an alien.











