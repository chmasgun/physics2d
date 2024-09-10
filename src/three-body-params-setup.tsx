import React, { useState } from 'react';
import { ball_configs } from './three-body-start-configs';
import ThreeBodyCanvas from './three-body-canvas';

interface ThreeBodySetupPopupProps {
    onSubmit: (params: {  modeSelected:string }) => void;
    setSelectedApp: (app: number) => void;
}

const ThreeBodySetupPopup: React.FC<ThreeBodySetupPopupProps> = ({ onSubmit, setSelectedApp }) => {

    const [modeSelected, setModeSelected] = useState<string>("harmony");
 
 
    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        onSubmit({ modeSelected });
    };
 

    return (
        <div style={{ position: 'fixed', display: "flex", flexDirection: "column", alignItems: "center", top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white', padding: '10px', border: '1px solid black', width: "min(80vw, 400px)", height:"max(80vh, 720px)"  }}>
            <h2>Setup the Simulation</h2>
            <div className='three-body-options-container'>
                {
                    Object.keys(ball_configs).filter(x => !x.startsWith("preview")).map(x =>
                        <div className='three-body-options' onClick={() => onSubmit({modeSelected:x})}>
                            {x}
                            <ThreeBodyCanvas
                            modeSelected={x}
                            resetParamsCallback={() => { }}
                            enableInfoPopup={false}
                            mapScaleOuter={0.2222} />
                            </div>
                        )
                }
            </div>
            {/*  buttons */}
            <div style={{ display: "flex", gap: "1rem", padding:"1rem" }}>
                {/* <button onClick={handleSubmit}>Start Simulation</button> */}
                <button onClick={() => setSelectedApp(-1)}>Go Back</button>
            </div>
            {/* <span style={{ color: "red", fontSize: "12px" }}>{ballCount > 600 ? "*Having too many balls might impact the performance" : ""}</span> */}
        </div>
    );
};

export default ThreeBodySetupPopup;
