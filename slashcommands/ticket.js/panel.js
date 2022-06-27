const Discord = require('discord.js');

module.exports.run = async (client, interaction) => {



    const embed = new Discord.MessageEmbed()
        .setAuthor({ name: client.user.username, iconURL: client.user.avatarURL({ size: 1024 }) })
      .setFooter({ text: client.user.username, iconURL: client.user.avatarURL({ size: 1024 }) })
        .setTitle('🎫・Tickets')
        .setDescription('Heb je vragen, wil je solliciteren of partner worden? Maak dan een ticket aan!\n\n**:question:・Hoe kan ik een ticket maken?\n**Klik op het vervolgkeuzemenu en kies waarvoor je een ticket wilt maken. Als je op de optie klikt, maakt hij meteen een ticket aan!\n\n**:exclamation:・Let op**\nMaak geen onnodige tickets of meerdere tickets!')
        .setColor('BLUE')
     
        .setTimestamp();

    const row = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageSelectMenu()
                .setCustomId('ticket_menu')
                .setPlaceholder('❌・Nothing Selected')
                .addOptions([
                    {
                        label: 'Vragen',
                        description: 'Vraag iets aan de support!',
                        value: 'support_option',
                        emoji: '❓'
                    },
                   
                    {
                        label: 'Partner',
                        description: 'Doe een partner apply',
                        value: 'partner_option',
                        emoji: '🤝'
                    },
                    {
                        label: 'Sollicitatie',
                        description: 'Doe een sollicitatie',
                        value: 'solli_option',
                        emoji: '💼'
                    },
                    {
                        label: 'Aankoop',
                        description: 'Doe een aankoop',
                        value: 'order_option',
                        emoji: '💲'
                    },
                ]),
        );

        interaction.reply({ embeds: [embed], components: [row] })

}



module.exports.help = {
    name: 'panel'
}