const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

this.give_confirm_button = () => {
    const comp = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId("yes").setLabel("Accept the money").setStyle(ButtonStyle.Success).setEmoji('🤝'),
        new ButtonBuilder().setCustomId("no").setLabel("Cancel").setStyle(ButtonStyle.Danger)
    );
    return comp;
};
