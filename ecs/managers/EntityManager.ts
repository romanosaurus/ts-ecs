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
    create(name : string) : void {
        this.entities.push(new AEntity(this.idMax, name));
        this.idMax++;
    }

    /**
     * Delete an entity
     * @param name entity to be deleted
     */
    delete(name : string) : void {
        this.entities = this.entities.filter(obj => obj.getName() !== name);
    }

    /**
     * Get an entity by name
     * @param filter
     */
    get(filter: (entity: IEntity, index: number, array: Array<IEntity>) => boolean): Array<IEntity> {
        return this.entities.filter(filter);
    }

    getByName(identifier: string): Array<IEntity> {
        return this.get((entity) => entity.getName() === identifier);
    }

    getById(identifier: number): Array<IEntity> {
        return this.get((entity) => entity.getId() === identifier);
    }

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
