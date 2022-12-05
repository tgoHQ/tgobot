//jshint esversion:10
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('slowmode')
		.setDescription('Sets slowmode on a channel.')
    .addChannelOption(option =>
		option.setName('channel')
			.setDescription('The channel to slowmode')
			.setRequired(true))
		.addIntegerOption(option =>
		option.setName('time')
			.setDescription('Time to slowmode, in seconds. Use 0 to remove slowmode.')
			.setRequired(true))
    .addStringOption(option =>
		option.setName('reason')
			.setDescription('Reason for the slowmode')
			.setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

	async execute(interaction) {

    const channel = interaction.options.getChannel('channel');
    const reason = interaction.options.getString('reason');
		const time = interaction.options.getInteger('time');

		try {
			await channel.setRateLimitPerUser(time, reason)
	      .then(function() {
					interaction.reply(`:stopwatch: Set slowmode in <#${channel.id}> to \`${time}s\` with reason \`${reason}\`.`)
				})
				.catch(function(e) {
					// interaction.reply(`:octagonal_sign: Error: ${inlineCode(e.message)}`);
					interaction.reply(`:octagonal_sign: Error: ${e.message}`);
				})
		}
		catch {}

	},
};
