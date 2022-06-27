const Discord = require('discord.js');
const config = require('../../config.json')
const { createTranscript } = require('discord-html-transcripts')

module.exports.run = async (client, interaction) => {


        // make the transcript
        const transcriptFile = await createTranscript(interaction.channel, {
            limit: -1,
            fileName: `${interaction.channel.name}.html`,
            returnBuffer: false
        });

        // send the transcript and a succes message
        interaction.reply(`✅ |Succesfully created the transcript of <#${interaction.channel.id}> `, interaction)
        interaction.channel.send({ files: [transcriptFile] })
    }







module.exports.help = {
    name: 'transcript'
}