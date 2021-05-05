const context = require('../shared/utils')

let Components = {};

Components.Appearance = function (params) {
    params = params || {};

    this.color = params.color;
    if (!this.color) {

        this.color = {
            r: 255,
            g: 0,
            b: 0
        }
    }
    this.size = params.size || (1 + (Math.random() * 30 | 0));

    this.name = 'appearance';
    return this;
};

Components.Position = function (params) {
    params = params || {};

    this.x = params.x || 20 + (Math.random() * (context.WIDTH - 20) | 0);
    this.y = params.y || 20 + (Math.random() * (context.HEIGHT - 20) | 0);
    this.random = params.random || false;
    this.gravity = params.gravity || false;

    this.name = 'position';
    return this;
}

Components.PlayerControlled = function (params) {
    this.playerControlled = true;

    this.Input = {
        LEFT: false,
        RIGHT: false,
        UP: false,
        DOWN: false
    }
    this.name = 'playerControlled';
    return this;
}

Components.RandomMovement = function (params) {
    this.randomMovement = true;

    this.name = 'randomMovement';
    return this;
}

Components.Mass = function (params) {
    this.mass = 10;

    this.name = 'mass';
    return this;
}

Components.Score = function (params) {
    this.value = 0;
    this.playerName = params.name || 'unnamed';

    this.name = 'score';
    return this;
}

module.exports = Components;