var { Whitelist, Roles, Information, Toggleable, Ingame } = require('../database/db')


const client = new Map();

let ingameObj = {
    activeftop: false,
    gettingraided: false,
    activewealth: false,
    activewho: false,
    rejoin: false,
    flistactive: false,
    balactive: false,
    outpostactive: false,
    findactive: false,
    stronghold: false,
    ingameStronghold: false,
    ingameOutpost: false,
    factionNames: [],
    outpostOwned: "",
    strongholdOwned: ""
}
client.set('ingame', ingameObj)

Information.findAll({ raw: true }).then(data => {
    if (data.length > 0) {
        data = data[0];

        let bufferObj = {
            atime: data.time,
            time: data.interval,
            gettingraided: false,
            image: "",
            direction: "",
            setup: data.setup
        }
        client.set('buffers', bufferObj)

    } else {
        let bufferObj = {
            atime: 0,
            time: 100,
            gettingraided: false,
            image: "",
            direction: "",
            setup: false
        }
        client.set('buffers', bufferObj)

    }
})

Toggleable.findAll({ raw: true }).then(data => {
    if (data.length > 0) {
        data = data[0];
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
            applications: data.applications
        }

        client.set('toggleable', toggleable)
        let obj = client.get('ingame')
        obj.ingameOutpost = data.ingameOutpost;
        obj.ingameStronghold = data.ingameStronghold;
        client.set('ingame', obj)

    } else {
        let toggleable = {
            buffers: false,
            ftop: false,
            flist: false,
            find: false,
            who: false,
            banking: false,
            outpost: false,
            stronghold: false,
            ingameOutpost: false,
            ingameStronghold: false,
            applications: false
        }

        client.set('toggleable', toggleable)

        let obj = client.get('ingame')
        obj.ingameOutpost = false;
        obj.ingameStronghold = false;
        client.set('ingame', obj)

    }
})

Ingame.findAll({ raw: true }).then(c => {
    if (c.length > 0) {
        let data = c[0];

        let obj = client.get('ingame')
        let factions = JSON.parse(data.controllingFactions)
        obj.factionNames = factions
        if (data.outpostControlled != null) {
            obj.outpostOwned = data.outpostControlled
        }
        if (data.strongholdControlled != null) {
            obj.strongholdOwned = data.strongholdControlled
        } else {
            obj.strongholdOwned = ""

        }
        client.set('ingame', obj)
    } else {
        Ingame.create()
    }
})

module.exports = { client };