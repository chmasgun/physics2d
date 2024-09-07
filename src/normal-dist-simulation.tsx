import React, { useState } from 'react';
import MainCanvas from './normal-dist-canvas';
import NormalDistributionSetupPopup from './normal-dist-params-setup';
import NormalDistributionCanvas from './normal-dist-canvas';

interface SimulationParams {
     
    ballCount: number;
    ballRadius: number;
}


const NormalDistributionSimulationApp: React.FC = () => {
    const [simulationParams, setSimulationParams] = useState<SimulationParams | null>(null);

    const handleSetupSubmit = (params: SimulationParams) => {
        setSimulationParams(params);
    };
    return (
        <div>
            {!simulationParams && <NormalDistributionSetupPopup  onSubmit={handleSetupSubmit} />}
            {simulationParams && <NormalDistributionCanvas  ballCount={simulationParams.ballCount} ballRadius={simulationParams.ballRadius} />}
        </div>
    );
};

export default NormalDistributionSimulationApp;
