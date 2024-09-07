import React, { useState } from 'react';

interface NormalDistributionSetupPopupProps {
    onSubmit: (params: { ballCount: number, ballRadius:number }) => void;
}

const NormalDistributionSetupPopup: React.FC<NormalDistributionSetupPopupProps> = ({ onSubmit }) => {
    const [fieldSize, setFieldSize] = useState<[number, number]>([800, 600]);
    const [ballCount, setBallCount] = useState<number>(200);
    const [ballRadius, setBallRadius] = useState<number>(5);

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        onSubmit({ ballCount, ballRadius });
    };

    return (
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white', padding: '20px', border: '1px solid black' }}>
            <h2>Setup Simulation</h2>
            <label>
                Ball Radius:
                <input type="number" value={ballRadius} onChange={(e) => setBallRadius(+e.target.value)} />
            </label>
            <br />
            <label>
                Ball Count:
                <input type="number" value={ballCount} onChange={(e) => setBallCount(+e.target.value)} />
            </label>
            <br />
            <button onClick={handleSubmit}>Start Simulation</button>
        </div>
    );
};

export default NormalDistributionSetupPopup;
