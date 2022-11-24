const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

this.tc_description_fields = i => {
	const modal = new ModalBuilder()
		.setCustomId('modal')
		.setTitle('Display message for the start button');

	const childName = new TextInputBuilder()
		.setCustomId('text')
		.setLabel("Text to be shown in the description")
		.setStyle(TextInputStyle.Paragraph);

	const firstActionRow = new ActionRowBuilder().addComponents(childName);

	modal.addComponents(firstActionRow);

	return modal
}