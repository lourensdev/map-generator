import React from 'react';
import './board.scss';
import Tile, { TileType } from './tile';

interface IBoardProps {
    data: number[][];
}

class Board extends React.Component<IBoardProps, {}> {
    
    outputBoard(grid: number[][]) {
        let rows: any[] = [];
        let index: number = 0;
        for (let x = 0; x < grid.length; x++) {
          let cells: any[] = [];
          for (let y = 0; y < grid[x].length; y++) {
            cells.push(this.renderGridCell(index, grid[x][y]));
            index++;
          }
          rows.push(this.renderGridRow(index, cells));
          index++;
        }
        return rows;
    }
    
    renderGridRow(index: number, children: any) {
        return (
          <div key={index} className="e-board-row">
            {children}
          </div>
        );
    }
    
    renderGridCell(index: number, type: number = 0){
        let tile: any;
        switch(type) {
            case 0: 
                tile = <Tile type={TileType.grass} />;
                break;
            case 1: 
                tile = <Tile type={TileType.water} />;
                break;
        }
        return (
            <div key={index} className="e-board-col">
                { tile }
            </div>
        );
    }

    render(){
        return (
            <div className="b-board">
                { this.outputBoard(this.props.data) }
            </div>
        );
    }
}

export default Board;