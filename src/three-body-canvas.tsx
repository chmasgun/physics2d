import React, { useState, useEffect } from 'react';
import { BallGenerator } from './ball-generator';
import { Ball } from './ball';
import { ball_configs } from './three-body-start-configs';



const customBalls = []

type CanvasProps = { modeSelected: string; resetParamsCallback: () => void; enableInfoPopup: boolean , mapScaleOuter:number};

const fps = 60





const ThreeBodyCanvas: React.FC<CanvasProps> = ({ modeSelected, resetParamsCallback, enableInfoPopup = true, mapScaleOuter }) => {
    const fieldSizeForSquare = 900 * mapScaleOuter
    const fieldSize: [number, number] = [fieldSizeForSquare, fieldSizeForSquare]
    const ballGenerator = BallGenerator.getInstance();

    const [mapScaleInner, setMapScaleInner] = useState<number>(1);
    const [balls, setBalls] = useState<Ball[]>([]);
    const [currentMode, setCurrentMode] = useState<string>(modeSelected)
    //const [currentAttractionForce, setCurrentAttractionForce] = useState<number>(0)

    const [isTrailEnabled, setIsTrailEnabled] = useState<boolean>(true)

    const speed = 0.5
    useEffect(() => {
        const currentAttractionForce = ball_configs[currentMode]["attractionGravitationalConstant"]  * mapScaleOuter
        setBalls(
            ball_configs[currentMode]["balls"].map((a: any) => ballGenerator.createBall({ ...a, 
                    x: a.x * fieldSizeForSquare, 
                    y: a.y*fieldSizeForSquare, 
                    direction: [ a.direction[0] * 1, a.direction[1] * 1],
                    radius: a.radius* Math.sqrt(mapScaleOuter),
                    bounds: fieldSize, attractionGravitationalConstant: currentAttractionForce, trailEnabled: isTrailEnabled }))

        )

    }, []);

    function handleRestart() {
        const currentAttractionForce = ball_configs[currentMode]["attractionGravitationalConstant"] * mapScaleOuter
        setBalls(
            ball_configs[currentMode]["balls"].map((a: any) => ballGenerator.createBall({ ...a, x: a.x * fieldSizeForSquare, y: a.y*fieldSizeForSquare, bounds: fieldSize, attractionGravitationalConstant: currentAttractionForce, trailEnabled: isTrailEnabled }))

        )
    }

    useEffect(() => {
        let animationFrameId: number;
        let lastTime = performance.now();

        const updateBalls = (time: number) => {
            const deltaTime = time - lastTime;

            if (deltaTime >= 1000 / fps) {   // adjusting FPS here
                setBalls(prevBalls => {
                    const newBalls = prevBalls.map(ball => {
                        ball.updatePosition();
                        return ball;
                    });

                    // manually adjust ball positions to keep all of them in the screen
                    const ballPos = prevBalls.map(x => x.getPosition())
                    const xymin = Math.min(...ballPos.map(x => x[1]), ...ballPos.map(x => x[0]), 0)
                    const xmin = Math.min(...ballPos.map(x => x[0]), 0)
                    const ymin = Math.min(...ballPos.map(y => y[1]), 0)

                    //const xymax = Math.max(...ballPos.map(x => x[1]), ...ballPos.map(x => x[0]), fieldSize[0])
                    const xmax = Math.max(...ballPos.map(x => x[0] - fieldSize[0]), 0)
                    const ymax = Math.max(...ballPos.map(y => y[1] - fieldSize[0]), 0)

                    const yscale = Math.abs(ymin) > ymax ? (fieldSize[0] - 2 * ymin) / fieldSize[0] : (2 * ymax + fieldSize[0]) / fieldSize[0]
                    const xscale = Math.abs(xmin) > xmax ? (fieldSize[0] - 2 * xmin) / fieldSize[0] : (2 * xmax + fieldSize[0]) / fieldSize[0]
                    const newScale = Math.max(...[yscale, xscale])
                    //console.log(ballPos.map(x => x[0])); 
                    //console.log([xmin, xymin, xscale, yscale, newScale]);

                    setMapScaleInner(newScale)

                    prevBalls.map(ball => {

                        ball.setRenderPosition([
                            fieldSize[0] / 2 + (ball.x - fieldSize[0] / 2) / newScale,
                            fieldSize[0] / 2 + (ball.y - fieldSize[0] / 2) / newScale
                        ]);
                        ball.setScale(newScale);
                    })

                    // Check for collisions
                    for (let i = 0; i < newBalls.length; i++) {
                        // set the new scale
                        for (let j = i + 1; j < newBalls.length; j++) {
                            newBalls[i].applyAttractionForce(newBalls[j]);
                        }
                    }

                    return newBalls;
                });

                lastTime = time - (deltaTime % 1000 / fps);
            }

            animationFrameId = requestAnimationFrame(updateBalls);
        };

        animationFrameId = requestAnimationFrame(updateBalls);

        return () => cancelAnimationFrame(animationFrameId); // Cleanup on unmount
    }, []);






    return (
        // , minHeight: "100svh", minWidth: "100svw"
        <div style={{ display: "flex", background:"#111", height:"100%" }}>
            <div style={{ position: "relative", width: `${fieldSize[0]}px`, height: `${fieldSize[1]}px`, margin: "auto", display: "flex" }}>
                {balls.map((ball, index) => (
                    <React.Fragment key={index}>
                        {ball.render()}
                    </React.Fragment>

                ))}

                <div style={{ position: "relative", margin: "auto", width: `${(1 / mapScaleInner) * fieldSize[0] / 2}px`, height: `${(1 / mapScaleInner) * fieldSize[1] / 2}px` }}>{
                    Array.from(Array(7).keys()).map((x) => {
                        return <div key={x} style={{ position: "absolute", width: `${x * 100}%`, height: `${x * 100}%`, left: `-${(x - 1) * 50}%`, top: `-${(x - 1) * 50}%`, margin: "auto", background: "#fafafa04", borderRadius: "100%", pointerEvents:"none" }}></div>
                    })
                }</div>

            </div>

            {enableInfoPopup &&
                <div style={{ position: "fixed", left: "0", top: "0", background: "#eee", display: "flex", flexDirection: "column", gap: "0.5rem", padding: "1rem" }}>

                    <div onClick={() => handleRestart()} style={{ background: "lightgreen", padding: "2px", borderRadius: "0.25rem", fontSize: "0.875rem", cursor: "pointer" }}>Restart the simulation</div>
                    <div onClick={() => resetParamsCallback()} style={{ background: "pink", padding: "2px", borderRadius: "0.25rem", fontSize: "0.875rem", cursor: "pointer" }}>Reset the parameters</div>
                </div>
            }
        </div>
    );
};

export default ThreeBodyCanvas;



