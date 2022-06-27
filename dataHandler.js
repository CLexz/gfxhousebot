const discord = require("discord.js")
const { Permissions } = require('discord.js')


async function createCmd(client, guildId) {
    const data = [
        {
            name: 'panel',
            description: 'Stuurt het ticket panel.',
            type: 'CHAT_INPUT',
        },
        {
            name: "add",
            type: "CHAT_INPUT",
            ticket: true,
            description: "Voegd aan gebruiker toe aan de ticket.",
            options: [{
                name: "user",
                type: "USER",
                required: true,
                
                description: "The user"
            },],
        },
        {
            name: 'claim',
            description: 'claim a ticket',
            type: 'CHAT_INPUT',
        },
        {
            name: "remove",
            type: "CHAT_INPUT",
            description: "Verwijderd een persoon uit de ticket.", 
            ticket: true,
            options: [{
                name: "user",
                type: "USER",
                required: true,
                description: "The user you want to remove"
            },],
           
        },
        {
            name: 'transcript',
            description: 'transcript a ticket',
            type: 'CHAT_INPUT',
        },
        {
            name: 'close',
            description: 'close a ticket',
            type: 'CHAT_INPUT',
            ticket: true
        }




    ]

    await client.guilds.cache.get(guildId)?.commands.set(data)

}

module.exports = { createCmd }