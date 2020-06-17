const Discord = require("discord.js");
const { client } = require("../utils/variables");

var { Whitelist, Roles, Information, Ingame } = require('../database/db')

exports.use = async (bot, message, args, command) => {
    let discordId = client.get('discord').discord
    let messageColor = client.get('color').color
    if (!args[0]) return message.channel.send("ur fuckin bad kid")

    if (message.channel.id == client.get('channels').admin.id) {
        if (args[0] == "list") {
            Ingame.findByPk(1).then(c => {
                if (!c || c == null) {
                    return message.channel.send("An error has occured. please jump off a bridge")
                } else {
                    let facs = c.dataValues.controllingFactions
                    facs = JSON.parse(facs)
                    let str = ""
                    facs.forEach(d => {
                        str = str + "\n" + d
                    })
                    let embed = new Discord.RichEmbed()
                        .setColor(messageColor)
                        .setTitle("Factions List")
                        .setDescription(facs)

                    message.channel.send(embed)
                }
            })
        }
    }
    if (message.author.id == discordId) {
        if (args[0] == "add") {
            Ingame.findByPk(1).then(c => {
                if (!c || c == null) {
                    return message.reply("An error has occured. please jump off a bridge")
                } else {
                    let facs = c.dataValues.controllingFactions
                    facs = JSON.parse(facs)
                    facs.push(args[1])
                    let embed = new Discord.RichEmbed()
                        .setColor(messageColor)
                        .setTitle("Factions List")
                        .setDescription(`Added ${args[1]} To the factions list`)

                    message.channel.send(embed)
                    c.update({ controllingFactions: JSON.stringify(facs) })
                }
            })
        }
    }
    if (message.author.id == discordId) {
        if (args[0] == "remove") {
            Ingame.findByPk(1).then(c => {
                if (!c || c == null) {
                    return message.channel.send("An error has occured. please jump off a bridge")
                } else {
                    let facs = c.dataValues.controllingFactions
                    facs = JSON.parse(facs)
                    let newArr = []
                    facs.forEach(d => {
                        if (d == args[1]) {
                            return
                        } else {
                            newArr.push(d)
                        }
                    })
                    facs.push(args[1])
                    let embed = new Discord.RichEmbed()
                        .setColor(messageColor)
                        .setTitle("Factions List")
                        .setDescription(`Removed ${args[1]} from the factions list`)

                    message.channel.send(embed)
                    c.update({ controllingFactions: JSON.stringify(newArr) })
                }
            })
        }
    }
};
