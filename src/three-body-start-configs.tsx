

export const configs: Object[] = [
    [{
        x: 300,
        y: 350,
        direction: [0.1, 0],
        radius: 10,
        color: "red",
        gravity: 0,
        airFriction: 0,
        mass: 1
    },
    {
        x: 700,
        y: 350,
        direction: [-0.05, 0.05 * Math.sqrt(3)],
        radius: 10,
        color: "green",
        gravity: 0,
        airFriction: 0,
        mass: 1
    }
    ,
    {
        x: 500,
        y: 350 + 200 * Math.sqrt(3),
        direction: [-0.05, -0.05 * Math.sqrt(3)],
        radius: 10,
        color: "blue",
        gravity: 0,
        airFriction: 0,
        mass: 1
    }]
]