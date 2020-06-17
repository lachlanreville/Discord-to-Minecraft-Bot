const Discord = require("discord.js");
const { client } = require("../utils/variables");

var { Whitelist, Roles, Information } = require('../database/db')

exports.use = async (bot, message, args, command) => {

    if (message.channel.id != client.get('channels').outpost.id) return;
    if (client.get('toggleable').outpost == false) return message.reply('The Outpost module is not enabled')

    let obj = client.get('ingame')

    obj.outpostactive = true;

    client.set('ingame', obj)

    client.get('send').send(`/outpost`)

};

