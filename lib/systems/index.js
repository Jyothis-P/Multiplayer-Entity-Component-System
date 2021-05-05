const collision = require('./collision');
const gravity = require('./gravity');
const random = require('./randomMovement');
const user = require('./userInput');

module.exports = {
    'gravity': gravity,
    'randomMovement': random,
    'userInput': user,
    'collision': collision,
};