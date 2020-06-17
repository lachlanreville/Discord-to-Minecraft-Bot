const Discord = require("discord.js");
const { client } = require("../utils/variables");

var { Whitelist, Roles, Information } = require('../database/db')

exports.use = async (bot, message, args, command) => {
    let discordId = client.get('discord').discord
    if (message.author.id != discordId) return;
    client.get('send').send(args.join(" "))
};
