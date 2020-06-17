const Sequelize = require("sequelize");
const con = new Sequelize('sqlite:./database.db', {
    logging: false
})

module.exports = con;