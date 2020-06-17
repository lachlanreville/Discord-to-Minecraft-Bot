const Sequelize = require('sequelize');
const db = require('./connection');

const whitelist = db.define('whitelist', {
    guildid: {
        type: Sequelize.STRING
    },
    discordid: {
        type: Sequelize.STRING,
        allowNull: false
    },
    username: {
        type: Sequelize.STRING,
        allowNull: true
    },
    code: {
        type: Sequelize.STRING,
        allowNull: true
    },
    checks: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    withdraw: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    codeused: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }

});


module.exports = whitelist;