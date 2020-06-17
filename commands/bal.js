const Discord = require("discord.js");
const { client } = require("../utils/variables");

var { Whitelist, Roles, Information } = require('../database/db')

exports.use = async (bot, message, args, command) => {

    if (message.channel.id != client.get('channels').economy.id) return;
    if (client.get('toggleable').banking == false) return message.reply('The Banking module is not enabled')

    let obj = client.get('ingame')

    obj.balactive = true;

    client.set('ingame', obj)

    if (args[0]) {
        client.get('send').send(`/bal ${args[0]}`)
    } else {
        client.get('send').send(`/bal`)

    }

};

