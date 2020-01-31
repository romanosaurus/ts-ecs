import ECSWrapper from "./ecs/wrapper/ECSWrapper";

const ecsWrapper : ECSWrapper = ECSWrapper.getInstance();

console.log(ecsWrapper.entityManager.getEntitiesByName("Player"));
//ecsWrapper.entityManager.createEntity("Player");
