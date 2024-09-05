import { ReactElement } from "react";
export class Ball {
    private direction: [number, number];
    private bounds: [number, number];
    private color: string;
    private radius: number;
    private gravity: number = 0.01;
    private friction: number = 1;

    constructor(public x: number, public y: number, direction: [number, number] = [0, 0], bounds: [number, number] = [0, 0], radius: number = 10) {
        this.direction = direction;
        this.bounds = bounds;
        this.color = getRandomColor();
        this.radius = radius;
    }

    public getDirection(): [number, number] {

        return this.direction
    }
    public getPosition(): [number, number] {

        return [this.x , this.y]
    }
    public setPosition([x, y]: [number, number]): void {
        this.x = x;
        this.y = y;
    }


    // Method to update the position of the ball
    public updatePosition(): void {
        if (this.x + this.direction[0] < 0 || this.x + this.direction[0] > this.bounds[0] - this.radius * 2) {
            this.updateDirection([(- this.direction[0]), (this.direction[1] + this.gravity)])

        }
        if (this.y + this.direction[1] < 0 || this.y + this.direction[1] > this.bounds[1] - this.radius * 2) {
            this.updateDirection([(this.direction[0]), (-this.direction[1] + this.gravity)])

            // // doesnt work
            // if(this.direction[1] > 0) {

            //     this.updateDirection([ Math.max(this.direction[0] - this.friction  / 6 , 0)  , Math.min( -this.direction[1] + this.gravity + this.friction, 0)   ])
            // }else{
            //     this.updateDirection([this.direction[0] + this.friction / 6   , Math.min( -this.direction[1] + this.gravity + this.friction, 0)   ])

            // }

        }
        this.x += this.direction[0];
        this.y += this.direction[1];
        this.updateDirection([
            this.direction[0],
            this.direction[1] + this.gravity])

    }
    // Method to update the direction of the ball
    public updateDirection(newDirection: [number, number]): void {
        this.direction = newDirection;
    }
    // Method to check collision with another ball
    public isCollidingWith(other: Ball): boolean {
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < this.radius + other.radius;
    }

    // Method to handle collision with another ball
    public handleCollisionWith(other: Ball): void {
        const dx = other.getPosition()[0] - this.getPosition()[0];
        const dy = other.getPosition()[1] - this.getPosition()[1];
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Normal vector
        const nx = dx / distance;
        const ny = dy / distance;

        // Tangent vector
        const tx = -ny;
        const ty = nx;

        // Dot product tangent
        const dpTan1 = this.direction[0] * tx + this.direction[1] * ty;
        const dpTan2 = other.direction[0] * tx + other.direction[1] * ty;

        // Dot product normal
        const dpNorm1 = this.direction[0] * nx + this.direction[1] * ny;
        const dpNorm2 = other.direction[0] * nx + other.direction[1] * ny;

        // Conservation of momentum in 1D
        const m1 = dpNorm1;
        const m2 = dpNorm2;

        // Update velocities
        this.updateDirection([tx * dpTan1 + nx * m2, ty * dpTan1 + ny * m2]);
        other.updateDirection([tx * dpTan2 + nx * m1, ty * dpTan2 + ny * m1]);
        this.setPosition([other.getPosition()[0] - 2 * nx * this.radius, other.getPosition()[1] - 2 * ny * this.radius])
    }


    // Method to render the ball as a React element
    public render(): ReactElement {
        return (
            <div
                style={{
                    width: `${2 * this.radius}px`,
                    height: `${2 * this.radius}px`,
                    background: "gray",
                    border: "1px solid black",
                    borderRadius: "100px",
                    position: "absolute",
                    left: `${this.x}px`,
                    top: `${this.y}px`,
                    backgroundColor: this.color
                }}
            ></div>
        );
    }
}


// Function to generate a random color
function getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}