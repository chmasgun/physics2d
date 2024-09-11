import React, { useEffect, useState } from 'react';
import { ball_configs } from './three-body-start-configs';
import ThreeBodyCanvas from './three-body-canvas';

interface ThreeBodySetupPopupProps {
    onSubmit: (params: { modeSelected: string }) => void;
    setSelectedApp: (app: number) => void;
}

const ThreeBodySetupPopup: React.FC<ThreeBodySetupPopupProps> = ({ onSubmit, setSelectedApp }) => {

    const itemPerPage = 4;
    const [modeSelected, setModeSelected] = useState<string>("harmony");
    const [currentPage, setCurrentPage] = useState(0)

    const maxNoPages = Math.ceil(Object.keys(ball_configs).filter(x => !x.startsWith("preview")).length / itemPerPage)

    // const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    //     event.preventDefault();
    //     onSubmit({ modeSelected });
    // };

    useEffect(() => {
        applyFlashEffect()
    }, [])
    function handlePageChange(increment: number) {
        setCurrentPage(currentPage - increment);
        applyFlashEffect()
    }

    return (
        <div className="mode-selection-popup three-body "   >
            <h2>Go to a Simulation</h2>
            <p style={{ fontSize: "0.875rem" }}>Click any of these scenarios below to run its simulation. Please note that, these animation previews are scaled down in terms of size, hence the real simulation might work differently.</p>
            <div className='three-body-options-container as-grid'>
                {
                    Object.keys(ball_configs).filter(x => !x.startsWith("preview")).slice(itemPerPage * currentPage, itemPerPage * (currentPage + 1)).map((x, i) =>
                        <div className='three-body-options' key={x} onClick={() => onSubmit({ modeSelected: x })}>
                            <div style={{ flex: 1, alignContent: "center" }}>{ball_configs[x]["desc"] || x}</div>
                            <div style={{ aspectRatio: 1, width: "200px", height: "200px", overflow: "hidden" }}>
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
            <div style={{ display: "flex", gap: "1rem 1.5rem", padding: "1rem", width: "100%", flexWrap: "wrap" }}>

                {/* button container  prev and next*/}
                <div style={{ display: "flex", gap: "0.5rem", flex: "1", justifyContent: "space-around", alignItems:"center" }}>
                    <button style={{ textWrap: "nowrap", padding: "0.25rem 1rem" }} onClick={() => handlePageChange(1)} disabled={currentPage <= 0}>Previous</button>
                    <span style={{fontSize:"18px"}}>{currentPage + 1}</span>
                    <button style={{ textWrap: "nowrap", padding: "0.25rem 1rem" }} onClick={() => handlePageChange(-1)} disabled={currentPage >= maxNoPages - 1}>Next</button>
                </div>
                {/* button container  go backt*/}
                <div style={{ display: "flex", gap: "0.5rem", flex: "1", justifyContent: "center" }}>
                    <button style={{ textWrap: "nowrap", padding: "0.25rem 1rem" }} onClick={() => setSelectedApp(-1)}>Go Back</button>
                </div>
            </div>
        </div>
    );
};

export default ThreeBodySetupPopup;



function applyFlashEffect() {
    const container = document.getElementsByClassName("three-body-options-container")[0]
    container.classList.add("invisible")
    setTimeout(() => { container.classList.remove("invisible") }, 1)
}