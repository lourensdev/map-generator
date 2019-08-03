import React from 'react';
import './App.scss';
import Board from './components/board';
import Utilities from './common/utilities';

class App extends React.Component<{}, {}> {

  private boardSize: number[] = [15,15];
  private board: number[][] = [];

  constructor(props: any){
    super(props);
    this.board = this.createBoardData(this.boardSize);
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

  addRiverPass(grid: number[][], multiplier: number = 1) {
    for (let z = 0; z < multiplier; z++) {
      let randomStart: number = new Utilities().RandomRange(0, this.boardSize[0]);
      for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[x].length; y++) {
          if(y === randomStart) {
            grid[x][y] = 1;
          }
        }
        if(x % 2 === 0) {
          randomStart = new Utilities().RandomRange(randomStart, randomStart + 1);
        } else {
          randomStart = new Utilities().RandomRange(randomStart - 1, randomStart + 2);
        }
      }
    }
    this.forceUpdate();
  }
  
  render(){
    return (
      <div className="b-app">
        <Board data={this.board} />
        <button className="e-btn" onClick={() => this.addRiverPass(this.board, 3)}>Add Water</button>
      </div>
    );
  }
}

export default App;
