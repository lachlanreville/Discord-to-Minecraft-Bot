const Sequelize = require('sequelize');
const db = require('./connection');

const information = db.define('information', {
    guildid: {
        type: Sequelize.STRING
    },
    interval: {
        type: Sequelize.INTEGER
    },
    time: {
        type: Sequelize.INTEGER
    },
    setup: {
        type: Sequelize.BOOLEAN
    }
});


module.exports = information;