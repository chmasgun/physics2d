import React, { useState, useEffect } from 'react';
import { BallGenerator } from './ball-generator';
import { Ball } from './ball';
import { CircularObstacle, LinearObstacle, Obstacle, RectangularObstacle } from './Obstacle';

const fieldSize: [number, number] = [1000, 900]

const customBalls = []

type CanvasProps = {  };

const fps = 60





const ThreeBodyCanvas: React.FC<CanvasProps> = ({   }) => {
    const ballGenerator = BallGenerator.getInstance();
    
    const [balls, setBalls] = useState<Ball[]>([]);
    
    const speed = 0.5
    useEffect(() => {
        
        setBalls(
            [
                 ballGenerator.createBall({
                    x: 300,
                    y: 350,
                    direction: [ speed , -speed * Math.sqrt(3)],
                    bounds: fieldSize,
                    radius: 10,
                    color : "red",
                    gravity: 0,
                    airFriction:0, 
                    mass: 1
                }),
                ballGenerator.createBall({
                    x: 700,
                    y: 350,
                    direction: [ speed ,  speed * Math.sqrt(3) ],
                    bounds: fieldSize,
                    radius: 10,
                    color : "yellow",
                    gravity: 0,
                    airFriction:0, 
                    mass: 1
                })
                ,
                ballGenerator.createBall({
                    x: 500,
                    y: 350 + 200 * Math.sqrt(3),
                    direction: [-2 * speed,  0],
                    bounds: fieldSize,
                    radius: 10,
                    color : "cyan",
                    gravity: 0,
                    airFriction:0, 
                    mass:  1
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
    
                    // Check for collisions
                    for (let i = 0; i < newBalls.length; i++) {
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
        <div style={{ display: "flex", alignItems: "center",   minHeight: "100svh", minWidth:"100svw"}}>
              <div style={{ position: "relative", width: `${fieldSize[0]}px`, height: `${fieldSize[1]}px`, margin: "auto" }}>
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



 