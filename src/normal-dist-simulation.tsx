import React, { useState } from 'react';
import MainCanvas from './normal-dist-canvas';
import NormalDistributionSetupPopup from './normal-dist-params-setup';
import NormalDistributionCanvas from './normal-dist-canvas';

interface SimulationParams {

    ballCount: number;
    ballRadius: number;
    ballColor: string;
}


const NormalDistributionSimulationApp: React.FC = () => {
    const [simulationParams, setSimulationParams] = useState<SimulationParams | null>(null);

    const handleSetupSubmit = (params: SimulationParams) => {
        setSimulationParams(params);
    };
    const resetParamsCallback = () => {
        setSimulationParams(null)
    }

    return (
        <div>
            {!simulationParams && <NormalDistributionSetupPopup onSubmit={handleSetupSubmit} />}
            {simulationParams && <NormalDistributionCanvas
                ballCount={simulationParams.ballCount}
                ballRadius={simulationParams.ballRadius}
                ballColor={simulationParams.ballColor}
                resetParamsCallback={resetParamsCallback} />}
        </div>
    );
};

export default NormalDistributionSimulationApp;
