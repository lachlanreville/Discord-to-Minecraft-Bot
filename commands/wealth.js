const Discord = require("discord.js");
const { client } = require("../utils/variables");

var { Whitelist, Roles, Information } = require('../database/db')

exports.use = async (bot, message, args, command) => {

    if (message.channel.id != client.get('channels').ftop.id) return;
    if (client.get('toggleable').flist == false) return message.reply('The F List module is not enabled')

    let obj = client.get('ingame')

    obj.activewealth = true;

    client.set('ingame', obj)

    message.reply('Getting Faction Wealth Information')
    client.get('send').send('/f wealth')

};

