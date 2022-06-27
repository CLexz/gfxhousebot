const Discord = require('discord.js')
const { client } = require('../index'); 
const { createCmd } = require('../dataHandler')

client.on('guildMemberAdd', (member) => {
    
    const channel = member.guild.channels.cache.find(x => x.id === '952347521429147658')
    if(channel === undefined) return

    const joinEmbed = new Discord.MessageEmbed()
        .setDescription(`Welkom ${member} op onze Discord server!`)
        .setColor('#001296')
        .setDescription(`Member Count: ${guild.memberCount}`)
	    .setFooter({ text: 'GFX House', iconURL: 'https://cdn.discordapp.com/attachments/959898357067821106/991040441006845982/unknown.png' });
    channel.send({ embeds: [joinEmbed] })


})