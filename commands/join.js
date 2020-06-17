const Discord = require("discord.js");
const { client } = require("../utils/variables");

var { Whitelist, Roles, Information } = require('../database/db')

exports.use = async (bot, message, args, command) => {

    let planet = client.get('defaultPlanet').defaultPlanet

    let length = planet.length

    capital = planet.split("")[0].toUpperCase().toString()

    if (message.channel.id == adminchan.id) {
        client.get('send').send(`/server ` + planet + `planet`)

        message.reply(`Reconnecting to ` + (capital + planet.substring(1, length)) + ` Planet!`)
    }
};