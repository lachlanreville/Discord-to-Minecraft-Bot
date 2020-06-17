const Discord = require("discord.js");
const { client } = require("../utils/variables");

var { Whitelist, Roles, Information } = require('../database/db')

exports.use = async (bot, message, args, command) => {
    if (message.channel.id === client.get('channels').buf.id) {
        if (client.get('toggleable').buffers == true) {
            let obj = client.get('buffers')
            if (obj.gettingraided > 0) {
                message.channel.send("The raid alerts have been disabled using the command **/safe** by **" + message.author + "**!")
                obj.gettingraided = 0
                client.set('buffers', obj)
            } else {
                message.reply("That action can not be performed! There is currently no raid broadcast occuring...")
            }
        }
    }
};

