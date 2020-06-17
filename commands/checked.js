const Discord = require("discord.js");
const { client } = require("../utils/variables");
const request = require('request')
const moment = require('moment')

var { Whitelist, Roles, Information } = require('../database/db')

exports.use = async (bot, message, args, command) => {
    let obj = client.get('buffers')
    let factionsName = client.get('faction').faction
    let messageColor = client.get('color').color
    let defaultImage = client.get('image').image
    if (client.get('toggleable').buffers == true) {
        if (message.channel.id === client.get('channels').buf.id) {
            if (obj.atime > obj.time) {
                Whitelist.findOne({ where: { discordid: message.author.id } }).then(res => {
                    if (res) {
                        let atime = obj.atime
                        request.get(`https://api.mojang.com/users/profiles/minecraft/${res.dataValues.username}?at=${Math.floor(new Date() / 1000)}`, (err, body) => {
                            let mc = JSON.parse(body.body);

                            const embed = new Discord.RichEmbed()
                                .setAuthor(factionsName + ` Buffer Bot`, defaultImage)
                                .setColor(messageColor)
                                .setTitle("Wall Check Recieved @ " + (moment().format('MM/DD/YY, h:mm a')))
                                .setThumbnail(`https://mc-heads.net/avatar/${mc.id}/100/nohelm.png`)
                                .addField('Name', `<@${message.author.id}>`, true)
                                .addField('Time Taken', atime + " Minute(s)", true)
                                .addField('Amount of checks', res.dataValues.checks, true)
                            client.get('channels').buf.send(embed)
                        });
                        res.update({ checks: res.dataValues.checks + 1 })
                        Information.findOne({ where: { time: obj.atime } }).then(response => {
                            response.update({ time: 0 })
                        })
                        obj.atime = 0;

                        client.set('buffers', obj)

                    }
                });
            } else {
                message.reply(`That command can not be executed before the ${obj.time} Minute mark!`)
            }
        } else {
            message.reply("That action can not be performed in this channel! If you believe that this is an error then contact a senior faction member!")
        }
    } else {
        message.reply("That action can not be performed whilst the bot is toggled __OFF__!");
    }
};

