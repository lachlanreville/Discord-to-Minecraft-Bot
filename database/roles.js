const Sequelize = require('sequelize');
const db = require('./connection');

const roles = db.define('roles', {
    guildid: {
        type: Sequelize.STRING
    },
    messageid: {
        type: Sequelize.STRING,

    },
    discordid: {
        type: Sequelize.STRING,

    },
    emojiname: {
        type: Sequelize.STRING
    }

});

module.exports = roles;