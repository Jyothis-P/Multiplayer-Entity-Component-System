const Entity = require('./Entity');
const Components = require('./Components');
const Systems = require('./systems');
const context = require('./../shared/utils');

let Game = function () {
    let entity;
    let self = this;
    this.entities = {};
    this.clients = {};

    for (let i = 0; i < 20; i++) {

        entity = new Entity();
        entity.addComponent(new Components.Appearance());

        if (Math.random() > 0.5){
            entity.addComponent(new Components.Mass());
            entity.addComponent(new Components.RandomMovement());
        }

        entity.addComponent(new Components.Position());

        this.entities[entity.id] = entity;

    }

    let systems = [
        Systems.gravity,
        Systems.randomMovement,
        Systems.userInput,
        Systems.collision,
        // systems.render,
    ];


    this.gameLoop = function () {
        for (let i = 0; i < systems.length; i++) {
            systems[i](self.entities);
        }
    }

    this._running = true;

    console.log('Game loop starting.');

    this.endGame = function () {
        this._running = false;
        return this;
    }

    this.addNewPlayer = function (socket, data) {
        data.name = data.name || 'unnamed';

        let entity = new Entity();
        entity.addComponent(new Components.Appearance({
            color: {
                r: 0,
                g: Math.random() * 255,
                b: Math.random() * 255
            },
            size: 20
        }));
        entity.addComponent(new Components.Position({
            x: context.WIDTH / 2,
            y: context.HEIGHT / 2
        }));
        // entity.addComponent(new Components.RandomMovement());
        entity.addComponent(new Components.Mass());
        entity.addComponent(new Components.PlayerControlled());
        entity.addComponent(new Components.Score({name: data.name}));

        this.entities[entity.id] = entity;

        this.clients[socket.id] = {socket: socket, name: data['name'], entity: entity};
    }

    this.removePlayer = function (id) {
        this.clients.remove(id);
    }

    this.updateClients = function () {
        let client;
        for (let clientID in this.clients) {
            client = this.clients[clientID]['socket'];
            client.emit('update', this.entities);
        }
    }

    this.updateUserInput = function (socket, data) {
        if (this.clients[socket.id]){
            if (this.clients[socket.id].entity){
                let entity = this.clients[socket.id]['entity'];
                entity.components.playerControlled.Input = data;
            }
        }
    }


}

module.exports = Game;
