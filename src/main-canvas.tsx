import React, { useState, useEffect } from 'react';
import { BallGenerator } from './ball-generator';
import { Ball } from './ball';
import { CircularObstacle, LinearObstacle, Obstacle, RectangularObstacle } from './Obstacle';

const fieldSize: [number, number] = [700, 1800]
const ballRadius: number = 5 
const speedFactor: number = 0
const noOfBalls: number = 300

const spawnArea = [[20,680], [-5800,200]]

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

        new LinearObstacle(0, 500, 320, 850 ,0.01),
        new LinearObstacle(700, 500, 380, 850, 0.01),
        new LinearObstacle(320, 850, 125, 1250, 0.02 ),
        new LinearObstacle(380, 850, 575, 1250, 0.02),

        new LinearObstacle(125, 600+650, 125, 600+1200 ,0.1),
        new LinearObstacle(575, 600+650, 575, 600+1200 ,0.1),

        ...CircularLayer(350, 600+250, 3, 50, 1),
        ...CircularLayer(350, 600+300, 3, 50, 2),
        ...CircularLayer(350, 600+350, 3, 50, 3), 
        ...CircularLayer(350, 600+400, 3, 50, 4), 
        ...CircularLayer(350, 600+450, 3, 50, 5), 
        ...CircularLayer(350, 600+500, 3, 50, 6), 
        ...CircularLayer(350, 600+550, 3, 50, 7), 
        ...CircularLayer(350, 600+600, 3, 50, 8), 
        ...CircularLayer(350, 600+650, 3, 50, 9), 
   
        ...EndingBlocks(125, 575, 1300, 1800, ballRadius+12 ) ,

        new LinearObstacle(125, 600+1199, 575, 600+1199 , 1),
        
    ];
    useEffect(() => {
        let animationFrameId: number;

        const updateBalls = () => {

            setBalls(prevBalls => {
                var startTime = performance.now();
                const newBalls = prevBalls.map(ball => {
                    ball.updatePosition();
                    ball.setTouchingWall(false)
                    return ball;
                });
                for (let ball of newBalls) {
                    for (let obstacle of obstacles) {
                        if (obstacle.checkCollision(ball)) {
                            // Handle collision with obstacle
                            obstacle.handleCollision(ball)
                            ball.setTouchingWall(true)
                        }
                    }
                }

                // Check for collisions
                for (let i = 0; i < newBalls.length; i++) {
                    for (let j = i + 1; j < newBalls.length; j++) {
                        if (newBalls[i].isCollidingWith(newBalls[j])) {
                            newBalls[i].handleCollisionWith(newBalls[j]);
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
        <div style={{  display: "flex", justifyContent: "center", alignItems: "center", background: "#ddd", minHeight: "100svh" }}>

            <div style={{ position: "relative", width: `${fieldSize[0]}px`, height: `${fieldSize[1]}px`, background: "white" }}>
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
 
    // generates layers of circle blocks
    return Array.from(Array(count).keys()).map((x,i) =>
        new CircularObstacle( center + distance*(0.5 + i- count*0.5) , y, radius, 0.04)
    )
}



function EndingBlocks( xstart: number, xend:number, ystart:number, yend:number,  binWidth:number, binCount:number=1 ){

    let bins:number;
    if(binWidth === undefined){
        bins= binCount
    }  else{
        bins = Math.floor((xend-xstart) / binWidth)
    }
    // generates the ending bins automatically, drawing Obstacle objects
    return Array.from(Array(bins).keys()).map((x,i) =>
        new LinearObstacle( xstart + (xend-xstart) * (i+1) / (bins), ystart, xstart + (xend-xstart) * (i+1) / (bins ) , yend, 0.12)
    )
}