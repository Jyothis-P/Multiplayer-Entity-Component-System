let Entity = function Entity() {
    this.id = Entity.prototype._count;
    Entity.prototype._count++;

    this.components = {};

    return this;
}

Entity.prototype._count = 0;

Entity.prototype.addComponent = function (component) {
    this.components[component.name] = component;
    return this;
}

Entity.prototype.removeComponent = function (componentName) {
    delete this.components[componentName];
    return this;
}

Entity.prototype.print = function () {
    console.log(JSON.stringify(this, null, 4));
    return this;
}

module.exports = Entity;