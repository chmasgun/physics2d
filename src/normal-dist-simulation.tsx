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


const NormalDistributionSimulationApp: React.FC<AppSelectorProps> = ({ setSelectedApp }) => {
    const [simulationParams, setSimulationParams] = useState<SimulationParams | null>(null);

    const handleSetupSubmit = (params: SimulationParams) => {
        setSimulationParams(params);
    };
    const resetParamsCallback = () => {
        setSimulationParams(null)
    }

    return (
        <div style={{ height: "100%", display: "flex", justifyContent: "center" }}>
            
            {!simulationParams && <NormalDistributionSetupPopup onSubmit={handleSetupSubmit} setSelectedApp={setSelectedApp} />}

            {simulationParams && <div style={{ background: "white", flex: "1" }}>
                 <NormalDistributionCanvas
                    ballCount={simulationParams.ballCount}
                    ballRadius={simulationParams.ballRadius}
                    ballColor={simulationParams.ballColor}
                    resetParamsCallback={resetParamsCallback}
                    enableInfoPopup={true}
                    mapScale={1}
                    gravity={0.025}
                    autoRestartOnFinish={false} />
            </div>}
        </div>
    );
};

export default NormalDistributionSimulationApp;
