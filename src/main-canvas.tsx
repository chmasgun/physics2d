import React, { useState, useEffect } from 'react';
import { BallGenerator } from './ball-generator';
import { Ball } from './ball';

const fieldSize : [number,number] = [1200, 800]
const ballRadius : number = 15
const speedFactor : number = 0.1
const noOfBalls : number = 120


const customBalls = []

type CanvasProps = {};


const MainCanvas: React.FC<CanvasProps> = () => {
    const ballGenerator = BallGenerator.getInstance();

    // Create Ball instances with direction vectors
    const initialBalls = Array.from(Array(noOfBalls).keys()).map(x =>
        ballGenerator.createBall({
            x: (fieldSize[0] / 2) + (Math.random() - 0.5) * (fieldSize[0] - ballRadius * 2)- ballRadius   ,
            y: (fieldSize[1] / 2) + (Math.random() - 0.5) * (fieldSize[1] - ballRadius * 2)- ballRadius , 
            direction: [ (Math.random() -0.5)* speedFactor ,(Math.random() -0.5)* speedFactor],
            bounds: fieldSize,
            radius : ballRadius
        })
    );
    const [balls, setBalls] = useState<Ball[]>(initialBalls);

    useEffect(() => {
        let animationFrameId: number;

        const updateBalls = () => {
            setBalls(prevBalls => {
                const newBalls = prevBalls.map(ball => {
                    ball.updatePosition();
                    return ball;
                });

                // Check for collisions
                for (let i = 0; i < newBalls.length; i++) {
                    for (let j = i + 1; j < newBalls.length; j++) {
                        if (newBalls[i].isCollidingWith(newBalls[j])) {
                            newBalls[i].handleCollisionWith(newBalls[j]);
                        }
                    }
                }

                return newBalls;
            });

            animationFrameId = requestAnimationFrame(updateBalls);
        };

        animationFrameId = requestAnimationFrame(updateBalls);

        return () => cancelAnimationFrame(animationFrameId); // Cleanup on unmount
    }, []);

    return (
        <div style={{ width: "100svw", height: "100svh", display: "flex", justifyContent: "center", alignItems: "center", background: "#ddd" }}>

            <div style={{ position: "relative", width:`${fieldSize[0]}px`, height: `${fieldSize[1]}px`, border: "1px solid black", background: "white" }}>
                {balls.map((ball, index) => (
                    <React.Fragment key={index}>
                        {ball.render()}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default MainCanvas;
