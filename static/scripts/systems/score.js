ECS.systems.score = function (entities) {
    let currentEntity, winner = false;

    let card = '';
    for (let entityID in entities) {
        currentEntity = entities[entityID];

        if (currentEntity.components.score && currentEntity.components.playerControlled) {
            if (currentEntity.components.score.value > 50){
                ECS.game._running = false;
                winner = currentEntity.components.score.playerName;
            }
            card += currentEntity.components.score.playerName + ': ' + currentEntity.components.score.value;
            card += '\n <br> \n'
        }
    }

    const scorecard = document.getElementById('scoreboard');
    scorecard.innerHTML = card;

    if (winner)
        alert(winner + ' won!')
}