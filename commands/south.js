const Discord = require("discord.js");
const { client } = require("../utils/variables");

var { Whitelist, Roles, Information } = require('../database/db')

exports.use = async (bot, message, args, command) => {
    if (message.channel.id === client.get('channels').buf.id) {
        if (client.get('toggleable').buffers == true) {
            let obj = client.get('buffers')
            obj.gettingraided = true
            obj.direction = "south"
            client.set('buffers', obj)
            client.get('channels').buf.send("__RAID ALERTS__ have been triggered by **" + message.author + "**!")
        } else {
            message.reply("That action can not be performed whilst the bot is toggled __OFF__!");
        }
    }
};

