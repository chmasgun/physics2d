import { Ball } from "./ball";
export interface Obstacle {
    checkCollision(ball: Ball): boolean;
    handleCollision(ball: Ball): void;
    render(): JSX.Element;
}


export class LinearObstacle implements Obstacle {
    private x1: number;
    private y1: number;
    private x2: number;
    private y2: number;


    constructor(x1: number, y1: number, x2: number, y2: number) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;

    }

    checkCollision(ball: Ball): boolean {
        const ballX = ball.x;
        const ballY = ball.y;
        const radius = ball.getRadius();

        // Vector from point 1 to point 2
        const lineDX = this.x2 - this.x1;
        const lineDY = this.y2 - this.y1;

        // Vector from point 1 to the ball
        const ballDX = ballX   - this.x1;
        const ballDY = ballY   - this.y1;

        // Project ball vector onto line vector to find the closest point on the line
        const lineLengthSquared = lineDX * lineDX + lineDY * lineDY;
        const t = Math.max(0, Math.min(1, (ballDX * lineDX + ballDY * lineDY) / lineLengthSquared));

        // Closest point on the line segment
        const closestX = this.x1 + t * lineDX;
        const closestY = this.y1 + t * lineDY;

        // Distance from the ball to the closest point
        const distX = ballX   - closestX;
        const distY = ballY   - closestY;
        const distanceSquared = distX * distX + distY * distY;

        return distanceSquared < radius * radius;
    }

    handleCollision(ball: Ball): void {
        const lineVectorX = this.x2 - this.x1;
        const lineVectorY = this.y2 - this.y1;
        const lineLength = Math.sqrt(lineVectorX * lineVectorX + lineVectorY * lineVectorY);
        const normalX = -lineVectorY / lineLength;
        const normalY = lineVectorX / lineLength;

        // Calculate the dot product of the ball's velocity and the normal vector
        const dotProduct = ball.getDirection()[0] * normalX + ball.getDirection()[1] * normalY;

        // Calculate the reflection vector
        const reflectionX = ball.getDirection()[0] - 2 * dotProduct * normalX;
        const reflectionY = ball.getDirection()[1] - 2 * dotProduct * normalY;

        ball.updateDirection([reflectionX * 1, reflectionY * 1])
    }

    render(): JSX.Element {
        return (
            <line
                x1={this.x1}
                y1={this.y1}
                x2={this.x2}
                y2={this.y2}
                stroke="black"
                strokeWidth="1"
            />

        );
    }
}

export class RectangularObstacle implements Obstacle {
    private x: number;
    private y: number;
    private width: number;
    private height: number;

    constructor(x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    checkCollision(ball: Ball): boolean {
        const distX = Math.abs(ball.x + ball.getRadius() - this.x - this.width / 2);
        const distY = Math.abs(ball.y + ball.getRadius() - this.y - this.height / 2);

        if (distX > (this.width / 2 + ball.getRadius()) || distY > (this.height / 2 + ball.getRadius())) {
            return false;
        }

        if (distX <= (this.width / 2) || distY <= (this.height / 2)) {
            return true;
        }

        const dx = distX - this.width / 2;
        const dy = distY - this.height / 2;
        return (dx * dx + dy * dy <= (ball.getRadius() * ball.getRadius()));
    }
    handleCollision(ball: Ball): void {
        //ball.updateDirection([0,0])
    }

    render(): JSX.Element {
        return (
            <rect
                x={this.x}
                y={this.y}
                width={this.width}
                height={this.height}
                stroke="black"
                strokeWidth="1"
                fill="none"
            />
        );
    }
}

export class CircularObstacle implements Obstacle {
    private x: number;
    private y: number;
    private radius: number;

    constructor(x: number, y: number, radius: number) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    checkCollision(ball: Ball): boolean {
        const dx = ball.x   - this.x;
        const dy = ball.y   - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < (this.radius + ball.getRadius());
    }

    handleCollision(ball: Ball): void {
        const dx = ball.x - this.x;
        const dy = ball.y   - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Normal vector
        const nx = dx / distance;
        const ny = dy / distance;

        // Dot product normal
        const dpNorm = ball.getDirection()[0] * nx + ball.getDirection()[1] * ny;

        // Reflect the ball's velocity
        const reflectionX = ball.getDirection()[0] - 2 * dpNorm * nx;
        const reflectionY = ball.getDirection()[1] - 2 * dpNorm * ny;

        const reflectionUnitVector = [reflectionX / Math.sqrt(reflectionX * reflectionX + reflectionY * reflectionY), reflectionY / Math.sqrt(reflectionX * reflectionX + reflectionY * reflectionY)]

        console.log([ball.getDirection(), [reflectionX, reflectionY], reflectionUnitVector]);
        ball.updateDirection([reflectionX * 1, reflectionY * 1])
        ball.setPosition([
            this.x + (dx/distance) * (this.radius + ball.getRadius()  ),
            this.y + (dy/distance) * (this.radius + ball.getRadius() )])
    }

    render(): JSX.Element {
        return (
            <circle
                cx={this.x}
                cy={this.y}
                r={this.radius}
                stroke="black"
                strokeWidth="1"
                fill="none"
            />
        );
    }
}
