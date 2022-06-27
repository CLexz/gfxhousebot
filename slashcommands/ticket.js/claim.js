const Discord = require('discord.js');
const config = require('../../config.json')

module.exports.run = async (client, interaction) => {


           
         // require the logs
         const logChannel = interaction.guild.channels.cache.get(config.tickets.logs)

        // make the embed
        const embed_claim = new Discord.MessageEmbed()
        .setAuthor({ name: client.user.username, iconURL: client.user.avatarURL({ size: 1024 }) })
        .setTitle('✋・Claimed')
        .setDescription(`U wordt nu geholpen door: ${interaction.user}`)
        .setColor(config.embeds.Color)
        .setFooter({ text: client.user.username, iconURL: client.user.avatarURL({ size: 1024 }) })
        .setTimestamp();

        //send the embed
        interaction.reply({ embeds: [embed_claim] })

                // send the logs
                const logEmbed = new Discord.MessageEmbed()
                .setAuthor({ name: client.user.username, iconURL: client.user.avatarURL({ size: 1024 }) })
                .setTitle("✋・Claimed")
                .setDescription("Er is een ticket geclaimd!")
                .addFields(
                    {
                        name: `📃・Gesloten Door:`,
                        value: `<@${interaction.user.id}>`
                    },
                    {
                        name: "❓・Kanaal",
                        value: `${interaction.channel.name}`
                    })
                    .setColor(config.embeds.Color)
                    .setFooter({ text: client.user.username, iconURL: client.user.avatarURL({ size: 1024 }) })
                    .setTimestamp();
    
                logChannel.send({ embeds: [logEmbed] })




}



module.exports.help = {
    name: 'claim'
}