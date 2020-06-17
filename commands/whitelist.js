const Discord = require("discord.js");
const { client } = require("../utils/variables");
const randomstring = require('randomstring')

var { Whitelist, Roles, Information } = require('../database/db')

let factionsName = client.get('faction').faction
let discordId = client.get('discord').discord
let messageColor = client.get('color').color
let defaultImage = client.get('image').image

exports.use = async (bot, message, args, command) => {
  let minecraftAccount = client.get('mcids').mcids
  if (!args[0]) return message.reply("invalid use of this command cockhead")
  let randomKey = Math.floor(100000000000000000 + Math.random() * 900000000000000000)

  if (args[0] == "list") {
    if (message.channel.id == client.get('channels').admin.id) {
      let userMsg = "";
      let i = 1
      Whitelist.findAll().then(async whitelist => {
        await whitelist.forEach(whitelist => {
          let info = whitelist.dataValues;
          let id = i;
          let username = info.username;
          let discordid = info.discordid;
          if (!username) return;
          userMsg += `${id} - ${bot.users.get(discordid)} - ${username}\n`
          i++
        })
        let embed = new Discord.RichEmbed()
          .setTitle(factionsName + ` Whitelist`, defaultImage)
          .setColor(messageColor)
          .setDescription(userMsg)

        message.channel.send(embed)

      })
    }
  }

  if (args[0] == 'add') {
    let user = message.mentions.users.first();
    if (!user) return message.reply("Please use the format ``/whitelist add @user``")
    if (message.channel.id == client.get('channels').user.id) {
      Whitelist.findOne({ where: { discordid: user.id } }).then(res => {
        if (res) {
          if (res.dataValues.username == null) {
            let whitelist = new Discord.RichEmbed()
              .setTitle(factionsName + ` Whitelist`)
              .setDescription(`Hello ${user}, \n\n You have been added to the` + factionsName + ` whitelist. \n\n Please DM the account **` + minecraftAccount + `** on CosmicPVP with the key ${randomKey} to finish the whitelisting process \n\n eg.. **/msg ` + minecraftAccount + ` link ${res.dataValues.code}**`)
            user.send(whitelist).then(() => {
              message.channel.send(`Successfully sent ${user} a key`)
            }).catch(() => {
              message.channel.send(`Hello ${user}, Please update your privacy settings as I am unable to DM you`)
            })
          } else {
            message.channel.send(`Hello ${user}, You seem to be added to the database already.`)
          }
        } else {
          Whitelist.create({ guildid: message.guild.id, discordid: user.id, code: randomKey.toString() }).then(res2 => {
            let whitelist = new Discord.RichEmbed()
              .setTitle(factionsName + ` Whitelist`)
              .setDescription(`Hello ${user}, \n\n You have been added to the` + factionsName + ` whitelist. \n\n Please DM the account **` + minecraftAccount + `** on CosmicPVP with the key ${randomKey} to finish the whitelisting process \n\n eg.. **/msg ` + minecraftAccount + ` link ${randomKey}**`)
            user.send(whitelist).then(() => {
              message.channel.send(`Successfully sent ${user} a key`)
            }).catch(() => {
              message.channel.send(`Hello ${user}, Please update your privacy settings as I am unable to DM you`)
            })
          })
        }
      })
    }
  }

  if (args[0] == "remove") {
    if (args[1] == "username") {
      let user = args[2];
      if (!user) return message.reply(`Please use the format ` + "`" + `/whitelist add username ${minecraftAccount}` + "`")
      if (message.channel.id == client.get('channels').admin.id) {

        Whitelist.findOne({ where: { username: user } }).then(res => {
          if (res) {
            res.destroy()
            message.reply("That user has now been removed from the database!")
          } else {
            message.channel.send("That user does not seem to be added to the database!")
          }
        });
      }
    }
    if (args[1] == "discordid") {
      let user = args[2];
      if (!user) return message.reply(`Please use the format ` + "`" + `/whitelist remove discordid ${discordId}` + "`")
      if (message.channel.id == client.get('channels').admin.id) {

        Whitelist.findOne({ where: { discordid: user } }).then(res => {
          if (res) {
            res.destroy()
            message.reply("That user has now been removed from the database!")
          } else {
            message.channel.send("That user does not seem to be added to the database!")
          }
        });
      }
    }
  }
}
