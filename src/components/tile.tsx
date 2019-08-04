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

/**
 * List of grass tile images in an array for easy access
 */
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

/**
 * Tile Property types enum
 *
 * @export
 * @enum {number}
 */
export enum TileProperty {
    grass = 0,
    water = 1,
    trees = 2,
    rocks = 3,
    elevated = 4
}

/**
 * Tile types enum
 *
 * @export
 * @enum {number}
 */
export enum TileType {
    water = "water",
    grass = "grass"
}

/**
 * Tile props
 *
 * @interface ITileProps
 */
interface ITileProps {
    water?: boolean;
    property?: TileProperty;
    size?: number;
}

/**
 * Tile component to render a single tile with background image
 *
 * @param {*} props
 * @returns
 */
const Tile: React.FC<ITileProps> = (props) => {
    const decideWith: any = new Utilities();
    // Choose default tile type - Grass
    let tileArr: string[] = grassTiles;
    // If water prop, use a water tile instead
    tileArr = props.water ? [water] : grassTiles;

    // Initialise tile property at index 0 - plain grass
    let tilePropIndex: number = 0;
    // If any property prop is defined
    if(props.property !== 0) {
        switch(props.property) {
            case TileProperty.trees:
                // Choose random tree tile style
                tilePropIndex = decideWith.RandomRange(1, 4);
                break;
            case TileProperty.rocks:
                // Choose random rock tile style
                tilePropIndex = decideWith.RandomRange(5, 8);
                break;
            case TileProperty.elevated:
                // Choose elevated tile style
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

/**
 * Default props with grass being the default
 */
Tile.defaultProps = {
    water: false,
    property: 0,
    size: 30
}

export default Tile;