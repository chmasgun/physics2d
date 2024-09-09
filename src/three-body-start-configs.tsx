

export const ball_configs: Record<string, any> =
{   "preview": {
        "attractionGravitationalConstant": 75,
        "ballCount": 3,
        "balls": [{
            x: 50,
            y: 60,
            direction: [1 * 0.3, -0.3 * Math.sqrt(3)],
            radius: 4,
            color: "red",
            gravity: 0,
            airFriction: 0,
            mass: 1,
            shouldGlow: true
        },
        {
            x: 150,
            y: 60,
            direction: [1 * 0.3, 0.3 * Math.sqrt(3)],
            radius: 4,
            color: "yellow",
            gravity: 0,
            airFriction: 0,
            mass: 1,
            shouldGlow: true
        },
        {
            x: 100,
            y: 60 + 50 * Math.sqrt(3),
            direction: [-2 * 0.3, 0],
            radius: 4,
            color: "cyan",
            gravity: 0,
            airFriction: 0,
            mass: 1,
            shouldGlow: true
        }]
    },
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
    "ejection": {
        "attractionGravitationalConstant": 1800,
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
        "attractionGravitationalConstant": 400,
        "ballCount": 2,
        "balls": [{
            x: 600,
            y: 450,
            direction: [0, -2],
            radius: 10,
            color: "#aad",
            gravity: 0,
            airFriction: 0,
            mass: 10,
            shouldGlow: true
        },
        {
            x: 300,
            y: 450,
            direction: [0, 2],
            radius: 10,
            color: "#dda",
            gravity: 0,
            airFriction: 0,
            mass: 10,
            shouldGlow: true
        }]
    },
    "blackhole": {
        "attractionGravitationalConstant": 16,
        "ballCount": 3,
        "balls": [{
            x: 450,
            y: 450,
            direction: [0, 0],
            radius: 50,
            color: "#000",
            gravity: 0,
            airFriction: 0,
            mass: 2000,
            shouldGlow: true
        },
        {
            x: 100,
            y: 450,
            direction: [3, 3],
            radius: 20,
            color: "#3ff",
            gravity: 0,
            airFriction: 0,
            mass: 0,
            shouldGlow: true
        },
        {
            x: 800,
            y: 450,
            direction: [-3, 3],
            radius: 20,
            color: "#ff6",
            gravity: 0,
            airFriction: 0,
            mass: 0,
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
                direction: [-1, 1],
                radius: 10,
                color: "cornflowerblue",
                gravity: 0,
                airFriction: 0,
                mass: 5,
                shouldGlow: true
            },
            {
                x: 300,
                y: 600,
                direction: [1, 1],
                radius: 10,
                color: "limegreen",
                gravity: 0,
                airFriction: 0,
                mass: 5,
                shouldGlow: true
            },
            {
                x: 600,
                y: 600,
                direction: [1, -1],
                radius: 10,
                color: "salmon",
                gravity: 0,
                airFriction: 0,
                mass: 5,
                shouldGlow: true
            },
            {
                x: 600,
                y: 300,
                direction: [-1, -1],
                radius: 10,
                color: "#eee",
                gravity: 0,
                airFriction: 0,
                mass: 5,
                shouldGlow: true
            }]
    },
    "earthmoon": {
        "attractionGravitationalConstant": 25,
        "ballCount": 2,
        "balls": [{
            x: 450,
            y: 450,
            direction: [0, - 3 / 81],
            radius: 30,
            color: "#aff",
            gravity: 0,
            airFriction: 0,
            mass: 81,
            shouldGlow: true
        },
        {
            x: 225,
            y: 450,
            direction: [0, 3],
            radius: 10,
            color: "#ddd",
            gravity: 0,
            airFriction: 0,
            mass: 1,
            shouldGlow: true
        }]
    },
    "sunearth": {
        "attractionGravitationalConstant":  0.5, //0.0154,
        "ballCount": 3,
        "balls": [
            {
                x: 450,
                y: 450,
                direction: [0,  -0.57 / 750],
                radius: 30,
                color: "#fd3",
                gravity: 0,
                airFriction: 0,
                mass: 750,
                shouldGlow: true
            },
            {
                x: -680,
                y: 450,
                direction: [0 , -0.02 * 0.24  + 0.57], // 0.57
                radius: 5,
                color: "#4fe",
                gravity: 0,
                airFriction: 0,
                mass: 1,
                shouldGlow: true
            },
            {
                x: -690,
                y: 450,
                direction: [0, 1 * 0.24 + 0.57],
                radius: 1,
                color: "#bbb",
                gravity: 0,
                airFriction: 0,
                mass: 0.02,
                shouldGlow: true
            }

        ]

    }
}
