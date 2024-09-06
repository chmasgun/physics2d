import { ReactElement } from "react";
export class Ball {
    private direction: [number, number];
    private bounds: [number, number];
    private color: string;
    private radius: number;
    private gravity: number = 0.015; // 0.003
    private friction: number = 0.01;
    private airFriction: number =  0.01; // 0.01

    constructor(public x: number, public y: number, direction: [number, number] = [0, 0], bounds: [number, number] = [0, 0], radius: number = 10) {
        this.direction = direction;
        this.bounds = bounds;
        this.color = getRandomColor();
        this.radius = radius;
    }
    public getRadius(): number {

        return this.radius
    }
    public getDirection(): [number, number] {

        return this.direction
    }
    public updateDirection(newDirection: [number, number]): void {
        this.direction = newDirection;
    }
    public getPosition(): [number, number] {

        return [this.x, this.y]
    }
    public setPosition([x, y]: [number, number]): void {
        this.x = x;
        this.y = y;
    }
    private applyFriction (friction : number) : void {

        this.updateDirection( [this.direction[0] * (1- friction) , this.direction[1] * (1- friction) ])
    }

    public push ([x, y]: [number, number]): void {
        this.x  += x ;
        this.x  += y ; 
    }
    

    // Method to update the position of the ball
    public updatePosition(): void {
        if (this.x + this.direction[0] < this.radius || this.x + this.direction[0] > this.bounds[0] - this.radius  ) {
            this.updateDirection([(- this.direction[0]), (this.direction[1]  + this.gravity)])

        }
        if (this.y + this.direction[1] < this.radius || this.y + this.direction[1] > this.bounds[1] - this.radius  ) {
            this.updateDirection([(this.direction[0]), (-this.direction[1]  + this.gravity)])


        }else{
            this.updateDirection([
                 this.direction[0],
                 (this.direction[1] + this.gravity)])
            this.applyFriction(this.airFriction)

        }
        // if( Math.abs(this.direction[1]) < 2* this.gravity){
        //     this.direction[1] = 0
        // }
        this.x = Math.max(this.radius, Math.min(this.x + this.direction[0], this.bounds[0] - this.radius  ));
        this.y = Math.max(this.radius, Math.min(this.y + this.direction[1], this.bounds[1] - this.radius  ));
         

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
        const dx = other.x - this.x;
        const dy = other.y - this.y;
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
        this.updateDirection([(tx * dpTan1 + nx * m2) * (1 - this.friction), (ty * dpTan1 + ny * m2) * (1 - this.friction)]);
        other.updateDirection([(tx * dpTan2 + nx * m1) * (1 - this.friction), (ty * dpTan2 + ny * m1) * (1 - this.friction)]);
        this.setPosition([other.getPosition()[0] - 2 * nx * this.radius, other.getPosition()[1] - 2 * ny * this.radius])
        
        //  [
        //     Math.max(0, Math.min(other.getPosition()[0] - 2 * nx * this.radius, this.bounds[0] - this.radius * 2)),
        //     Math.max(0, Math.min(other.getPosition()[1] - 2 * ny * this.radius, this.bounds[0] - this.radius * 2))]
    }


    // Method to render the ball as a React element
    public render(): ReactElement {
        return (
            <div
                style={{
                    width: `${2 * this.radius}px`,
                    height: `${2 * this.radius}px`,
                    background: "gray",
                    // border: "1px solid black",
                    borderRadius: "100px",
                    position: "absolute",
                    left: `${this.x - this.radius}px`,
                    top: `${this.y - this.radius}px`,
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