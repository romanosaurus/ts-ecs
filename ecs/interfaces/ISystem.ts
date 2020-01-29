export enum SystemState {
    STARTED,
    STOPPED
}

export interface ISystem {
    onInit() : void;
    onUpdate(elapsedTime : number) : void;
    onClose() : void;
    getName() : string;
    getState() : SystemState;
    setState(newState : SystemState) : void;
}
