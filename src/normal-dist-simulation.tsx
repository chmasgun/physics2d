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
    const mobileScaleFactor = Math.min(window.innerHeight / 900,  window.innerWidth/ 600 , 1) 

    const handleSetupSubmit = (params: SimulationParams) => {
        setSimulationParams(params);
    };
    const resetParamsCallback = () => {
        setSimulationParams(null)
    }

    return (
        <div style={{ height: "100%", display: "flex", justifyContent: "center" }}>
            
            {!simulationParams && <NormalDistributionSetupPopup onSubmit={handleSetupSubmit} setSelectedApp={setSelectedApp} />}

            {simulationParams && <div style={{  flex: "1" , display: "flex", justifyContent: "center"}}>
            {/* background: "white", */}
                 <NormalDistributionCanvas
                    ballCount={simulationParams.ballCount}
                    ballRadius={simulationParams.ballRadius * mobileScaleFactor}
                    ballColor={simulationParams.ballColor}
                    resetParamsCallback={resetParamsCallback}
                    enableInfoPopup={true}
                    mapScale={mobileScaleFactor}
                    gravity={0.042}
                    autoRestartOnFinish={false} />
            </div>}
        </div>
    );
};

export default NormalDistributionSimulationApp;
