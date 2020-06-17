const Discord = require("discord.js");
const { client } = require("../utils/variables");

var { Whitelist, Roles, Information } = require('../database/db')

exports.use = async (bot, message, args, command) => {

    if (message.channel.id != client.get('channels').stronghold.id) return;
    if (client.get('toggleable').stronghold == false) return message.reply('The Stronghold module is not enabled')

    let obj = client.get('ingame')

    obj.stronghold = true;

    client.set('ingame', obj)

    message.reply('Getting Stronghold Information')
    client.get('send').send('/stronghold')

};

