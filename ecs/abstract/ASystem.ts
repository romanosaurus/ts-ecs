import {ISystem, SystemState} from "../interfaces/ISystem";

interface Events {
    name: string,
    value: any | null
}

export default class ASystem implements ISystem {
    private readonly name : string;
    private state : SystemState;
    public events : Events | null;

    constructor(name : string) {
        this.name = name;
        this.state = SystemState.STOPPED;
        this.events = null;
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

    setEvent(name: string, value: any): void {
        this.events = null;
    }

    clearEvent(): void {
        this.events = null;
    }
}
