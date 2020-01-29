import IComponent from "../interfaces/IComponent";
import { IEntity } from "../interfaces/IEntity";

export default class AComponent implements IComponent {
    private readonly entity : IEntity;

    constructor(entity : IEntity) {
        this.entity = entity;
    }

    getEntity(): IEntity {
        return this.entity;
    }
}
