const { ActionRowBuilder, Events, SelectMenuBuilder } = require('discord.js');

this.channel_list_menu = (channels = []) => {
    
    const row = new ActionRowBuilder()
    .addComponents(
        new SelectMenuBuilder()
            .setCustomId('select')
            .setPlaceholder('Select a channel')
            .addOptions(channels),
    );

    return row
}
