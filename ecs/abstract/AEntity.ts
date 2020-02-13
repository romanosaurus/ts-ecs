import IEntity from "../interfaces/IEntity";
import IComponent from "../interfaces/IComponent";

export default class AEntity implements IEntity {
    private readonly id : number;
    private readonly name : string;
    private readonly components : Array<IComponent>;

    constructor(id : number, name : string) {
        this.id = id;
        this.name = name;
        this.components = new Array<IComponent>();
    }

    /**
     * Assign a new component to the entity
     * @param value new component
     */
    assignComponent<T extends IComponent>(value: T): void {
        if (this.hasComponent(value.constructor.name))
            throw "Component already exists";
        this.components.push(value);
    }

    /**
     * Get a component on the entity
     * @param TCtor type to be get
     * @return IEntity
     */
    getComponent<T extends IComponent>(TCtor: { new(...args: any[]): T }): T | null {
        const filterArray: Array<IComponent> = this.components.filter((elem) => TCtor.name === elem.constructor.name);

        if (filterArray.length === 0)
            return null;
        return <T>this.components.filter((elem) => TCtor.name === elem.constructor.name)[0];
    }

    /**
     * Get the id of the entity
     * @return number id of the entity
     */
    getId(): number {
        return this.id;
    }

    /**
     * Get the name of the entity
     * @return string name of the entity
     */
    getName(): string {
        return this.name;
    }

    /**
     * Know if an entity has a component
     * @param componentName name of the component
     * @return true if the component exist in the entity, false if not
     */
    hasComponent(componentName : string) : boolean {
        return this.components.some((elem) => elem.constructor.name === componentName);
    }

    /**
     * Know if an entity has components
     * @param components Array of component name
     * @return true if the components exist in the entity, false if not
     */
    hasComponents(components: Array<string>): boolean {
        for (let component of components)
            if (!this.hasComponent(component))
                return false;
        return true;
    }
}
