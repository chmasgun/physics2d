import { ReactElement } from "react";
import { Ball } from "./ball";

export class BallGenerator {
  private static instance: BallGenerator;

  private constructor() { }

  public static getInstance(): BallGenerator {
    if (!BallGenerator.instance) {
      BallGenerator.instance = new BallGenerator();
    }
    return BallGenerator.instance;
  }

  // Method to create a Ball instance
  public createBall({ x, y, direction, bounds, radius, color="random", gravity, airFriction, mass=0 , shouldGlow=false, attractionGravitationalConstant= 0}: { x: number; y: number; direction: [number, number]; bounds: [number, number]; radius: number; color:string; gravity:number; airFriction:number ; mass:number ; shouldGlow:boolean ; attractionGravitationalConstant:number }): Ball {
    return new Ball(x, y, direction, bounds, radius, color, gravity, airFriction, mass, shouldGlow, attractionGravitationalConstant);
  }
}
