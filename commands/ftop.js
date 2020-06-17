const Discord = require("discord.js");
const { client } = require("../utils/variables");

var { Whitelist, Roles, Information } = require('../database/db')

exports.use = async (bot, message, args, command) => {

    if (message.channel.id != client.get('channels').ftop.id) return;
    if (client.get('toggleable').ftop == false) return message.reply('The F Top module is not enabled')

    let obj = client.get('ingame')

    obj.activeftop = true;

    client.set('ingame', obj)

    message.reply('Getting Faction Top Information')
    client.get('send').send('/f top')

};

