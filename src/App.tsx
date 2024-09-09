import React, { useState } from 'react';


import './App.css';
import NormalDistributionSimulationApp from './normal-dist-simulation';
import ThreeBodySimulationApp from './three-body-simulation';
import AppSelector from './app-selector';

function App() {

  const [selectedApp, setSelectedApp] = useState<number>(-1)

  return (
    <div className="App">
      {
        selectedApp === 0 ? (
          <NormalDistributionSimulationApp />
        ) : (
          selectedApp === 1 ?
            <ThreeBodySimulationApp></ThreeBodySimulationApp>
            :
            <AppSelector setSelectedApp={setSelectedApp}></AppSelector>
        )}


    </div>
  );
}

export default App;
