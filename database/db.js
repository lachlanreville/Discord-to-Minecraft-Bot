// Load Dependencies
const Sequelize = require('sequelize');
const db = require('./connection');

// Load Models
const Whitelist = require("./whitelist");
const Roles = require("./roles");
const Information = require("./information");
const Channels = require("./channels");
const Toggleable = require("./toggleable");
const Applications = require("./applications");
const Ingame = require("./ingame");


db.sync().catch(error => console.log('Database error:', error));
// Export Models

module.exports = { Whitelist, Roles, Information, Channels, Toggleable, Applications, Ingame }
