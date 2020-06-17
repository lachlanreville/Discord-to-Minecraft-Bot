const Discord = require("discord.js");
const { client } = require("../utils/variables");

var { Whitelist, Roles, Information } = require('../database/db')

exports.use = async (bot, message, args, command) => {

    if (message.channel.id != client.get('channels').fac.id) return;
    if (client.get('toggleable').who == false) return message.reply('The Who module is not enabled')

    let obj = client.get('ingame')

    obj.activewho = true;

    client.set('ingame', obj)

    if (args[0]) {
        client.get('send').send(`/f who ${args[0]}`)
        message.reply('Getting Faction Who Information')
    } else {
        client.get('send').send(`/f who`)
        message.reply('Getting Faction Who Information')
    }

};

