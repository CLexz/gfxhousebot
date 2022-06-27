const Discord = require('discord.js');
const config = require('../../config.json')

module.exports.run = async (client, interaction) => {

    // Get the options
    const UserRemove = interaction.options.getMember("user")

    // check if the author is the user
    if (UserRemove.user.id == interaction.user.id) return client.error({ error: "You cannot remove yourself!" }, interaction)

    // add the user
    interaction.channel.permissionOverwrites.edit(UserRemove, {
        VIEW_CHANNEL: false,
        SEND_MESSAGES: false,
    });

    interaction.reply(`✅ |Succesfully removed ${UserRemove} of the ticket` , interaction)



}



module.exports.help = {
    name: 'remove'
}