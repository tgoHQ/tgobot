//jshint esversion:8
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const modlog = require("../modules/modlog");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clean')
		.setDescription('Deletes messages in bulk.')
    .addIntegerOption(option =>
		option.setName('number')
			.setDescription('The number of recent messages to delete in this channel. Maximum of 100.')
			.setRequired(true))
		.addStringOption(option =>
		option.setName('reason')
			.setDescription('Reason for the clean')
			.setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

	async execute(interaction) {

    const number = interaction.options.getInteger('number');
		const author = interaction.user;
		const targetChannel = interaction.channel;
		const reason = interaction.options.getString('reason');

    await targetChannel.bulkDelete(number)
      .then(messages => {
				const bulkDeleteNumber = messages.size; //get the number of messages that were actually deleted
				modlog.create({
					type: "Bulk Delete",
					author,
					targetChannel,
					bulkDeleteNumber,
					reason,
					interaction
				})
					.then(string => interaction.reply(string))
			});
	},
};
