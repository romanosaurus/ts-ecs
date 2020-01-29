# Entity Component System in Typescript

This repository is an implementation of an Entity Component System (ECS) in Typescript

## Installation

TODO

## Usage

This part will explain to you how to create entities, components or systems

### Components

To create a component, you have to create a class that inherits from the AComponent class.

```typescript
import AComponent from './ecs/abstract';

interface Vector2 { x: number, y: number }

class Transform extends AComponent {
    public position : Vector2 = { x: 0, y: 0 };
    public rotation : Vector2 = { x: 0, y: 0 };
}
```

### Entities

To create an entity and assign a new component here is a simple example

```typescript
import ECSWrapper from "./ecs/wrapper/ECSWrapper";
import IEntity from "./ecs/interfaces/IEntity";

const ecsWrapper : ECSWrapper = ECSWrapper.getInstance();

ecsWrapper.entityManager.createEntity("Player");

const playerEntity : IEntity = ecsWrapper.entityManager.getEntity("Player");
playerEntity.assignComponent<Transform>(new Transform);

// To get a component, easy

const playerTransform  : Transform = playerEntity.getComponent(Transform);
```

### Systems

To create a systems, and apply logics on components, here is an example:

```typescript
import ASystem from "./ecs/abstract/ASystem"; import ECSWrapper from "./ECSWrapper";

class ExampleSystem extends ASystem {
    onInit() : void {
        
    }

    onUpdate(elapsedTime : number) : void {
        const ecsWrapper : ECSWrapper = ECSWrapper.getInstance();

        ecsWrapper.entityManager.applyToEach(["Transform"], (entity) => {
            const transform : Transform = entity.getComponent(Transform);
    
            transform.position.x += 1;
        })
    }
}

// To Run a System

const ecsWrapper : ECSWrapper = ECSWrapper.getInstance();

ecsWrapper.newSystem<ExampleSystem>(new ExampleSystem("Example System"));
ecsWrapper.runSystem("Example System");

```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

[Charlie JEANNEAU](https://github.com/JeSuisCharlie1)
[Antoine CARLIER](https://github.com/Pywwo)
