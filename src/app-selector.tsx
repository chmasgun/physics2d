import { Dispatch, SetStateAction } from "react";
import NormalDistributionCanvas from "./normal-dist-canvas";
import ThreeBodyCanvas from "./three-body-canvas";

interface AppSelectorProps {
    setSelectedApp: (app: number) => void;
}

const AppSelector: React.FC<AppSelectorProps> = ({ setSelectedApp }) => {

    return (
        <div style={{ position: 'fixed', display: "flex", flexDirection: "column", alignItems: "center", top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '1rem',  width: "min(80vw, 600px)", borderRadius: "1rem", gap: "1rem", background:"linear-gradient(45deg, white, #eee)", boxShadow:"0px 0px 5px 0px gray" }}>
            <h3 > Welcome to my 2D physics simulation project!</h3>
            <div className="app-selector-options-container">

                <SimulationSelectionDiv appId={0} appName={"Normal Distribution Simulation"} appSelectionCallback={setSelectedApp} />
                <SimulationSelectionDiv appId={1} appName={"Three Body Problem Simulation"} appSelectionCallback={setSelectedApp} />
            </div>

        </div>
    );
};



interface SimulationSelectionDivProps {
    appId: number;
    appName: string;
    appSelectionCallback: (app: number) => void;
}

const SimulationSelectionDiv: React.FC<SimulationSelectionDivProps> = ({ appId, appName, appSelectionCallback }) => {
    return (
        <div className="app-selector-option" onClick={() => appSelectionCallback(appId)}>
            {appName}
            <div style={{ width: "200px", height: "250px", overflow: "clip" ,display:"flex", alignItems:"center", justifyContent:"center"}}>

                <SimulationSelectionVisual appId={appId}/>

            </div>
        </div>
    );
};

interface SimulationSelectionDivVisualProps {
    appId: number;

}
const SimulationSelectionVisual: React.FC<SimulationSelectionDivVisualProps> = ({ appId }) => {

    return appId === 0 ?
        <NormalDistributionCanvas ballCount={100}
            ballRadius={1}
            ballColor={"red"}
            resetParamsCallback={() => { }}
            enableInfoPopup={false}
            mapScale={0.2}
            gravity={0.006}/> 
            :
            appId === 1 ?
            <ThreeBodyCanvas
                modeSelected={"harmony"}
                resetParamsCallback={() => {}}
                enableInfoPopup={false} />: <></>
    
}

export default AppSelector;
