const Discord = require('discord.js');

const { createTranscript } = require('discord-html-transcripts')

module.exports.run = async (client, message, args) => {

 const Target = message.mentions.users.first() || message.author;
  const Member = message.guild.members.cache.get(Target.id)
console.log(Target)
console.log(Member)
        // make the transcript
        const transcriptFile = await createTranscript(Target.channel, {
            limit: -1,
            fileName: `gfxhouse-ticket.html`,
            returnBuffer: false
        });

        // send the transcript and a succes message
        message.reply(`✅ |Succesfully created the transcript of <#${Target.channel.id}> `, Target)
        message.channel.send({ files: [transcriptFile] })
    }







module.exports.help = {
    name: 'transcript'
}