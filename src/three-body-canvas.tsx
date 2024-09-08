import React, { useState, useEffect } from 'react';
import { BallGenerator } from './ball-generator';
import { Ball } from './ball';
import { ball_configs } from './three-body-start-configs';

const fieldSizeForSquare = 900

const fieldSize: [number, number] = [fieldSizeForSquare, fieldSizeForSquare]

const customBalls = []

type CanvasProps = {};

const fps = 60





const ThreeBodyCanvas: React.FC<CanvasProps> = ({ }) => {
    const ballGenerator = BallGenerator.getInstance();

    const [mapScale, setMapScale] = useState<number>(1);
    const [balls, setBalls] = useState<Ball[]>([]);
    const [currentMode, setCurrentMode] = useState<string>("harmonyfast")
    //const [currentAttractionForce, setCurrentAttractionForce] = useState<number>(0)
    //const [ballTrails, setBallTrails] = useState<>

     
    const speed = 0.5
    useEffect(() => {
        const currentAttractionForce = ball_configs[currentMode]["attractionGravitationalConstant"]
        setBalls(
             ball_configs[currentMode]["balls"].map((x: any) => ballGenerator.createBall({...x, bounds: fieldSize, attractionGravitationalConstant:currentAttractionForce})) 
             
        )

    }, []);

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
                    console.log([xmin, xymin, xscale, yscale, newScale]);

                    setMapScale(newScale)

                    prevBalls.map(ball => {
                        
                        ball.setRenderPosition([
                            fieldSize[0] / 2 + (ball.x - 0  - fieldSize[0] / 2) / newScale,
                            fieldSize[0] / 2 + (ball.y -  0 - fieldSize[0] / 2) / newScale
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
        <div style={{ display: "flex", minHeight: "100svh", minWidth: "100svw", overflow:"hidden" }}>
            <div style={{ position: "relative", width: `${fieldSize[0]}px`, height: `${fieldSize[1]}px`, margin: "auto", display: "flex" }}>
                {balls.map((ball, index) => (
                    <React.Fragment key={index}>
                        {ball.render()}
                    </React.Fragment>

                ))}

                 <div style={{position:"relative" , margin: "auto" ,width: `${(1/ mapScale) * fieldSize[0] / 2}px`, height: `${(1 / mapScale) * fieldSize[1] / 2}px`}}>{
                    Array.from(Array(7).keys()).map((x)=> {
                        return <div style={{ position: "absolute", width: `${ x *100}%`, height:  `${ x *100}%`, left: `-${ (x-1) *50}%`, top: `-${ (x-1) *50}%`, margin: "auto", background: "#fafafa04", borderRadius: "100%" }}></div>
                    })
                }</div>  
               
            </div>
        </div>
    );
};

export default ThreeBodyCanvas;



