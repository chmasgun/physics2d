import React, { useState } from 'react';

interface NormalDistributionSetupPopupProps {
    onSubmit: (params: { ballCount: number, ballRadius: number, ballColor: string }) => void;
    setSelectedApp: (app: number) => void;
}

const NormalDistributionSetupPopup: React.FC<NormalDistributionSetupPopupProps> = ({ onSubmit, setSelectedApp }) => {

    const [ballCount, setBallCount] = useState<number>(200);
    const [ballRadius, setBallRadius] = useState<number>(5);
    const [ballColor, setBallColor] = useState<string>("#aaffff");
    const [colorCheckboxChecked, setColorCheckboxChecked] = useState<boolean>(false);

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        onSubmit({ ballCount, ballRadius, ballColor });
    };
    const handleColorCheckboxClick = () => {
        if (colorCheckboxChecked) {
            setColorCheckboxChecked(false);
        } else {
            setBallColor("random");
            setColorCheckboxChecked(true);
        }
    }

    return (
        <div className='mode-selection-popup'>
            <h2>Setup the Simulation</h2>
            <label style={{ display: "flex", gap: "0.5rem" }}>
                Ball Radius:
                <input type="range" value={ballRadius} min={3} max={9} onChange={(e) => setBallRadius(+e.target.value)} />
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
                <input type="color" id="favcolor" value={ballColor} onChange={(e) => { setBallColor(e.target.value); setColorCheckboxChecked(false); }} />
                Random Colors?
                <input type="checkbox" checked={colorCheckboxChecked} onClick={handleColorCheckboxClick} />
            </label>
            <br />
            {/*  buttons */}
            <div style={{ display: "flex", gap: "1rem" }}>
                <button style={{textWrap:"nowrap", padding:"0.25rem 1rem"}} onClick={handleSubmit}>Start Simulation</button>
                <button style={{textWrap:"nowrap", padding:"0.25rem 1rem"}} onClick={() => setSelectedApp(-1)}>Go Back</button>
            </div>
            <span style={{ color: "red", fontSize: "12px" }}>{ballCount > 600 ? "*Having too many balls might impact the performance" : ""}</span>
        </div>
    );
};

export default NormalDistributionSetupPopup;
