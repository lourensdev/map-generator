import React from 'react';
import './board.scss';
import Tile, { TileType } from './tile';

interface IBoardProps {
    size: number[];
}

class Board extends React.Component<IBoardProps, {}> {

    createColumns() {
        let cols: any[] = [];
        for (let i = 0; i < this.props.size[0]; i++) {
            cols.push(
                <div className="e-board-col"><Tile type={TileType.grass} /></div>
            );
        }
        return cols;
    }

    createRows() {
        let rows: any[] = [];
        for (let i = 0; i < this.props.size[1]; i++) {
            rows.push( <div className="e-board-row">{ this.createColumns() }</div> );
        }
        return rows;
    }

    render(){
        return (
            <div className="b-board">
                { this.createRows() }
            </div>
        );
    }
}

export default Board;