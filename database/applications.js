const Sequelize = require('sequelize');
const db = require('./connection');

const applications = db.define('applications', {
    guildid: {
        type: Sequelize.STRING
    },
    discordid: {
        type: Sequelize.STRING
    },
    reapply: {
        type: Sequelize.STRING
    }
});


module.exports = applications;