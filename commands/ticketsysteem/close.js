const Discord = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB()

module.exports.run = async (client, message, args, prefix) => {
    
        if (!message.member.permissions.has('ADMINISTRATOR')) {
        const embed = new Discord.MessageEmbed()
        .setTitle('U heeft geen toestemming om de ticket te sluiten!')
        .setColor('#001296')
        .setAuthor({ name: 'GFX House', iconURL: 'https://cdn.discordapp.com/attachments/990895827834777611/990896713088778270/gfxhouse.png', url: 'https://gfxhouse.nl' })
        
        message.channel.send({embeds: []})
    }

    if(message.channel.topic === message.author.id && !message.member.permissions.has('ADMINISTRATOR')){
        const ownTicket = new Discord.MessageEmbed()
            .setDescription(`Je kan je eigen ticket niet sluiten!`)
            .setColor('#001296')
            .setAuthor({ name: 'GFX House', iconURL: 'https://cdn.discordapp.com/attachments/990895827834777611/990896713088778270/gfxhouse.png', url: 'https://gfxhouse.nl' })
        const fail = await message.channel.send({ embeds: [ownTicket] }); setTimeout(() => {fail.delete()},5000); return

    }

    const closeEmbed = new Discord.MessageEmbed()
        .setDescription(`Dit kanaal word verwijderd over **5** seconden!`)
        .setColor('#001296')
        .setAuthor({ name: 'GFX House', iconURL: 'https://cdn.discordapp.com/attachments/990895827834777611/990896713088778270/gfxhouse.png', url: 'https://gfxhouse.nl' })
    message.channel.send({ embeds: [closeEmbed] })

    db.delete(`ticket_${message.channel.topic}`)
    db.delete(`ticketApproved_${message.channel.id}`)

    setTimeout(() => {
        message.channel.delete()
    }, 5000)
   
}

module.exports.help = {
    name: 'close',
    aliases: []
}