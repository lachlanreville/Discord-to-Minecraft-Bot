const Discord = require("discord.js");
const { client } = require("../utils/variables");

var { Whitelist, Roles, Information } = require('../database/db')

let factionsName = client.get('faction').faction
let messageColor = client.get('color').color
let discordId = client.get('discord').discord
let defaultImage = client.get('image').image

exports.use = async (bot, message, args, command) => {
    if (client.get('toggleable').banking == true) {
        if (args[0] == "add") {
            if (message.channel.id == client.get('channels').admin.id) {
                if (message.author.id == discordId) {
                    var user = message.mentions.members.first();
                    Whitelist.findOne({ where: { discordid: user.id } }).then(res => {
                        if (res) {
                            message.reply(`Successfully added **${user}** to the withdrawing whitelist`)
                            res.update({ withdraw: true })
                        } else {
                            message.reply("This user is not added to the database. Please do /whitelist add @user")
                        }
                    })
                }
            }
        }

        if (args[0] == "money") {
            if (args[1]) {
                if (args[2]) {
                    Whitelist.findOne({ where: { discordid: message.author.id } }).then(res => {
                        permission = res.dataValues.withdraw
                        if (permission == true) {
                            const payembed = new Discord.RichEmbed()
                                .setColor(messageColor)
                                .setTimestamp()
                                .setThumbnail(defaultImage)
                                .setAuthor(factionsName + ` Buffer Bot`, defaultImage)
                                .setDescription(`:white_check_mark: I have sent ${args[2]} to ${args[1]}`)
                            client.get('channels').economy.send(payembed)
                            client.get('send').send(`/pay ${args[1]} ${args[2]}`)
                        } else {
                            message.reply("Im sorry but you do not have the permissions required to execute this command.")
                        }
                    });
                }
            }
        }

        if (args[0] == "remove") {
            if (message.channel.id == client.get('channels').admin.id) {
                var user = message.mentions.members.first();
                Whitelist.findOne({ where: { discordid: user.id } }).then(res => {
                    if (res) {
                        message.channel.send(`Successfully removed **${user}** from the withdrawing whitelist`)
                        res.update({ withdraw: false })
                    } else {
                        message.reply("That user is not added to the database, please do /whitelist add @user then try again")
                    }
                })

            }
        }
    } else { return message.reply("The banking module is not enabled") }
};

