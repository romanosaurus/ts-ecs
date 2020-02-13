import EntityManager from "../managers/EntityManager";
import SystemManager from "../managers/SystemManager";

class ECSWrapper {
    public entities : EntityManager;
    public systems : SystemManager;

    public constructor() {
        this.entities = new EntityManager();
        this.systems = new SystemManager();
    }
}

export default new ECSWrapper();
