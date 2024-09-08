import React, { useState, useEffect } from 'react';
import { BallGenerator } from './ball-generator';
import { Ball } from './ball';
import { CircularObstacle, LinearObstacle, Obstacle, RectangularObstacle } from './Obstacle';

const fieldSizeForSquare = 900

const fieldSize: [number, number] = [fieldSizeForSquare, fieldSizeForSquare]

const customBalls = []

type CanvasProps = {  };

const fps = 60





const ThreeBodyCanvas: React.FC<CanvasProps> = ({   }) => {
    const ballGenerator = BallGenerator.getInstance();
    
    const [balls, setBalls] = useState<Ball[]>([]);
    //const [ballTrails, setBallTrails] = useState<>

    const speed = 0.5
    useEffect(() => {
        
        setBalls(
            [
                 ballGenerator.createBall({
                    x: 300,
                    y: 350,
                    direction: [ 1  * speed , -speed * Math.sqrt(3)],
                    bounds: fieldSize,
                    radius: 10,
                    color : "red",
                    gravity: 0,
                    airFriction:0, 
                    mass: 1,
                    shouldGlow: true
                }),
                ballGenerator.createBall({
                    x: 700,
                    y: 350,
                    direction: [ 1 *speed ,  speed * Math.sqrt(3) ],
                    bounds: fieldSize,
                    radius: 10,
                    color : "yellow",
                    gravity: 0,
                    airFriction:0, 
                    mass: 1,
                    shouldGlow: true
                })
                ,
                ballGenerator.createBall({
                    x: 500,
                    y: 350 + 200 * Math.sqrt(3),
                    direction: [-2  * speed,  0],
                    bounds: fieldSize,
                    radius: 10,
                    color : "cyan",
                    gravity: 0,
                    airFriction:0, 
                    mass:  1,
                    shouldGlow: true
                })
            ]
        ) 
 
    }, [ ]);

    useEffect(() => {
        let animationFrameId: number;
        let lastTime = performance.now();
    
        const updateBalls = (time: number) => {
            const deltaTime = time - lastTime;
    
            if (deltaTime >= 1000 / fps) {  
                setBalls(prevBalls => {
                    const newBalls = prevBalls.map(ball => {
                        ball.updatePosition();
                        return ball;
                    });

                    // manually adjust ball positions to keep all of them in the screen
                    const ballPos = prevBalls.map(x => x.getPosition())
                    const xymin = Math.min(...ballPos.map(x=> x[1]) , ...ballPos.map(x=> x[0]), 0)
                    const xymax = Math.max(...ballPos.map(x=> x[1]) , ...ballPos.map(x=> x[0]), fieldSize[0])
                    const newScale = (xymax - xymin) / fieldSize[0]
                    //console.log([xymin, xymax, newScale]);
                    
                    prevBalls.map(ball =>
                    {
                        ball.setRenderPosition( [  (ball.x - xymin) / newScale ,    (ball.y - xymin) / newScale]);
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
        <div style={{ display: "flex",   minHeight: "100svh", minWidth:"100svw"}}>
              <div style={{ position: "relative", width: `${fieldSize[0]}px`, height: `${fieldSize[1]}px`, margin: "auto"  }}>
                {balls.map((ball, index) => (
                    <React.Fragment key={index}>
                        {ball.render()}
                    </React.Fragment>

                ))}

              </div>
        </div>
    );
};

export default ThreeBodyCanvas;



 