const { client } = require("./variables");
const { Whitelist, Roles, Information, Ingame } = require('../database/db')
const moment = require('moment')
const Discord = require("discord.js");
const request = require('request')
let ftop = [];
let wealth = [];
let outpost = [];
let fwho = [];
let flist = [];

exports.messageHandler = function (jsonMsg) {
    let factionsName = client.get('faction').faction
    let messageColor = client.get('color').color
    let defaultImage = client.get('image').image
    let planet = client.get('defaultPlanet').defaultPlanet
    let length = planet.length

    capital = planet.split("")[0].toUpperCase().toString()
    cat = jsonMsg.toString();
    let obj = client.get('ingame')
    if (obj.activeftop) {
        if (cat.includes("1. ") || cat.includes("2. ") || cat.includes("3. ") || cat.includes("4. ") || cat.includes("5. ") || cat.includes("6. ") || cat.includes("7. ") || cat.includes("8. ") || cat.includes("9. ")) {
            ftop.push(cat);
        }
        if (cat.includes("10. ") && ftop.length == 9) {
            ftop.push(cat)
            let number = 1;
            let embed = new Discord.RichEmbed()
                .setThumbnail(defaultImage)
                .setAuthor(capital + planet.substring(1, length) + ` Planet Live FTOP Feed`, defaultImage)
                .setTimestamp()
                .setColor(messageColor)
            ftop.forEach(item => {
                response = item.split(" ");
                embed.addField(`[**#${number}**] ${response[1]}`, `⚑ Points: **${response[3]}**`, true);
                number = number + 1
            });
            client.get('channels').ftop.send(embed);

            obj.activeftop = false;
            client.set('ingame', obj)
            ftop = []
        }
    }

    if (obj.activewealth) {
        if (cat.includes("1. ") || cat.includes("2. ") || cat.includes("3. ") || cat.includes("4. ") || cat.includes("5. ") || cat.includes("6. ") || cat.includes("7. ") || cat.includes("8. ") || cat.includes("9. ")) {

            wealth.push(cat)
        }
        if (cat.includes("10. ") && wealth.length == 9) {
            wealth.push(cat)
            let number = 1;
            let embed = new Discord.RichEmbed()
                .setThumbnail(defaultImage)
                .setAuthor(capital + planet.substring(1, length) + ` Planet Live Wealth Feed`, defaultImage)
                .setTimestamp()
                .setColor(messageColor)
            wealth.forEach(item => {
                response = item.split(" ");
                embed.addField(`[**#${number}**] ${response[1]}`, `⚑ Wealth: **${response[3]}**`, true);
                number = number + 1
            });

            client.get('channels').ftop.send(embed);
            obj.activewealth = false;
            client.set('ingame', obj)
            wealth = []
        }
    }

    if (obj.ingameOutpost == true) {
        if (obj.outpostOwned == "") {
            if (cat.includes(obj.factionNames) && cat.includes("Outpost: CONTROLLED")) {
                let outpost = cat.split(" ")
                outpost = outpost[0]
                console.log(outpost)

                Ingame.findByPk(1).then(c => {
                    if (!c || c == null) {
                        return
                    } else {
                        c.update({ outpostControlled: outpost })

                        obj.outpostOwned = outpost;

                        client.set('ingame', obj)
                    }
                })

            }
        } else {
            if (cat.includes(obj.outpostOwned) && cat.includes("UNDER ATTACK")) {
                client.get('send').send(`${obj.outpostOwned} Is currently under attack!`)
                let embed = new Discord.RichEmbed()
                    .setColor(messageColor)
                    .setTitle("Stronghold Under Attack")
                    .setDescription(`${obj.outpostOwned} Is currently under attack!`)
                return client.get('channels').outpost.send(embed)
            } else if (cat.includes(obj.outpostOwned) && cat.includes("IDLE")) {
                return
            } else if (cat.includes(obj.outpostOwned) && cat.includes("SECURING")) {
                return
            } else
                if (cat.includes(obj.outpostOwned) && cat.includes("CONTROLLED") && !cat.includes(obj.factionNames)) {
                    let outpost = cat.split(" ")
                    outpost = outpost[0]

                    Ingame.findByPk(1).then(c => {
                        if (c == null || !c) {
                            return
                        } else {
                            c.update({ outpostControlled: "" })

                            obj.outpostOwned = ""
                            client.set('ingame', obj)
                        }
                    })
                }

        }


    }

    if (obj.findactive == 1) {
        if (cat.includes("(!) ") || cat.includes("No online player found")) {
            const embed = new Discord.RichEmbed()
                .setColor(messageColor)
                .setTimestamp()
                .setThumbnail(defaultImage)
                .setAuthor(capital + planet.substring(1, length) + ` Planet find check`, defaultImage)
                .setDescription(":mag: " + "" + cat + "")
            findchan.send(embed)
            obj.findactive = false;
            client.set('ingame', obj)
        }
    }

    if (obj.outpostactive == 1) {
        if (cat.includes("Vanilla Outpost: ") || cat.includes("Trainee Outpost: ") || cat.includes("Hero Outpost: ")) {
            outpost.push(cat)
        }
        if (cat.includes("Cosmonaut Outpost: ") && outpost.length == 3) {
            outpost.push(cat)
            let embed = new Discord.RichEmbed()
                .setThumbnail(defaultImage)
                .setAuthor(capital + planet.substring(1, length) + ` Planet Live Outpost Feed`, defaultImage)
                .setTimestamp()
                .setColor(messageColor)
                .setDescription(outpost)
            client.get('channels').outpost.send(embed);
            outpost = [];
            obj.outpostactive = false;
            client.set('ingame', obj)
        }
    }

    if (obj.balactive == 1) {
        if (cat.includes("Your Balance: ")) {
            bal = cat.split(" ")
            const balembed = new Discord.RichEmbed()
                .setColor(messageColor)
                .setTimestamp()
                .setAuthor(factionsName + ` Buffer Bot`, defaultImage)
                .setDescription(":bank: Balance: " + bal[2])
            economychan.send(balembed)
            obj.balactive = false;
            client.set('ingame', obj)
        } else {
            if (cat.includes("Balance: ")) {
                bal = cat.split(" ")
                const playerbalembed = new Discord.RichEmbed()
                    .setColor(messageColor)
                    .setTimestamp()
                    .setAuthor(factionsName + ` Buffer Bot`, defaultImage)
                    .setDescription(":moneybag: " + bal[0] + " Balance is currently at " + bal[2])
                economychan.send(playerbalembed)
                obj.balactive = false;
                client.set('ingame', obj)
            }
        }
    }

    if (cat.includes("has been received from ") || cat.includes("has been sent to ")) {
        if (cat.includes("-> me")) {
            key = cat.split(" ");
            members = key[1].slice(1);
            return client.get('send').send(`/msg ${members} You think you can bypass me you little prick!`)

        } else {
            const embed = new Discord.RichEmbed()
                .setColor(messageColor)
                .setTimestamp()
                .setThumbnail(defaultImage)
                .setAuthor(factionsName + ` Buffer Bot`, defaultImage)
                .setDescription(":money_with_wings: " + "" + cat + "")
            economychan.send(embed)
        }
    }


    if (obj.activewho == 1) {
        if (cat.includes("________________") || cat.includes("Description") || cat.includes("Joining") || cat.includes("Faction Points: ") || cat.includes("Bank Balance: ") || cat.includes("Members online (") || cat.includes("Members offline (") || cat.includes("Land/Power/Maxpower: ") || cat.includes("Faction Wealth: ") || cat.includes("Spawner Value: ") || cat.includes("Block Value: ") || cat.includes("Faction Rank: ") || cat.includes("KOTH Wins: ") || cat.includes("The faction or player")) {
            fwho.push(cat);
        }

        if (cat.includes("The faction or player") || cat.includes("is not currently in a faction.") || cat.includes("Raid Event Wins: ")) {
            let info = "";
            fwho.forEach(item => {
                info = `${info} \n ${item}`;
            });
            let who = new Discord.RichEmbed()
                .setThumbnail(defaultImage)
                .setAuthor(capital + planet.substring(1, length) + ` Planet Live Faction Feed`, defaultImage)
                .setTimestamp()
                .setColor(messageColor)
                .setDescription("``" + info + "``");
            client.get('channels').fac.send(who)
            fwho = [];

            obj.activewho = false;
            client.set('ingame', obj)
        }
    }

    if (obj.flistactive == 1) {
        if (cat.includes("online,")) {
            flist.push(cat);
        }
        if (flist.length == 8) {
            let embed = new Discord.RichEmbed()
                .setThumbnail(defaultImage)
                .setAuthor(capital + planet.substring(1, length) + ` Planet Live Faction List Feed`, defaultImage)
                .setTimestamp()
                .setColor(messageColor)
                .setDescription(flist)
                .setFooter(`Page ${client.get('page').page}`)
            client.get('channels').flist.send(embed);
            flist = [];
            obj.flistactive = false;
            client.set('ingame', obj)
        }
    }

    if (cat.includes("-> me")) {
        if (cat.includes("link")) {
            key = cat.split(" ");
            members = key[1].slice(1);
            Whitelist.findOne({ where: { code: key[5] } }).then(c => {
                if (c == null || !c) {
                    return client.get('send').send(`/msg ${members} That key does not exist. Please contact the faction owner`)
                } else {
                    if (c.dataValues.codeused) {
                        return client.get('send').send(`/msg ${members} That key has already been used. Please contact the faction owner`)
                    } else {
                        Whitelist.update({ username: members, codeused: true }, {
                            where: { code: key[5] }
                        })
                        return client.get('send').send(`/msg ${members} You have been added to the whitelist`)
                    }
                }
            })
        }
        if (cat.includes("weewoo")) {
            member = cat.split(" ")
            members = member[1].slice(1);
            let obj = client.get('toggleable')
            if (obj.buffers) {
                Whitelist.findOne({ where: { username: members } }).then(c => {
                    if (c == null || !c) {
                        return client.get('send').send(`/msg ${members} You are not added to the whitelist!`)
                    } else {
                        obj = client.get('buffers')
                        if (obj.gettingraided == false) {
                            obj.gettingraided = true;
                            obj.direction = member[5];
                            client.set('buffers', obj)
                            client.get('send').send(`/msg ${members} Raid alerts have been triggered successfully by you!`)
                            client.get('channels').buf.send("__RAID ALERTS__ have been triggered by **" + members + "**!")
                            client.get('send').send("RAID ALERTS have been triggered by **" + members + "**!")
                        } else {
                            return client.get('send').send(`/msg ${members} Raid alerts are already enabled`)
                        }
                    }
                })
            } else {
                return client.get('send').send(`/msg ${members} The buffer module is not enabled!`)

            }
        }
        if (cat.includes("safe")) {
            member = cat.split(" ")
            members = member[1].slice(1);
            let obj = client.get('toggleable')
            if (obj.buffers) {
                Whitelist.findOne({ where: { username: members } }).then(c => {
                    if (c == null || !c) {
                        return client.get('send').send(`/msg ${members} You are not added to the whitelist!`)
                    } else {
                        obj = client.get('buffers')
                        if (obj.gettingraided) {
                            obj.gettingraided = false;
                            obj.direction = "";
                            client.set('buffers', obj)
                            client.get('channels').buf.send("The raid alert has been disabled using the ingame messaging system by **" + members + "**!")
                            client.get('send').send(`/msg ${members} Raid alerts have been disabled`)
                        } else {
                            return client.get('send').send(`/msg ${members} Raid alerts are currently not active`)
                        }
                    }
                });
            } else {
                return client.get('send').send(`/msg ${members} The buffer module is not enabled!`)
            }
        }

        if (cat.includes("checked")) {
            member = cat.split(" ")
            member = member[1].slice(1);
            let obj = client.get('buffers')
            let obj2 = client.get('toggleable')
            if (obj2.buffers) {
                Whitelist.findOne({ where: { username: member } }).then(c => {


                    if (c == null || !c) {
                        client.get('send').send(`/msg ${member} You have not been added into the ` + factionsName + ` faction whitelist.`)

                    } else {

                        if (obj.atime > obj.time) {

                            request.get(`https://api.mojang.com/users/profiles/minecraft/${c.dataValues.username}?at=${Math.floor(new Date() / 1000)}`, (err, body) => {
                                let mc = JSON.parse(body.body);

                                let clientwallchecks = c.dataValues.checks;
                                const embed = new Discord.RichEmbed()
                                    .setAuthor(factionsName + ` Buffer Bot`, defaultImage)
                                    .setColor(messageColor)
                                    .setTitle("Wall Check Recieved @ " + (moment().format('MM/DD/YY, h:mm a')))
                                    .setThumbnail(`https://mc-heads.net/avatar/${mc.id}/100/nohelm.png`)
                                    .addField('Name', `<@${c.dataValues.discordid}>`, true)
                                    .addField('Time Taken', obj.atime + " Minute(s)", true)
                                    .addField('Amount of checks', clientwallchecks, true)
                                client.get('send').send('The buffers have been checked by ' + member + ' after ' + obj.atime + ' minutes.', 'utf8');
                                client.get('channels').buf.send(embed);
                                Information.update({ time: 0 }, { where: { time: obj.atime } })
                                obj.atime = 0;
                                client.set('buffers', obj)
                            });
                            c.update({ checks: c.dataValues.checks + 1 })

                        } else {
                            client.get('send').send(`/msg ${member} You can not check before the ${obj.atime} Minute mark.`)
                        }
                    }

                });
            } else {
                return client.get('send').send(`/msg ${member} The buffer module is currently disabled`)
            }
        }

    }
}