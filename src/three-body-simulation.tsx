import React, { useState } from 'react';
import MainCanvas from './normal-dist-canvas';
import ThreeBodySetupPopup from './three-body-params-setup';
import ThreeBodyCanvas from './three-body-canvas';

interface SimulationParamsThree {

    modeSelected:string
}

interface AppSelectorProps {
    setSelectedApp: (app: number) => void;
  }

const ThreeBodySimulationApp: React.FC<AppSelectorProps> = ({setSelectedApp}) => {
    const [simulationParams, setSimulationParams] = useState<SimulationParamsThree | null>(null);
    const mobileScaleFactor = Math.min(window.innerHeight, window.innerWidth) / 900


    const handleSetupSubmit = (params: SimulationParamsThree) => {
        setSimulationParams(params);
    };
    const resetParamsCallback = () => {
        setSimulationParams(null)
    }

    return (
        <div style={{ width:"100%", height:"100%", display:"flex", justifyContent:"center"}}>
            {!simulationParams && <ThreeBodySetupPopup onSubmit={handleSetupSubmit} setSelectedApp={setSelectedApp} />}
            {simulationParams && <ThreeBodyCanvas
                modeSelected={simulationParams.modeSelected}
                resetParamsCallback={resetParamsCallback}
                enableInfoPopup={true}
                mapScaleOuter={ mobileScaleFactor}
                autoRestartOnFinish={false} />}
        </div>
    );
};

export default ThreeBodySimulationApp;
