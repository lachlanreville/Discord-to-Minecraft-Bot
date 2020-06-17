const Discord = require("discord.js");
const { client } = require("../utils/variables");
const moment = require('moment')

var { Whitelist, Roles, Information, Applications } = require('../database/db')

var users = new Map()

let defaultImage = client.get('image').image

let messageColor = client.get('color').color

let obj = {
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
    q6: "",
    q7: "",
    q8: "",
    q9: "",
    q10: "",
    q11: ""
}
async function checkTime(user) {
    let applications = await Applications.findOne({ where: { discordid: user } })
    let c = applications;
    if (c == null || !c) {
        console.log("2nd true")
        return true;

    } else {
        let current = moment().format("YYYY-MM-DD kk:mm:ss");

        if (current >= c.dataValues.reapply) {
            console.log('true')
            return true;
        } else {
            console.log('false')
            return false;
        }
    }

}

exports.use = async (bot, message, args, command) => {
    if (client.get("toggleable").applications == false) return message.channel.send("The Applications module is currently disabled")
    let time = await checkTime(message.author.id)
    console.log(time)
    if (time) {
        users.set(message.author.id, obj)

        let sent = new Discord.RichEmbed()
            .setColor(messageColor)
            .setTitle("Application Started")
            .setDescription(`Hello ${message.author} I have started your application process in DMS.`)
        message.channel.send(sent)

        const err = new Discord.RichEmbed()
            .setColor(messageColor)
            .setDescription("There has been an error, please try again!")

        let penis = new Discord.RichEmbed()
            .setColor(messageColor)
            .setTitle("Application Started")
            .setDescription("Application has been started.")

        message.author.send(penis)

        let penis2 = new Discord.RichEmbed()
            .setColor(messageColor)
            .setDescription("**IGN (Include Link From NAMEMC) -** (1/11)")

        const filter = m => m.author.id !== bot.user.id && m.author.id == message.author.id;

        message.author.send(penis2).then(msg => {
            msg.channel.awaitMessages(filter, {
                max: 1,
                time: 300000,
                errors: ['time']
            }).then(collected => {
                collected = collected.map(x => x.content);
                collected = collected.toString();

                let obj = users.get(message.author.id)
                obj.q1 = collected

                users.set(message.author.id, obj)

                let q2 = new Discord.RichEmbed()
                    .setColor(messageColor)
                    .setDescription("**Discord Name? (With #????)[CaSE SeNSitiVe] -** (2/11)")

                message.author.send(q2)

                msg.channel.awaitMessages(filter, {
                    max: 1,
                    time: 300000,
                    errors: ['time']
                }).then(collected => {
                    collected = collected.map(x => x.content);
                    collected = collected.toString();

                    let obj = users.get(message.author.id)
                    obj.q2 = collected

                    users.set(message.author.id, obj)

                    let q3 = new Discord.RichEmbed()
                        .setColor(messageColor)
                        .setDescription("**Timezone? -** (3/11)")

                    message.author.send(q3)

                    msg.channel.awaitMessages(filter, {
                        max: 1,
                        time: 300000,
                        errors: ['time']
                    }).then(collected => {
                        collected = collected.map(x => x.content);
                        collected = collected.toString();

                        let obj = users.get(message.author.id)
                        obj.q3 = collected

                        users.set(message.author.id, obj)

                        let q4 = new Discord.RichEmbed()
                            .setColor(messageColor)
                            .setDescription("**Mic or Mute? -** (4/11)")

                        message.author.send(q4)

                        msg.channel.awaitMessages(filter, {
                            max: 1,
                            time: 300000,
                            errors: ['time']
                        }).then(collected => {
                            collected = collected.map(x => x.content);
                            collected = collected.toString();

                            let obj = users.get(message.author.id)
                            obj.q4 = collected

                            users.set(message.author.id, obj)

                            let q5 = new Discord.RichEmbed()
                                .setColor(messageColor)
                                .setDescription("**Average hours played daily? -** (5/11)")

                            message.author.send(q5)

                            msg.channel.awaitMessages(filter, {
                                max: 1,
                                time: 300000,
                                errors: ['time']
                            }).then(collected => {
                                collected = collected.map(x => x.content);
                                collected = collected.toString();

                                let obj = users.get(message.author.id)
                                obj.q5 = collected

                                users.set(message.author.id, obj)

                                let q6 = new Discord.RichEmbed()
                                    .setColor(messageColor)
                                    .setDescription("**Past Factions? -** (6/11)")

                                message.author.send(q6)

                                msg.channel.awaitMessages(filter, {
                                    max: 1,
                                    time: 300000,
                                    errors: ['time']
                                }).then(collected => {
                                    collected = collected.map(x => x.content);
                                    collected = collected.toString();

                                    let obj = users.get(message.author.id)
                                    obj.q6 = collected

                                    users.set(message.author.id, obj)

                                    let q7 = new Discord.RichEmbed()
                                        .setColor(messageColor)
                                        .setDescription("**Age? (Optional) -** (7/11)")

                                    message.author.send(q7)

                                    msg.channel.awaitMessages(filter, {
                                        max: 1,
                                        time: 300000,
                                        errors: ['time']
                                    }).then(collected => {
                                        collected = collected.map(x => x.content);
                                        collected = collected.toString();

                                        let obj = users.get(message.author.id)
                                        obj.q7 = collected

                                        users.set(message.author.id, obj)

                                        let q8 = new Discord.RichEmbed()
                                            .setColor(messageColor)
                                            .setDescription("**Why are you interested in joining? -** (8/11)")

                                        message.author.send(q8)

                                        msg.channel.awaitMessages(filter, {
                                            max: 1,
                                            time: 300000,
                                            errors: ['time']
                                        }).then(collected => {
                                            collected = collected.map(x => x.content);
                                            collected = collected.toString();

                                            let obj = users.get(message.author.id)
                                            obj.q8 = collected

                                            users.set(message.author.id, obj)

                                            let q9 = new Discord.RichEmbed()
                                                .setColor(messageColor)
                                                .setDescription("**What separates you from others? -** (9/11)")

                                            message.author.send(q9)

                                            msg.channel.awaitMessages(filter, {
                                                max: 1,
                                                time: 300000,
                                                errors: ['time']
                                            }).then(collected => {
                                                collected = collected.map(x => x.content);
                                                collected = collected.toString();

                                                let obj = users.get(message.author.id)
                                                obj.q9 = collected

                                                users.set(message.author.id, obj)

                                                let q10 = new Discord.RichEmbed()
                                                    .setColor(messageColor)
                                                    .setDescription("**In your opinion, what is your strongest skill (Cannoning, Pvping, Basework, Wall-Checking, Activity)? -** (10/11)")

                                                message.author.send(q10)

                                                msg.channel.awaitMessages(filter, {
                                                    max: 1,
                                                    time: 300000,
                                                    errors: ['time']
                                                }).then(collected => {
                                                    collected = collected.map(x => x.content);
                                                    collected = collected.toString();

                                                    let obj = users.get(message.author.id)
                                                    obj.q10 = collected

                                                    users.set(message.author.id, obj)

                                                    let q11 = new Discord.RichEmbed()
                                                        .setColor(messageColor)
                                                        .setDescription("**What rank are you on jungle? -** (11/11)")

                                                    message.author.send(q11)

                                                    msg.channel.awaitMessages(filter, {
                                                        max: 1,
                                                        time: 300000,
                                                        errors: ['time']
                                                    }).then(collected => {
                                                        collected = collected.map(x => x.content);
                                                        collected = collected.toString();

                                                        let user = users.get(message.author.id)

                                                        let obj = users.get(message.author.id)
                                                        obj.q11 = collected

                                                        users.set(message.author.id, obj)

                                                        let finished = new Discord.RichEmbed()
                                                            .setTitle('Application Finished')
                                                            .setColor(messageColor)
                                                            .setDescription("Your application has been successfully sent!")
                                                        message.author.send(finished)

                                                        let userss = users.get(message.author.id)

                                                        let app = new Discord.RichEmbed()
                                                            .setTitle("New Application")
                                                            .setColor(messageColor)
                                                            .addField("Q1: IGN (Include Link From NAMEMC -", userss.q1)
                                                            .addField("Q2: Discord Name? (With #????)[CaSE SeNSitiVe] -", userss.q2)
                                                            .addField("Q3: Timezone? -", userss.q3)
                                                            .addField("Q4: Mic or Mute? -", userss.q4)
                                                            .addField("Q5: Average hours played daily? -", userss.q5)
                                                            .addField("Q6: Past Factions? -", userss.q6)
                                                            .addField("Q7: Age? (Optional) -", userss.q7)
                                                            .addField("Q8: Why are you interested in joining? -", userss.q8)
                                                            .addField("Q9: What separates you from others? -", userss.q9)
                                                            .addField("Q10: In your opinion, what is your strongest skill (Cannoning, Pvping, Basework, Wall-Checking, Activity)? -", userss.q10)
                                                            .addField("Q11: What rank are you on jungle? -", userss.q11)
                                                            .setFooter(`Application by ${message.author.username}, Author Id: ${message.author.id})`)

                                                        client.get('channels').apply.send(app).then(msg => {
                                                            Roles.create({ messageid: msg.id, discordid: message.author.id, emojiname: "✅" })
                                                            Roles.create({ messageid: msg.id, discordid: message.author.id, emojiname: "❎" })
                                                            msg.react("✅")
                                                            msg.react("❎")
                                                            let current = moment().format("YYYY-MM-DD kk:mm:ss");
                                                            let time = moment(current).add('1', 'day').format("YYYY-MM-DD kk:mm:ss");
                                                            Applications.findOne({ where: { discordid: message.author.id } }).then(c => {
                                                                if (!c || c == null) {
                                                                    Applications.create({ guildid: message.guild.id, discordid: message.author.id, reapply: time })

                                                                } else {
                                                                    c.update({ reapply: time })
                                                                }
                                                            })
                                                            Applications.create({ guildid: message.guild.id, discordid: message.author.id, reapply: time })
                                                        })
                                                    }).catch(errs => {
                                                        message.author.send(err)
                                                    });
                                                }).catch(errs => {
                                                    message.author.send(err)
                                                });;
                                            }).catch(errs => {
                                                message.author.send(err)
                                            });;
                                        }).catch(errs => {
                                            message.author.send(err)
                                        });;
                                    }).catch(errs => {
                                        message.author.send(err)
                                    });;
                                }).catch(errs => {
                                    message.author.send(err)
                                });;
                            }).catch(errs => {
                                message.author.send(err)
                            });;
                        }).catch(errs => {
                            message.author.send(err)
                        });;
                    }).catch(errs => {
                        message.author.send(err)
                    });;
                }).catch(errs => {
                    message.author.send(err)
                });;
            }).catch(errs => {
                message.author.send(err)
            });
        }).catch(errs => {
            const fucku = new Discord.RichEmbed()
                .setColor(messageColor)
                .setTitle("Application Failed!", defaultImage, defaultImage)
                .setDescription(`Sorry ${message.author},` + ` You must enable direct messages from server members to start an application!`)
                .setImage(defaultImage)
            message.channel.send(fucku)
        });
    } else {
        message.channel.send("You need to wait 24 hours from your previous application until you can apply again")
    }
};

