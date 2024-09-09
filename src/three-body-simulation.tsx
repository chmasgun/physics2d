import React, { useState } from 'react';
import MainCanvas from './normal-dist-canvas';
import ThreeBodySetupPopup from './three-body-params-setup';
import ThreeBodyCanvas from './three-body-canvas';

interface SimulationParams {

    
}

interface AppSelectorProps {
    setSelectedApp: (app: number) => void;
  }

const ThreeBodySimulationApp: React.FC<AppSelectorProps> = ({setSelectedApp}) => {
    const [simulationParams, setSimulationParams] = useState<SimulationParams | null>(null);

    const handleSetupSubmit = (params: SimulationParams) => {
        setSimulationParams(params);
    };
    const resetParamsCallback = () => {
        setSimulationParams(null)
    }

    return (
        <div style={{background:"#111", height:"100%", display:"flex", justifyContent:"center"}}>
            {!simulationParams && <ThreeBodySetupPopup onSubmit={handleSetupSubmit} setSelectedApp={setSelectedApp} />}
            {simulationParams && <ThreeBodyCanvas
                modeSelected={"harmony"}
                resetParamsCallback={resetParamsCallback}
                enableInfoPopup={true}
                mapScaleOuter={ 1} />}
        </div>
    );
};

export default ThreeBodySimulationApp;
