import {ISystem, SystemState} from "../interfaces/ISystem";

export default class ASystem implements ISystem {
    private readonly name : string;
    private state : SystemState;

    constructor(name : string) {
        this.name = name;
        this.state = SystemState.STOPPED;
    }

    onInit(): void {}

    onUpdate(elapsedTime: number): void {}

    onClose(): void {}

    getName(): string {
        return this.name;
    }

    getState(): SystemState {
        return this.state;
    }

    setState(newState: SystemState): void {
        this.state = newState;
    }
}
