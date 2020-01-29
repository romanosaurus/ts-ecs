import {ISystem, SystemState} from "../interfaces/ISystem";

export default class SystemManager {
    private readonly systems : Array<ISystem>;
    private lastTime : number;

    constructor() {
        this.systems = new Array<ISystem>();
        this.lastTime = new Date().getTime();
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
        let now = new Date().getTime();
        const elapsedTime : number = this.lastTime - now;

        this.systems.forEach((system) => {
            system.onUpdate(elapsedTime);
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
}
