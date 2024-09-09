import { Dispatch, SetStateAction } from "react";

 
interface AppSelectorProps {
    setSelectedApp: (app: number) => void;
  }

const AppSelector: React.FC<AppSelectorProps>  = ({ setSelectedApp }) => {
    
    return (
        <div style={{ position: 'fixed', display: "flex", flexDirection: "column", alignItems: "center", top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white', padding: '1rem', border: '1px solid black', width: "min(80vw, 600px)", borderRadius:"1rem", gap: "1rem" ,}}>
            <h3 > Welcome to my 2D physics simulation project!</h3>
            <SimulationSelectionDiv appId={0} appName={"Normal Distribution Simulation"} appSelectionCallback={setSelectedApp}/>
            <SimulationSelectionDiv appId={1} appName={"Three Body Problem Simulation"} appSelectionCallback={setSelectedApp}/>
            
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
      <div onClick={() => appSelectionCallback(appId)}>
        {appName}
      </div>
    );
  };

export default AppSelector;
