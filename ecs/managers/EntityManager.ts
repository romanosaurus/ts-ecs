import IEntity from "../interfaces/IEntity";
import AEntity from "../abstract/AEntity";

export default class EntityManager {
    private entities : Array<IEntity>;
    private idMax : number;

    constructor() {
        this.entities = new Array<IEntity>();
        this.idMax = 0;
    }

    /**
     * Create a new entity
     * @param name name of the entity
     */
    createEntity(name : string) : void {
        this.entities.push(new AEntity(this.idMax, name));
        this.idMax++;
    }

    /**
     * Delete an entity
     * @param name entity to be deleted
     */
    deleteEntity(name : string) : void {
        this.entities = this.entities.filter(obj => obj.getName() !== name);
    }

    /**
     * Get an entity by name
     * @param name name of the entity
     */
    getEntity(name : string) : IEntity {
        return this.entities.filter((entity) => entity.getName() === name)[0];
    }

    /**
     * Apply to each entity who possess the comps in parameter, the callback function
     * @param componentsName array of component name
     * @param callback callback function
     */
    applyToEach(componentsName : Array<string>, callback : (entity : IEntity) => void) : void {
        for (let ent of this.entities) {
            if (ent.hasComponents(componentsName))
                callback(ent);
        }
    }
}
