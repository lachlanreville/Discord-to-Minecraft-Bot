const Discord = require("discord.js");
const { client } = require("../utils/variables");

let defaultImage = client.get('image').image
let messageColor = client.get('color').color

var { Whitelist, Roles, Information } = require('../database/db')

exports.use = async (bot, message, args, command) => {
    if (message.channel.id === client.get('channels').user.id) {
        if (client.get('toggleable').buffers == true) {
            var user = message.mentions.members.first();

            if (!user) {
                user = message.author
            }
            Whitelist.findOne({ where: { discordid: user.id } }).then(res => {
                if (res) {
                    let clientwallchecks = res.dataValues.checks
                    let withdraw = false;
                    if (res.dataValues.withdraw) withdraw = true;
                    const viembed = new Discord.RichEmbed()
                        .setTitle("**( :fire: )** Player Information")
                        .setThumbnail(defaultImage)
                        .setColor(messageColor)
                        .addField("Member -", "Now viewing information on __" + user + "__!")
                        .addBlankField()
                        .addField("`NAME`", user)
                        .addField("`WALL CHECKS`", clientwallchecks)
                        .addField("`Username`", res.dataValues.username)
                        .addField("`Withdraw Permissions`", withdraw)
                        .setFooter("[VI] View Information")
                    message.channel.send(viembed)
                } else {
                    message.reply('Please do /whitelist add @user before executing this command again')
                }
            })
        } else { return message.reply("The buffer module is currently disabled") }
    }
};

