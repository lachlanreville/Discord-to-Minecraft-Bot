const _0x4d0c = ['./utils/variables', 'Client', './database/db', './utils/functions', 'discord.js', 'moment', './utils/ingameHandler']; (function (_0x2614f7, _0x4d0c29) { const _0x3786cd = function (_0x3299d9) { while (--_0x3299d9) { _0x2614f7['push'](_0x2614f7['shift']()); } }; _0x3786cd(++_0x4d0c29); }(_0x4d0c, 0x104)); const _0x3786 = function (_0x2614f7, _0x4d0c29) { _0x2614f7 = _0x2614f7 - 0x0; let _0x3786cd = _0x4d0c[_0x2614f7]; return _0x3786cd; }; const Discord = require(_0x3786('0x3')); const bot = new Discord[(_0x3786('0x0'))](); const mineflayer = require('mineflayer'); const moment = require(_0x3786('0x4')); const fs = require('fs'); const { Whitelist, Roles, Information, Channels } = require(_0x3786('0x1')); const { client } = require(_0x3786('0x6')); const { checkBuffer, gettingRaided, ingameControl } = require(_0x3786('0x2')); const { messageHandler, strongholdHandler } = require(_0x3786('0x5')); var penis = ![];

//SETUP SECTION
let token = "" //Discord Bot Token

let planet = "dungeon" //Planet which bot will be connecting to *MAKE SURE ALL LOWERCASE*

let factionsName = "Snakes" //Set your factions name here

let discordId = "180860826457079808" //DiscordID of bot owner

let prefix = "/"; //Prefix for discord commands

let defaultImage;

let messageColor;

client.set('role', { role: "670197873672978438" }); //Role which you want to be able to see channels and to be @ for buffers

var _0xa1cf = ['dungeon', '#33E9FF', '#9700FF', 'set', 'spirit', '#FF0000', 'color', 'defaultPlanet', 'jungle', 'lava', 'https://i.imgur.com/9M7GCCa.png', 'discord', '#FF9333', 'image', 'https://i.imgur.com/mntR53r.png']; (function (_0x4fb310, _0xa1cfe1) { var _0x4fac8d = function (_0x1a160d) { while (--_0x1a160d) { _0x4fb310['push'](_0x4fb310['shift']()); } }; _0x4fac8d(++_0xa1cfe1); }(_0xa1cf, 0x1b3)); var _0x4fac = function (_0x4fb310, _0xa1cfe1) { _0x4fb310 = _0x4fb310 - 0x0; var _0x4fac8d = _0xa1cf[_0x4fb310]; return _0x4fac8d; }; switch (planet) { case _0x4fac('0x8'): defaultImage = 'https://i.imgur.com/B3nuSdp.png'; break; case _0x4fac('0x4'): defaultImage = 'https://i.imgur.com/W1rw6kI.png'; break; case _0x4fac('0x0'): defaultImage = _0x4fac('0xa'); break; case _0x4fac('0x9'): defaultImage = _0x4fac('0xe'); break; default: defaultImage = 'https://i1.sndcdn.com/artworks-000251115106-jdb6ia-t500x500.jpg'; }switch (planet) { case _0x4fac('0x8'): messageColor = '#33FA7F'; break; case _0x4fac('0x4'): messageColor = _0x4fac('0x1'); break; case _0x4fac('0x0'): messageColor = _0x4fac('0x2'); break; case _0x4fac('0x9'): messageColor = _0x4fac('0xc'); break; default: defaultImage = _0x4fac('0x5'); }client[_0x4fac('0x3')](_0x4fac('0xd'), { 'image': defaultImage }); client[_0x4fac('0x3')](_0x4fac('0x6'), { 'color': messageColor }); client['set']('faction', { 'faction': factionsName }); client[_0x4fac('0x3')](_0x4fac('0x7'), { 'defaultPlanet': planet }); client['set'](_0x4fac('0xb'), { 'discord': discordId });

var options = ({
    host: "cosmicpvp.com",
    port: 25565,
    username: "", //Minecraft Email
    password: "", //Minecraft Password
    version: "1.8",
    plugins: {
        skyLightSent: false,
        blocks: false,
        physics: false,
        block_actions: false
    },
    logErrors: false
});

var mcuser = mineflayer.createBot(options);

bindEvents(mcuser);

function bindEvents(mcuser) {

    mcuser.on('end', () => {
        console.log((moment().format('MM/DD/YY, @ h:mm a')) + ' - \x1b[36mRestarting the bot in 60 seconds!\x1b[0m')
        setTimeout(relog, 60000);
    })
    mcuser.on('login', () => {
        console.log("Bot is ONLINE");
        let length = planet.length

        capital = planet.split("")[0].toUpperCase().toString()
        setTimeout(function () {
            mcuser.chat(`/server ` + planet + `planet`)
            console.log(`Online on ` + (capital + planet.substring(1, length)) + ` Planet on the account ` + `\x1b[32m` + mcuser.username + `\x1b[0m`)
            pingFunction();
        }, 5000);

        let minecraftAccount = mcuser.username

        client.set('mcids', { mcids: minecraftAccount });
    });
};

function relog() {
    mcuser = mineflayer.createBot(options)
    console.log((moment().format('MM/DD/YY, @ h:mm a')) + " - \x1b[36mBot Restarted Successfully!\x1b[0m")
    if (penis) {
        adminchan.send("@everyone, Bot Restarted Successfully!")
        penis = false;
    }
    bindEvents(mcuser);
}

function pingFunction() {
    setInterval(function () {
        mcuser.chat("/ping")
        mcuser.chat(`/server ` + planet + `planet`)
    }, 5000);
}

mcuser.on('message', (jsonMsg) => {
    messageHandler(jsonMsg)
});

mcuser.on('kicked', reason => console.log(`Bot Kicked: ${reason.text}`))

bot.login(token)
bot.once("ready", async () => {

    let length = planet.length

    capital = planet.split("")[0].toUpperCase().toString()

    bot.user.setActivity(capital + planet.substring(1, length) + ` Planet | ` + factionsName + ` On Top`);
    Channels.findAll({ raw: true }).then(res => {
        if (res.length > 0) {
            res = res[0];
            console.log(res)
            bufchan = bot.channels.get(res.buffer);
            adminchan = bot.channels.get(res.admin);
            facchan = bot.channels.get(res.who);
            ftopchan = bot.channels.get(res.ftop);
            userbotchan = bot.channels.get(res.user);
            economychan = bot.channels.get(res.economy);
            outpostchan = bot.channels.get(res.outpost);
            flistchan = bot.channels.get(res.flist);
            findchan = bot.channels.get(res.find);
            welcomechan = bot.channels.get(res.welcome);
            strongholdchan = bot.channels.get(res.stronghold)
            apply = bot.channels.get(res.applications)
            bufferCategoryID = res.bufferCategoryID
            let obj = {
                buf: bufchan,
                admin: adminchan,
                fac: facchan,
                ftop: ftopchan,
                user: userbotchan,
                economy: economychan,
                outpost: outpostchan,
                flist: flistchan,
                find: findchan,
                welcome: welcomechan,
                stronghold: strongholdchan,
                apply,
                bufferCategoryID
            }
            console.log(obj)
            client.set('channels', obj)
        }
    });
    setInterval(() => {
        checkBuffer();
    }, 5 * 1000)

    setInterval(() => {
        gettingRaided();
    }, 3 * 1000)

    setInterval(() => {
        ingameControl();
    }, 10 * 1000)

});

setInterval(function () {
    if (client.get('toggleable').buffers == true) {
        let atime = client.get('buffers').atime

        Information.findOne({ where: { time: atime } }).then(res => {
            res.update({ time: atime++ })
        })
        atime++;
        let obj = client.get('buffers')
        obj.atime = atime;
        client.set('buffers', obj)
    }
}, 60000);

commands = new Map();

fs.readdir('./commands/', (err, files) => {
    let jsfiles = files.filter(f => f.split('.')
        .pop() === 'js');
    if (jsfiles.length <= 0) {
        return;
    }
    jsfiles.forEach(f => {
        let props = require(`./commands/${f}`);
        props.fileName = f;
        commands.set(f.slice(0, -3), props);
    });
});

bot.on("message", async message => {
    if (message.author.bot) return;
    if (!message.guild) return;
    if (message.content.startsWith(prefix));
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    message.delete()
    let command = args.shift().toLowerCase();
    let cmd;
    if (commands.has(command)) {
        cmd = commands.get(command);
    }
    if (!cmd) return;
    cmd.use(bot, message, args, command);
});

bot.on("guildMemberAdd", user => {
    if (client.get('channels').welcome) {
        let image = client.get('buffers').image
        const embed = new Discord.RichEmbed()
            .setColor(messageColor)
            .setThumbnail(image)
            .setTimestamp()
            .setAuthor(factionsName + ` Buffer Bot`, image, image)
            .addField(`**Welcome!**`, `Welcome ${user} to the ` + factionsName + ` discord!`)
            .addField("**Looking For A Faction?**", "Type /apply in any channel and complete an application!")
        client.get('channels').welcome.send(embed);
    } else {
        return
    }

});

bot.on("raw", async raw => {
    if (raw.t == "MESSAGE_REACTION_ADD") {
        if (raw.d.user_id == bot.user.id) return;
        let info = raw.d;


        Roles.findOne({ where: { messageid: info.message_id, emojiname: info.emoji.name } }).then(res => {
            if (info.emoji.name == "✅") {
                let cat = bot.guilds.get("631978510856093706")

                let member = cat.members.get(res.discordid)

                let accepted = new Discord.RichEmbed()
                    .setTitle("**You Have Been Accepted**")
                    .setThumbnail(image)
                    .addField("__Information:__", 'You have been given the "Accepted Pending" role, please contact an owner for further instructions')
                    .setColor(messageColor)

                member.send(accepted)

                member.addRole("636088129043955745")
            }
            if (info.emoji.name == "❎") {
                let cat = bot.guilds.get("631978510856093706")

                let member = cat.members.get(res.discordid)

                let accepted = new Discord.RichEmbed()
                    .setTitle("**You Have Been Denied**")
                    .setThumbnail(image)
                    .addField("__Information:__", `Your Application for the faction ` + factionsName + ` has been denied, \nFeel free to re-apply in 1-2 weeks.`)
                    .setColor(messageColor)

                member.send(accepted)
            }
        })


    }
});

function sendMessage(message) {
    mcuser.chat(message)
}

client.set('send', { send: sendMessage })

function sendRestart() {
    if (penis == true) return false;
    mcuser.end()
    penis = true;
}
client.set('restart', { restart: sendRestart })
client.set('timeout', { executed: false });