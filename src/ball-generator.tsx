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
  public createBall({ x, y, direction, bounds, radius, color="random" }: { x: number; y: number; direction: [number, number]; bounds: [number, number]; radius: number; color:string  }): Ball {
    return new Ball(x, y, direction, bounds, radius, color);
  }
}
