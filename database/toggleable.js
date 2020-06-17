const Sequelize = require('sequelize');
const db = require('./connection');

const toggleable = db.define('toggleable', {
    guildid: {
        type: Sequelize.STRING
    },
    buffers: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    ftop: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    flist: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    find: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    who: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    banking: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    outpost: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    stronghold: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    ingameOutpost: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    ingameStronghold: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    applications: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    welcome: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    wallChecks: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
});


module.exports = toggleable;