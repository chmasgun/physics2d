import { Dispatch, SetStateAction } from "react";
import NormalDistributionCanvas from "./normal-dist-canvas";
import ThreeBodyCanvas from "./three-body-canvas";

interface AppSelectorProps {
    setSelectedApp: (app: number) => void;
}

const AppSelector: React.FC<AppSelectorProps> = ({ setSelectedApp }) => {

    return (
        <div className="mode-selection-popup">
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
            <div style={{ width: "200px", height: "200px", overflow: "clip"}}>

                <SimulationSelectionVisual appId={appId} />

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
            mapScale={0.22}
            gravity={0.006}
            autoRestartOnFinish={true} />
        :
        appId === 1 ?
            <ThreeBodyCanvas
                modeSelected={"preview"}
                resetParamsCallback={() => { }}
                enableInfoPopup={false} 
                mapScaleOuter={0.2222}
                autoRestartOnFinish={true}/>
            : <></>

}

export default AppSelector;
