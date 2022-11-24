const { ActionRowBuilder, Events, SelectMenuBuilder } = require('discord.js');

this.category_list_menu = (channels = []) => {
    
    const row = new ActionRowBuilder()
    .addComponents(
        new SelectMenuBuilder()
            .setCustomId('select')
            .setPlaceholder('Select a category')
            .addOptions(channels),
    );

    return row
}
