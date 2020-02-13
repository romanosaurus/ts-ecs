import ECSWrapper from "../wrapper/ECSWrapper";
import IEntity from "../interfaces/IEntity";
import AComponent from "../abstract/AComponent";

test('get entity without entities', () => {
    expect(ECSWrapper.entities.getByName("Player")).toStrictEqual([]);
});

test('get entity with entities', () => {
    ECSWrapper.entities.create("Player");
    ECSWrapper.entities.create("Player");

    expect(ECSWrapper.entities.getByName("Player").length).toStrictEqual(2);
});

test('get entity and verify that the entity is good', () => {
    ECSWrapper.entities.create("Player");

    expect(ECSWrapper.entities.getByName("Player")[0].getName()).toStrictEqual("Player");
    expect(ECSWrapper.entities.getByName("Player")[0].getId()).toStrictEqual(0);
});

test('has component without the component', () => {
    ECSWrapper.entities.create("Player");

    const playerEntity: IEntity = ECSWrapper.entities.getByName("Player")[0];
    expect(playerEntity.hasComponent("Transform")).toBe(false);
});

test('has component with the component', () => {
    class Transform extends AComponent {
        constructor(entity: IEntity) {
            super(entity);
        }
    }

    ECSWrapper.entities.create("Player");

    const playerEntity: IEntity = ECSWrapper.entities.getByName("Player")[0];
    playerEntity.assignComponent<Transform>(new Transform(playerEntity));
    expect(playerEntity.hasComponent("Transform")).toBe(true);
});

test('has components', () => {
    class ComponentTest extends AComponent {
        constructor(entity: IEntity) {
            super(entity);
        }
    }
    class Controller extends AComponent {
        constructor(entity: IEntity) {
            super(entity);
        }
    }

    ECSWrapper.entities.create("Bosetti");

    const playerEntity: IEntity = ECSWrapper.entities.getByName("Bosetti")[0];
    playerEntity.assignComponent<ComponentTest>(new ComponentTest(playerEntity));
    playerEntity.assignComponent<Controller>(new Controller(playerEntity));
    expect(playerEntity.hasComponents(["ComponentTest", "Controller"])).toBe(true);
});
