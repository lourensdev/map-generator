import React from 'react';

import './tile.scss';

import dirt1 from '../images/dirt-1.png';
import dirt2 from '../images/dirt-2.png';
import dirt3 from '../images/dirt-3.png';
import dirt4 from '../images/dirt-4.png';
import dirt5 from '../images/dirt-5.png';
import dirt6 from '../images/dirt-6.png';
import dirt7 from '../images/dirt-7.png';
import dirt8 from '../images/dirt-8.png';
import dirt9 from '../images/dirt-9.png';

import grass1 from '../images/grass-1.png';
import grass2 from '../images/grass-2.png';
import grass3 from '../images/grass-3.png';
import grass4 from '../images/grass-4.png';
import grass5 from '../images/grass-5.png';
import grass6 from '../images/grass-6.png';
import grass7 from '../images/grass-7.png';
import grass8 from '../images/grass-8.png';
import grass9 from '../images/grass-9.png';

const dirtTiles: string[] = [
    dirt1,
    dirt2,
    dirt3,
    dirt4,
    dirt5,
    dirt6,
    dirt7,
    dirt8,
    dirt9
];

const grassTiles: string[] = [
    grass1,
    grass2,
    grass3,
    grass4,
    grass5,
    grass6,
    grass7,
    grass8,
    grass9
];

export enum TileType {
    dirt = "dirt",
    grass = "grass"
}

interface ITileProps {
    type: TileType;
    size?: number;
}

const Tile: React.FC<ITileProps> = (props) => {
    let tileArr: string[] = dirtTiles;
    switch(props.type) {
        case TileType.dirt:
            tileArr = dirtTiles;
            break;
        case TileType.grass:
            tileArr = grassTiles;
            break;
    }
    let tile: number = Math.floor(Math.random() * Math.floor(tileArr.length))
    return (
        <div className="b-tile" style={{
            width: props.size,
            height: (props.size! * 1.1666666666667)
        }}>
            <img className="e-img" src={tileArr[tile]} alt="Tile" />
        </div>
    );
};

Tile.defaultProps = {
    size: 60
}

export default Tile;