import React, { useState, useEffect } from 'react';
import { BallGenerator } from './ball-generator';
import { Ball } from './ball';
import { CircularObstacle, LinearObstacle, Obstacle, RectangularObstacle } from './Obstacle';

const fieldSize: [number, number] = [1000, 1200]
//const ballRadius: number = 3
const speedFactor: number = 0
const noOfBalls: number = 500


const bottleneckWidth: number = 120;
const bottleneckY = 250;

const binFullWidth = 520
const binStartOffsetWithCircles = 150
const binStartEndX = [(fieldSize[0] - binFullWidth) / 2, (fieldSize[0] + binFullWidth) / 2]
const binStartEndY = [800, fieldSize[1]]


const customBalls = []

type CanvasProps = { ballCount: number, ballRadius: number,resetParamsCallback:() => void };







const NormalDistributionCanvas: React.FC<CanvasProps> = ({ ballCount, ballRadius, resetParamsCallback }) => {
    const ballGenerator = BallGenerator.getInstance();
    const [ballsRemaining, setBallsRemaining] = useState<number>(noOfBalls)


    const [balls, setBalls] = useState<Ball[]>([]);

    const [spawnArea, setSpawnArea] = useState< [[number, number], [number, number]]>([[0, 0], [0, 0]])
    useEffect(() => {
        const newSpawnArea: [[number, number], [number, number]] = [[200, 800], [- ballCount * ballRadius * ballRadius, 0]]
        // Initialize balls based on ballCount
        const initialBalls = InitializeBalls(ballCount, ballRadius, ballGenerator, newSpawnArea)

        setSpawnArea(newSpawnArea)
        setBalls(initialBalls)

    }, [ballCount]);

    const obstacles: Obstacle[] = getObstacles(ballRadius)

    useEffect(() => {
        let animationFrameId: number;

        const updateBalls = () => {

            let tempBallsLeft = 0;
            setBalls(prevBalls => {
                //var startTime = performance.now();
                let localBallsLeft = 0;
                const newBalls = prevBalls.map(ball => {
                    ball.updatePosition();
                    ball.setTouchingWall(false)
                    localBallsLeft += (1 - ball.isInTheScene());
                    return ball;
                });
                tempBallsLeft = localBallsLeft;
                setBallsRemaining(tempBallsLeft)
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
                //var endTime = performance.now();
                // console.log(`  ${endTime - startTime} milliseconds`);

                return newBalls;
            });


            animationFrameId = requestAnimationFrame(updateBalls);
        };

        animationFrameId = requestAnimationFrame(updateBalls);

        return () => cancelAnimationFrame(animationFrameId); // Cleanup on unmount
    }, []);

    function handleRestart() {
        console.log(ballCount, ballRadius, ballGenerator, spawnArea);
        const initialBalls = InitializeBalls(ballCount, ballRadius, ballGenerator, spawnArea)

        setBalls(initialBalls)
    }

    return (
        <div style={{ display: "flex", alignItems: "center", background: "#ddd", minHeight: "100svh" }}>
            <div style={{ position: "relative", width: `${fieldSize[0]}px`, height: `${fieldSize[1]}px`, background: "white", margin: "auto" }}>
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

            <div style={{ position: "fixed", left: "0", top: "0", background: "#eee", display: "flex", flexDirection: "column", gap: "0.5rem", padding: "1rem" }}>
                <span>Remaining balls</span>
                <span>{ballsRemaining}</span>
                <div onClick={() => handleRestart()} style={{background:"lightgreen", padding:"2px" , borderRadius:"0.25rem", fontSize:"0.875rem",cursor:"pointer" }}>Restart the simulation</div>
                <div onClick={() => resetParamsCallback()} style={{background:"pink", padding:"2px" , borderRadius:"0.25rem", fontSize:"0.875rem",cursor:"pointer" }}>Reset the parameters</div>
            </div>
        </div>
    );
};

export default NormalDistributionCanvas;



function CircularLayer(center: number, y: number, radius: number, distance: number, count: number): (Obstacle[]) {

    // generates layers of circle blocks
    return Array.from(Array(count).keys()).map((x, i) =>
        new CircularObstacle(center + distance * (0.5 + i - count * 0.5), y, radius, 0.04)
    )
}



function EndingBlocks(xstart: number, xend: number, ystart: number, yend: number, binWidth: number, binCount: number = 1) {

    let bins: number;
    if (binWidth === undefined) {
        bins = binCount
    } else {
        bins = Math.floor((xend - xstart) / binWidth)
    }
    // generates the ending bins automatically, drawing Obstacle objects
    return Array.from(Array(bins - 1).keys()).map((x, i) =>
        new LinearObstacle(xstart + (xend - xstart) * (i + 1) / (bins), ystart, xstart + (xend - xstart) * (i + 1) / (bins), yend, 0.12)
    )

}


function getObstacles(ballRadius: number) {

    return [

        new LinearObstacle(200, 0, (fieldSize[0] - bottleneckWidth) / 2, bottleneckY, 0.01),
        new LinearObstacle(fieldSize[0] - 200, 0, (fieldSize[0] + bottleneckWidth) / 2, bottleneckY, 0.01),
        new LinearObstacle((fieldSize[0] - bottleneckWidth) / 2, bottleneckY, binStartEndX[0], binStartEndY[0] - binStartOffsetWithCircles, 0.02),
        new LinearObstacle((fieldSize[0] + bottleneckWidth) / 2, bottleneckY, binStartEndX[1], binStartEndY[0] - binStartOffsetWithCircles, 0.02),

        new LinearObstacle(binStartEndX[0], binStartEndY[0] - binStartOffsetWithCircles, binStartEndX[0], binStartEndY[1], 0.1),
        new LinearObstacle(binStartEndX[1], binStartEndY[0] - binStartOffsetWithCircles, binStartEndX[1], binStartEndY[1], 0.1),

        ...CircularLayer(fieldSize[0] / 2, bottleneckY + 0 * 50, 3, 50, 1),
        ...CircularLayer(fieldSize[0] / 2, bottleneckY + 1 * 50, 3, 50, 2),
        ...CircularLayer(fieldSize[0] / 2, bottleneckY + 2 * 50, 3, 50, 3),
        ...CircularLayer(fieldSize[0] / 2, bottleneckY + 3 * 50, 3, 50, 4),
        ...CircularLayer(fieldSize[0] / 2, bottleneckY + 4 * 50, 3, 50, 5),
        ...CircularLayer(fieldSize[0] / 2, bottleneckY + 5 * 50, 3, 50, 6),
        ...CircularLayer(fieldSize[0] / 2, bottleneckY + 6 * 50, 3, 50, 7),
        ...CircularLayer(fieldSize[0] / 2, bottleneckY + 7 * 50, 3, 50, 8),
        ...CircularLayer(fieldSize[0] / 2, bottleneckY + 8 * 50, 3, 50, 9),

        ...EndingBlocks(binStartEndX[0], binStartEndX[1], binStartEndY[0], binStartEndY[1], ballRadius * 3 - 1),

        new LinearObstacle(binStartEndX[0], binStartEndY[1] - 20, binStartEndX[1], binStartEndY[1] - 20, 1 , "#fff1"),

    ];
}


function InitializeBalls(ballCount: number, ballRadius: number, ballGenerator: BallGenerator, spawnArea: [[number, number], [number, number]]) {

    return Array.from(Array(ballCount).keys()).map(x =>
        ballGenerator.createBall({
            x: spawnArea[0][0] + Math.random() * (spawnArea[0][1] - spawnArea[0][0]),
            y: spawnArea[1][0] + Math.random() * (spawnArea[1][1] - spawnArea[1][0]),
            direction: [(Math.random() - 0.5) * speedFactor, (Math.random() - 0.5) * speedFactor],
            bounds: fieldSize,
            radius: ballRadius
        })
    );
}
