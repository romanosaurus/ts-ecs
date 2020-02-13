import {ISystem, SystemState} from "../interfaces/ISystem";

export default class SystemManager {
    private readonly systems: Array<ISystem>;
    private lastTime: number;

    constructor() {
        this.systems = new Array<ISystem>();
        this.lastTime = Date.now();
    }

    /**
     * Add a new system to the system manager
     * @param system new system
     */
    public initialize<T extends ISystem>(system: T) : void {
        this.systems.push(system);
    }

    /**
     * Start a system
     * @param name system name to start
     */
    public start(name : string) : void {
        const system : ISystem = this.systems.filter((system) => system.getName() === name)[0];

        system.onInit();
        system.setState(SystemState.STARTED);
    }

    /**
     * Run the systems
     */
    public run() : void {
        let now: number = Date.now();
        const elapsedTime: number = now - this.lastTime;

        this.systems.forEach((system) => {
            system.onUpdate(elapsedTime);
            system.clearEvent();
        });

        this.lastTime = now;
    }

    /**
     * Stop a system
     * @param name system name to be stopped
     */
    public stop(name : string) : void {
        const system : ISystem = this.systems.filter((system) => system.getName() === name)[0];

        system.onClose();
        system.setState(SystemState.STOPPED);
    }

    public get<T extends ISystem>(TCtor: { new(...args: any[]): T }) : T {
        return <T>this.systems.filter((elem) => TCtor.name === elem.constructor.name)[0];
    }

    public setEvent(name: string, value: any) {
        this.systems.forEach((system) => {
            system.setEvent(name, value);
        });
    }
}
