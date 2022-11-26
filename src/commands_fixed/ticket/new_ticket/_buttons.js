const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

this.new_ticket_button = () => {
    const comp = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId("new_ticket").setLabel("New ticket").setStyle(ButtonStyle.Primary).setEmoji('📨'),
    );
    return comp;
}

this.delete_button = () => {
    const comp = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId("ticket_delete").setLabel("End ticket").setStyle(ButtonStyle.Danger).setEmoji('🗑'),
    );
    return comp;
}
