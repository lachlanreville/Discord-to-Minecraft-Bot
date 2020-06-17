const Sequelize = require('sequelize');
const db = require('./connection');

const ingame = db.define('ingame', {
    guildid: {
        type: Sequelize.STRING
    },
    outpostControlled: {
        type: Sequelize.STRING,
        defaultValue: ""
    },
    strongholdControlled: {
        type: Sequelize.STRING,
        defaultValue: ""
    },
    controllingFactions: {
        type: Sequelize.STRING,
        defaultValue: '[]'
    }
});

module.exports = ingame;