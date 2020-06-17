const Discord = require("discord.js");
const { client } = require("../utils/variables");

var { Whitelist, Roles, Information } = require('../database/db')

exports.use = async (bot, message, args, command) => {

    if (message.channel.id != client.get('channels').find.id) return;
    if (client.get('toggleable').find == false) return message.reply('The Find module is not enabled')

    if (!args[0]) return message.reply("Please follow the format... /find user")

    let obj = client.get('ingame')

    obj.findactive = true;

    client.set('ingame', obj)

    client.get('send').send(`/find ${args[0]} `)

};

