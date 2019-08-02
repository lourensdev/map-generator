import React from 'react';
import Tile, { TileType } from './components/tile';

const App: React.FC = () => {
  return (
    <div className="App">
      <Tile type={TileType.dirt} />
      <Tile type={TileType.grass} />
      <Tile type={TileType.grass} />
    </div>
  );
}

export default App;
