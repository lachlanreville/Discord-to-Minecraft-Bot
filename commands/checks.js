const Discord = require("discord.js");
const { client } = require("../utils/variables");

var { Whitelist, Roles, Information } = require('../database/db')

let discordId = client.get('discord').discord

exports.use = async (bot, message, args, command) => {
    if (!message.mentions.members.first() || !args[1] || !args[2]) return message.channel.send("ur gay")
    if (client.get('toggleable').buffer == false) return message.reply('The buffer module is not enabled')

    let user = message.mentions.members.first()
    if (message.author.id == discordId) {
        if (args[0] == "set") {
            Whitelist.findOne({ where: { discordid: user.id } }).then(res => {
                if (res) {
                    res.update({ checks: args[2] }).then(() => {
                        message.channel.send(`Successfully set ${user}'s amount of checks to ${args[2]}`)
                    })
                } else {
                    message.reply("User must be whitelisted to set checks!")
                }
            })
        }
        if (args[0] == "remove") {
            Whitelist.findOne({ where: { discordid: user.id } }).then(res => {
                if (res) {
                    let newChecks = res.dataValues.checks - args[2]
                    res.update({ checks: newChecks }).then(() => {
                        message.channel.send(`Successfully set ${user}'s amount of checks back to ${newChecks}`)
                    })
                } else {
                    message.reply("User must be whitelisted to set checks!")
                }
            })
        }
    }
};

