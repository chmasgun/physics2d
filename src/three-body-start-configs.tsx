

export const ball_configs: Record<string, any> =
{   "preview": {
        "attractionGravitationalConstant": 820,
        "ballCount": 3,
        "balls": [{
            x: 250 / 900,
            y: 333 / 900,
            direction: [1 * 0.5, -0.5 * Math.sqrt(3)],
            radius: 12,
            color: "red",
            gravity: 0,
            airFriction: 0,
            mass: 1,
            shouldGlow: true
        },
        {
            x: 650 / 900,
            y: 333 / 900,
            direction: [1 * 0.5, 0.5 * Math.sqrt(3)],
            radius: 12,
            color: "yellow",
            gravity: 0,
            airFriction: 0,
            mass: 1,
            shouldGlow: true
        },
        {
            x: 450 / 900,
            y: 333 / 900 + 200 * Math.sqrt(3) / 900,
            direction: [-2 * 0.5, 0],
            radius: 12,
            color: "cyan",
            gravity: 0,
            airFriction: 0,
            mass: 1,
            shouldGlow: true
        }]
    },
    "harmony": {
        "attractionGravitationalConstant": 400,
        "ballCount": 3,
        "desc": "A harmonious three body system that theoretically keeping its balance forever. Due to numeric roundings, the balance is lost after some iterations, though...",
        "balls": [{
            x: 250 / 900,
            y: 333 / 900,
            direction: [1 * 0.5, -0.5 * Math.sqrt(3)],
            radius: 10,
            color: "red",
            gravity: 0,
            airFriction: 0,
            mass: 1,
            shouldGlow: true
        },
        {
            x: 650 / 900,
            y: 333 / 900,
            direction: [1 * 0.5, 0.5 * Math.sqrt(3)],
            radius: 10,
            color: "yellow",
            gravity: 0,
            airFriction: 0,
            mass: 1,
            shouldGlow: true
        },
        {
            x: 450 / 900,
            y: 333 / 900 + 200 * Math.sqrt(3) / 900,
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
        "desc":"A very similar, harmonious system under higher gravitational pull. Their orbit gets elliptical.",
        "balls": [{
            x: 250/ 900,
            y: 333/ 900,
            direction: [1 * 0.5, -0.5 * Math.sqrt(3)],
            radius: 10,
            color: "red",
            gravity: 0,
            airFriction: 0,
            mass: 1,
            shouldGlow: true
        },
        {
            x: 650/ 900,
            y: 333/ 900,
            direction: [1 * 0.5, 0.5 * Math.sqrt(3)],
            radius: 10,
            color: "yellow",
            gravity: 0,
            airFriction: 0,
            mass: 1,
            shouldGlow: true
        },
        {
            x: 450/ 900,
            y: 333/ 900 + 200 * Math.sqrt(3)/ 900,
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
        "desc":"More gravitational pull is enforced, and one body goes out of the system ...",
        "balls": [{
            x: 250/ 900,
            y: 333/ 900,
            direction: [1 * 0.5, -0.5 * Math.sqrt(3)],
            radius: 10,
            color: "red",
            gravity: 0,
            airFriction: 0,
            mass: 1,
            shouldGlow: true
        },
        {
            x: 650/ 900,
            y: 333/ 900,
            direction: [1 * 0.5, 0.5 * Math.sqrt(3)],
            radius: 10,
            color: "yellow",
            gravity: 0,
            airFriction: 0,
            mass: 1,
            shouldGlow: true
        },
        {
            x: 450/ 900,
            y: 333/ 900 + 200 * Math.sqrt(3)/ 900,
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
        "attractionGravitationalConstant": 360,
        "ballCount": 2,
        "desc":"A twin star system that keeps its balance forever.",
        "balls": [{
            x: 600/ 900,
            y: 450/ 900,
            direction: [0, -2],
            radius: 10,
            color: "#aad",
            gravity: 0,
            airFriction: 0,
            mass: 10,
            shouldGlow: true
        },
        {
            x: 300/ 900,
            y: 450/ 900,
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
        "desc":"An attempt to demonstrate the strength of a black hole. Luckily, our bodies cannot be crushed here!",
        "balls": [{
            x: 450/ 900,
            y: 450/ 900,
            direction: [0, 0],
            radius: 60,
            color: "#000",
            gravity: 0,
            airFriction: 0,
            mass: 2000,
            shouldGlow: true
        },
        {
            x: 100/ 900,
            y: 450/ 900,
            direction: [3, 3],
            radius: 10,
            color: "#f34",
            gravity: 0,
            airFriction: 0,
            mass: 0,
            shouldGlow: true
        },
        {
            x: 800/ 900,
            y: 450/ 900,
            direction: [-3, 3],
            radius: 10,
            color: "#ff6",
            gravity: 0,
            airFriction: 0,
            mass: 0,
            shouldGlow: true
        }]
    },
    "twoblackhole": {
        "attractionGravitationalConstant": 16,
        "ballCount": 2,
        "desc":"Two black holes getting too close, but still the balance is there!",
        "balls": [{
            x: 625/ 900,
            y: 450/ 900,
            direction: [-4, -4],
            radius: 20,
            color: "#000",
            gravity: 0,
            airFriction: 0,
            mass: 2000,
            shouldGlow: true
        },
        {
            x: 275/ 900,
            y: 450/ 900,
            direction: [4, 4],
            radius: 20,
            color: "#000",
            gravity: 0,
            airFriction: 0,
            mass: 2000,
            shouldGlow: true
        } ]
    },
    "quadrastars": {
        "attractionGravitationalConstant": 88.666,
        "ballCount": 4,
        "desc":"A quadruple star system rotating calmly, until the tiny balance is broken out!",
        "balls": [
            {
                x: 300/ 900,
                y: 300/ 900,
                direction: [-1, 1],
                radius: 10,
                color: "cornflowerblue",
                gravity: 0,
                airFriction: 0,
                mass: 5,
                shouldGlow: true
            },
            {
                x: 300/ 900,
                y: 600/ 900,
                direction: [1, 1],
                radius: 10,
                color: "limegreen",
                gravity: 0,
                airFriction: 0,
                mass: 5,
                shouldGlow: true
            },
            {
                x: 600/ 900,
                y: 600/ 900,
                direction: [1, -1],
                radius: 10,
                color: "salmon",
                gravity: 0,
                airFriction: 0,
                mass: 5,
                shouldGlow: true
            },
            {
                x: 600/ 900,
                y: 300/ 900,
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
        "desc":"A boring demonstration of the moon rotating around the Earth. The system doesn't get mad :(",
        "ballCount": 2,
        "balls": [{
            x: 450/ 900,
            y: 450/ 900,
            direction: [0, - 3 / 81],
            radius: 30,
            color: "#aff",
            gravity: 0,
            airFriction: 0,
            mass: 81,
            shouldGlow: true
        },
        {
            x: 225/ 900,
            y: 450/ 900,
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
        "desc":"A close-to-realistic illustration of the sun, the earth and the moon.",
        "ballCount": 3,
        "balls": [
            {
                x: 450/ 900,
                y: 450/ 900,
                direction: [0,  -0.57 / 750],
                radius: 30,
                color: "#fd3",
                gravity: 0,
                airFriction: 0,
                mass: 750,
                shouldGlow: true
            },
            {
                x: -680/ 900,
                y: 450/ 900,
                direction: [0 , -0.02 * 0.24  + 0.57], // 0.57
                radius: 5,
                color: "#4fe",
                gravity: 0,
                airFriction: 0,
                mass: 1,
                shouldGlow: true
            },
            {
                x: -690/ 900,
                y: 450/ 900,
                direction: [0, 1 * 0.24 + 0.57],
                radius: 1,
                color: "#bbb",
                gravity: 0,
                airFriction: 0,
                mass: 0.02,
                shouldGlow: true
            }

        ]

    },
    "oneoff": {
        "attractionGravitationalConstant":  155, //0.0154,
        "desc":"One chills, others chaos...",
        "ballCount": 3,
        "balls": [
            {
                x: 450/ 900,
                y: 450/ 900,
                direction: [0,  - 2],
                radius: 10,
                color: "#fd3",
                gravity: 0,
                airFriction: 0,
                mass: 5,
                shouldGlow: true
            },
            {
                x: 250/ 900,
                y: 450/ 900,
                direction: [0 , 2], // 0.57
                radius: 10,
                color: "#4fe",
                gravity: 0,
                airFriction: 0,
                mass: 5,
                shouldGlow: true
            },
            {
                x: 650/ 900,
                y: 450/ 900,
                direction: [0, 0],
                radius: 10,
                color: "#8f8",
                gravity: 0,
                airFriction: 0,
                mass: 5,
                shouldGlow: true
            }

        ]

    },
    "exceeding": {
        "attractionGravitationalConstant":  37, //0.0154,
        "desc":"A weird but beautiful balance.",
        "ballCount": 3,
        "balls": [
            {
                x: 450/ 900,
                y: 450/ 900,
                direction: [0,  -1],
                radius: 10,
                color: "#fd3",
                gravity: 0,
                airFriction: 0,
                mass:5,
                shouldGlow: true
            },
            {
                x: 250/ 900,
                y: 450/ 900,
                direction: [0 , 1], // 0.57
                radius: 10,
                color: "#4fe",
                gravity: 0,
                airFriction: 0,
                mass: 5,
                shouldGlow: true
            },
            {
                x: 650/ 900,
                y: 450/ 900,
                direction: [0, 0],
                radius: 10,
                color: "#f77",
                gravity: 0,
                airFriction: 0,
                mass: 5,
                shouldGlow: true
            }

        ]

    },
    "coolignorance": {
        "attractionGravitationalConstant":  39, //0.0154,
        "desc":"It seems like everybody minds their own business.",
        "ballCount": 3,
        "balls": [
            {
                x: 450/ 900,
                y: 450/ 900,
                direction: [0,  -1.25],
                radius: 10,
                color: "#fd3",
                gravity: 0,
                airFriction: 0,
                mass:5,
                shouldGlow: true
            },
            {
                x: 250/ 900,
                y: 450/ 900,
                direction: [0 , 1], // 0.57
                radius: 10,
                color: "#4fe",
                gravity: 0,
                airFriction: 0,
                mass: 5,
                shouldGlow: true
            },
            {
                x: 650/ 900,
                y: 450/ 900,
                direction: [0, 0.25],
                radius: 10,
                color: "#f77",
                gravity: 0,
                airFriction: 0,
                mass: 5,
                shouldGlow: true
            }

        ]

    },
    "infinity": {
        "attractionGravitationalConstant":  290, //0.0154,
        "desc":"Drawing an infinity shape.",
        "ballCount": 3,
        "balls": [
            {
                x: 255/ 900,
                y: 450/ 900,
                direction: [0,  -0.56],
                radius: 10,
                color: "#fd3",
                gravity: 0,
                airFriction: 0,
                mass:1,
                shouldGlow: true
            },
            {
                x: 550/ 900,
                y: 399/ 900,
                direction: [- 1.59 , 0.28 ], // 0.28
                radius: 10,
                color: "#4fe",
                gravity: 0,
                airFriction: 0,
                mass: 1,
                shouldGlow: true
            },
            {
                x: 550/ 900,
                y: 501/ 900,
                direction: [ 1.59, 0.28],
                radius: 10,
                color: "#f77",
                gravity: 0,
                airFriction: 0,
                mass: 1,
                shouldGlow: true
            }

        ]

    }
}
