import React, { useState, useEffect } from 'react';
import { BallGenerator } from './ball-generator';
import { Ball } from './ball';
import { CircularObstacle, LinearObstacle, Obstacle, RectangularObstacle } from './Obstacle';

const fieldSize: [number, number] = [700, 1800]
const ballRadius: number = 3
const speedFactor: number = 0
const noOfBalls: number = 300

const spawnArea = [[100,600], [20,430]]

const customBalls = []

type CanvasProps = {};


const MainCanvas: React.FC<CanvasProps> = () => {
    const ballGenerator = BallGenerator.getInstance();

    // Create Ball instances with direction vectors
    const initialBalls = Array.from(Array(noOfBalls).keys()).map(x =>
        ballGenerator.createBall({
            x:  spawnArea[0][0] +   Math.random() * (spawnArea[0][1] - spawnArea[0][0]),
            y:  spawnArea[1][0] +   Math.random() * (spawnArea[1][1] - spawnArea[1][0]),
            direction: [(Math.random() - 0.5) * speedFactor, (Math.random() - 0.5) * speedFactor],
            bounds: fieldSize,
            radius: ballRadius
        })
    );
    const [balls, setBalls] = useState<Ball[]>(initialBalls);
    const obstacles: Obstacle[] = [

        new LinearObstacle(0, 700, 320, 840),
        new LinearObstacle(700, 700, 380, 840),
        new LinearObstacle(320, 850, 125, 1250),
        new LinearObstacle(380, 850, 575, 1250),

        new LinearObstacle(125, 600+650, 125, 600+1200),
        new LinearObstacle(575, 600+650, 575, 600+1200),

        ...CircularLayer(350, 600+250, 5, 50, 1),
        ...CircularLayer(350, 600+300, 5, 50, 2),
        ...CircularLayer(350, 600+350, 5, 50, 3), 
        ...CircularLayer(350, 600+400, 5, 50, 4), 
        ...CircularLayer(350, 600+450, 5, 50, 5), 
        ...CircularLayer(350, 600+500, 5, 50, 6), 
        ...CircularLayer(350, 600+550, 5, 50, 7), 
        ...CircularLayer(350, 600+600, 5, 50, 8), 
        ...CircularLayer(350, 600+650, 5, 50, 9), 
        

        new LinearObstacle(175, 600+700, 175, 600+1200),
        new LinearObstacle(225, 600+700, 225, 600+1200),
        new LinearObstacle(275, 600+700, 275, 600+1200),
        new LinearObstacle(325, 600+700, 325, 600+1200),
        new LinearObstacle(375, 600+700, 375, 600+1200),
        new LinearObstacle(425, 600+700, 425, 600+1200),
        new LinearObstacle(475, 600+700, 475, 600+1200),
        new LinearObstacle(525, 600+700, 525, 600+1200),
        
    ];
    useEffect(() => {
        let animationFrameId: number;

        const updateBalls = () => {

            setBalls(prevBalls => {
                var startTime = performance.now();
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
                for (let ball of newBalls) {
                    for (let obstacle of obstacles) {
                        if (obstacle.checkCollision(ball)) {
                            // Handle collision with obstacle
                            obstacle.handleCollision(ball)
                        }
                    }
                }
                var endTime = performance.now();
                // console.log(`  ${endTime - startTime} milliseconds`);
                return newBalls;
            });


            animationFrameId = requestAnimationFrame(updateBalls);
        };

        animationFrameId = requestAnimationFrame(updateBalls);

        return () => cancelAnimationFrame(animationFrameId); // Cleanup on unmount
    }, []);

    return (
        <div style={{ padding: "2rem", display: "flex", justifyContent: "center", alignItems: "center", background: "#ddd", minHeight: "100svh" }}>

            <div style={{ position: "relative", width: `${fieldSize[0]}px`, height: `${fieldSize[1]}px`, border: "1px solid black", background: "white" }}>
                {balls.map((ball, index) => (
                    <React.Fragment key={index}>
                        {ball.render()}
                    </React.Fragment>

                ))}
                <svg style={{ width: `${fieldSize[0]}px`, height: `${fieldSize[1]}px` }}>

                    {obstacles.map((obstacle, index) => (
                        <React.Fragment key={index}>
                            {obstacle.render()}
                        </React.Fragment>
                    ))}
                </svg>
            </div>
        </div>
    );
};

export default MainCanvas;



function CircularLayer ( center: number, y:number, radius:number, distance:number, count: number): ( Obstacle[]) {
 

    return Array.from(Array(count).keys()).map((x,i) =>
        new CircularObstacle( center + distance*(0.5 + i- count*0.5) , y, radius)
    )
}