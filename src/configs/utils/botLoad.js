const { readdirSync, writeFileSync, readFileSync } = require("fs");

module.exports = {
    registerTextCommands: () => {
        let path = readdirSync('./src/commands')
        let data = JSON.parse(readFileSync(`./src/commands/aliases/cmds.json`))
        for (key of path) {

            if (key.endsWith('.js') === false) {
                if (key === 'aliases' || key === '_embeds') continue
                let newpath = readdirSync(`./src/commands/${key}`)

                for (newkey of newpath) {
                    if (newkey.endsWith('.js') === false) continue

                    let name = newkey.split('').splice(0, newkey.length - 3).reduce((x, y) => x += y, '')
                    if (data[name] === undefined) {
                        data[name] = [name]
                        writeFileSync(`./src/commands/aliases/cmds.json`, JSON.stringify(data, null, 2))
                    }
                }
            } else {
                let name = key.split('').splice(0, key.length - 3).reduce((x, y) => x += y, '')
                if (data[name] === undefined) {
                    data[name] = [name]
                    writeFileSync(`./src/commands/aliases/cmds.json`, JSON.stringify(data, null, 2))
                }
            }
        }
    },

    loadEvents: (client) => {
        client.on("ready", () => {
            const files = readdirSync('./src/events_custom')

            for (key of files) {
                require(`../../events_custom/${key}`)
            }

            console.log(`\x1b[33m[!] [${files.length}] Custom events set`)
        })
    },
    
    loadPlayer: () => {
        const files = readdirSync('./src/events_music')
        let ignored = 0
        for (key of files) {
            if(key.startsWith('_')) {
                ignored++
                continue
            }
            require(`../../events_music/${key}`)
        }

        console.log(`\x1b[33m[!] [${files.length - ignored}] Music events set`)
    }
}