import React, { useState } from 'react';
import MainCanvas from './normal-dist-canvas';
import NormalDistributionSetupPopup from './normal-dist-params-setup';
import NormalDistributionCanvas from './normal-dist-canvas';

interface SimulationParams {

    ballCount: number;
    ballRadius: number;
    ballColor: string;
}
interface AppSelectorProps {
    setSelectedApp: (app: number) => void;
  }


const NormalDistributionSimulationApp: React.FC<AppSelectorProps> = ({setSelectedApp}) => {
    const [simulationParams, setSimulationParams] = useState<SimulationParams | null>(null);

    const handleSetupSubmit = (params: SimulationParams) => {
        setSimulationParams(params);
    };
    const resetParamsCallback = () => {
        setSimulationParams(null)
    }

    return (
        <div>
            {!simulationParams && <NormalDistributionSetupPopup onSubmit={handleSetupSubmit} setSelectedApp={setSelectedApp}/>}
            {simulationParams && <NormalDistributionCanvas
                ballCount={simulationParams.ballCount}
                ballRadius={simulationParams.ballRadius}
                ballColor={simulationParams.ballColor}
                resetParamsCallback={resetParamsCallback}
                enableInfoPopup={true} />}
        </div>
    );
};

export default NormalDistributionSimulationApp;
