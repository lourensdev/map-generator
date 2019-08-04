import React from 'react';
import './board.scss';
import Tile from './tile';

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
    
    renderGridCell(index: number, property: number = 0){
        return (
            <div key={index} className="e-board-col">
                { 
                    property === 1 ? <Tile water={true} /> : <Tile property={property} />
                }
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