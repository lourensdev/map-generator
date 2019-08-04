import React from 'react';

import './tile.scss';

import water from '../images/water.png';

import grass1 from '../images/grass-1.png';
import grass2 from '../images/grass-2.png';
import grass3 from '../images/grass-3.png';
import grass4 from '../images/grass-4.png';
import grass5 from '../images/grass-5.png';
import grass6 from '../images/grass-6.png';
import grass7 from '../images/grass-7.png';
import grass8 from '../images/grass-8.png';
import grass9 from '../images/grass-9.png';
import Utilities from '../common/utilities';

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

export enum TileProperty {
    grass = 0,
    water = 1,
    trees = 2,
    rocks = 3,
    elevated = 4
}

export enum TileType {
    water = "water",
    grass = "grass"
}

interface ITileProps {
    water?: boolean;
    property?: TileProperty;
    size?: number;
}

const Tile: React.FC<ITileProps> = (props) => {
    let tileArr: string[] = grassTiles;
    tileArr = props.water ? [water] : grassTiles;

    let tilePropIndex: number = 0;
    if(props.property !== 0) {
        switch(props.property) {
            case TileProperty.trees:
                tilePropIndex = new Utilities().RandomRange(1, 4);
                break;
            case TileProperty.rocks:
                tilePropIndex = new Utilities().RandomRange(5, 8);
                break;
            case TileProperty.elevated:
                tilePropIndex = tileArr.length - 1;
                break;
        }
    }
    return (
        <div className="b-tile" style={{
            width: props.size,
            height: (props.size! * 1.1666666666667)
        }}>
            <img className="e-img" src={tileArr[tilePropIndex]} alt="Tile" />
        </div>
    );
};

Tile.defaultProps = {
    water: false,
    property: 0,
    size: 30
}

export default Tile;