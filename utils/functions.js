const { Whitelist, Roles, Information } = require('../database/db')
const Discord = require("discord.js");
const { client } = require('./variables');

exports.checkBuffer = function () {
    let discordrole = client.get('role').role
    var buffer = client.get('buffers')
    if (!buffer || buffer == undefined) return;
    if (buffer.setup == true) {
        if (client.get('toggleable').buffers == true) {
            if (buffer.atime > buffer.time) {
                if (buffer.gettingraided == false) {
                    client.get('channels').buf.send(`<@&` + discordrole + `>`)
                    const intervalembed = new Discord.RichEmbed()
                        .setColor("#206694")
                        .setTimestamp()
                        .setAuthor("Buffer Bot")
                        .setDescription(':warning: The Buffers have not been checked in ' + buffer.atime + ' minutes!')
                    client.get('channels').buf.send(intervalembed);
                    client.get('send').send(`<!> <!> <!> The buffers have not been checked in ${buffer.atime}  minutes! <!> <!> <!>`);
                }
            }
        }
    }
}

exports.gettingRaided = function () {
    let discordrole = client.get('role').role
    let buffer = client.get('buffers')
    if (!buffer || buffer == undefined) return;
    if (buffer.setup == true) {
        if (client.get('toggleable').buffers == true) {
            if (buffer.gettingraided == true) {
                const raidembed = new Discord.RichEmbed()
                    .setThumbnail('https://i.imgur.com/kvuROhL.jpg')
                    .setColor("#FF0000")
                    .setTimestamp()
                    .setAuthor("Buffer Bot")
                    .setDescription('We are getting raided on the ' + buffer.direction + ' side!\n \n' + 'To disable this /msg the bot safe or type /safe in discord')
                client.get('channels').buf.send(`<@&` + discordrole + `>`, raidembed);
                client.get('send').send('We are getting raided on the ' + buffer.direction + ' side! To disable this /msg the bot safe or type /safe in discord')
            }
        }
    }
}

exports.ingameControl = async function () {
    let info = client.get('toggleable')

    if (!info || info == undefined) return;
    if (info.ingameOutpost == true) {
        client.get('send').send('/outpost')
    }
}