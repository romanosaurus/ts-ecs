import {ISystem, SystemState} from "../interfaces/ISystem";

export default class SystemManager {
    private readonly systems : Array<ISystem>;
    private lastTime;

    constructor() {
        this.systems = new Array<ISystem>();
        this.lastTime = Date.now();
    }

    /**
     * Add a new system to the system manager
     * @param system new system
     */
    newSystem<T extends ISystem>(system: T) : void {
        this.systems.push(system);
    }

    /**
     * Start a system
     * @param name system name to start
     */
    startSystem(name : string) : void {
        const system : ISystem = this.systems.filter((system) => system.getName() === name)[0];

        system.onInit();
        system.setState(SystemState.STARTED);
    }

    /**
     * Run the systems
     */
    run() : void {
        let now = Date.now();
        const elapsedTime = now - this.lastTime;

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
    stopSystem(name : string) : void {
        const system : ISystem = this.systems.filter((system) => system.getName() === name)[0];

        system.onClose();
        system.setState(SystemState.STOPPED);
    }

    getSystem<T extends ISystem>(TCtor: { new(...args: any[]): T }) : T {
        return <T>this.systems.filter((elem) => TCtor.name === elem.constructor.name)[0];
    }

    setEvent(name: string, value: any) {
        this.systems.forEach((system) => {
            system.setEvent(name, value);
        });
    }
}
