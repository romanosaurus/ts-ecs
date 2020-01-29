import EntityManager from "../managers/EntityManager";
import SystemManager from "../managers/SystemManager";

export default class ECSWrapper {
    private static instance : ECSWrapper;
    public entityManager : EntityManager;
    public systemManager : SystemManager;

    private constructor() {
        this.entityManager = new EntityManager();
        this.systemManager = new SystemManager();
    }

    public static getInstance() : ECSWrapper {
        if (!ECSWrapper.instance) {
            ECSWrapper.instance = new ECSWrapper();
        }
        return ECSWrapper.instance;
    }
}
