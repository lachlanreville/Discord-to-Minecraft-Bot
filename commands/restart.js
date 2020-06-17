const Discord = require("discord.js");
const { client } = require("../utils/variables");

var { Whitelist, Roles, Information } = require('../database/db')

exports.use = async (bot, message, args, command) => {

        let executed = client.get('timeout').executed

        if (message.channel.id == client.get('channels').admin.id) {
                message.reply("Restarting the bot in 60 seconds!")
                if (executed) {
                        return message.reply("This command is on cooldown fuckwit!")
                } else {
                        client.set('timeout', { executed: true })
                        client.get('restart').restart()
                        setTimeout(() => {
                                client.set('timeout', { executed: false });
                        }, 5 * 60 * 1000);
                }
        }
}