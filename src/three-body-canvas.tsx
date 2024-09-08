import React, { useState, useEffect } from 'react';
import { BallGenerator } from './ball-generator';
import { Ball } from './ball';
import { CircularObstacle, LinearObstacle, Obstacle, RectangularObstacle } from './Obstacle';

const fieldSize: [number, number] = [1000, 900]

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
                    direction: [0,0 ],
                    bounds: fieldSize,
                    radius: 20,
                    color : "red",
                    gravity: 0,
                    mass: 10
                }),
                ballGenerator.createBall({
                    x: 700,
                    y: 350,
                    direction: [0,0 ],
                    bounds: fieldSize,
                    radius: 20,
                    color : "green",
                    gravity: 0,
                    mass: 10
                })
                ,
                ballGenerator.createBall({
                    x: 500,
                    y: 650,
                    direction: [0,0 ],
                    bounds: fieldSize,
                    radius: 20,
                    color : "blue",
                    gravity: 0,
                    mass: 10
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
        <div style={{ display: "flex", alignItems: "center", background: "#ddd", minHeight: "100svh" }}>
              <div style={{ position: "relative", width: `${fieldSize[0]}px`, height: `${fieldSize[1]}px`, background: "white", margin: "auto" }}>
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



 