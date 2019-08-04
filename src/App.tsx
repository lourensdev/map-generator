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
  private board: number[][] = [];

  constructor(props: any){
    super(props);
    this.state = {
      board: this.createBoardData(this.boardSize)
    }
  }

  createBoardData(size: number[]){
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

  addForestPass(grid: number[][]) {
    for (let x = 0; x < grid.length; x++) {
      for (let y = 0; y < grid[x].length; y++) {
        if(grid[x][y] !== TileProperty.water) {
          if(new Utilities().CoinFlip()) {
            grid[x][y] = TileProperty.trees;
          } else {
            grid[x][y] = TileProperty.grass;
          }
        }
      }
    }
    this.setState({
      board: grid
    });
  }

  addRocksPass(grid: number[][]) {
    for (let x = 0; x < grid.length; x++) {
      for (let y = 0; y < grid[x].length; y++) {
        if(grid[x][y] !== TileProperty.water && grid[x][y] === TileProperty.trees) {
          if(new Utilities().CoinFlip()) {
            grid[x][y] = TileProperty.rocks;
          }
        }
      }
    }
    this.setState({
      board: grid
    });
  }

  addElevationsPass(grid: number[][]) {
    for (let x = 0; x < grid.length; x++) {
      for (let y = 0; y < grid[x].length; y++) {
        if(grid[x][y] !== TileProperty.water) {
          if(new Utilities().CoinFlip(10)) {
            grid[x][y] = TileProperty.elevated;
          }
        }
      }
    }
    this.setState({
      board: grid
    });
  }

  addRiverPass(grid: number[][], width: number = 0, multiplier: number = 1) {
    for (let z = 0; z < multiplier; z++) {
      let randomStart: number = new Utilities().RandomRange(0, this.boardSize[0]);
      for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[x].length; y++) {
          if(y === randomStart) {
            if(y + width < grid[x].length) {
              for (let i = 0; i < width; i++) { 
                grid[x][y + i] = TileProperty.water;
              }
            } else {
              grid[x][y] = TileProperty.water;
            }
          }
        }
        if(x % 2 === 0) {
          randomStart = new Utilities().RandomRange(randomStart, randomStart + 1);
        } else {
          randomStart = new Utilities().RandomRange(randomStart - 1, randomStart + 2);
        }
      }
    }
    this.setState({
      board: grid
    });
  }
  
  render(){
    return (
      <div className="b-app">
        <Board data={this.state.board} />
        <div>
          <button className="e-btn" onClick={() => this.addForestPass(this.state.board)}>Add Forest</button>
          <button className="e-btn" onClick={() => this.addRocksPass(this.state.board)}>Add Rocks</button>
          <button className="e-btn" onClick={() => this.addElevationsPass(this.state.board)}>Add Elevations</button>
          <button className="e-btn" onClick={() => this.addRiverPass(this.state.board, 3, 1)}>Add Water</button>
        </div>
      </div>
    );
  }
}

export default App;
