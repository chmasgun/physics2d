import React, { useState } from 'react';
import { ball_configs } from './three-body-start-configs';
import ThreeBodyCanvas from './three-body-canvas';

interface ThreeBodySetupPopupProps {
    onSubmit: (params: { modeSelected: string }) => void;
    setSelectedApp: (app: number) => void;
}

const ThreeBodySetupPopup: React.FC<ThreeBodySetupPopupProps> = ({ onSubmit, setSelectedApp }) => {

    const [modeSelected, setModeSelected] = useState<string>("harmony");


    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        onSubmit({ modeSelected });
    };


    return (
        <div className="mode-selection-popup" style={{  height: "max(80vh, 720px)" }}>
            <h2>Setup the Simulation</h2>
            <div className='three-body-options-container'>
                {
                    Object.keys(ball_configs).filter(x => !x.startsWith("preview")).map(x =>
                        <div className='three-body-options' onClick={() => onSubmit({ modeSelected: x })}>
                            {x}
                            <div style={{aspectRatio: 1, width:"200px", height:"200px", overflow:"hidden"}}>
                                <ThreeBodyCanvas
                                    modeSelected={x}
                                    resetParamsCallback={() => { }}
                                    enableInfoPopup={false}
                                    mapScaleOuter={0.2222}
                                    autoRestartOnFinish={true} />
                            </div>
                        </div>
                    )
                }
            </div>
            {/*  buttons */}
            <div style={{ display: "flex", gap: "1rem", padding: "1rem" }}>
                {/* <button onClick={handleSubmit}>Start Simulation</button> */}
                <button onClick={() => setSelectedApp(-1)}>Go Back</button>
            </div>
            {/* <span style={{ color: "red", fontSize: "12px" }}>{ballCount > 600 ? "*Having too many balls might impact the performance" : ""}</span> */}
        </div>
    );
};

export default ThreeBodySetupPopup;
