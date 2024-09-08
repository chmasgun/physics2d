import React, { useState, useEffect } from 'react';
import { BallGenerator } from './ball-generator';
import { Ball } from './ball';
import { CircularObstacle, LinearObstacle, Obstacle, RectangularObstacle } from './Obstacle';

const fieldSize: [number, number] = [10000, 9000]

const customBalls = []

type CanvasProps = {  };







const ThreeBodyCanvas: React.FC<CanvasProps> = ({   }) => {
    const ballGenerator = BallGenerator.getInstance();
    
    const [balls, setBalls] = useState<Ball[]>([]);
    
    useEffect(() => {
        
        setBalls(
            [
                 ballGenerator.createBall({
                    x: 300,
                    y: 350,
                    direction: [0.2 , 0],
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
                    direction: [-0.1 , 0.1 * Math.sqrt(3) ],
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
                    direction: [-0.1 , -0.1 * Math.sqrt(3)],
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

        const updateBalls = () => {

      
            setBalls(prevBalls => {
                //var startTime = performance.now();
              
                const newBalls = prevBalls.map(ball => {
                    ball.updatePosition();
                    
                    
                    return ball;
                });
                  
                // for (let ball of newBalls) {
                //     for (let obstacle of obstacles) {
                //         if (obstacle.checkCollision(ball)) {
                //             // Handle collision with obstacle
                //             obstacle.handleCollision(ball)
                //             ball.setTouchingWall(true)
                //         }
                //     }
                // }

                // Check for collisions
                for (let i = 0; i < newBalls.length; i++) {
                    for (let j = i + 1; j < newBalls.length; j++) {
                        newBalls[i].applyAttractionForce(newBalls[j])
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
        <div style={{ display: "flex", alignItems: "center", background: "#ddd", minHeight: "100svh", minWidth:"100svw" , overflowX: "clip"}}>
              <div style={{ position: "relative", width: `${fieldSize[0]}px`, height: `${fieldSize[1]}px`, background: "#111", margin: "auto" }}>
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



 