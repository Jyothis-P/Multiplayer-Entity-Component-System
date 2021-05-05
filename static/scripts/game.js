ECS.Game = function () {
    let self = this;


    let systems = [
        ECS.systems.render,
        ECS.systems.score,
    ];


    function gameLoop() {
        for (let i = 0; i < systems.length; i++) {
            systems[i](ECS.entities);
        }

        if (self._running)
            requestAnimationFrame(gameLoop);
    }

    this._running = true;

    console.log('Game loop starting.');
    requestAnimationFrame(gameLoop);

    this.endGame = function () {
        this._running = false;
        return this;
    }
}

const startButton = document.getElementById('start');
startButton.onclick = () => {
    startButton.disabled = true;
    const name = document.getElementById('name').value;
    socket.emit('join', {name: name});
    ECS.game = new ECS.Game();
}
