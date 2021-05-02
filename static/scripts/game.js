ECS.Game = function () {
    let self = this;


    let systems = [
        ECS.systems.render,
    ];


    function gameLoop() {
        console.log(self._running);
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

ECS.game = new ECS.Game();
