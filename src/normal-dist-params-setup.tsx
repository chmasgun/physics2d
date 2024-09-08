import React, { useState } from 'react';

interface NormalDistributionSetupPopupProps {
    onSubmit: (params: { ballCount: number, ballRadius: number, ballColor: string }) => void;
}

const NormalDistributionSetupPopup: React.FC<NormalDistributionSetupPopupProps> = ({ onSubmit }) => {

    const [ballCount, setBallCount] = useState<number>(200);
    const [ballRadius, setBallRadius] = useState<number>(5);
    const [ballColor, setBallColor] = useState<string>("#aaaaaa");
    const [colorCheckboxChecked, setColorCheckboxChecked] = useState<boolean>(false);

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        onSubmit({ ballCount, ballRadius, ballColor });
    };
    const handleColorCheckboxClick = ( ) => {
        if(colorCheckboxChecked){
            setColorCheckboxChecked(false);
        }else{
            setBallColor("random"); 
            setColorCheckboxChecked(true);
        }
    }

    return (
        <div style={{ position: 'fixed', display: "flex", flexDirection: "column", alignItems: "center", top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white', padding: '10px', border: '1px solid black', width: "min(80vw, 400px)" }}>
            <h2>Setup Simulation</h2>
            <label style={{ display: "flex", gap: "0.5rem" }}>
                Ball Radius:
                <input type="range" value={ballRadius} min={3} max={10} onChange={(e) => setBallRadius(+e.target.value)} />
                <span>{ballRadius}</span>
            </label>
            <br />
            <label style={{ display: "flex", gap: "0.5rem" }}>
                Ball Count:
                <input type="range" value={ballCount} min={100} max={3000 / ballRadius} onChange={(e) => setBallCount(+e.target.value)} />
                <span>{ballCount}</span>
            </label>
            <br />
            <label style={{ display: "flex", gap: "0.5rem" }}>
                Ball Color:
                <input type="color" id="favcolor" value={ballColor} onChange={(e) => {setBallColor(e.target.value); setColorCheckboxChecked(false);}} />
                Random Colors?
                <input type="checkbox" checked={colorCheckboxChecked} onClick={ handleColorCheckboxClick}/>
            </label>
            <br />
            <button onClick={handleSubmit}>Start Simulation</button>
            <span style={{color:"red", fontSize:"12px"}}>{ballCount>600  ? "*Having too many balls might impact the performance":""}</span>
        </div>
    );
};

export default NormalDistributionSetupPopup;
