const Discord = require("discord.js");
const { client } = require("../utils/variables");

var { Whitelist, Roles, Information } = require('../database/db')

exports.use = async (bot, message, args, command) => {
    if (message.channel.id === client.get('channels').user.id) {
        if (client.get('toggleable').buffers == true) {
            Whitelist.findAll({
                order: [
                    ['checks', 'DESC']
                ],
                attributes: ['checks', 'discordid'],
                limit: 10,
                raw: true
            }).then(res => {
                i = 0;

                const checkstop = new Discord.RichEmbed().addField('Information - ', 'Checks are obtained by checking walls!');

                const nums = ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eigth', 'Ninth', 'Tenth'];

                res.forEach(row => { checkstop.addField(`${nums[i]} Place`, `#${i + 1} <@${row.discordid}> has **${row.checks} ** checks!`); i++; });
                message.channel.send(checkstop);

            })
        }
    }
};

