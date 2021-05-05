const Entity = require('./../Entity');
const Components = require('./../Components');

function doesIntersect(obj1, obj2) {
    let rect1 = {
        x: obj1.position.x - obj1.size,
        y: obj1.position.y - obj1.size,
        height: obj1.size * 2,
        width: obj1.size * 2
    };
    let rect2 = {
        x: obj2.position.x - obj2.size,
        y: obj2.position.y - obj2.size,
        height: obj2.size * 2,
        width: obj2.size * 2
    };

    return (rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.height + rect1.y > rect2.y);
}

// Collision system
// --------------------------------------
module.exports = function systemCollision(entities) {

    let curEntity;
    let entityIdsCollidedWith = [];

    for (let entityId in entities) {
        curEntity = entities[entityId];


        if (curEntity.components.appearance &&
            curEntity.components.playerControlled &&
            curEntity.components.position) {

            for (let entityId2 in entities) {
                if (!entities[entityId2].components.playerControlled &&
                    entities[entityId2].components.position &&
                    entities[entityId2].components.appearance) {

                    if (doesIntersect(
                        {
                            position: curEntity.components.position,
                            size: curEntity.components.appearance.size
                        },
                        {
                            position: entities[entityId2].components.position,
                            size: entities[entityId2].components.appearance.size
                        }
                    )) {
                        entityIdsCollidedWith.push(entityId2);
                        curEntity.components.score.value++;
                    }
                }
            }
        }
    }

    for (let i = 0; i < entityIdsCollidedWith.length; i++) {
        let entity = new Entity();
        entity.addComponent(new Components.Appearance());
        entity.addComponent(new Components.Position());
        entities[entity.id] = entity;
    }

    while (entityIdsCollidedWith.length > 0) {
        curEntity = entityIdsCollidedWith.pop();
        delete entities[curEntity];
    }
};
