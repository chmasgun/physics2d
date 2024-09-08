import { ReactElement } from "react";
export class Ball {
    
    
    
    private direction: [number, number];
    private bounds: [number, number];
    private color: string;
    private radius: number;
    private gravity: number = 0.025; // 0.003
    //private friction: number = 0.01;
    private airFriction: number = 0.012; // 0.01
    private touchingWall: boolean = false;
    // private isFrozen: boolean = false;
    private touchingAnotherBall: boolean = false;
    private mass:number;
    private scale:number = 1
    private attractionGravitationalConstant:number = 420
    private renderPosition: [number, number] = [this.x, this.y]

    constructor(public x: number, public y: number, direction: [number, number] = [0, 0], bounds: [number, number] = [0, 0], radius: number = 10, color:string, gravity:number,airFriction:number, mass:number=0 ) {
        this.direction = direction;
        this.bounds = bounds;
        this.color = color==="random" ? getRandomColor() : color;
        this.radius = radius;
        this.gravity= gravity;
        this.airFriction= airFriction;
        this.mass = mass;

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
    private applyFriction(friction: number): void {

        this.updateDirection([this.direction[0] * (1 - friction), this.direction[1] * (1 - friction)])
    }

    public setTouchingWall(isTouching: boolean): void {
        this.touchingWall = isTouching
    }
    // public setIsFrozen(isFrozen: boolean): void {
    //     this.isFrozen = isFrozen
    // }
    public setTouchingAnotherBall(touchingAnotherBall: boolean): void {
        this.touchingAnotherBall = touchingAnotherBall
    }
    public getTouchingAnotherBall(): boolean {

        return this.touchingAnotherBall
    }
    
    public isInTheScene(): number{
        return this.y > 0 ? 1:0;
    }

    public destroy():void{
        this.radius=0;
        this.y= 100000
        
    }
    
    public applyAttractionForce(ball: Ball) {
         
        
        const lineDX =  (this.x - ball.x); 
        const lineDY =  (this.y - ball.y);
        const lineLengthSq =    Math.max(lineDX * lineDX + lineDY * lineDY , (ball.radius + this.radius)*(ball.radius + this.radius));
        const lineLength =    Math.sqrt(lineLengthSq);

        const thisForce = this.attractionGravitationalConstant * ball.mass / lineLengthSq
        const otherForce = this.attractionGravitationalConstant * this.mass / lineLengthSq

        //console.log(thisForce, otherForce);
        this.updateDirection([ this.direction[0] - thisForce * (lineDX/lineLength) , this.direction[1] - thisForce * (lineDY/lineLength)])
        ball.updateDirection([ ball.direction[0] + otherForce * (lineDX/lineLength) , ball.direction[1] + otherForce * (lineDY/lineLength)])

    }
    setScale(newScale: number) {
        this.scale = newScale;
    }
    setRenderPosition(newPosition: [number, number]) {
        this.renderPosition = newPosition
    }

    // Method to update the position of the ball
    public updatePosition(): void {
        if (this.x + this.direction[0] < this.radius || this.x + this.direction[0] > this.bounds[0] - this.radius) {
            //this.updateDirection([(- this.direction[0]), (this.direction[1] + this.gravity)])

        }
        if ( this.y + this.direction[1] > this.bounds[1] - this.radius) {
            //this.updateDirection([(this.direction[0]), (-this.direction[1] + this.gravity)])


        } else {

            this.updateDirection([
                this.direction[0],
                (this.direction[1] + ( //this.isFrozen ? 0 : 
                    this.gravity))])
             
            this.applyFriction(this.airFriction)

        }





        // if(!this.touchingAnotherBall){

        //this.x = Math.max(this.radius, Math.min(this.x + this.direction[0], this.bounds[0] - this.radius));
        //this.y =  Math.min(this.y + this.direction[1], this.bounds[1] - this.radius) ;
        this.x = this.x + this.direction[0];
        this.y = this.y + this.direction[1];
        this.renderPosition[0] = this.x;
        this.renderPosition[1] = this.y;
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
        // if (other.isFrozen) {
        //     this.updateDirection([0, 0])
        //     this.setIsFrozen(true)
        // } else {
        //     this.updateDirection([(tx * dpTan1 + nx * m2), (ty * dpTan1 + ny * m2)]);
        // }
        // if (this.isFrozen) {
        //     other.updateDirection([0, 0])
        //     other.setIsFrozen(true)
        // } else {
        //     other.updateDirection([(tx * dpTan2 + nx * m1), (ty * dpTan2 + ny * m1)]);
        // }
        this.updateDirection([(tx * dpTan1 + nx * m2), (ty * dpTan1 + ny * m2)]);
        other.updateDirection([(tx * dpTan2 + nx * m1), (ty * dpTan2 + ny * m1)]);

        if (!this.touchingWall) {
            if (!this.getTouchingAnotherBall()) {

                this.setPosition([other.getPosition()[0] - 2 * nx * this.radius, other.getPosition()[1] - 2 * ny * this.radius])
            }


        } else {
            if (!other.touchingWall) {
                if (!other.getTouchingAnotherBall()) {
                    other.setPosition([this.getPosition()[0] + 2 * nx * this.radius, this.getPosition()[1] + 2 * ny * this.radius])
                }

            }

        }

        this.setTouchingAnotherBall(true);
        other.setTouchingAnotherBall(true);


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
                    left: `${this.renderPosition[0] - this.radius}px`,
                    top: `${this.renderPosition[1] - this.radius}px`,
                    backgroundColor: this.color,
                    boxShadow:`0px 0px 35px 10px  ${this.color}`,
                    scale: `${1 / this.scale}`
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