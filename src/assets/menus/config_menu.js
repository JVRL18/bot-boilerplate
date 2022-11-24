const { ActionRowBuilder, Events, SelectMenuBuilder } = require('discord.js');

this.config_menu = () => {
    const row = new ActionRowBuilder()
    .addComponents(
        new SelectMenuBuilder()
            .setCustomId('select')
            .setPlaceholder('Start configuration')
            .addOptions(
                {
                    label: 'Voice Channels',
                    description: 'Configure vc features',
                    emoji:'📞',
                    value: 'vc',
                },
                {
                    label: 'Text Channels',
                    description: 'Configure tc features',
                    emoji:'💬',
                    value: 'tc',
                },
            ),
    );
    return row
}

this.voice_config_menu = () => {
    const row = new ActionRowBuilder()
    .addComponents(
        new SelectMenuBuilder()
            .setCustomId('select')
            .setPlaceholder('Select one')
            .addOptions(
                {
                    label: 'Temp channel',
                    description: 'Configure a temporary channel',
                    emoji:'⏳',
                    value: 'temp',
                }
            ),
    );
    return row
}

this.text_config_menu = () => {
    const row = new ActionRowBuilder()
    .addComponents(
        new SelectMenuBuilder()
            .setCustomId('select')
            .setPlaceholder('Select one')
            .addOptions(
                {
                    label: 'Ticket channel',
                    description: 'Configure a channel to start tickets',
                    emoji:'📨',
                    value: 'ticket',
                }
            ),
    );
    return row
}




this.add_remove_edit_menu = () => {
    const row = new ActionRowBuilder()
    .addComponents(
        new SelectMenuBuilder()
            .setCustomId('select')
            .setPlaceholder('Start configuration')
            .addOptions(
                {
                    label: 'Create',
                    description: 'Configure new item',
                    emoji:'➕',
                    value: 'create',
                },
                {
                    label: 'Delete',
                    description: 'Remove an existent configured item',
                    emoji:'❌',
                    value: 'delete',
                },
                {
                    label: 'Update',
                    description: 'Edit configs of existent items',
                    emoji:'🔧',
                    value: 'update',
                }
            ),
    );
    return row
}