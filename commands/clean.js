//jshint esversion:8
const { SlashCommandBuilder, PermissionFlagsBits, inlineCode } = require('discord.js');
const modlog = require("../modules/modlog");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clean')
		.setDescription('Deletes messages in bulk.')
    .addIntegerOption(option =>
		option.setName('number')
			.setDescription('The number of recent messages to delete in this channel. Maximum of 100.')
			.setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

	async execute(interaction) {

    const number = interaction.options.getInteger('number');
		const author = interaction.user;
		const targetChannel = interaction.channel;

    await targetChannel.bulkDelete(number)
      .then(messages => {
				const bulkDeleteNumber = messages.size;
				interaction.reply(`:broom: Deleted ${bulkDeleteNumber} messages in ${targetChannel.toString()}.`);
				modlog.create({
					type: "Bulk Delete",
					author,
					targetChannel,
					bulkDeleteNumber,
					interaction
				});
			});
	},
};
