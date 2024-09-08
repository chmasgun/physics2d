import React from 'react';
 

import './App.css';
import NormalDistributionSimulationApp from './normal-dist-simulation';
import ThreeBodyCanvas from './three-body-canvas';

function App() {
  return (
    <div className="App">

        <NormalDistributionSimulationApp></NormalDistributionSimulationApp>
        {/* <ThreeBodyCanvas></ThreeBodyCanvas> */}
    </div>
  );
}

export default App;
