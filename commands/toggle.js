const Discord = require('discord.js')
const { client } = require("../utils/variables");

var { Whitelist, Roles, Information, Toggleable, Channels } = require('../database/db')

let discordId = client.get('discord').discord
let messageColor = client.get('color').color

exports.use = async (bot, message, args, command) => {
    if (message.author.id == discordId) {

        Toggleable.findOne({ where: { guildid: message.guild.id }, raw: true }).then(res => {
            if (res) {
                let buffers = "Disabled";
                let ftop = "Disabled";
                let flist = "Disabled";
                let find = "Disabled";
                let who = "Disabled";
                let banking = "Disabled";
                let outpost = "Disabled";
                let stronghold = "Disabled";
                let ingameOutpost = "Disabled";
                let ingameStronghold = "Disabled";
                let applications = "Disabled"
                let welcome = "Disabled"
                let wallchecks = "Disabled"

                if (res.buffers == 1) buffers = "Enabled";
                if (res.ftop == 1) ftop = "Enabled";
                if (res.flist == 1) flist = "Enabled";
                if (res.find == 1) find = "Enabled";
                if (res.who == 1) who = "Enabled";
                if (res.banking == 1) banking = "Enabled";
                if (res.outpost == 1) outpost = "Enabled";
                if (res.stronghold == 1) stronghold = "Enabled";
                if (res.ingameOutpost == 1) ingameOutpost = "Enabled";
                if (res.ingameStronghold == 1) ingameStronghold = "Enabled";
                if (res.applications == 1) applications = "Enabled";
                if (res.welcome == 1) welcome = "Enabled";
                if (res.wallChecks == 1) wallchecks = "Enabled";


                let toggleableFeatures = new Discord.RichEmbed()
                    .setTitle("Toggleable Features")
                    .setColor(messageColor)
                    .addField("Buffer Checks", buffers)
                    .addField('Wall Checks', wallchecks)
                    .addField("FTop", ftop)
                    .addField("FList", flist)
                    .addField("Find", find)
                    .addField("Who", who)
                    .addField("Banking", banking)
                    .addField("Outpost", outpost)
                    .addField("Stronghold", stronghold)
                    .addField("Ingame Outpost", ingameOutpost)
                    .addField("Ingame Stronghold", ingameStronghold)
                    .addField("Applications", applications)
                    .addField("Welcome", welcome)

                if (!args[0]) return message.channel.send(toggleableFeatures);
                let channel = client.get('channels')
                let { role } = client.get("role")
                if (args[0].toLowerCase() == "buffers") {
                    Toggleable.findOne({ where: { guildid: message.guild.id } }).then(res2 => {
                        if (res2) {
                            if (res2.dataValues.buffers == false) {
                                res2.update({ buffers: true }).then(() => {
                                    message.guild.createChannel("buffer-checks", {
                                        type: "text", permissionOverwrites: [{
                                            id: message.guild.roles.find(role => role.name === "@everyone").id,
                                            deny: ['VIEW_CHANNEL', 'MENTION_EVERYONE', 'ADD_REACTIONS']

                                        },
                                        {
                                            id: role,
                                            allow: ['VIEW_CHANNEL', "SEND_MESSAGES"]
                                        }
                                        ]
                                    }).then(c => {
                                        c.setParent(channel.bufferCategoryID)
                                        channel.bufchan = c.id
                                        client.set('channels', channel)

                                        let obj = client.get('toggleable')
                                        message.reply("Successfully set the Buffers Module to TRUE!")
                                        obj.buffers = true
                                        client.set('toggleable', obj)

                                        Channels.update({ buffers: c.id }, { where: { guildid: message.guild.id } })
                                    })
                                })
                            } else {
                                res2.update({ buffers: false }).then(() => {
                                    message.guild.channels.get(channel.bufchan).delete()
                                    let obj = client.get('toggleable')
                                    message.reply("Successfully set the Buffers Module to FALSE!")
                                    obj.buffers = false
                                    client.set('toggleable', obj)
                                    Channels.update({ buffers: null }, { where: { guildid: message.guild.id } })
                                })
                            }
                        }
                    });
                }
                if (args[0].toLowerCase() == "applications") {
                    Toggleable.findOne({ where: { guildid: message.guild.id } }).then(res2 => {
                        if (res2) {
                            if (res2.dataValues.applications == false) {
                                res2.update({ applications: true }).then(() => {
                                    message.guild.createChannel("applications", {
                                        type: "text", permissionOverwrites: [{
                                            id: message.guild.roles.find(role => role.name === "@everyone").id,
                                            deny: ['VIEW_CHANNEL', 'MENTION_EVERYONE', 'ADD_REACTIONS']

                                        },
                                        {
                                            id: role,
                                            allow: ['VIEW_CHANNEL', "SEND_MESSAGES"]
                                        }
                                        ]
                                    }).then(c => {
                                        c.setParent(channel.bufferCategoryID)
                                        channel.apply = c
                                        client.set('channels', channel)

                                        let obj = client.get('toggleable')
                                        message.reply("Successfully set the Applications Module to TRUE!")
                                        obj.applications = true
                                        client.set('toggleable', obj)

                                        Channels.update({ buffers: c.id }, { where: { guildid: message.guild.id } })
                                    })
                                })
                            } else {
                                res2.update({ buffers: false }).then(() => {
                                    message.guild.channels.get(channel.bufchan).delete()
                                    let obj = client.get('toggleable')
                                    message.reply("Successfully set the Buffers Module to FALSE!")
                                    obj.buffers = false
                                    client.set('toggleable', obj)
                                    Channels.update({ buffers: null }, { where: { guildid: message.guild.id } })
                                })
                            }
                        }
                    });
                }
                if (args[0].toLowerCase() == "ftop") {
                    Toggleable.findOne({ where: { guildid: message.guild.id } }).then(res2 => {
                        if (res2) {
                            if (res2.dataValues.buffers == false) {
                                res2.update({ buffers: true }).then(() => {
                                    message.guild.createChannel("buffer-checks", {
                                        type: "text", permissionOverwrites: [{
                                            id: message.guild.roles.find(role => role.name === "@everyone").id,
                                            deny: ['VIEW_CHANNEL', 'MENTION_EVERYONE', 'ADD_REACTIONS']

                                        },
                                        {
                                            id: role,
                                            allow: ['VIEW_CHANNEL', "SEND_MESSAGES"]
                                        }
                                        ]
                                    }).then(c => {
                                        c.setParent(channel.bufferCategoryID)
                                        channel.bufchan = c.id
                                        client.set('channels', channel)

                                        let obj = client.get('toggleable')
                                        message.reply("Successfully set the Buffers Module to TRUE!")
                                        obj.buffers = true
                                        client.set('toggleable', obj)

                                        Channels.update({ buffers: c.id }, { where: { guildid: message.guild.id } })
                                    })
                                })
                            } else {
                                res2.update({ buffers: false }).then(() => {
                                    message.guild.channels.get(channel.bufchan).delete()
                                    let obj = client.get('toggleable')
                                    message.reply("Successfully set the Buffers Module to FALSE!")
                                    obj.buffers = false
                                    client.set('toggleable', obj)
                                    Channels.update({ buffers: null }, { where: { guildid: message.guild.id } })
                                })
                            }
                        }
                    });
                }
                if (args[0].toLowerCase() == "flist") {
                    Toggleable.findOne({ where: { guildid: message.guild.id } }).then(res2 => {
                        if (res2) {
                            if (res2.dataValues.buffers == false) {
                                res2.update({ buffers: true }).then(() => {
                                    message.guild.createChannel("buffer-checks", {
                                        type: "text", permissionOverwrites: [{
                                            id: message.guild.roles.find(role => role.name === "@everyone").id,
                                            deny: ['VIEW_CHANNEL', 'MENTION_EVERYONE', 'ADD_REACTIONS']

                                        },
                                        {
                                            id: role,
                                            allow: ['VIEW_CHANNEL', "SEND_MESSAGES"]
                                        }
                                        ]
                                    }).then(c => {
                                        c.setParent(channel.bufferCategoryID)
                                        channel.bufchan = c.id
                                        client.set('channels', channel)

                                        let obj = client.get('toggleable')
                                        message.reply("Successfully set the Buffers Module to TRUE!")
                                        obj.buffers = true
                                        client.set('toggleable', obj)

                                        Channels.update({ buffers: c.id }, { where: { guildid: message.guild.id } })
                                    })
                                })
                            } else {
                                res2.update({ buffers: false }).then(() => {
                                    message.guild.channels.get(channel.bufchan).delete()
                                    let obj = client.get('toggleable')
                                    message.reply("Successfully set the Buffers Module to FALSE!")
                                    obj.buffers = false
                                    client.set('toggleable', obj)
                                    Channels.update({ buffers: null }, { where: { guildid: message.guild.id } })
                                })
                            }
                        }
                    });
                }
                if (args[0].toLowerCase() == "find") {
                    Toggleable.findOne({ where: { guildid: message.guild.id } }).then(res2 => {
                        if (res2) {
                            if (res2.dataValues.buffers == false) {
                                res2.update({ buffers: true }).then(() => {
                                    message.guild.createChannel("buffer-checks", {
                                        type: "text", permissionOverwrites: [{
                                            id: message.guild.roles.find(role => role.name === "@everyone").id,
                                            deny: ['VIEW_CHANNEL', 'MENTION_EVERYONE', 'ADD_REACTIONS']

                                        },
                                        {
                                            id: role,
                                            allow: ['VIEW_CHANNEL', "SEND_MESSAGES"]
                                        }
                                        ]
                                    }).then(c => {
                                        c.setParent(channel.bufferCategoryID)
                                        channel.bufchan = c.id
                                        client.set('channels', channel)

                                        let obj = client.get('toggleable')
                                        message.reply("Successfully set the Buffers Module to TRUE!")
                                        obj.buffers = true
                                        client.set('toggleable', obj)

                                        Channels.update({ buffers: c.id }, { where: { guildid: message.guild.id } })
                                    })
                                })
                            } else {
                                res2.update({ buffers: false }).then(() => {
                                    message.guild.channels.get(channel.bufchan).delete()
                                    let obj = client.get('toggleable')
                                    message.reply("Successfully set the Buffers Module to FALSE!")
                                    obj.buffers = false
                                    client.set('toggleable', obj)
                                    Channels.update({ buffers: null }, { where: { guildid: message.guild.id } })
                                })
                            }
                        }
                    });
                }
                if (args[0].toLowerCase() == "who") {
                    Toggleable.findOne({ where: { guildid: message.guild.id } }).then(res2 => {
                        if (res2) {
                            if (res2.dataValues.buffers == false) {
                                res2.update({ buffers: true }).then(() => {
                                    message.guild.createChannel("buffer-checks", {
                                        type: "text", permissionOverwrites: [{
                                            id: message.guild.roles.find(role => role.name === "@everyone").id,
                                            deny: ['VIEW_CHANNEL', 'MENTION_EVERYONE', 'ADD_REACTIONS']

                                        },
                                        {
                                            id: role,
                                            allow: ['VIEW_CHANNEL', "SEND_MESSAGES"]
                                        }
                                        ]
                                    }).then(c => {
                                        c.setParent(channel.bufferCategoryID)
                                        channel.bufchan = c.id
                                        client.set('channels', channel)

                                        let obj = client.get('toggleable')
                                        message.reply("Successfully set the Buffers Module to TRUE!")
                                        obj.buffers = true
                                        client.set('toggleable', obj)

                                        Channels.update({ buffers: c.id }, { where: { guildid: message.guild.id } })
                                    })
                                })
                            } else {
                                res2.update({ buffers: false }).then(() => {
                                    message.guild.channels.get(channel.bufchan).delete()
                                    let obj = client.get('toggleable')
                                    message.reply("Successfully set the Buffers Module to FALSE!")
                                    obj.buffers = false
                                    client.set('toggleable', obj)
                                    Channels.update({ buffers: null }, { where: { guildid: message.guild.id } })
                                })
                            }
                        }
                    });
                }
                if (args[0].toLowerCase() == "banking") {
                    Toggleable.findOne({ where: { guildid: message.guild.id } }).then(res2 => {
                        if (res2) {
                            if (res2.dataValues.buffers == false) {
                                res2.update({ buffers: true }).then(() => {
                                    message.guild.createChannel("buffer-checks", {
                                        type: "text", permissionOverwrites: [{
                                            id: message.guild.roles.find(role => role.name === "@everyone").id,
                                            deny: ['VIEW_CHANNEL', 'MENTION_EVERYONE', 'ADD_REACTIONS']

                                        },
                                        {
                                            id: role,
                                            allow: ['VIEW_CHANNEL', "SEND_MESSAGES"]
                                        }
                                        ]
                                    }).then(c => {
                                        c.setParent(channel.bufferCategoryID)
                                        channel.bufchan = c.id
                                        client.set('channels', channel)

                                        let obj = client.get('toggleable')
                                        message.reply("Successfully set the Buffers Module to TRUE!")
                                        obj.buffers = true
                                        client.set('toggleable', obj)

                                        Channels.update({ buffers: c.id }, { where: { guildid: message.guild.id } })
                                    })
                                })
                            } else {
                                res2.update({ buffers: false }).then(() => {
                                    message.guild.channels.get(channel.bufchan).delete()
                                    let obj = client.get('toggleable')
                                    message.reply("Successfully set the Buffers Module to FALSE!")
                                    obj.buffers = false
                                    client.set('toggleable', obj)
                                    Channels.update({ buffers: null }, { where: { guildid: message.guild.id } })
                                })
                            }
                        }
                    });
                }
                if (args[0].toLowerCase() == "outpost") {
                    Toggleable.findOne({ where: { guildid: message.guild.id } }).then(res2 => {
                        if (res2) {
                            if (res2.dataValues.buffers == false) {
                                res2.update({ buffers: true }).then(() => {
                                    message.guild.createChannel("buffer-checks", {
                                        type: "text", permissionOverwrites: [{
                                            id: message.guild.roles.find(role => role.name === "@everyone").id,
                                            deny: ['VIEW_CHANNEL', 'MENTION_EVERYONE', 'ADD_REACTIONS']

                                        },
                                        {
                                            id: role,
                                            allow: ['VIEW_CHANNEL', "SEND_MESSAGES"]
                                        }
                                        ]
                                    }).then(c => {
                                        c.setParent(channel.bufferCategoryID)
                                        channel.bufchan = c.id
                                        client.set('channels', channel)

                                        let obj = client.get('toggleable')
                                        message.reply("Successfully set the Buffers Module to TRUE!")
                                        obj.buffers = true
                                        client.set('toggleable', obj)

                                        Channels.update({ buffers: c.id }, { where: { guildid: message.guild.id } })
                                    })
                                })
                            } else {
                                res2.update({ buffers: false }).then(() => {
                                    message.guild.channels.get(channel.bufchan).delete()
                                    let obj = client.get('toggleable')
                                    message.reply("Successfully set the Buffers Module to FALSE!")
                                    obj.buffers = false
                                    client.set('toggleable', obj)
                                    Channels.update({ buffers: null }, { where: { guildid: message.guild.id } })
                                })
                            }
                        }
                    });
                }
                if (args[0].toLowerCase() == "stronghold") {
                    Toggleable.findOne({ where: { guildid: message.guild.id } }).then(res2 => {
                        if (res2) {
                            if (res2.dataValues.buffers == false) {
                                res2.update({ buffers: true }).then(() => {
                                    message.guild.createChannel("buffer-checks", {
                                        type: "text", permissionOverwrites: [{
                                            id: message.guild.roles.find(role => role.name === "@everyone").id,
                                            deny: ['VIEW_CHANNEL', 'MENTION_EVERYONE', 'ADD_REACTIONS']

                                        },
                                        {
                                            id: role,
                                            allow: ['VIEW_CHANNEL', "SEND_MESSAGES"]
                                        }
                                        ]
                                    }).then(c => {
                                        c.setParent(channel.bufferCategoryID)
                                        channel.bufchan = c.id
                                        client.set('channels', channel)

                                        let obj = client.get('toggleable')
                                        message.reply("Successfully set the Buffers Module to TRUE!")
                                        obj.buffers = true
                                        client.set('toggleable', obj)

                                        Channels.update({ buffers: c.id }, { where: { guildid: message.guild.id } })
                                    })
                                })
                            } else {
                                res2.update({ buffers: false }).then(() => {
                                    message.guild.channels.get(channel.bufchan).delete()
                                    let obj = client.get('toggleable')
                                    message.reply("Successfully set the Buffers Module to FALSE!")
                                    obj.buffers = false
                                    client.set('toggleable', obj)
                                    Channels.update({ buffers: null }, { where: { guildid: message.guild.id } })
                                })
                            }
                        }
                    });
                }
                if (args[0].toLowerCase() == "ingamestronghold") {
                    Toggleable.findOne({ where: { guildid: message.guild.id } }).then(res2 => {
                        if (res2) {
                            if (res2.dataValues.buffers == false) {
                                res2.update({ buffers: true }).then(() => {
                                    message.guild.createChannel("buffer-checks", {
                                        type: "text", permissionOverwrites: [{
                                            id: message.guild.roles.find(role => role.name === "@everyone").id,
                                            deny: ['VIEW_CHANNEL', 'MENTION_EVERYONE', 'ADD_REACTIONS']

                                        },
                                        {
                                            id: role,
                                            allow: ['VIEW_CHANNEL', "SEND_MESSAGES"]
                                        }
                                        ]
                                    }).then(c => {
                                        c.setParent(channel.bufferCategoryID)
                                        channel.bufchan = c.id
                                        client.set('channels', channel)

                                        let obj = client.get('toggleable')
                                        message.reply("Successfully set the Buffers Module to TRUE!")
                                        obj.buffers = true
                                        client.set('toggleable', obj)

                                        Channels.update({ buffers: c.id }, { where: { guildid: message.guild.id } })
                                    })
                                })
                            } else {
                                res2.update({ buffers: false }).then(() => {
                                    message.guild.channels.get(channel.bufchan).delete()
                                    let obj = client.get('toggleable')
                                    message.reply("Successfully set the Buffers Module to FALSE!")
                                    obj.buffers = false
                                    client.set('toggleable', obj)
                                    Channels.update({ buffers: null }, { where: { guildid: message.guild.id } })
                                })
                            }
                        }
                    });
                }
                if (args[0].toLowerCase() == "ingameoutpost") {
                    Toggleable.findOne({ where: { guildid: message.guild.id } }).then(res2 => {
                        if (res2) {
                            if (res2.dataValues.buffers == false) {
                                res2.update({ buffers: true }).then(() => {
                                    message.guild.createChannel("buffer-checks", {
                                        type: "text", permissionOverwrites: [{
                                            id: message.guild.roles.find(role => role.name === "@everyone").id,
                                            deny: ['VIEW_CHANNEL', 'MENTION_EVERYONE', 'ADD_REACTIONS']

                                        },
                                        {
                                            id: role,
                                            allow: ['VIEW_CHANNEL', "SEND_MESSAGES"]
                                        }
                                        ]
                                    }).then(c => {
                                        c.setParent(channel.bufferCategoryID)
                                        channel.bufchan = c.id
                                        client.set('channels', channel)

                                        let obj = client.get('toggleable')
                                        message.reply("Successfully set the Buffers Module to TRUE!")
                                        obj.buffers = true
                                        client.set('toggleable', obj)

                                        Channels.update({ buffers: c.id }, { where: { guildid: message.guild.id } })
                                    })
                                })
                            } else {
                                res2.update({ buffers: false }).then(() => {
                                    message.guild.channels.get(channel.bufchan).delete()
                                    let obj = client.get('toggleable')
                                    message.reply("Successfully set the Buffers Module to FALSE!")
                                    obj.buffers = false
                                    client.set('toggleable', obj)
                                    Channels.update({ buffers: null }, { where: { guildid: message.guild.id } })
                                })
                            }
                        }
                    });
                }

            } else {
                Information.findOne({ where: { guildid: message.guild.id }, raw: true }).then(data => {
                    console.log(data)
                    if (!data || data == null) {
                        if (data.setup == "Enabled") {
                            //get fucked
                        } else {
                            message.reply("this server has not been setup. please run /setup to set everything up")
                        }
                    }
                })
            }
        })
    }
};

