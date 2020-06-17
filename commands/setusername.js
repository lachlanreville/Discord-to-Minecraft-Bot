const Discord = require("discord.js");
const { client } = require("../utils/variables");

var { Whitelist, Roles, Information } = require('../database/db')

let discordId = client.get('discord').discord

exports.use = async (bot, message, args, command) => {
    if (client.get('toggleable').buffer == false) return message.reply('The buffer module is not enabled')

    if (!args[0]) return message.channel.send("ur bad")
    if (message.author.id == discordId) {

        Whitelist.update({ username: args[0] }, { where: { discordid: message.author.id } })

    }

};

