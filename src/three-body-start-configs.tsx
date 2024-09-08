

export const ball_configs: Record<string, any> =
{
    "harmony": {
        "attractionGravitationalConstant": 420,
        "ballCount":3,
        "balls": [{
            x: 250,
            y: 333,
            direction: [1 * 0.5, -0.5 * Math.sqrt(3)],
            radius: 10,
            color: "red",
            gravity: 0,
            airFriction: 0,
            mass: 1,
            shouldGlow: true
        },
        {
            x: 650,
            y: 333,
            direction: [1 * 0.5, 0.5 * Math.sqrt(3)],
            radius: 10,
            color: "yellow",
            gravity: 0,
            airFriction: 0,
            mass: 1,
            shouldGlow: true
        },
        {
            x: 450,
            y: 333 + 200 * Math.sqrt(3),
            direction: [-2 * 0.5, 0],
            radius: 10,
            color: "cyan",
            gravity: 0,
            airFriction: 0,
            mass: 1,
            shouldGlow: true
        }]
    },"harmonyfast": {
        "attractionGravitationalConstant": 1200,
        "ballCount":3,
        "balls": [{
            x: 250,
            y: 333,
            direction: [1 * 0.5, -0.5 * Math.sqrt(3)],
            radius: 10,
            color: "red",
            gravity: 0,
            airFriction: 0,
            mass: 1,
            shouldGlow: true
        },
        {
            x: 650,
            y: 333,
            direction: [1 * 0.5, 0.5 * Math.sqrt(3)],
            radius: 10,
            color: "yellow",
            gravity: 0,
            airFriction: 0,
            mass: 1,
            shouldGlow: true
        },
        {
            x: 450,
            y: 333 + 200 * Math.sqrt(3),
            direction: [-2 * 0.5, 0],
            radius: 10,
            color: "cyan",
            gravity: 0,
            airFriction: 0,
            mass: 1,
            shouldGlow: true
        }]
    },

}
