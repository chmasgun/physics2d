

export const ball_configs: Record<string, any> =
{
    "harmony": {
        "attractionGravitationalConstant": 420,
        "ballCount": 3,
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
    "harmonyfast": {
        "attractionGravitationalConstant": 1200,
        "ballCount": 3,
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

    "twinstars": {
        "attractionGravitationalConstant": 600,
        "ballCount": 2,
        "balls": [{
            x: 600,
            y: 450,
            direction: [0, -3],
            radius: 10,
            color: "#ddd",
            gravity: 0,
            airFriction: 0,
            mass: 10,
            shouldGlow: true
        },
        {
            x: 300,
            y: 450,
            direction: [0, 3],
            radius: 10,
            color: "#ddd",
            gravity: 0,
            airFriction: 0,
            mass: 10,
            shouldGlow: true
        }]
    },
    "quadrastars": {
        "attractionGravitationalConstant": 100,
        "ballCount": 4,
        "balls": [
            {
                x: 300,
                y: 300,
                direction: [ -1, 1],
                radius: 10,
                color: "#ddd",
                gravity: 0,
                airFriction: 0,
                mass: 5,
                shouldGlow: true
            },
            {
                x: 300,
                y: 600,
                direction: [ 1, 1],
                radius: 10,
                color: "#ddd",
                gravity: 0,
                airFriction: 0,
                mass: 5,
                shouldGlow: true
            },
            {
                x: 600,
                y: 600,
                direction: [ 1, -1],
                radius: 10,
                color: "#ddd",
                gravity: 0,
                airFriction: 0,
                mass: 5,
                shouldGlow: true
            },
            {
                x: 600,
                y: 300,
                direction: [ -1, -1 ],
                radius: 10,
                color: "#ddd",
                gravity: 0,
                airFriction: 0,
                mass: 5,
                shouldGlow: true
            }]
    }
}
