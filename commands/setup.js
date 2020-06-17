const Discord = require("discord.js");
const { client } = require("../utils/variables");

let discordrole = client.get('role').role

let discordId = client.get('discord').discord

var { Whitelist, Roles, Information, Channels, Toggleable, Ingame } = require('../database/db')

exports.use = async (bot, message, args, command) => {
    if (message.author.id != discordId) return;
    let channels = new Map()
    let obj = client.get('buffers')
    if (obj.setup == false) {
        let { role } = client.get('role');
        client.set('buffers', obj)
        message.guild.createChannel("Wall Stats", { type: "category" }).then(category => {
            channels.set('category', category.id)
            message.guild.createChannel("admin-botcommands", {
                type: "text", permissionOverwrites: [{
                    id: message.guild.roles.find(role => role.name === "@everyone").id,
                    deny: ['VIEW_CHANNEL', 'MENTION_EVERYONE', 'ADD_REACTIONS']

                }
                ]
            }).then(c => {
                c.setParent(category.id)
                channels.set('admin', c.id)
            })
            message.guild.createChannel("member-botcommands", {
                type: "text", permissionOverwrites: [{
                    id: message.guild.roles.find(role => role.name === "@everyone").id,
                    deny: ['VIEW_CHANNEL', 'MENTION_EVERYONE', 'ADD_REACTIONS']

                }, {
                    id: role,
                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                }
                ]
            }).then(c => {
                c.setParent(category.id)
                channels.set('user', c.id)

                Channels.create({
                    guildid: message.guild.id,
                    admin: channels.get('admin'),
                    user: channels.get('user'),
                    bufferCategoryID: channels.get('category'),
                    bufferRole: role
                }).then(result => {

                    Channels.findAll().then(res => {
                        if (res) {
                            res = res[0].dataValues;

                            adminchan = bot.channels.get(res.admin);
                            userbotchan = bot.channels.get(res.user);
                            let obj = {
                                admin: adminchan,
                                user: userbotchan,
                                bufferCategoryID: res.bufferCategoryID
                            }
                            client.set('channels', obj)

                            let bufferObj = client.get('buffers')
                            bufferObj.setup = true
                            client.set('buffers', bufferObj)
                            message.reply("The channels have been created successfuly!\nNow please reply with how long you would like the interval to be").then(msg => {
                                const filter = m => m.author.id !== bot.user.id && m.author.id == message.author.id && m.channel.id == message.channel.id;
                                msg.channel.awaitMessages(filter, {
                                    max: 1,
                                    time: 300000,
                                    errors: ['time']
                                }).then(collected => {
                                    collected = collected.map(x => x.content);
                                    collected = collected.toString();
                                    if (typeof collected !== 'number') {
                                        try {
                                            collected == parseInt(collected)
                                            Information.create({ guildid: message.guild.id, interval: collected, time: 0, setup: true }).then(res => {
                                                message.reply("Setup the intervals")
                                                Information.findOne({ where: { guildid: message.guild.id } }).then(data => {
                                                    data = data.dataValues;
                                                    if (data) {
                                                        let bufferObj = {
                                                            atime: data.time,
                                                            time: data.interval,
                                                            gettingraided: false,
                                                            image: "https://i.imgur.com/mntR53r.png",
                                                            direction: "",
                                                            setup: data.setup
                                                        }
                                                        client.set('buffers', bufferObj)
                                                    }
                                                });
                                                Toggleable.create({ guildid: message.guild.id }).then(() => {
                                                    message.reply("Setup the toggleable features, The bot is now setup to use!")
                                                    Toggleable.findAll().then(data => {
                                                        data = data[0].dataValues;
                                                        let toggleable = {
                                                            buffers: data.buffers,
                                                            ftop: data.ftop,
                                                            flist: data.flist,
                                                            find: data.find,
                                                            who: data.who,
                                                            banking: data.banking,
                                                            outpost: data.outpost,
                                                            stronghold: data.stronghold,
                                                            ingameOutpost: data.ingameOutpost,
                                                            ingameStronghold: data.ingameStronghold,
                                                            applications: data.applications,
                                                            welcome: data.welcome
                                                        }

                                                        client.set('toggleable', toggleable)


                                                    });
                                                })
                                            })
                                        }
                                        catch {
                                            message.channel.send("Please reply with a number. eg. 7")

                                            msg.channel.awaitMessages(filter, {
                                                max: 1,
                                                time: 300000,
                                                errors: ['time']
                                            }).then(collected => {
                                                collected = collected.map(x => x.content);
                                                collected = collected.toString();
                                                if (typeof collected !== 'number') {
                                                    collected == parseInt(collected)

                                                }

                                                Information.create({ guildid: message.guild.id, interval: collected, time: 0, setup: true }).then(res => {
                                                    message.reply("Setup the intervals")
                                                    Information.findOne({ where: { guildid: message.guild.id } }).then(data => {
                                                        data = data.dataValues;
                                                        if (data) {
                                                            let bufferObj = {
                                                                atime: data.time,
                                                                time: data.interval,
                                                                status: data.status,
                                                                gettingraided: false,
                                                                image: "https://i.imgur.com/mntR53r.png",
                                                                direction: "",
                                                                setup: data.setup
                                                            }
                                                            client.set('buffers', bufferObj)
                                                        }
                                                    });
                                                    Toggleable.create({ guildid: message.guild.id }).then(() => {
                                                        message.reply("Setup the toggleable features, The bot is now setup to use!")
                                                        Toggleable.findAll().then(data => {
                                                            data = data[0].dataValues;
                                                            let toggleable = {
                                                                buffers: data.buffers,
                                                                ftop: data.ftop,
                                                                flist: data.flist,
                                                                find: data.find,
                                                                who: data.who,
                                                                banking: data.banking,
                                                                outpost: data.outpost,
                                                                stronghold: data.stronghold,
                                                                ingameOutpost: data.ingameOutpost,
                                                                ingameStronghold: data.ingameStronghold,
                                                                welcome: data.welcome
                                                            }

                                                            client.set('toggleable', toggleable)

                                                            Ingame.create({ guildid: message.guild.id, outpostControlled: "", strongholdControlled: "", controllingFactions: "[ 'Emipre' ]" })
                                                        });
                                                    })
                                                })
                                            });
                                        }
                                    }
                                });
                            })
                        }
                    });
                })
            })
        })
    }
};