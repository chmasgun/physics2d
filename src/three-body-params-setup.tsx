import React, { useState } from 'react';

interface ThreeBodySetupPopupProps {
    onSubmit: (params: { ballCount: number, ballRadius: number, ballColor: string }) => void;
    setSelectedApp: (app: number) => void;
}

const ThreeBodySetupPopup: React.FC<ThreeBodySetupPopupProps> = ({ onSubmit, setSelectedApp }) => {

    const [ballCount, setBallCount] = useState<number>(200);
    const [ballRadius, setBallRadius] = useState<number>(5);
    const [ballColor, setBallColor] = useState<string>("#aaaafa");
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
        <div style={{ position: 'fixed', display: "flex", flexDirection: "column", alignItems: "center", top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white', padding: '10px', border: '1px solid black', width: "min(80vw, 400px)" }}>
            <h2>Setup the Simulation</h2>
             
            {/*  buttons */}
            <div style={{ display: "flex", gap: "1rem" }}>
                <button onClick={handleSubmit}>Start Simulation</button>
                <button onClick={() => setSelectedApp(-1)}>Go Back</button>
            </div>
            <span style={{ color: "red", fontSize: "12px" }}>{ballCount > 600 ? "*Having too many balls might impact the performance" : ""}</span>
        </div>
    );
};

export default ThreeBodySetupPopup;
