import React from 'react';
import './App.scss';
import Board from './components/board';
import Utilities from './common/utilities';
import { TileProperty } from './components/tile';

/**
 * App State to update the board on changes
 *
 * @interface IAppState
 */
interface IAppState {
  board: number[][];
}

/**
 * App component for displaying the board and the generator controls
 *
 * @class App
 * @extends {React.Component<{}, IAppState>}
 */
class App extends React.Component<{}, IAppState> {

  /**
   * Define the default board size
   *
   * @private
   * @type {number[]}
   * @memberof App
   */
  private boardSize: number[] = [21,25];
  /**
   * Variable assigned to Utilities class for readable re-use
   *
   * @private
   * @type {*}
   * @memberof App
   */
  private decideWith: any = new Utilities();

  /**
   * Creates an instance of App.
   * @param {*} props
   * @memberof App
   */
  constructor(props: any){
    super(props);
    // Set default state to blank grass board
    this.state = {
      board: this.createBlankBoard(this.boardSize)
    }
  }

  /**
   * Update board state
   *
   * @param {number[][]} grid
   * @memberof App
   */
  updateBoard(grid: number[][]) {
    this.setState({
      board: grid
    });
  }

  /**
   * Easy use function to loop through the grid and run callbacks
   *
   * @param {number[][]} grid
   * @param {*} callbackY To execute any function on a cell level
   * @param {*} [callbackX=null] To execute any function on a row level
   * @memberof App
   */
  gridLoop(grid: number[][], callbackY: any, callbackX: any = null){
    // Step through row
    for (let x = 0; x < grid.length; x++) {
      // Step through cell
      for (let y = 0; y < grid[x].length; y++) {
        // Cell callback with x and y position passed back
        callbackY(x, y);
      }
      if(callbackX !== null) {
        // Row callback with x position passed back
        callbackX(x);
      }
    }
  }

  /**
   * Create a blank board from given board size array
   *
   * @param {number[]} size
   * @returns Blank board with each cell defined
   * @memberof App
   */
  createBlankBoard(size: number[]){
    // Set base type to grass tile type
    const baseType: number = TileProperty.grass;
    // Initialise rows
    let rows: number[][] = [];
    // Step through row
    for (let x = 0; x < size[0]; x++) {
      // Initialise cells
      let cells: number[] = [];
      // Step through cell
      for (let y = 0; y < size[1]; y++) {
        // Create cells as base type
        cells.push(baseType);
      }
      // Add cells to row
      rows.push(cells);
    }
    // Returns final board with rows and cells
    return rows;
  }

  /**
   * Adds forest tiles onto the board
   *
   * @param {number[][]} grid
   * @memberof App
   */
  addForest(grid: number[][]) {
    // Step through grid
    this.gridLoop(grid, (x: number, y: number) => {
      // Don't override water tiles
      if(grid[x][y] !== TileProperty.water) {
        // Flip a coin to decide if a tree should be planted
        if(this.decideWith.CoinFlip()) {
          grid[x][y] = TileProperty.trees;
        } else {
          // If not, just use default grass tile
          grid[x][y] = TileProperty.grass;
        }
      }
    })
    // Update the board state
    this.updateBoard(grid);
  }

  addRocks(grid: number[][]) {
    // Step through grid
    this.gridLoop(grid, (x: number, y: number) => {
      // Don't override water tiles and only apply rocks to tree tiles
      if(grid[x][y] !== TileProperty.water && grid[x][y] === TileProperty.trees) {
        // Flip a coin to decide if a rock should be added with low odds
        if(this.decideWith.CoinFlip(1)) {
          grid[x][y] = TileProperty.rocks;
        }
      }
    });
    // Update the board state
    this.updateBoard(grid);
  }

  addElevations(grid: number[][]) {
    // Step through grid
    this.gridLoop(grid, (x: number, y: number) => {
      // Don't override water, rocks or tree tiles
      if(grid[x][y] !== TileProperty.water && grid[x][y] !== TileProperty.rocks && grid[x][y] !== TileProperty.trees) {
        // Flip a coin to decide if an elevated tile should be added with very low odds
        if(this.decideWith.CoinFlip(0.5)) {
          grid[x][y] = TileProperty.elevated;
        }
      }
    });
    // Update the board state
    this.updateBoard(grid);
  }

  addRiver(grid: number[][], width: number = 0, multiplier: number = 1) {
    // Multiplier makes the river wider, default of 1 tile
    for (let z = 0; z < multiplier; z++) {
      // Randomly choose a cell index of where to start the river
      let randomIndex: number = this.decideWith.RandomRange(0, this.boardSize[0]);
      // Step through grid
      this.gridLoop(grid, (x: number, y: number) => {
          // If cell index === river start index
          if(y === randomIndex) {
            // Add river tiles, up to width or edge of board to prevent adding tiles outside the map
            for (let i = 0; i < grid[x].length; i++) {
              // Restrict to width of river
              if(i < width) {
                grid[x][y + i] = TileProperty.water;
              }
            }
          }
        }, (x: number) => {
          // Every 2nd row randomly calculate the next tile with slight offset
          // This calulation gives the river it's flowing shape
          if(x % 2 === 0) {
            randomIndex = this.decideWith.RandomRange(randomIndex, randomIndex + 1);
          } else {
            randomIndex = this.decideWith.RandomRange(randomIndex - 1, randomIndex + 2);
          }
        });
    }
    // Update the board state
    this.updateBoard(grid);
  }
  
  render(){
    return (
      <div className="b-app">
        <Board data={this.state.board} />
        <div>
          <button className="e-btn" onClick={() => this.addForest(this.state.board)}>Add Forest</button>
          <button className="e-btn" onClick={() => this.addRocks(this.state.board)}>Add Rocks</button>
          <button className="e-btn" onClick={() => this.addElevations(this.state.board)}>Add Elevations</button>
          <button className="e-btn" onClick={() => this.addRiver(this.state.board, 3, 1)}>Add Water</button>
        </div>
      </div>
    );
  }
}

export default App;