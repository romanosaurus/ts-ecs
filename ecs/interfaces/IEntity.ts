import IComponent from "./IComponent";

export interface IEntity {
    assignComponent<T>(value: T) : void;
    getComponent<T>(TCtor: { new(...args: any[]): T }): T;
    getId() : number;
    getName() : string;
    hasComponents(components : Array<string>) : boolean
    hasComponent(componentName : string) : boolean
}
