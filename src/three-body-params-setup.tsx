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
        <div className="mode-selection-popup" style={{  height: "clamp(80vh, 720px, 95vh)" }}>
            <h2>Go to the Simulation</h2>
            <p style={{fontSize:"0.875rem"}}>Click any of these scenarios below to run its simulation. Please note that, these animation previews are scaled down in terms of size, hence the real simulation might work differently.</p>
            <div className='three-body-options-container'>
                {
                    Object.keys(ball_configs).filter(x => !x.startsWith("preview")).map((x,i) =>
                        <div className='three-body-options' key={i} onClick={() => onSubmit({ modeSelected: x })}>
                            <div style={{flex:1, alignContent:"center"}}>{ball_configs[x]["desc"] || x }</div>
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
