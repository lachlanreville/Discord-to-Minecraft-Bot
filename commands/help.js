const Discord = require("discord.js");
const { client } = require("../utils/variables");

var { Whitelist, Roles, Information } = require('../database/db')

exports.use = async (bot, message, args, command) => {
    if (message.channel.id != client.get('channels').user.id) return;
    let factionsName = client.get('faction').faction
    let messageColor = client.get('color').color
    let defaultImage = client.get('image').image
    let help = new Discord.RichEmbed()
        .setAuthor(factionsName + ` Buffer Bot`, defaultImage)
        .setTitle("Help Categories")
        .setThumbnail(client.get('buffers').image)
        .setTimestamp()
        .setColor(messageColor)
        .setDescription(`Hello ${message.author}, \n Here are the categories you can use for /help: \n /help bank \n /help ingame \n /help buffers \n /help settings`);

    if (!args[0]) return client.get('channels').user.send(help)

    if (args[0] == "bank") {
        let bank = new Discord.RichEmbed()
            .setAuthor(factionsName + ` Buffer Bot`, defaultImage)
            .setTitle("Banking Commands Module")
            .setThumbnail(client.get('buffers').image)
            .setTimestamp()
            .setColor(messageColor)
            .addField("/withdraw add @user", "Adds a user to the withdrawing whitelist!")
            .addField("/withdraw remove @user", "Removes a user from the withdrawing whitelist!")
            .addField("/withdraw money amount IGN", "Withdraws the set amount to the set IGN")
            .addField("/bal IGN", "Checks the balance for the specified user **IF NONE IS SET CHECKS BOTS USER**")
        client.get('channels').user.send(bank)
    } else if (args[0] == "ingame") {
        let ingame = new Discord.RichEmbed()
            .setAuthor(factionsName + ` Buffer Bot`, defaultImage)
            .setTitle("Ingame Commands Module")
            .setThumbnail(client.get('buffers').image)
            .setTimestamp()
            .setColor(messageColor)
            .addField("/ftop", "Checks the Servers F TOP")
            .addField("/wealth", "Checks the Servers F Wealth")
            .addField("/who faction", "Displays /f who faction")
            .addField("/flist page", "Shows the F List for the specified page")
            .addField("/outpost", "Shows the outpost information")
            .addField("/stronghold", "Shows the outpost information")
            .addField("/find IGN", "Shows information for the specified user")
        client.get('channels').user.send(ingame)
    } else if (args[0] == "buffers") {

        let buffer = new Discord.RichEmbed()
            .setAuthor(factionsName + ` Buffer Bot`, defaultImage)
            .setTitle("Buffers Commands Module")
            .setThumbnail(client.get('buffers').image)
            .setTimestamp()
            .setColor(messageColor)
            .addField("/checked", "Checks the buffers")
            .addField("/vi @user", "Shows the specified users information **IF NONE IS SELECTED CHECKS YOUR OWN**")
            .addField('/east', 'Sets the bot to spam being raided on east side')
            .addField('/west', 'Sets the bot to spam being raided on west side')
            .addField('/north', 'Sets the bot to spam being raided on north side')
            .addField('/south', 'Sets the bot to spam being raided on south side')
            .addField('/safe', 'Only run once a raid has been stopped')
            .addField('/leaderboard', 'Displays the top wall checkers')
        client.get('channels').user.send(buffer)

    } else if (args[0] == "settings") {

        let settings = new Discord.RichEmbed()
            .setAuthor(factionsName + ` Buffer Bot`, defaultImage)
            .setTitle("Settings Commands Module")
            .setThumbnail(client.get('buffers').image)
            .setTimestamp()
            .setColor(messageColor)
            .addField("/whitelist add @user", "DMs user a key for whitelist")
            .addField("/whitelist remove username IGN", "Removes user from the whitelist")
            .addField("/checks set @user amount", "Clears the checks for the specified user")
            .addField("/checks remove @user amount", "Clears the checks for the specified user")
            .addField("/toggle", "Lists toggleable features")
            .addField("/setinterval", "Changes the check interval")
        client.get('channels').user.send(settings)

    } else {
        return client.get('channels').user.send(help)
    }
};

