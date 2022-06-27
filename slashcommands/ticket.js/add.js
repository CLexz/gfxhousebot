const Discord = require('discord.js');

module.exports.run = async (client, interaction) => {


    // Get the options
    const UserAdd = interaction.options.getMember("user")

    // check if the author is the user
    if (UserAdd.user.id == interaction.user.id) return client.error({ error: "Je kunt jezelf niet toevoegen!" }, interaction)

    // add the user
    interaction.channel.permissionOverwrites.edit(UserAdd, {
        VIEW_CHANNEL: true,
        SEND_MESSAGES: true,
    });

    interaction.reply(`✅ | ${UserAdd} aan het ticket toegevoegd` , interaction)



}



module.exports.help = {
    name: 'add'
}