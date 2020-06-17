const Discord = require("discord.js");
const { client } = require("../utils/variables");

var { Whitelist, Roles, Information } = require('../database/db')

exports.use = async (bot, message, args, command) => {

    if (message.channel.id != client.get('channels').flist.id) return;
    if (client.get('toggleable').flist == false) return message.reply('The F List module is not enabled')

    let obj = client.get('ingame')
    let page;
    obj.flistactive = true;
    if (!args[0]) {
        page = "1"
    } else {
        page = args[0]
    }


    client.set('ingame', obj)
    client.set('page', { page: page })

    client.get('send').send(`/f list ${page}`)

};

