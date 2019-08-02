import React from 'react';
import './App.scss';
import Board from './components/board';

const boardSize: number[] = [10,10];

class App extends React.Component<{}, {}> {
  render(){
    return (
      <div className="b-app">
        <Board size={boardSize} />
        <button className="e-btn" onClick={() => this.forceUpdate()}>Regenerate</button>
      </div>
    );
  }
}

export default App;
