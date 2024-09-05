import { ReactElement } from "react";
export class Ball {
    private direction: [number, number];
    private bounds: [number, number];
    private color: string;
    private radius: number ;

    constructor(public x: number, public y: number, direction: [number, number] = [0, 0], bounds: [number, number] =[0,0], radius: number= 10) {
        this.direction = direction;
        this.bounds = bounds;
        this.color = getRandomColor();
        this.radius = radius;
    }

    public getDirection(): [number, number] {

        return this.direction
    }


    // Method to update the position of the ball
    public updatePosition(): void {
        if (this.x + this.direction[0] < 0 || this.x + this.direction[0] > this.bounds[0] - this.radius * 2 ) { this.updateDirection([- this.direction[0], this.direction[1]]) }
        if (this.y + this.direction[1] < 0 || this.y + this.direction[1] > this.bounds[1] - this.radius * 2) { this.updateDirection([this.direction[0], -this.direction[1]]) }
        this.x += this.direction[0];
        this.y += this.direction[1];
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
        const tempDirection = this.direction;
        this.updateDirection(other.getDirection());
        other.updateDirection(tempDirection);
    }

    // Method to render the ball as a React element
    public render(): ReactElement {
        return (
            <div
                style={{
                    width: `${2*this.radius}px`,
                    height: `${2*this.radius}px`,
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