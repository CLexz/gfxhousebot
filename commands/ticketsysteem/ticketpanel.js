const Discord = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB()

module.exports.run = async (client, message, args, prefix) => {

    if(!message.member.permissions.has('ADMINISTRATOR')) return message.delete()

    const ticketEmbed = new Discord.MessageEmbed()
        .setAuthor(`${client.user.username} Tickets`, client.user.displayAvatarURL())
        .setDescription(`Klik op de knop onder dit bericht om een ticket te openen.`)
        .setColor('#001296')

    const row = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
                .setCustomId('player-support')
                .setLabel('Klik hier om een ticket te maken!')
                .setStyle('PRIMARY')
                .setEmoji('🎟️')
        )

    message.channel.send({ embeds: [ticketEmbed], components: [row] }); message.delete()  

}

module.exports.help = {
    name: 'ticketpanel',
    aliases: []
}
