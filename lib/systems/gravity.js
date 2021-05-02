const context = require('../../shared/utils');

let gravity = function (entities) {
    let currentEntity, dx, dy;
    const cx = context.WIDTH / 2;
    const cy = context.HEIGHT / 2;

    for (let entityID in entities) {
        currentEntity = entities[entityID];

        if (currentEntity.components.mass) {
            dx = cx - currentEntity.components.position.x;
            dy = cy - currentEntity.components.position.y;

            dx *= 0.01;
            dy *= 0.01;

            currentEntity.components.position.x += dx;
            currentEntity.components.position.y += dy;

        }
    }
}

module.exports = gravity;