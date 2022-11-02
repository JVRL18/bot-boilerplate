const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

this.vc_crud_fields = interaction => {
		const modal = new ModalBuilder()
			.setCustomId('modal')
			.setTitle('Temp channel configs');

		const childName = new TextInputBuilder()
			.setCustomId('childName')
			.setLabel("Temp channel name")
			.setStyle(TextInputStyle.Short);

		const maxUsers = new TextInputBuilder()
			.setCustomId('userLimit')
			.setLabel("Max users on the temp channel")
			.setStyle(TextInputStyle.Short);


		const firstActionRow = new ActionRowBuilder().addComponents(childName);
		const secondActionRow = new ActionRowBuilder().addComponents(maxUsers);

		modal.addComponents(firstActionRow, secondActionRow);

		return modal
}