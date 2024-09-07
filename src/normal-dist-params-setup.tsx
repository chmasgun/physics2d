import React, { useState } from 'react';

interface NormalDistributionSetupPopupProps {
    onSubmit: (params: { ballCount: number, ballRadius:number }) => void;
}

const NormalDistributionSetupPopup: React.FC<NormalDistributionSetupPopupProps> = ({ onSubmit }) => {

    const [ballCount, setBallCount] = useState<number>(200);
    const [ballRadius, setBallRadius] = useState<number>(5);

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        onSubmit({ ballCount, ballRadius });
    };

    return (
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white', padding: '10px', border: '1px solid black',width:"min(80vw, 400px)" }}>
            <h2>Setup Simulation</h2>
            <label>
                Ball Radius:
                <input type="range" value={ballRadius} min={3} max={10} onChange={(e) => setBallRadius(+e.target.value)} />
                <span>{ballRadius}</span>
            </label>
            <br />
            <label>
                Ball Count:
                <input type="range" value={ballCount} min={50} max={1000 / ballRadius} onChange={(e) => setBallCount(+e.target.value)} />
                <span>{ballCount}</span>
            </label>
            <br />
            <button onClick={handleSubmit}>Start Simulation</button>
        </div>
    );
};

export default NormalDistributionSetupPopup;
