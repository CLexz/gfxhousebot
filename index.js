const { Client, Intents } = require('discord.js');
const Discord = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS], allowedMentions: { parse: ['users', 'roles']} });

const fs = require('fs');

client.on('ready', () => {
    console.log('GFX House is online!')
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.events = new Discord.Collection();
client.SlashCmd = new Discord.Collection();
module.exports.client = client

// COMMAND HANDLER
fs.readdirSync('./commands/').forEach(dir => {
    fs.readdir(`./commands/${dir}`, (err, files) => {
        if(err) throw err;

        var jsFiles = files.filter(f => f.split(".").pop() === "js");

        jsFiles.forEach(file => {
            var fileGet = require(`./commands/${dir}/${file}`);

            try {
                client.commands.set(fileGet.help.name, fileGet);
                    
                fileGet.help.aliases.forEach(alias => {
                    client.aliases.set(alias, fileGet.help.name);
                })
            } catch (err) {
                return console.log(err);
            }
        });
    });
});

//slash commands
fs.readdirSync('./slashcommands/').forEach(dir => {
    fs.readdir(`./slashcommands/${dir}`, (err, files) => {
        if (err) throw err;

        var jsFiles = files.filter(f => f.split(".").pop() === "js")

        jsFiles.forEach(file => {
            var fileGet = require(`./slashcommands/${dir}/${file}`);
            console.log(`De file ${fileGet.help.name}.js ✅ is geladen`)
            if (fileGet.help.name === err) {
                return console.log(`De file ${fileGet.help.name}.js ❌ is niet geladen!!!!!`)
            }

            try {
                client.SlashCmd.set(fileGet.help.name, fileGet);
            } catch (err) {
                return console.log(err);
            }
        });
    });
});

// EVENTS HANDLER
fs.readdirSync(`./events/`).forEach(dir => {
    var jsFiles = fs.readdirSync('./events/').filter(f => f.split(".").pop() === "js");
    jsFiles.forEach(event => {
        const eventGet = require(`./events/${event}`)

        try {
            client.events.set(eventGet.name, eventGet)
        } catch(err) {
            return console.log(err)
        }
    })
})

bot.login(process.env.token);