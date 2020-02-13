import ECSWrapper from "../wrapper/ECSWrapper";
import IEntity from "../interfaces/IEntity";
import AComponent from "../abstract/AComponent";

test('get entity without entities', () => {
    const ecsWrapper: ECSWrapper = ECSWrapper.getInstance();

    expect(ecsWrapper.entityManager.getByName("Player")).toStrictEqual([]);
});

test('get entity with entities', () => {
    const ecsWrapper: ECSWrapper = ECSWrapper.getInstance();

    ecsWrapper.entityManager.create("Player");
    ecsWrapper.entityManager.create("Player");

    expect(ecsWrapper.entityManager.getByName("Player").length).toStrictEqual(2);
});

test('get entity and verify that the entity is good', () => {
    const ecsWrapper: ECSWrapper = ECSWrapper.getInstance();

    ecsWrapper.entityManager.create("Player");
    expect(ecsWrapper.entityManager.getByName("Player")[0].getName()).toStrictEqual("Player");
    expect(ecsWrapper.entityManager.getByName("Player")[0].getId()).toStrictEqual(0);
});

test('has component without the component', () => {
    const ecsWrapper: ECSWrapper = ECSWrapper.getInstance();

    ecsWrapper.entityManager.create("Player");

    const playerEntity: IEntity = ecsWrapper.entityManager.getByName("Player")[0];
    expect(playerEntity.hasComponent("Transform")).toBe(false);
});

test('has component with the component', () => {
    class Transform extends AComponent {
        constructor(entity: IEntity) {
            super(entity);
        }
    }

    const ecsWrapper: ECSWrapper = ECSWrapper.getInstance();

    ecsWrapper.entityManager.create("Player");

    const playerEntity: IEntity = ecsWrapper.entityManager.getByName("Player")[0];
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

    const ecsWrapper: ECSWrapper = ECSWrapper.getInstance();

    ecsWrapper.entityManager.create("Bosetti");

    const playerEntity: IEntity = ecsWrapper.entityManager.getByName("Bosetti")[0];
    playerEntity.assignComponent<ComponentTest>(new ComponentTest(playerEntity));
    playerEntity.assignComponent<Controller>(new Controller(playerEntity));
    expect(playerEntity.hasComponents(["ComponentTest", "Controller"])).toBe(true);
});
