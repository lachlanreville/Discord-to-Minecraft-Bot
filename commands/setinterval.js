const Discord = require("discord.js");
const { client } = require("../utils/variables");

var { Whitelist, Roles, Information } = require('../database/db')

let discordId = client.get('discord').discord

exports.use = async (bot, message, args, command) => {
    let objs = client.get('toggleable')
    if (!args[0]) return message.channel.send("ur bad")
    if (objs.buffer == false) return message.reply('The buffer module is not enabled')
    if (message.author.id == discordId) {

        Information.update({ interval: args[0] }, { where: { guildid: message.guild.id } }).then(c => {
            message.reply(`Set the check interval to ${args[0]}`)
            let obj = client.get('buffers')
            obj.time = args[0]
            client.set('buffers', obj)
        })
    }
};

