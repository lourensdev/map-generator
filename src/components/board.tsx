import React from 'react';
import './board.scss';
import Tile from './tile';

/**
 * Board props expects an 2D number array as input
 *
 * @interface IBoardProps
 */
interface IBoardProps {
    data: number[][];
}

/**
 * Board rendering component with rows and cells
 *
 * @class Board
 * @extends {React.Component<IBoardProps, {}>}
 */
class Board extends React.Component<IBoardProps, {}> {
    
    /**
     * Outputs the final modified grid, rows with nested cells
     *
     * @param {number[][]} grid
     * @returns Collection or rows and cell components
     * @memberof Board
     */
    outputBoard(grid: number[][]) {
        // Initialise the rows and index
        let rows: any[] = [];
        // Index tracks the React key value
        let index: number = 0;
        // Step through the rows
        for (let x = 0; x < grid.length; x++) {
            // Initialise the cells
            let cells: any[] = [];
            // Step through the cells
            for (let y = 0; y < grid[x].length; y++) {
                // Build cells in array for nesting in row
                cells.push(this.renderGridCell(index, grid[x][y]));
                // Update index count
                index++;
            }
            // Build rows in array for output
            rows.push(this.renderGridRow(index, cells));
            // Update index count
            index++;
        }
        return rows;
    }
    
    /**
     * Render the grid row wrapped in div container
     *
     * @param {number} index
     * @param {*} children
     * @returns Single row component
     * @memberof Board
     */
    renderGridRow(index: number, children: any) {
        return (
          <div key={index} className="e-board-row">
            {children}
          </div>
        );
    }
    
    /**
     * Render the grid cell wrapped in div container
     *
     * @param {number} index
     * @param {number} [property=0]
     * @returns Single cell component
     * @memberof Board
     */
    renderGridCell(index: number, property: number = 0){
        return (
            <div key={index} className="e-board-col">
                { property === 1 ? <Tile water={true} /> : <Tile property={property} /> }
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