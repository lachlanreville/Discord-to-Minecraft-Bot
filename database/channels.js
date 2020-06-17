const Sequelize = require('sequelize');
const db = require('./connection');

const channels = db.define('channels', {
    guildid: {
        type: Sequelize.STRING,
        allowNull: false
    },
    buffer: {
        type: Sequelize.STRING,
        allowNull: true
    },
    admin: {
        type: Sequelize.STRING,
        allowNull: false
    },
    welcome: {
        type: Sequelize.STRING,
        allowNull: true
    },
    who: {
        type: Sequelize.STRING,
        allowNull: true
    },
    ftop: {
        type: Sequelize.STRING,
        allowNull: true
    },
    user: {
        type: Sequelize.STRING,
        allowNull: true
    },
    economy: {
        type: Sequelize.STRING,
        allowNull: true
    },
    outpost: {
        type: Sequelize.STRING,
        allowNull: true
    },
    flist: {
        type: Sequelize.STRING,
        allowNull: true
    },
    find: {
        type: Sequelize.STRING,
        allowNull: true
    },
    welcome: {
        type: Sequelize.STRING,
        allowNull: true
    },
    stronghold: {
        type: Sequelize.STRING,
        allowNull: true
    },
    applications: {
        type: Sequelize.STRING,
        allowNull: true
    },
    bufferRole: {
        type: Sequelize.STRING,
        allowNull: false
    },
    bufferCategoryID: {
        type: Sequelize.STRING,
        allowNull: false
    }
});


module.exports = channels;