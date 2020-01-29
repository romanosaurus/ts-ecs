import ECSWrapper from "./ecs/wrapper/ECSWrapper";

const ecsWrapper : ECSWrapper = ECSWrapper.getInstance();

ecsWrapper.entityManager.createEntity("Player");
