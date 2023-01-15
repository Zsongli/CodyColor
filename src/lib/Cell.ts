import type Robot from "./Robot";

export default abstract class Cell {
    public abstract css: string;
    public abstract action(robot: Robot): void;
}

export class GrayCell extends Cell {
    public css = "background-color: gray;"
    public action(robot: Robot) {
        robot.stepForward();
    }
}
export class RedCell extends Cell {
    public css = "background-color: red;"
    public action(robot: Robot) {
        robot.turnLeft();
        robot.stepForward();
    }
}
export class YellowCell extends Cell {
    public css = "background-color: yellow;"
    public action(robot: Robot) {
        robot.turnRight();
        robot.stepForward();
    }
}

