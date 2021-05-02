module.exports = function (entities) {
    let currentEntity;

    for (let eid in entities) {
        currentEntity = entities[eid];

        if (currentEntity.components.playerControlled && currentEntity.components.position) {
            currentEntity.components.position.y += 5 * (Number(currentEntity.components.playerControlled.Input.DOWN) - Number(currentEntity.components.playerControlled.Input.UP));
            currentEntity.components.position.x += 5 * (Number(currentEntity.components.playerControlled.Input.RIGHT) - Number(currentEntity.components.playerControlled.Input.LEFT));
        }
    }
}