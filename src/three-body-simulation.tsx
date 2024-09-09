import React, { useState } from 'react';
import MainCanvas from './normal-dist-canvas';
import ThreeBodySetupPopup from './three-body-params-setup';
import ThreeBodyCanvas from './three-body-canvas';

interface SimulationParams {

    
}


const ThreeBodySimulationApp: React.FC = () => {
    const [simulationParams, setSimulationParams] = useState<SimulationParams | null>(null);

    const handleSetupSubmit = (params: SimulationParams) => {
        setSimulationParams(params);
    };
    const resetParamsCallback = () => {
        setSimulationParams(null)
    }

    return (
        <div>
            {!simulationParams && <ThreeBodySetupPopup onSubmit={handleSetupSubmit} />}
            {simulationParams && <ThreeBodyCanvas
                modeSelected={"harmony"}
                resetParamsCallback={resetParamsCallback} />}
        </div>
    );
};

export default ThreeBodySimulationApp;
