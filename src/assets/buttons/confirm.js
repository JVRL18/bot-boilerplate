const { ActionRowBuilder, ButtonBuilder } = require("discord.js");

this.confirm = () => new ActionRowBuilder().addComponents(
  new ButtonBuilder().setCustomId("yep").setLabel("YES").setStyle(3),
  new ButtonBuilder().setCustomId("nop").setLabel("NO").setStyle(3)
)
