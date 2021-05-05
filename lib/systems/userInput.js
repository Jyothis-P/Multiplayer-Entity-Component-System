module.exports = function (entities) {
    let currentEntity;
    const speed = 15;

    for (let eid in entities) {
        currentEntity = entities[eid];

        if (currentEntity.components.playerControlled && currentEntity.components.position) {
            currentEntity.components.position.y += speed * (Number(currentEntity.components.playerControlled.Input.DOWN) - Number(currentEntity.components.playerControlled.Input.UP));
            currentEntity.components.position.x += speed * (Number(currentEntity.components.playerControlled.Input.RIGHT) - Number(currentEntity.components.playerControlled.Input.LEFT));
        }
    }
}