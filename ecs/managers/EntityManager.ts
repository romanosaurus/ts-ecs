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
    public create(name : string) : void {
        this.entities.push(new AEntity(this.idMax, name));
        this.idMax++;
    }

    /**
     * Delete an entity
     * @param name entity to be deleted
     */
    public delete(name : string) : void {
        this.entities = this.entities.filter(obj => obj.getName() !== name);
    }

    /**
     * get entities
     * @param filter filter on id or name
     */
    public get(filter: (entity: IEntity, index: number, array: Array<IEntity>) => boolean): Array<IEntity> {
        return this.entities.filter(filter);
    }

    /**
     * Get all entities with the name in parameter
     * @param identifier name of the entity
     */
    public getByName(identifier: string): Array<IEntity> {
        return this.get((entity) => entity.getName() === identifier);
    }

    /**
     * Get an entity based on his uid
     * @param identifier uid of the entity
     */
    public getById(identifier: number): IEntity {
        return this.get((entity) => entity.getId() === identifier)[0];
    }

    /**
     * Apply to each entity who possess the comps in parameter, the callback function
     * @param componentsName array of component name
     * @param callback callback function
     */
    public applyToEach(componentsName : Array<string>, callback : (entity : IEntity) => void) : void {
        for (let ent of this.entities) {
            if (ent.hasComponents(componentsName))
                callback(ent);
        }
    }
}
