import React from 'react';
import './App.scss';
import Board from './components/board';
import Utilities from './common/utilities';
import { TileProperty } from './components/tile';

interface IAppState {
  board: number[][];
}

class App extends React.Component<{}, IAppState> {

  private boardSize: number[] = [21,25];
  private decideWith: any = new Utilities();

  constructor(props: any){
    super(props);
    this.state = {
      board: this.createBlankBoard(this.boardSize)
    }
  }

  updateBoard(grid: number[][]) {
    this.setState({
      board: grid
    });
  }

  gridLoop(grid: number[][], callbackY: any, callbackX: any = null){
    for (let x = 0; x < grid.length; x++) {
      for (let y = 0; y < grid[x].length; y++) {
        callbackY(x, y);
      }
      if(callbackX !== null) {
        callbackX(x);
      }
    }
  }

  createBlankBoard(size: number[]){
    const baseType: number = 0;
    let rows: number[][] = [];
    for (let x = 0; x < size[0]; x++) {
      let cells: number[] = [];
      for (let y = 0; y < size[1]; y++) {
        cells.push(baseType);
      }
      rows.push(cells);
    }
    return rows;
  }

  addForest(grid: number[][]) {
    this.gridLoop(grid, (x: number, y: number) => {
      if(grid[x][y] !== TileProperty.water) {
        if(this.decideWith.CoinFlip()) {
          grid[x][y] = TileProperty.trees;
        } else {
          grid[x][y] = TileProperty.grass;
        }
      }
    })
    this.updateBoard(grid);
  }

  addRocks(grid: number[][]) {
    this.gridLoop(grid, (x: number, y: number) => {
      if(grid[x][y] !== TileProperty.water && grid[x][y] === TileProperty.trees) {
        if(this.decideWith.CoinFlip(1)) {
          grid[x][y] = TileProperty.rocks;
        }
      }
    });
    this.updateBoard(grid);
  }

  addElevations(grid: number[][]) {
    this.gridLoop(grid, (x: number, y: number) => {
      if(grid[x][y] !== TileProperty.water && grid[x][y] !== TileProperty.rocks && grid[x][y] !== TileProperty.trees) {
        if(this.decideWith.CoinFlip(0.5)) {
          grid[x][y] = TileProperty.elevated;
        }
      }
    });
    this.updateBoard(grid);
  }

  addRiver(grid: number[][], width: number = 0, multiplier: number = 1) {
    for (let z = 0; z < multiplier; z++) {
      let randomIndex: number = this.decideWith.RandomRange(0, this.boardSize[0]);
      this.gridLoop(grid, (x: number, y: number) => {
          if(y === randomIndex) {
            if(y + width < grid[x].length) {
              for (let i = 0; i < width; i++) { 
                grid[x][y + i] = TileProperty.water;
              }
            } else {
              grid[x][y] = TileProperty.water;
            }
          }
        }, (x: number) => {
          if(x % 2 === 0) {
            randomIndex = this.decideWith.RandomRange(randomIndex, randomIndex + 1);
          } else {
            randomIndex = this.decideWith.RandomRange(randomIndex - 1, randomIndex + 2);
          }
        });
    }
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
