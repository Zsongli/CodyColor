export type Direction = "north" | "south" | "west" | "east";

interface Cell {
    action(robot: Robot): void;
}

const rotation = {
    "north": "transform: rotate(180deg);",
    "south": "transform: rotate(0deg);",
    "east": "transform: rotate(270deg);",
    "west": "transform: rotate(90deg);",
}

export default class Robot {

    private steps: number = 0;
    private rotationCss: string = "transform: rotate(0deg);";
    public css: string;

    constructor(public x: number, public y: number, public direction: Direction, public styleCss: string) {
        this.rotationCss = rotation[this.direction];
        this.css = this.styleCss + this.rotationCss;
    }

    public stepForward(): void {
        switch (this.direction) {
            case "north":
                this.y--;
                break;
            case "south":
                this.y++;
                break;
            case "east":
                this.x++;
                break;
            case "west":
                this.x--;
                break;
        }
    }

    public turnLeft(): void {
        switch (this.direction) {
            case "north":
                this.direction = "west";
                break;
            case "south":
                this.direction = "east";
                break;
            case "east":
                this.direction = "north";
                break;
            case "west":
                this.direction = "south";
                break;
        }

        this.rotationCss = rotation[this.direction];
        this.css = this.styleCss + this.rotationCss;
    }

    public turnRight(): void {
        switch (this.direction) {
            case "north":
                this.direction = "east";
                break;
            case "south":
                this.direction = "west";
                break;
            case "east":
                this.direction = "south";
                break;
            case "west":
                this.direction = "north";
                break;
        }

        this.rotationCss = rotation[this.direction];
        this.css = this.styleCss + this.rotationCss;
    }

    public async start(grid: Cell[][], cb: (updatedSteps: number) => void) {
        this.steps = 0;
        cb(this.steps);
        await new Promise(resolve => setTimeout(resolve, 1000));
        while (this.y >= 0 && this.y < grid.length && this.x >= 0 && this.x < grid[0].length) {
            grid[this.y][this.x].action(this);
            cb(++this.steps);
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
}