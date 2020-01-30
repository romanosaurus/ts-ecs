import IEntity from "./IEntity";

export default interface IComponent {
    getEntity?() : IEntity;
};

