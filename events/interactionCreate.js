
const Discord = require("discord.js");
const client = require('../index').client
const { Permissions } = require('discord.js')
const db = require("quick.db")
const fs = require('fs')

const config = require('../config.json')
const succes = config.titles.succes

const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js')
const { createTranscript } = require('discord-html-transcripts');

client.on("interactionCreate", async (interaction, message) => {


    if (interaction.isCommand()) {
        let SlashCmd = client.SlashCmd.get(interaction.commandName)
        if (SlashCmd); SlashCmd.run(client, interaction)
    }


    if (interaction.customId == "Deelnemen") {
        let gg;
        let array = [g];
        for (i = 0; g[interaction.guild.id].length; i++) {
            if (g[interaction.guild.id][i].mId == interaction.message.id) {
                gg = g[interaction.guild.id][i];
                break;
            }
        }

        if (!gg || gg.ended == true) return interaction.reply({ content: "De giveaway is al afgelopen.", ephemeral: true })

        if (gg.members.includes(interaction.user.id)) {
            for (i = 0; i < gg.members.length; i++) {
                if (gg.members[i] == interaction.user.id) {
                    gg.members.splice(i, 1)
                    break;
                }
            }
            interaction.reply({ content: "Je doet niet meer aan de giveaway", ephemeral: true })
        } else {
            gg.members.push(interaction.user.id)
            interaction.reply({ content: "Je doet mee met de giveaway", ephemeral: true })
        }

        let msg = await client.channels.cache.get(gg.channel).messages.fetch(gg.mId);

        let embed = msg.embeds[0]
        embed.footer.text = gg.members.length + " deelnemers";

        msg.edit({ embeds: [embed], components: msg.components })

        fs.writeFileSync("../giveaway.json", JSON.stringify(g))
    }




     // require the logs
     const logChannel = interaction.guild.channels.cache.get(config.tickets.logs)
  


    if (interaction.isSelectMenu()) {

        if (interaction.values[0] === 'support_option') {

            const everyrole = interaction.guild.roles.cache.find(x => x.name === "@everyone").id;
            interaction.guild.channels.create(`support・${interaction.user.username}`, {
                type: 'text',
                parent: config.tickets.vragen,
                topic: interaction.user.id,
                permissionOverwrites: [
                    {
                        id: everyrole,
                        deny: ['VIEW_CHANNEL']
                    },
                    {
                        id: config.tickets.support,
                        allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                    },
                    {
                        id: interaction.user.id,
                        allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                    }
                ],
            }).then(async c => {

                const embed = new MessageEmbed()
                    .setAuthor({ name: client.user.username, iconURL: client.user.avatarURL({ size: 1024 }) })
                    .setTitle('🎫・Nieuw Ticket!')
                    .setDescription(`Jouw ticket is succesvol geopend! <#${c.id}>`)
                    .setColor('#001296')
                    .setFooter({ text: client.user.username, iconURL: client.user.avatarURL({ size: 1024 }) })
                    .setTimestamp();

                await interaction.reply({ embeds: [embed], ephemeral: true })

                const embed1 = new MessageEmbed()
                    .setAuthor({ name: client.user.username, iconURL: client.user.avatarURL({ size: 1024 }) })
                    .setTitle('🎫・Nieuw Ticket!')
                    .setDescription(`<@${interaction.user.id}>, Het support team van **${interaction.guild.name}** helpt jou zo snel mogelijk`)
                    .addField('❓・Onderwerp:', '```Wil support spreken```')
                    .setColor('#001296')
                    .setFooter({ text: client.user.username, iconURL: client.user.avatarURL({ size: 1024 }) })
                    .setTimestamp();

                const row1 = new MessageActionRow()
                    .addComponents(
                        new MessageSelectMenu()
                            .setCustomId('options_ticket_menu')
                            .setPlaceholder('❌・Niets geselecteerd')
                            .addOptions([
                                {
                                    label: 'Close',
                                    description: 'sluit de ticket',
                                    value: 'close_option',
                                    emoji: '🔒'
                                },
                                {
                                    label: 'Claim',
                                    description: 'Claim een ticket',
                                    value: 'claim_option',
                                    emoji: '👋'
                                },
                            ]),
                    )
                await c.send({ content: `${interaction.user}, <@&${config.tickets.support}>` })
                await c.send({ embeds: [embed1], components: [row1] })
            }
            )
        }


        if (interaction.values[0] === 'order_option') {

            const everyrole = interaction.guild.roles.cache.find(x => x.name === "@everyone").id;
            interaction.guild.channels.create(`Aankoop・${interaction.user.username}`, {
                type: 'text',
                parent: config.tickets.aankoop,
                topic: interaction.user.id,
                permissionOverwrites: [
                    {
                        id: everyrole,
                        deny: ['VIEW_CHANNEL']
                    },
                    {
                        id: config.tickets.support,
                        allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                    },
                    {
                        id: interaction.user.id,
                        allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                    }
                ],
            }).then(async c => {
    
                const embed = new MessageEmbed()
                    .setAuthor({ name: client.user.username, iconURL: client.user.avatarURL({ size: 1024 }) })
                    .setTitle('m')
                    .setDescription(`Jouw ticket is succesvol geopend <#${c.id}>`)
                    .setColor('#001296')
                    .setFooter({ text: client.user.username, iconURL: client.user.avatarURL({ size: 1024 }) })
                    .setTimestamp();
    
                await interaction.reply({ embeds: [embed], ephemeral: true })
    
                const embed1 = new MessageEmbed()
                    .setTitle('🎫・New Ticket!')
                    .setDescription(`<@${interaction.user.id}>, Het support team van **${interaction.guild.name}** helpt jou zo snel mogelijk`)
                    .addField('❓・Onderwerp: ', '```Ik wil een order plaatsen```')
                    .setColor('#001296')
                    .setFooter({ text: client.user.username, iconURL: client.user.avatarURL({ size: 1024 }) })
                    .setTimestamp();
    
                const row1 = new MessageActionRow()
                    .addComponents(
                        new MessageSelectMenu()
                            .setCustomId('options_ticket_menu')
                            .setPlaceholder('❌・Nothing Selected')
                            .addOptions([
                                {
                                    label: 'Close',
                                    description: 'Close the ticket',
                                    value: 'close_option',
                                    emoji: '🔒'
                                },
                                {
                                    label: 'Claim',
                                    description: 'Claim a ticket',
                                    value: 'claim_option',
                                    emoji: '👋'
                                },
                            ]),
                    )
                await c.send({ content: `${interaction.user}, <@&${config.tickets.support}>` })
                await c.send({ embeds: [embed1], components: [row1] })
            }
            )
        }
    


        if (interaction.values[0] === 'reward_option') {

            const everyrole = interaction.guild.roles.cache.find(x => x.name === "@everyone").id;
            interaction.guild.channels.create(`reward・${interaction.user.username}`, {
                type: 'text',
                parent: config.tickets.reward,
                topic: interaction.user.id,
                permissionOverwrites: [
                    {
                        id: everyrole,
                        deny: ['VIEW_CHANNEL']
                    },
                    {
                        id: config.tickets.support,
                        allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                    },
                    {
                        id: interaction.user.id,
                        allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                    }
                ],
            }).then(async c => {

                const embed = new MessageEmbed()
                    .setAuthor({ name: client.user.username, iconURL: client.user.avatarURL({ size: 1024 }) })
                    .setTitle('m')
                    .setDescription(`Jouw ticket is succesvol geopend <#${c.id}>`)
                    .setColor('#001296')
                    .setFooter({ text: client.user.username, iconURL: client.user.avatarURL({ size: 1024 }) })
                    .setTimestamp();

                await interaction.reply({ embeds: [embed], ephemeral: true })

                const embed1 = new MessageEmbed()
                    .setTitle('🎫・New Ticket!')
                    .setDescription(`<@${interaction.user.id}>, Het support team van **${interaction.guild.name}** helpt jou zo snel mogelijk`)
                    .addField('❓・Onderwerp: ', '```Wil iets claimen```')
                    .setColor('#001296')
                    .setFooter({ text: client.user.username, iconURL: client.user.avatarURL({ size: 1024 }) })
                    .setTimestamp();

                const row1 = new MessageActionRow()
                    .addComponents(
                        new MessageSelectMenu()
                            .setCustomId('options_ticket_menu')
                            .setPlaceholder('❌・Nothing Selected')
                            .addOptions([
                                {
                                    label: 'Close',
                                    description: 'Close the ticket',
                                    value: 'close_option',
                                    emoji: '🔒'
                                },
                                {
                                    label: 'Claim',
                                    description: 'Claim a ticket',
                                    value: 'claim_option',
                                    emoji: '👋'
                                },
                            ]),
                    )
                await c.send({ content: `${interaction.user}, <@&${config.tickets.support}>` })
                await c.send({ embeds: [embed1], components: [row1] })
            }
            )
        }

        if (interaction.values[0] === 'partner_option') {

            const everyrole = interaction.guild.roles.cache.find(x => x.name === "@everyone").id;
            interaction.guild.channels.create(`Partner・${interaction.user.username}`, {
                type: 'text',
                parent: config.tickets.partner,
                topic: interaction.user.id,
                permissionOverwrites: [
                    {
                        id: everyrole,
                        deny: ['VIEW_CHANNEL']
                    },
                    {
                        id: interaction.user.id,
                        allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                    }
                ],
            }).then(async c => {

                const embed = new MessageEmbed()
                    .setAuthor({ name: client.user.username, iconURL: client.user.avatarURL({ size: 1024 }) })
                    .setTitle('t')
                    .setDescription(`Jouw ticket is succesvol geopend <#${c.id}>`)
                    .setColor('#001296')
                    .setFooter({ text: client.user.username, iconURL: client.user.avatarURL({ size: 1024 }) })
                    .setTimestamp();

                await interaction.reply({ embeds: [embed], ephemeral: true })

                const embed1 = new MessageEmbed()
                    .setAuthor({ name: client.user.username, iconURL: client.user.avatarURL({ size: 1024 }) })
                    .setTitle('🎫・New Ticket!')
                    .setDescription(`<@${interaction.user.id}>, Het support team van **${interaction.guild.name}** helpt jou zo snel mogelijk`)
                    .addField('❓・Onderwerp:', '```Wil partners worden.```')
                    .setColor('#001296')
                    .setFooter({ text: client.user.username, iconURL: client.user.avatarURL({ size: 1024 }) })
                    .setTimestamp();

                const row1 = new MessageActionRow()
                    .addComponents(
                        new MessageSelectMenu()
                            .setCustomId('options_ticket_menu')
                            .setPlaceholder('❌・Nothing Selected')
                            .addOptions([
                                {
                                    label: 'Close',
                                    description: 'Close the ticket',
                                    value: 'close_option',
                                    emoji: '🔒'
                                },
                                {
                                    label: 'Claim',
                                    description: 'Claim a ticket',
                                    value: 'claim_option',
                                    emoji: '👋'
                                },
                            ]),
                    )
                await c.send({ content: `${interaction.user}, <@&${config.tickets.support}>` })
                await c.send({ embeds: [embed1], components: [row1] })
            }
            )
        }
        if (interaction.values[0] === 'solli_option') {

            const everyrole = interaction.guild.roles.cache.find(x => x.name === "@everyone").id;
            interaction.guild.channels.create(`Sollicitation・${interaction.user.username}`, {
                type: 'text',
                parent: config.tickets.solicitatie,
                topic: interaction.user.id,
                permissionOverwrites: [
                    {
                        id: everyrole,
                        deny: ['VIEW_CHANNEL']
                    },
                    {
                        id: interaction.user.id,
                        allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                    }
                ],
            }).then(async c => {

                const embed = new MessageEmbed()
                    .setAuthor({ name: client.user.username, iconURL: client.user.avatarURL({ size: 1024 }) })
                    .setTitle('y')
                    .setDescription(`Jouw ticket is succesvol geopend <#${c.id}>`)
                    .setColor('#001296')
                    .setFooter({ text: client.user.username, iconURL: client.user.avatarURL({ size: 1024 }) })
                    .setTimestamp();

                await interaction.reply({ embeds: [embed], ephemeral: true })

                const embed1 = new MessageEmbed()
                    .setAuthor({ name: client.user.username, iconURL: client.user.avatarURL({ size: 1024 }) })
                    .setTitle('🎫・New Ticket!')
                    .setDescription(`<@${interaction.user.id}>, Het support team van **${interaction.guild.name}** helpt jou zo snel mogelijk`)
                    .addField('❓・Onderwerp:', '```Wil een sollicitatie doen!```')
                    .setColor('#001296')
                    .setFooter({ text: client.user.username, iconURL: client.user.avatarURL({ size: 1024 }) })
                    .setTimestamp();

                const row1 = new MessageActionRow()
                    .addComponents(
                        new MessageSelectMenu()
                            .setCustomId('options_ticket_menu')
                            .setPlaceholder('❌・Nothing Selected')
                            .addOptions([
                                {
                                    label: 'Close',
                                    description: 'Close the ticket',
                                    value: 'close_option',
                                    emoji: '🔒'
                                },
                                {
                                    label: 'Claim',
                                    description: 'Claim a ticket',
                                    value: 'claim_option',
                                    emoji: '👋'
                                },
                            ]),
                    )
                await c.send({ content: `${interaction.user}, <@&${config.tickets.support}>` })
                await c.send({ embeds: [embed1], components: [row1] })
            }
            )
        }
    }

    //=================== Ticket Select Menu ========================

    if (interaction.isSelectMenu()) {

        if (interaction.values[0] === "claim_option") {

            const embed_claim = new MessageEmbed()
                .setAuthor({ name: client.user.username, iconURL: client.user.avatarURL({ size: 1024 }) })
                .setTitle('✋・Claimed')
                .setDescription(`U wordt nu geholpen door: ${interaction.user}`)
                .setColor('#001296')
                .setFooter({ text: client.user.username, iconURL: client.user.avatarURL({ size: 1024 }) })
                .setTimestamp();

            interaction.deferUpdate()
            interaction.channel.send({ embeds: [embed_claim] })
// send the logs
            const logEmbed = new MessageEmbed()
                .setAuthor({ name: client.user.username, iconURL: client.user.avatarURL({ size: 1024 }) })
                .setTitle("✋・Claimed")
                .setDescription("Er is een ticket geclaimd!")
                .addFields(
                    {
                        name: `📃・Geclaimd door:`,
                        value: `<@${interaction.user.id}>`
                    },
                    {
                        name: "❓・Kanaal",
                        value: `${interaction.channel.name}`
                    })
                .setColor('#001296')
                .setFooter({ text: client.user.username, iconURL: client.user.avatarURL({ size: 1024 }) })
                .setTimestamp();

        
                logChannel.send({ embeds: [logEmbed] })
            

            

                   }

        if (interaction.values[0] === "close_option") {

            // make the transcript
            const transcriptFile = await createTranscript(interaction.channel, {
                limit: -1,
                fileName: `${interaction.channel.name}.html`,
                returnBuffer: false
            });


            // send a succes message
            interaction.reply( `Ticket is gesloten door <@${interaction.user.id}> en wordt over 5 seconden gesloten!`, interaction)

            const user = interaction.channel.topic
            const us = interaction.guild.members.cache.get(user)

            const user_embed = new MessageEmbed()
                .setAuthor({ name: client.user.username, iconURL: client.user.avatarURL({ size: 1024 }) })
                .setTitle('🗑・Gesloten')
                .setDescription(`Je ticket is gesloten!`)
                .addField(`🌐・Server:`, `${interaction.guild}`)
                .addField(`🗑・Gesloten door:`, `<@${interaction.user.id}>`)
                .setColor('#001296')
                .setFooter({ text: client.user.username, iconURL: client.user.avatarURL({ size: 1024 }) })
                .setTimestamp();

            us.send({ embeds: [user_embed] })
            us.send({ files: [transcriptFile] })

            // send the logs
            const logEmbed = new MessageEmbed()
                .setAuthor({ name: client.user.username, iconURL: client.user.avatarURL({ size: 1024 }) })
                .setTitle("🗑・gesloten")
                .setDescription("Er is een ticket gesloten!")
                .addFields(
                    {
                        name: `📃・Gesloten door:`,
                        value: `<@${interaction.user.id}>`
                    },
                    {
                        name: "❓・kanaal",
                        value: `${interaction.channel.name}`
                    })
                .setColor('#001296')
                .setFooter({ text: client.user.username, iconURL: client.user.avatarURL({ size: 1024 }) })
                .setTimestamp();

                logChannel.send({ embeds: [logEmbed] })
                logChannel.send({ files: [transcriptFile] })

            setTimeout(function () {
                interaction.channel.delete()
            }, 5000);
        }


    }


});
